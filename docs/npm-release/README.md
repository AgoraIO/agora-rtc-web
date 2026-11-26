# Web SDK npm OIDC 发布操作手册

更新日期：2026-11-27。适用仓库：`AgoraIO/agora-rtc-web`；发布 workflow：`.github/workflows/publish-ng.yml`。

日常流程：**Jenkins 构建并 pack → QA 人工验收 → 下载原始 tgz → 上传 GitHub Release → 查看预览清单 → 人工审批 → OIDC 发布 npm → 回读核对**。

GitHub 发布阶段不编译 SDK、不重新 npm pack、不重跑 demo/浏览器测试。CDN 和 demo 继续按原流程交付。本手册中 `4.30.0`、Jenkins build `200`、`npm-4.30.0-b200` 都是示例，必须替换成本次已验收的值。

## 1. 分工与上线前确认

| 阶段 | 谁操作 | 完成标志 |
| --- | --- | --- |
| Jenkins 构建、dist 内 pack、收集制品 | Jenkins CI 自动执行；维护人员确认 Job 使用包含修改的版本 | 构建成功，归档 npm-tgz、SHA256SUMS 和原有 demo |
| SDK/demo 验收 | QA/发布人员人工执行 | 确认具体构建通过验收 |
| 下载和上传 GitHub Release | 有正式仓库权限的发布人员 | 附件与本批候选一致：SHA256SUMS、主包及实际需要的子包 tgz |
| 启动 dry run / 真实发布 | 发布人员 | 获取对应 Actions 运行链接 |
| 检查清单、批准或拒绝 | npm-production 的 reviewer 人工执行 | 先核对同一运行的 Summary，再操作 Review deployments |
| 包依赖排序、等待 npm、发布和字节检查 | GitHub runner 自动执行 | 每个包已发布或按相同内容 reuse |
| 发布后核对与异常恢复 | 发布人员/维护者 | npm 包版本、依赖和目标 dist-tag 正确 |

上线前由仓库维护者确认：实现已通过 PR 合入正式仓库的 `main`；正式 npm 包逐个配置 Trusted Publisher；Environment reviewers 已配置；Jenkins 实际执行了带 pack/归档的 Pipeline。**本地代码完成、测试仓库演练成功，不代表正式 Job 已部署或生产 trust 已配置。**

## 2. 三种版本标识与包集合

| 标识 | 作用 | 示例 |
| --- | --- | --- |
| tgz 内 package.json 的 version | 真正提交给 npm 的包版本；同名同版本不能覆盖 | `4.30.0`、`4.30.0-100` |
| GitHub Release tag（release_tag） | 定位这一批已验收文件；不是 npm 版本 | `npm-4.30.0-b200` |
| npm dist-tag（dist_tag） | 安装通道；本实现允许 latest / hotfix / special | `latest`、`hotfix`、`special` |

正式新版本通常用 `latest`，补丁/特殊版本按实际需求用 `hotfix` 或 `special`。`4.30.0-100` 这类带 prerelease 部分的版本不能使用 `latest`。旧版补发也应使用独立通道；工具会阻止把 `latest` 倒退。修改 GitHub tag 不会修改 npm 包版本。

历史包集合供识别，实际发布以 tgz 内 metadata 和依赖关系为准：

| SDK 版本范围 | 常见包集合 |
| --- | --- |
| 4.19.0 之前 | agora-rtc-sdk-ng |
| 从 4.19.0 起 | 主包 + @agora-js/shared、@agora-js/report、@agora-js/media |
| 从 4.24.3 起 | 上述包 + @agora-js/protocol |
| 后续新增依赖 | 按第 11 节增加白名单与该包自己的 trust |

实际子包 scope 是 **`@agora-js/*`**。不要按最初描述中的简称拼包名，也不要求所有子包版本与主包相同；脚本会校验它们是否满足实际 semver 依赖并按依赖顺序处理，主包最后。

## 3. 一次性配置：GitHub 与 npm 管理员

### 3.1 GitHub 仓库

1. 将实现合入 `AgoraIO/agora-rtc-web` 的 `main`。发布人员需要创建 Release 和运行 Actions 的权限；只对 fork 有写权限不足以向正式仓库上传。
2. Settings → Environments 创建 `npm-production`，Deployment branches 只允许 `main`。
3. 配置 required reviewers，并按团队流程启用 prevent self-review、限制绕过审批。**没有 reviewer，仅有 Environment 名称不会形成审批门禁。**
4. 保护 `main`，发布代码变更先走 PR。正式发布使用 GitHub-hosted Ubuntu；不要把测试仓库的 trust 当作正式仓库配置。

不要求启用 **Release immutability**。普通 Release 允许纠正资产或 tag；这里通过 SHA256SUMS 摘要绑定本次运行的文件。upload 不把 GitHub Release 标为 Latest；GitHub Latest 与 npm latest 是两套独立标识。

### 3.2 每个 npm 包分别配置 trust

包必须已在 npm 初始化，操作账号有相应维护权限。既有生产包无需重新手动发布初始版本。新包第一次初始化由有权限的维护者完成，之后才能配置并使用其 trust。

逐包进入 npm 包的 Settings / Trusted Publisher，选择 GitHub Actions：

| 字段 | 正式环境填写值 |
| --- | --- |
| Organization or user | AgoraIO |
| Repository | agora-rtc-web |
| Workflow filename | publish-ng.yml（只填文件名，不带 .github/workflows/） |
| Environment name | npm-production |
| Allowed actions | 勾选 Allow npm publish |
| Allow npm dist-tag | 本流程不调用独立 dist-tag 管理命令，可以不勾选 |

`npm stage publish` 始终允许，但本流程使用直接 `npm publish`，因此必须允许 npm publish。`npm publish --tag special` 随新版本设置通道，不等于单独执行 `npm dist-tag add`。主包 trust 不会自动授权子包。

偏好命令行的管理员可使用固定 npm 11.21.0；下面以主包为例，**由管理员执行并完成人工登录/2FA**：

```bash
npx --yes --registry=https://registry.npmjs.org/ npm@11.21.0 whoami --registry=https://registry.npmjs.org/
npx --yes --registry=https://registry.npmjs.org/ npm@11.21.0 trust github agora-rtc-sdk-ng \
  --repository=AgoraIO/agora-rtc-web \
  --file=publish-ng.yml \
  --environment=npm-production \
  --allow-publish \
  --registry=https://registry.npmjs.org/
npx --yes --registry=https://registry.npmjs.org/ npm@11.21.0 trust list agora-rtc-sdk-ng --json --registry=https://registry.npmjs.org/
```

未登录时先用同一版本执行 `login --auth-type=web --registry=https://registry.npmjs.org/`。对每个子包替换包名后配置并回读；不要只确认命令退出成功。已有正确配置直接保留，需要替换时先核对实际 trust ID。首次验证期限按 npm 页面提示执行，过期则由维护者重建配置。

日常发布只需要本地 gh 权限，不需要发布人员本地 npm 登录，也不在 GitHub 配置 NPM_TOKEN / NODE_AUTH_TOKEN。runner 已固定 Node 22.15.0 与 npm 11.21.0。Jenkins 使用自己的 SDK 构建环境；发布既有 tgz 时关闭 provenance，不把 GitHub 的发布记录当作 Jenkins 构建证明。

## 4. Jenkins：构建、npm pack、归档与人工验收

当前构建入口：<https://jenkins-api.bj2.agoralab.co/job/QAE/job/webRTC/job/webRTC_Deploy/job/webNG_Release/>。4.19.0 之前的旧版本按父页面的旧 Job 选择；无论使用哪个 Job，都必须实际产出本节要求的候选目录。

Pipeline 维护位置是 `docker_build` 仓库 `jenkins/test/webRTC_test/webRTC_deploy/release/JenkinsFile`。本地 `websdk` 分支的 `e6f2310` 已包含打包/归档修改；在线 Job 是否采用该提交，需要维护者确认并以实际构建为准。

Build 后的 `Pack npm Release Candidates` 自动完成：

- 遍历实际存在的 `rtcn/packages/*/dist/package.json`，收集 `agora-rtc-sdk-ng` 与 `@agora-js/*`。
- **进入每个 dist 目录执行 npm pack**，不是在 SDK 源码根目录 pack：

```bash
npm pack --ignore-scripts --pack-destination "$WORKSPACE/release/agora/npm-tgz"
```

- 输出原始 tgz 与 SHA256SUMS 到 `release/agora/npm-tgz/` 并 archiveArtifacts。
- 后续 Jenkins 安装验证复用同一批 tgz，不重复 pack。CDN/demo 清理和打包保留 npm 制品。

构建成功后，从该次 Build → Artifacts 检查：

```text
release/agora/
├── npm-tgz/                     # 上传 GitHub 的目录
│   ├── agora-rtc-sdk-ng-4.30.0.tgz
│   ├── agora-js-shared-4.30.0.tgz # 文件名和版本以实际构建为准
│   ├── agora-js-report-4.30.0.tgz
│   ├── agora-js-media-4.30.0.tgz
│   ├── agora-js-protocol-4.30.0.tgz
│   └── SHA256SUMS
├── npm/                         # 展开的包，供查看
└── cdn/                         # 原有 CDN/demo 产物
test/                            # 原有验证 demo 等
```

**人工步骤：QA 使用本次 demo 和产物按现有流程验收，通过后才发布。** 构建失败但留有归档，不能据此发布。不要本地重打包或编辑 tgz 来替换已验收字节。CDN 发布仍按父页面原流程；本手册迁移的是 npm 发布。

## 5. 下载已验收产物并准备发布工具

人工打开该次 Jenkins Build → Artifacts → `release/agora/npm-tgz/`，下载整个目录（所有 tgz 加 SHA256SUMS）。例如 build 200 的目录 zip：

```text
https://jenkins-api.bj2.agoralab.co/job/QAE/job/webRTC/job/webRTC_Deploy/job/webNG_Release/200/artifact/release/agora/npm-tgz/*zip*/npm-tgz.zip
```

在包含本实现的 `agora-rtc-web` 仓库中，将目录解压为 `./npm-tgz/`。其中直接放 tgz 和 SHA256SUMS；zip 有额外目录层级时使用实际路径。不要混入其他构建的包、CDN 或 demo。

```bash
# 先进入你的 agora-rtc-web 工作目录
gh auth status
npm ci --prefix scripts/npm-release --ignore-scripts --registry=https://registry.npmjs.org/
(cd ./npm-tgz && shasum -a 256 -c SHA256SUMS)
```

尚未登录 gh 时由发布人员执行 `gh auth login`。上面的 npm ci **只安装发布助手 semver/tar 两项依赖**，不是 SDK 编译，也不是 npm 发布。首次使用或脚本依赖更新后执行即可。

macOS 使用 shasum；Linux 使用 `sha256sum -c SHA256SUMS`。所有文件应为 OK；缺文件或摘要不匹配时，重新下载同一次构建的完整目录，不手改校验文件。

## 6. 上传 GitHub Release：发布人员操作

```bash
node scripts/npm-release/release.mjs upload ./npm-tgz npm-4.30.0-b200
```

upload 会校验文件与 metadata，创建普通 GitHub Release，并一次性上传 SHA256SUMS 和目录内所有列出的 tgz。无需网页逐个上传，无 manifest，也无需每次发布提交代码或 PR。该步骤不启动 Actions，不发布 npm。

终端输出：GitHub Release URL 和 `SHA256SUMS SHA256: <64 位摘要>`。保留它们，并核对附件：

```bash
gh release view npm-4.30.0-b200 --repo AgoraIO/agora-rtc-web --json tagName,assets,url
```

附件必须与本地已验收目录一致。Release tag 必须唯一；`npm-4.30.0-b200` 仅用于定位这一批文件，tag 指向发布仓库 main，不要求 rtcn.js 有同名 tag。已存在同名 Release 时工具报错，避免覆盖；中断留下不完整 Release 时先核实，再删除/重建该测试或错误 Release，或使用新 tag。

## 7. dry run：先体验并核对审批清单

以正式版本拟发布到 latest 为例，由发布人员执行：

```bash
node scripts/npm-release/release.mjs start ./npm-tgz npm-4.30.0-b200 latest --dry-run
```

特殊版则将 latest 换为 special，补丁通道按需要换为 hotfix。**预览和真实发布必须使用同一个 Release tag、同一批文件及同一个目标通道。** start 自动计算 SHA256SUMS 摘要并传入 workflow，不需要复制填写摘要。

打开命令打印的 Actions 链接。先等待 **Review release artifacts** job 成功，再点击同一次运行的 **Summary**，向下找到 **Release review**。预览 job 没有 Environment 审批，也没有 OIDC 发布权限，审批前就能看到清单。

审批前逐项核对：

| 清单字段 | 核对内容 |
| --- | --- |
| Mode | 本次为 DRY RUN — no npm publish |
| GitHub Release | tag 和链接对应本次已验收构建 |
| npm dist-tag | latest / hotfix / special 与发布计划一致 |
| Package / Version | 实际包名与版本正确；版本从 tgz 内 package.json 读取 |
| Planned action | publish 是计划提交；reuse 是 npm 已有相同字节，无需重传 |
| Tarball / SHA256 | 可直接点 tgz 下载；摘要与已验收产物一致 |
| SHA256SUMS SHA256 | 与上传时终端输出一致 |

**审批弹窗本身不会嵌入完整清单。先看 Summary，再点 Review deployments → 勾选 npm-production → Approve and deploy。** 发布 job 的名字也会显示主包版本、目标通道与 Release tag。发现错误时 Reject，修正输入或制品后启动新运行。

dry run 仍保留审批门禁供演练，但即使批准也不执行 npm publish。运行全绿表示文件与发布计划检查通过，**不能证明 OIDC 发布授权已经通过**。清单里的 publish 是计划动作，不是已发布记录。

## 8. 真实发布：去掉 --dry-run，再次核对并审批

确认 dry run 通过、准备真实发布时，由发布人员执行：

```bash
node scripts/npm-release/release.mjs start ./npm-tgz npm-4.30.0-b200 latest
```

这是新的一次运行。先等 Review release artifacts 成功，在本次 Summary → Release review 核对：**Mode = REAL PUBLISH — after npm-production approval**；版本、Release tag、通道、摘要与 dry run 一致。

**这次点击 Approve and deploy 后会真实发布 npm。** 不要批准之前其他运行的请求。批准后 runner 重新下载同一 Release，按启动时绑定的摘要再次校验，再读取 npm 当前状态重算 publish/reuse，按依赖顺序执行。审批前的计划是当时的快照；等待审批期间 npm 状态可能变化，执行 job 的实际结果为准。

每个新包执行一次 `npm publish <原始 tgz> --tag <目标通道>`，然后每 10 秒回读一次 npm，最多 31 次，等待约 5 分钟（不含网络请求耗时）。确认版本可见、字节一致、目标通道正确，才继续后续包；主包最后。多个包可能分别经历等待，发布 job 的超时为 40 分钟。

日志出现 `Waiting for npm visibility` 表示 npm 已接受上传，但公开 registry 还未确认可用；不要因为短时间看不到 special 或版本就重新提交。npm 页面可能显示 Validating，处理方法见第 10 节。

也可人工在 Actions → Publish Web SDK to npm → Run workflow 填写：Branch=main、release_tag=本次 Release tag、dist_tag=目标通道、checksums_sha256=上传时的 SHA256SUMS SHA256、dry_run=预览勾选/真实发布取消。推荐使用 start，减少填错字段。

## 9. 发布后核对

运行成功后，人工对照实际清单回读。下面以主包和一个子包为例，版本必须使用清单中的实际值；对子包逐项执行：

```bash
npm view agora-rtc-sdk-ng@4.30.0 version dependencies dist.integrity --registry=https://registry.npmjs.org/
npm view @agora-js/shared@4.30.0 version dist.integrity --registry=https://registry.npmjs.org/
npm dist-tag ls agora-rtc-sdk-ng --registry=https://registry.npmjs.org/
npm dist-tag ls @agora-js/shared --registry=https://registry.npmjs.org/
```

版本、依赖和目标通道必须正确。本次新发布的包应有对应通道；**reuse 子包只复用已验证字节，不自动改其历史通道**。已有主包在目标通道不一致时，脚本会停止，交给维护者明确修正。

需要检查公网安装时，在临时目录只安装主包，让 npm 自动拉取其依赖；不要用本地子包掩盖 registry 的缺失。以 macOS/Linux 终端为例：

```bash
verify_dir=$(mktemp -d)
verify_cache=$(mktemp -d)
(cd "$verify_dir" && npm init -y && npm install agora-rtc-sdk-ng@4.30.0 \
  --registry=https://registry.npmjs.org/ --cache "$verify_cache" \
  --prefer-online --ignore-scripts --no-audit --no-fund && npm ls --all)
```

使用独立缓存，避免刚发布版本被旧缓存误判为不存在。浏览器 RTC 功能验收沿用 Jenkins/QA。记录本次 Jenkins build、Release URL、Actions URL、目标 dist-tag 与发布结果。

## 10. 失败、等待和恢复

### 10.1 npm 接受了上传，但版本或 special 尚不可见

如果日志出现 npm 接受上传、`+ 包名@版本`，网页却显示 Validating，或脚本提示 `npm accepted ... but visibility is not confirmed`，不能据此再次上传同名版本。

1. 保留同一批 Jenkins tgz、SHA256SUMS 和 Release tag，不重新 pack。
2. 在报错包自己的 npm 页面 → Versions 查看状态，同时回读该版本与 dist-tag。
3. 等待 npm 处理完成、registry 能查询到该版本。约 5 分钟后仍不可见，脚本会停止后续包；不会循环重发 npm publish。
4. 版本可见后，从原本地目录执行**同一个真实 start 命令**，启动使用当前 main 代码的新运行；不必重新 upload。
5. 先检查清单再审批。已发布且字节相同的包显示 reuse，只提交剩余包。若 npm 审核失败，先处理其原因，不盲目换版本重发。

子包已成功、主包未发布也是这个恢复方式。npm 多包发布不是原子事务；失败不代表已经成功的子包会回滚。

### 10.2 常见问题

| 情况 | 操作 |
| --- | --- |
| Summary 没有 Release review | 确认是新版本 workflow 启动的运行；先等 Review release artifacts 成功；若失败，先看该 job 日志，不先审批 |
| 审批页只有 Approve，看不到版本/附件 | 返回同一运行 Summary 查看 Release review；也可从清单的 Release/tgz 链接查看附件 |
| 批准后是否会直接发布 | DRY RUN 不会；REAL PUBLISH 会。以本次 Summary 的 Mode 为准 |
| 只有子包已发布 | 原文件、原 tag 重新 start；子包应 reuse，剩余包继续 publish |
| 请求超时，不确定 npm 是否收到了 | 先看 npm Versions/registry；处理尚未完成时等待，不立即重发 |
| 同名同版本内容不同 | 停止；npm 不能覆盖。研发生成新版本，经 Jenkins 与 QA 后再发 |
| 包已发布，但 dist-tag 错了 | 由 npm 维护者明确修正，见下方；不能通过重新打包或重发相同版本改通道 |
| OIDC 401/403 | 核对报错包自己的 repository/workflow/Environment、main 分支、GitHub-hosted runner、Allowed actions 和 trust 验证状态；修正后用同一批文件恢复 |
| 启动后替换了 GitHub 资产 | 摘要检查会拒绝；重新确认正确本地文件，用新 tag 上传并 start，或修复原 Release 后重新 start |
| 上传错文件、npm 尚未发布 | 重新下载已验收构建，使用新 Release tag upload/start；不要沿用错误候选 |
| GitHub tag 填错 | 修正/重建普通 Release/tag，或使用新 tag；不会改变 npm 中的版本 |

维护者确需调整通道时，人工登录并执行，例如：

```bash
npm dist-tag add agora-rtc-sdk-ng@4.30.0 special --registry=https://registry.npmjs.org/
npm dist-tag ls agora-rtc-sdk-ng --registry=https://registry.npmjs.org/
```

这是独立的通道管理操作，需要执行者有相应权限。本发布 workflow 不调用该命令；通过 OIDC 单独管理 dist-tag 时，才需要额外 Allow npm dist-tag 授权。不要把错误通道修复混入相同版本的隐式重发。

## 11. 新增子包与 rtcn.js 配合事项

新增内部子包时，由维护者依次完成：

1. 研发确认最终 dist/package.json 的 name/version、公开 repository、semver 依赖正确；不残留 workspace/file/link/内网 URL，入口指向包内文件。
2. Jenkins 在该 dist 内 pack 并归档到同一候选目录。当前会自动发现 @agora-js/*，无须按 SDK 版本号维护分支。
3. 在 npm 初始化新包，单独为它配置正式仓库的 Trusted Publisher。
4. 发布仓库 `scripts/npm-release/config.json` 的 packages 加入准确包名，走 PR 合入 main。
5. 以新的 Jenkins 候选完成 QA、上传、dry run 和真实发布。依赖顺序由 tgz 推导，不手写发布顺序，也不要求各包版本一致。

rtcn.js 只记录需要研发配合的事项，不在本次提交中修改。详细位置见 [SDK-CHANGES.md](SDK-CHANGES.md)：repository 必须匹配 `git+https://github.com/AgoraIO/agora-rtc-web.git`；历史缺字段的包需由研发修发行生成器后重新构建。不要在 GitHub 临时改 tgz metadata。

## 12. 演练结果与生产迁移边界

独立测试仓库：<https://github.com/qiaojin923/npm-oidc-release-lab>。测试主包 qiaojin-oidc-lab-sdk、子包 @qiaojin/oidc-lab-core 均已通过真实 OIDC 发布 0.0.1；special 已回读确认。

- 首次运行 45859020883：子包被 npm 接受后进入 Validating，旧等待时间过短，主包尚未提交。
- 恢复运行 45860757797：复用相同字节子包，发布主包，并等待 npm 处理后成功；已验证公网仅安装主包时自动解析子包。
- 审批前清单与等待机制在测试仓库实现后同步至正式实现。0.0.2 候选构建 45866332194 已下载校验；用户已熟悉新流程。
- 错误 repository/workflow/Environment 的故意身份拒绝测试、主动 Reject 和资产替换测试，不应凭“流程熟悉”宣称已全部通过。需要时只在独立仓库/测试包继续，使用尚未发布的新版本，不能用 reuse 验证身份拒绝。

正式项目本地验证记录见 [VALIDATION.md](VALIDATION.md)。正式仓库合入、线上 Jenkins pack/归档、生产逐包 trust 和首次真实生产发布，仍需要对应负责人实际完成并记录。

参考：[npm Trusted Publishing](https://docs.npmjs.com/trusted-publishers/)、[GitHub deployment approvals](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-deployments/reviewing-deployments)、[原设计](https://confluence.agoralab.co/pages/viewpage.action?pageId=2058846747)。
