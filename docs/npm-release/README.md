# Web SDK npm 发布操作手册

适用仓库：`AgoraIO/agora-rtc-web`。实现日期：2026-11-26。

Jenkins 编译和 QA，GitHub 保存最终 tgz 并校验，管理员批准后用 npm OIDC 发布。GitHub 不重新编译或 pack，npm 不配置长期写 token。CDN/demo 继续走现有交付流程。

## 先了解三个标识

| 标识 | 示例 | 用途 |
| --- | --- | --- |
| SDK 版本 | `4.30.0` | 来自 tgz 的 package.json；子包可以独立版本 |
| release ID | `4.30.0-b200` | 每次候选唯一；对应 `.release/4.30.0-b200.json` |
| GitHub Release tag | `npm-4.30.0-b200` | 指向本 GitHub 仓库中含清单的提交；与内网 SDK tag 无关 |

文中的版本、build 200、QA URL 均为示例，执行时替换为真实值。`latest` 只接受正式 semver；`4.24.8-1`、`4.19.0-special.1` 等带 `-` 的版本在 npm semver 中都是 prerelease，应选择 `hotfix` 或 `next`。

实际子包名为 **`@agora-js/shared`、`@agora-js/report`、`@agora-js/media`、`@agora-js/protocol`**。不是 `@agora/js-*`。公网已发布元数据显示：4.18.2 单主包，4.19.0 四包，4.24.3 五包。发布器不硬编码这些边界，始终读取最终 tgz 的依赖。注意已发布的 4.18.2 tgz 没有 repository 字段，历史分支补发前需由研发补齐构建 metadata，不能直接复用该旧 tgz 走 OIDC。

## 一次性设置：GitHub 管理员

1. 将本实现通过 PR 合入 **主仓库 main**。fork 用于提交和工具测试；生产 workflow 在 fork 中会跳过。
2. 仓库 Settings → General → Releases 启用 **Release immutability**。设置后新发布的 Release 才受保护。创建候选时先用 draft 上传齐全，检查后再发布冻结。
3. Settings → Environments → 新建 **`npm-production`**：配置 required reviewers，启用 prevent self-review，禁用绕过审批（界面/组织套餐允许时）；Deployment branches 仅允许 `main`。Environment 同名但未配置 reviewer，并不能提供审批。
4. 保护 `main`：必须走 PR，至少一位维护者批准，通过 `Validate npm release tools` 检查。把发布脚本、两个 workflow、`config.json`、`.release/` 纳入团队现有 CODEOWNERS/规则保护。应由管理员填写真实、有效且有仓库权限的团队名，不在代码里虚构 owner。
5. Actions 允许执行本项目中按 SHA 固定的 checkout/setup-node/upload/download-artifact。保留 evidence artifacts，生产运行结果归档到团队长期存储。

发布流程只需要 `contents: read`；只有 publish job 申请 `id-token: write`。Environment 审批在 validate 成功之后、publish job 开始之前发生。

## 一次性设置：npm 管理员（逐包操作）

对每个会由本 workflow 发布的包，在 npmjs.com 包 Settings → Trusted Publisher 新建 GitHub Actions 配置：

| 字段 | 必须填写 |
| --- | --- |
| Organization/user | `AgoraIO` |
| Repository | `agora-rtc-web` |
| Workflow filename | `publish-ng.yml`，不带目录 |
| Environment | `npm-production` |
| Allowed actions | 开启 **直接 `npm publish`** |

当前实现不自动运行 `npm dist-tag add/rm`，不需要为日常流程额外授权 dist-tag 管理。npm 发布新版本时通过 `npm publish --tag` 设置通道。

包必须已在公网 npm 初始化且维护者拥有权限。新增包首次初始化/首发由 npm 管理员按组织政策完成；随后绑定 OIDC。不要用已有生产包试发实验版本。建议先在单独测试仓库和专用测试包演练 OIDC 的允许/拒绝、Environment 审批和失败恢复；测试配置的 repository 必须与测试包的 repository metadata 一致。

官方要求 Node ≥22.14.0、npm ≥11.5.1、GitHub-hosted runner；本实现固定 **Node 22.15.0 + npm 11.21.0**，publish 时还会断言准确版本。Trusted Publisher 新建后首次成功发布有 **2 天时限**，在真实发布窗口配置；过期就删除后重建，不为防过期临时发生产版本。验证迁移成功后，再收口旧 npm token 和旧自动发布入口。

## Jenkins 接入（CI 维护者执行）

目标 job：`QAE/webRTC/webRTC_Deploy/webNG_Release`。

当前配置来自 `accs/docker_build.git`：`jenkins/test/webRTC_test/webRTC_deploy/release/JenkinsFile`。截至 2026-11-26，最近成功构建 #176 已归档 demo/UMD/主包 tgz；子包 pack 进入 `npm-integration/local`，现有归档规则未包含这些子包 tgz。

按 [Jenkins 和 rtcn.js 修改说明](SDK-CHANGES.md) 修改该流水线。可直接参考 [Jenkins stage 片段](jenkins-stage.groovy)。本次没有修改在线 Jenkins job 或 rtcn.js。

关键要求：**只 pack 一次**，QA 测试与 GitHub 发布使用同一批 tgz。完整归档 `manifest.json` 和清单列出的每个 tgz。保留 demo/CDN zip，以及实际安装时的 lockfile 和 QA 报告。不要在 QA 后重新 `npm pack`。

也可以在已构建的 Jenkins workspace 手动生成候选（以下在发布工具仓库根目录执行）：

```bash
npm ci --prefix scripts/npm-release --ignore-scripts --registry=https://registry.npmjs.org/
export BUILD_URL='https://jenkins-api.bj2.agoralab.co/job/QAE/job/webRTC/job/webRTC_Deploy/job/webNG_Release/200/'
export BUILD_BRANCH='release/4.30.0'
export SDK_BUILD_NODE='v18.16.0'  # 填该次实际构建版本
export SDK_BUILD_PNPM='8.6.4'     # 填该次实际构建版本
export QA_REPORT_URL='https://YOUR-QA-SERVICE/reports/websdk-build-200'
export RELEASE_LOCK_FILE='/path/to/evidence/pnpm-lock.effective.yaml'
node scripts/npm-release/release.mjs pack /path/to/rtcn /path/to/new-candidate-dir 4.30.0-b200 latest
```

清单分别记录 SDK 构建的 Node/pnpm 和 pack 的 Node/npm，不能把打包工具版本冒充 SDK 编译工具版本。

`/path/to/new-candidate-dir` 必须不存在，避免混入旧产物。`QA_REPORT_URL` 指向本次候选的固定报告位置，QA 后核对报告确实通过并记录清单 hash。`RELEASE_LOCK_FILE` 是 install 后、还原 lockfile 前保存的实际文件；如果构建严格 frozen 且未修改 lock，则可以省略，用 SDK 根目录 pnpm-lock.yaml。

工具从主包开始递归收集可达的已批准子包，忽略无依赖关系的 demo/plugin。缺少子包 dist 时，必须通过后续公网依赖可用性检查和消费者安装才能复用；未批准的 `@agora-js/*` 依赖直接阻断。

## 每次发布：四步

### 1. Jenkins 构建，QA 验收最终候选

下载 Jenkins 归档的整个候选目录，假设放在 `/path/to/candidate`，里面包含 `manifest.json` 和 tgz。在发布仓库执行：

```bash
npm ci --prefix scripts/npm-release --ignore-scripts --registry=https://registry.npmjs.org/
node scripts/npm-release/release.mjs check /path/to/candidate/manifest.json /path/to/candidate
node scripts/npm-release/release.mjs plan /path/to/candidate/manifest.json /path/to/candidate /path/to/plan.json
scripts/npm-release/node_modules/.bin/playwright install chromium
node scripts/npm-release/consumer.mjs /path/to/candidate/manifest.json /path/to/candidate /path/to/consumer.json candidate
```

自动验证包括：tar/入口/types/exports 检查，真实 semver 和拓扑排序，整批已发布内容/批外依赖检查；隔离安装镜像中**仅申请安装主包**，验证子包依赖确实可解析；TypeScript、浏览器打包、Chromium 中创建客户端；service 子路径导入。镜像只读，没有 publish 端点。安装期禁用包脚本。

这不代替 RTC 入会、采集、推拉流、兼容性与业务 QA。QA 需使用这一批 tgz 和 demo 完成相应测试，报告注明 manifest SHA256、SDK source SHA、Jenkins build。

### 2. 提交清单 PR，合入 main

```bash
git switch -c release/4.30.0-b200
cp /path/to/candidate/manifest.json .release/4.30.0-b200.json
git add .release/4.30.0-b200.json
git commit -m 'chore(release): prepare Web SDK 4.30.0-b200'
git push origin HEAD
gh pr create --repo AgoraIO/agora-rtc-web --base main --head YOUR-FORK-OWNER:release/4.30.0-b200 \
  --title 'chore(release): prepare Web SDK 4.30.0-b200' \
  --body 'Jenkins build 200；最终 tgz 已完成 QA；请核对清单、来源、包列表、hash 和通道。'
```

审核重点：正确 QA 报告与 build、主包/子包版本、配置摘要、tgz hash、dist-tag。只把 JSON 清单提交 git，tgz/demo 留在制品存储与 Release。历史清单保留为审计记录，不能随 config 更新批量重写。

### 3. 在主仓库创建并冻结 GitHub Release

清单 PR 合并后，同步 upstream main，再执行：

```bash
git fetch upstream main
git switch main
git merge --ff-only upstream/main
node scripts/npm-release/release.mjs stage .release/4.30.0-b200.json /path/to/candidate
```

该命令使用当前 GitHub 仓库 HEAD 创建 draft Release，tag 为 `npm-4.30.0-b200`；精确上传 `manifest.json` 和清单中列出的 tgz，不使用目录通配符。执行人需要主仓库 Release 写权限；fork 账号对主仓库仅 READ 时，由管理员/有权限的发布者执行。

在 GitHub Release 页面核对 tag 提交、全部资产与 QA 结果，然后发布 Release。必须确认该 Release 为 **immutable**，不是仅把普通 Release 标题写成“冻结”。资产上传失败时先修复 draft；不可变发布后不能替换。不要在只有一个完整候选时创建多个生产 tag。

### 4. 触发 workflow 并审批

先做一轮只读验证：

```bash
gh workflow run publish-ng.yml --repo AgoraIO/agora-rtc-web --ref main \
  -f release_id=4.30.0-b200 -F publish=false
```

通过后，发起正式运行：

```bash
gh workflow run publish-ng.yml --repo AgoraIO/agora-rtc-web --ref main \
  -f release_id=4.30.0-b200 -F publish=true
```

也可在 Actions → Publish Web SDK to npm → Run workflow 填写 release ID，正式发布时勾选 publish。不要选择 release branch 或 tag 运行。

等待 validate 通过。审批人在该 run 的 Summary 与 `validation-evidence` 中核对 manifest digest、QA、Jenkins、每包 publish/reuse 动作和原通道值，再批准 `npm-production`。

publish job 重新下载不可变制品，复核已批准清单和公网状态，依赖先发，主包最后；每包回读 integrity 和通道。postcheck 无 OIDC，独立从公网只安装主包并做类型/打包/浏览器检查。**三个 job 全通过，才能把 npm 发布记为成功**；CDN/demo 单独核验后才宣布完整 SDK 交付。

## 失败处理与重跑

| 情况 | 处理 |
| --- | --- |
| 尚未写 npm | 修正构建/配置/权限；更改制品则换 release ID，重新 QA、清单 PR、冻结和审批 |
| 子包已成功，后续失败 | 保留原 tgz/清单，修复原因后**重新发起完整 workflow**；会逐包比对已发布字节后复用 |
| 超时/连接断开 | 写入可能成功；查看 `publication-evidence/publish.json`，重新完整验证，禁止直接跳到后续包 |
| 同名同版本但字节不同 | 阻断；npm 无法覆盖版本，调查来源后制定新版本方案 |
| 401/403/429/5xx | 视为查询失败/未知，不当成版本不存在；恢复后重跑 |
| 已存在主包但目标 tag 不指向它 | 不自动改 tag；由有权限维护者核对后显式修复通道，再完整重跑 |
| `latest` 比本批版本更新 | 阻断倒退；历史补发改用经评审的其他通道，并生成新清单/候选 |
| `postcheck` 失败 | 包可能已经全部发布；不得将整次运行描述为“未发布”；调查消费者错误并决定修复版本 |
| OIDC 404/权限错误 | 检查逐包绑定、大小写、主仓库、准确 workflow 文件名、Environment、direct publish 权限和首次验证时限 |
| immutable 校验失败 | 在仓库启用 immutability 后创建新的正确候选；不能把旧普通 Release 视为已保护 |

重跑通过 `gh workflow run ...` 发起，不能仅 Re-run failed jobs 跳过消费者校验。脚本保存 publish/reuse/failed-or-uncertain 状态；它不是多包原子事务。不要自动 unpublish、批量改版本或回滚通道。

本实现刻意不自动修复 dist-tag。如果组织希望之后自动修复，需单独授权 OIDC dist-tag 并评审行为；官方当前要求 npm 11.x ≥11.21.0 或 12.x ≥12.2.0。人工应急可以执行 `npm dist-tag add <name>@<version> <tag>`，保留审批和前后值，按 npm 当时要求完成身份验证/2FA。

## 新增依赖包

1. 在 `scripts/npm-release/config.json` 的 packages 中增加**真实包名 → SDK packages 下目录名**；源代码维护者保证该 dist 能正确打包。
2. npm 管理员确认包所有权、公开初始化、repository metadata，并逐包绑定相同生产 workflow/Environment。
3. 增加真实消费者/功能 QA。合入配置后重建候选，使 manifest 的 config hash 匹配。无需修改 workflow、数组顺序或版本阈值。
4. 如果依赖由其他仓库独立发布，先在公网发布；本发布器只核对 semver 与 integrity，不代管外部包所有权。

## 证据、限制和参考

每次运行下载三组 artifacts：`validation-evidence`、`publication-evidence`、`public-consumer-evidence`。保留来源/制品 digest、消费者 lock、入口验证结果以及逐包动作。GitHub Actions artifact 的保留期限不等于长期备份。

首次实施的实际测试情况见 [验证记录](VALIDATION.md)。未在主仓库真实完成 OIDC/Environment/immutable 和生产发布前，不能把本实现称为已上线。npm/GitHub 管理员配置无法仅靠提交 workflow 文件完成。

首期显式关闭 npm provenance：SDK 实际由 Jenkins 构建，GitHub 是发布执行点。source SHA + build URL + lock hash 是追溯证据，不等于独立的构建真实性证明。CDN/demo hash 与 RTC QA 由现有 Jenkins/QA 记录负责；本工具的冻结清单覆盖 npm tgz，不额外实现 CDN 发布系统。

参考（2026-11-26 核对）：

- [原设计](https://confluence.agoralab.co/pages/viewpage.action?pageId=2058846747)
- [npm Trusted Publishing](https://docs.npmjs.com/trusted-publishers/)
- [GitHub Immutable Releases](https://docs.github.com/en/code-security/concepts/supply-chain-security/immutable-releases)
- [方案评估与简化说明](DESIGN.md)
