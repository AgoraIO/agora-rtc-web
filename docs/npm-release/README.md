# Web SDK npm 发布操作手册

流程只有：**Jenkins 构建、pack 和验证 → 人工验收 → 上传现成 tgz → GitHub OIDC publish**。GitHub 不编译 SDK、不重新 pack、不重跑 demo/类型/浏览器测试。CDN/demo 继续按现有流程交付。

## 1. 一次性配置（仓库和 npm 管理员）

1. 将本实现合入 `AgoraIO/agora-rtc-web` 的 `main`。发布人员需有该仓库创建 Release、运行 Actions 的权限；仅能写 fork 的账号不能上传到主仓库。
2. GitHub → Settings → Environments 创建 `npm-production`，Deployment branches 只允许 `main`。建议设置 required reviewers 和 prevent self-review，按组织可用设置禁用绕过审批。没有 reviewer 的同名 Environment 不会提供人工审批；不需要审批时可只设分支限制。
3. npm 上为**每一个待发布包**设置 Trusted Publisher：Provider = GitHub Actions；Organization/user = `AgoraIO`；Repository = `agora-rtc-web`；Workflow filename = `publish-ng.yml`（仅文件名）；Environment = `npm-production`；Allowed actions 必须勾选 **Allow npm publish**（只允许 npm stage publish 不够）。不需要配置 `NPM_TOKEN`。
4. 保护 GitHub `main`，发布脚本改动先通过 PR。先完成下文测试仓库演练，再配置生产包。新 Trusted Publisher 配置须在 **2 天内首次成功发布**，过期则删除配置并重新创建。

**不要求启用 Release immutability**。它会锁住已发布 Release 的资产及关联 Git tag，确实会妨碍手动纠错。此流程使用普通 Release 存放制品，不标记为 Latest。上传命令会自动上传齐所有文件并发布 GitHub Release，不增加草稿确认步骤。

运行环境已在 workflow 配好：GitHub-hosted Ubuntu、Node 22.15.0、npm 11.21.0。SDK 在 Jenkins 继续使用它自己的构建环境。发布 Jenkins 预构建 tgz 时关闭 npm provenance，避免把 GitHub 发布记录当作 SDK 构建证明。

## 2. Jenkins 打包、收集和人工验收

Job：<https://jenkins-api.bj2.agoralab.co/job/QAE/job/webRTC/job/webRTC_Deploy/job/webNG_Release/>。

Jenkins 维护文件是 `docker_build` 仓库的 `jenkins/test/webRTC_test/webRTC_deploy/release/JenkinsFile`。本地 `websdk` 分支提交 `e6f2310` 已包含打包与归档修改；该事实不代表在线 Job 已经运行此提交。

新增的 `Pack npm Release Candidates` 在 Build 后完成：

- 遍历实际存在的 `rtcn/packages/*/dist/package.json`，只收集 `agora-rtc-sdk-ng` 和 `@agora-js/*`。
- **进入每个 dist 目录执行** `npm pack --ignore-scripts --pack-destination "$WORKSPACE/release/agora/npm-tgz"`，不在 SDK 源码根目录 pack。
- 将本次 tgz 和 `SHA256SUMS` 归档；Jenkins 安装验证复用同一批 tgz，不重复 pack。

构建结束后，在该次 Build → Artifacts 中检查以下目录：

```text
release/agora/
├── npm-tgz/                    ← 上传 GitHub 的唯一目录
│   ├── agora-rtc-sdk-ng-4.30.0.tgz
│   ├── agora-js-shared-4.30.0.tgz     # 以该次实际产物为准
│   ├── agora-js-report-4.30.0.tgz
│   ├── agora-js-media-4.30.0.tgz
│   ├── agora-js-protocol-4.30.0.tgz
│   └── SHA256SUMS
├── npm/<main、shared 等>/       ← 展开的 npm 包，方便查看，不上传
└── cdn/                        ← CDN 文件和标准 demo zip，沿用现有交付
test/                           ← Full/min/webpack 验证 demo 等
```

单包老版本可能只有主包；较新版本有多个子包。实际 scope 是 **`@agora-js/shared`、`@agora-js/report`、`@agora-js/media`、`@agora-js/protocol`**。无需按 SDK 版本号手选包，发布器会读取 tgz 中的依赖。

QA 在 Jenkins 成功后，用本次 demo 和产物按现有流程验收。**验收通过才进入下面的发布步骤**。失败构建即使已有归档，也不能据此发布。不要在本地重新打包来替换已验收 tgz。

## 3. 下载已经验收的 tgz

打开对应 Build → Artifacts → `release/agora/npm-tgz/`，下载该目录的所有文件（Jenkins 页面可用“所有文件打包下载”/zip）。也可访问该构建的目录 zip 地址，下面的 `200` 只是示例：

```text
https://jenkins-api.bj2.agoralab.co/job/QAE/job/webRTC/job/webRTC_Deploy/job/webNG_Release/200/artifact/release/agora/npm-tgz/*zip*/npm-tgz.zip
```

解压到本地。下文假定在仓库目录下得到了 `./npm-tgz/`，其中直接包含 `*.tgz` 和 `SHA256SUMS`；若 zip 多了一层目录，使用实际路径。不要把 CDN、demo 或其他构建的包混进这个目录。

在 macOS 可先校验下载是否完整（上传工具也会自动执行相同检查）：

```bash
(cd ./npm-tgz && shasum -a 256 -c SHA256SUMS)
```

Linux 使用 `sha256sum -c SHA256SUMS`。所有条目都应显示 `OK`。如果出现缺文件/校验失败，重新下载同一次构建的完整目录。

## 4. 批量上传 GitHub（第一条命令）

进入包含本实现的 `agora-rtc-web` 工作目录；首次使用或脚本依赖更新后执行：

```bash
gh auth login
npm ci --prefix scripts/npm-release --ignore-scripts --registry=https://registry.npmjs.org/
```

这条 `npm ci` **仅安装发布助手的两个依赖 semver/tar**，不构建 SDK，也不是重新执行 Jenkins。已登录 gh 可跳过登录。

以 `4.30.0`、Jenkins build `200` 为例（全部是示例值）：

```bash
node scripts/npm-release/release.mjs upload ./npm-tgz npm-4.30.0-b200
```

命令自动校验文件、读取包名/版本/依赖，然后创建普通 GitHub Release（不标为 Latest），一次上传 `SHA256SUMS` 和该目录的全部 tgz。不需要手动逐个上传，不需要 manifest，不需要每次修改仓库或创建发布 PR。输出 Release 地址与校验文件摘要。

`npm-4.30.0-b200` 是本 GitHub 仓库的 Release tag 名，用来区分同版本的不同构建；它不决定 npm 版本，不要求内网 SDK 有同名 tag。可以换为其他唯一名称。仓库保持默认允许修改 Release/tag 的设置即可。创建 Release 时指定 main 为目标，不会把内网 rtcn.js 的 tag 推上来。

已存在同名 Release 时，工具会报错，避免覆盖原资产。上传中断可能留下不完整草稿，此时删除该草稿后重试，或使用新 tag。纠错方式见第 6 节。

## 5. OIDC 发布（第二条命令）

上传成功、人工验收已完成后执行：

```bash
node scripts/npm-release/release.mjs start ./npm-tgz npm-4.30.0-b200 latest
```

这条命令会**发起真实 npm 发布**。它自动填写并启动 `main` 分支的 `publish-ng.yml`；不需要自己复制 SHA256 摘要。发布人员的 gh 登录只用于上传与启动 Actions，npm 使用 runner 的 OIDC 身份。

若想先查看发布计划，最后加 `--dry-run`，确认后去掉该选项再执行：

```bash
node scripts/npm-release/release.mjs start ./npm-tgz npm-4.30.0-b200 next --dry-run
```

前往 GitHub → Actions → **Publish Web SDK to npm**：

1. 如配置了 Environment reviewers，等待管理员在运行页点击 Review deployments 批准。单 job 设计下 dry run 也经过此审批。
2. 查看包列表与 `publish` / `reuse` 计划。工具只检查文件摘要、包身份、依赖顺序和 npm 已有版本状态，这些是发布前的快速检查，不是 SDK CI。
3. 新子包先发，主包最后；成功后会回读 npm 的版本和 dist-tag。运行全绿后，本次 npm 发布完成。

也可在 Actions 页面手动 Run workflow：Branch 选 `main`；`release_tag` 填上一步名称；`dist_tag` 填目标通道；`checksums_sha256` 填 upload 命令输出的 **SHA256SUMS SHA256**；实际发布时取消 `dry_run`。摘要用来发现上传资产在启动后被替换，**不是 manifest，也不需要保存进 Git**。

| 标识 | 决定什么 | 示例 |
| --- | --- | --- |
| tgz 的 package.json version | npm 中不可覆盖的包版本 | `4.30.0` |
| npm dist-tag | 安装通道，可由维护者调整 | `latest` / `next` / `hotfix` |
| GitHub Release tag | GitHub 上存放本批文件的位置，可按仓库规则修改 | `npm-4.30.0-b200` |

`latest` 用于正式版本；`4.24.8-1` 等带 prerelease 部分的版本用 `next` 或 `hotfix`。补发旧正式版本时也使用独立通道，工具会阻止把 `latest` 倒退。**dry run 只验证发布计划，不发送 npm publish，不能证明 OIDC 已配置成功**。

## 6. 发错或中途失败怎么处理

| 情况 | 操作 |
| --- | --- |
| 上传错文件，npm 尚未发布 | 从已验收 Jenkins 构建重新下载；使用新的 Release tag 重新 upload/start 最直接。也可以在 GitHub 编辑/删除普通 Release 及其资产后重建同名 Release，再从正确本地目录 start；不要求 immutable |
| GitHub tag 名称填错 | 修改/重建普通 Release/tag 或使用新 tag；npm 包版本仍只由 tgz 决定，改 GitHub tag 不会改 npm |
| 子包已发布、主包未发布 | 保持同一批 Jenkins 文件，再执行同一个 start；已存在且内容相同的版本显示 reuse，继续发布其余包 |
| 请求超时，不确定 npm 是否收到了 | 先查看 npm/Actions 结果，再用相同文件重试；工具重新查 registry，网络/403/5xx 不会当作“版本不存在” |
| npm 同名同版本已存在但内容不同 | 停止。不能覆盖；研发生成新版本，经 Jenkins 和 QA 后重新发布 |
| 版本已发布，但 npm 通道错了 | npm 维护者登录后明确执行 `npm dist-tag add 包名@版本 通道 --registry=https://registry.npmjs.org/`，核对通道指向。发布器不通过重发相同版本隐式修正通道；复用子包也不会改其原通道 |
| OIDC 401/403 | 核对报错包自己的 repo/workflow/environment、main 分支、GitHub-hosted runner、首次验证是否过期；修配置后重试。不要加生产 NPM_TOKEN 绕过 |
| 启动后替换了 GitHub 资产 | 本次校验失败；用人工确认过的本地目录重新 upload/start。不要对着新资产沿用旧运行盲目重试 |

npm 多包发布不是原子事务。外部维护者仍可能同时发布或改 npm 通道；此时先核实再恢复。无论 GitHub tag 能否修改，**已经发布的 npm 同名同版本都不能覆盖**。

## 7. 独立测试仓库和测试包演练（生产迁移前必须完成）

准备一个独立公开测试仓库，例如 `YOUR-ORG/websdk-npm-oidc-test`，把本实现提交到它的 `main`。准备自己有发布权限的两个公开 npm 测试包，例：`@YOUR-SCOPE/oidc-sdk-test` 和 `@YOUR-SCOPE/oidc-dep-test`；以下名称都替换为自己实际的名称。

测试包最小 metadata 示例（分别保存到 `rehearsal/sdk/package.json` 和 `rehearsal/dep/package.json`，先用 `0.0.0` 初始化，再改为下列 `0.0.1`；将 scope 和仓库改成真实值）：

```json
{"name":"@your-scope/oidc-sdk-test","version":"0.0.1","main":"index.js","repository":{"type":"git","url":"git+https://github.com/YOUR-ORG/websdk-npm-oidc-test.git"},"dependencies":{"@your-scope/oidc-dep-test":"0.0.1"}}
```

```json
{"name":"@your-scope/oidc-dep-test","version":"0.0.1","main":"index.js","repository":{"type":"git","url":"git+https://github.com/YOUR-ORG/websdk-npm-oidc-test.git"}}
```

两个 `index.js` 都可以写 `module.exports = {};`。测试主包初始化 `0.0.0` 时，将其子包依赖也设为 `0.0.0`，先初始化子包。

1. 在测试仓库 `config.json` 把 repository 改为测试仓库；main 改为测试主包名；packages 改为这两个测试包名。registry 保持公网。测试包名不要沿用生产包名。workflow 文件名和 Environment 继续使用 `publish-ng.yml` / `npm-production`，因此无需改发布代码。
2. 用个人已授权的 npm 登录先各发布一次 `0.0.0`（使用 `--tag next --access public`），确保包已存在。只对测试包执行；测试目录 package.json 设置正确 name、公开 repository、version 和 `main: index.js`，创建简单 `index.js`，scoped 包用 `--access public`。然后在每个测试包设置绑定**测试仓库**的 Trusted Publisher，并勾选 Allow npm publish。
3. 新建测试候选 `0.0.1`：测试主包 `dependencies` 精确依赖测试子包 `0.0.1`；两者的 repository 都指向测试仓库。下面给出打包目录和命令，不使用 rtcn.js 或生产包：

   ```text
   rehearsal/
     sdk/package.json     # name=测试主包；version=0.0.1；dependencies={测试子包:0.0.1}
     sdk/index.js
     dep/package.json     # name=测试子包；version=0.0.1
     dep/index.js
     npm-tgz/
   ```

   ```bash
   mkdir -p rehearsal/npm-tgz
   (cd rehearsal/dep && npm pack --ignore-scripts --pack-destination ../npm-tgz)
   (cd rehearsal/sdk && npm pack --ignore-scripts --pack-destination ../npm-tgz)
   (cd rehearsal/npm-tgz && shasum -a 256 ./*.tgz > SHA256SUMS)
   node scripts/npm-release/release.mjs upload ./rehearsal/npm-tgz oidc-test-001
   node scripts/npm-release/release.mjs start ./rehearsal/npm-tgz oidc-test-001 next --dry-run
   node scripts/npm-release/release.mjs start ./rehearsal/npm-tgz oidc-test-001 next
   ```

4. 测试 Environment 设置另一个 reviewer。确认审批前 npm 没有新版本，批准后两个包按顺序发布。首次成功发布在两天时限内完成。
5. **允许/拒绝验证**：对新的 `0.0.2` 测试候选，先将子包的 npm trust 故意绑定错误 repository，启动真实发布，应在子包发布时拒绝且主包未发；分别改为错误 workflow filename、错误 Environment 重复此验证。每次修复配置并确认 dry run 无法代替这个负向发布测试。负向验证只用测试包。
6. **失败恢复验证**：子包 trust 恢复正确，主包 trust 保持错误。重新 start，子包成功、主包失败；修正主包 trust，再以相同文件 start，应显示子包 reuse、主包 publish。全部成功后再次 start，均 reuse 且不再写入。还可在审批等待时替换 tgz，确认校验拒绝。
7. 保存这些 Actions 运行链接和 npm 版本记录；通过后才为真实包配置 trust 并迁移生产。新增生产子包也要单独初始化、配置 trust，并把包名加到 packages 白名单；依赖顺序由包内容推导，无需新增顺序脚本。

## 8. 维护边界和参考

rtcn.js 无提交权限，本次只在 [SDK-CHANGES.md](SDK-CHANGES.md) 写清它需要保证的发行 metadata；没有修改源码。Jenkins 现有打包阶段已单独落在 docker_build，本仓库不再复制一份容易过期的 Groovy 示例。

本地验证与尚未上线的事项见 [VALIDATION.md](VALIDATION.md)；设计取舍见 [DESIGN.md](DESIGN.md)。本次简化取代旧版的 manifest PR、强制 immutable、手工 source/build/QA 环境变量和消费者多 job 流程。

参考（2026-11-26 核对）：[npm Trusted Publishing](https://docs.npmjs.com/trusted-publishers/)、[GitHub Immutable Releases](https://docs.github.com/en/code-security/concepts/supply-chain-security/immutable-releases)、[原方案](https://confluence.agoralab.co/pages/viewpage.action?pageId=2058846747)。
