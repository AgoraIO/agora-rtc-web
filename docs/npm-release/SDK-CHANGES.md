# Jenkins / rtcn.js 配合修改清单

2026-11-26 只读核对了本地 rtcn.js 的 `9195ad77756db109884e21c8edd2bf53cf63a651`，以及当前 Jenkins job SCM 配置和最近成功构建 #176。本次没有向 rtcn.js 或 docker_build 提交修改，也没有调整在线 job。

## Jenkins：必改

SCM：`accs/docker_build.git`；文件 `jenkins/test/webRTC_test/webRTC_deploy/release/JenkinsFile`。

1. 在 `Build` 的 `pnpm install` 之后、还原 4.19 lockfile 之前，保存**实际有效的 lockfile**、构建命令、Node/pnpm 版本与源码完整 SHA 到 Jenkins evidence。当前 4.19 兼容逻辑会还原 lockfile，直接在构建末尾 hash 原始文件不能说明实际安装用了什么。
2. Build 完成后新增 [候选 pack stage](jenkins-stage.groovy)。发布工具从固定的 AgoraIO/agora-rtc-web 提交读取，在各实际 `packages/<dir>/dist` 中执行 `npm pack --ignore-scripts`，输出新候选目录。主包与可达子包版本不要求全部相同，但内部 semver 必须满足。
3. 为 job 增加 `RELEASE_ID`、`NPM_DIST_TAG`、`QA_REPORT_URL`、`RELEASE_TOOLS_COMMIT` 参数。后者是已审核发布工具的完整 GitHub commit SHA。`RELEASE_ID` 每候选唯一；工具 SHA 不能从内网 SDK SHA 填入。
4. 将 `NPM Integration Verification` 改成直接消费新候选的 `manifest.json` + tgz，使用 `consumer.mjs ... candidate`。删掉该 stage 现有对主包/子包的重复 pack。最终产品 QA 与浏览器/推拉流验收也使用这批候选。
5. 修改 archiveArtifacts，完整保存候选目录（含全部 tgz）、有效 lockfile、校验报告。现有 `npm-integration/*.tgz` 不包括 `npm-integration/local/*.tgz`；仅补通配符可以修归档，但不能解决重复 pack 和 QA 字节绑定。
6. `Prepare CDN Candidate And Verification Bundles` 当前无条件复制 shared/report/media，无法支持旧版仅 main 的构建。按主包实际 dependencies 和 pack manifest 收集需要的包；不存在但被实际依赖的子包要通过公网复用检查，否则失败。保留现有 demo/CDN 打包和历史分支兼容逻辑。
7. 生产迁移验收前保留现有人工发布提示。迁移后修改 `MANUAL_RELEASE_REQUIRED.md`，明确 npm 入口为 GitHub OIDC，CDN 仍走现有交付。Jenkins 不获得 npm 生产写 token。

stage 片段只演示新增部分，不能整文件覆盖现有 Pipeline。先在不发布 CDN/npm 的构建验证；随后按操作手册上传候选，进行 GitHub 只读验证和独立测试包 OIDC 验收。

## 真实历史制品中的声明问题（研发按目标分支修复）

2026-11-26 使用 npm 官方原始 tgz，仅安装主包，在固定 TypeScript 5.9.3、strict、skipLibCheck=false 下复验：

- **4.19.0**：`esm/rtc-sdk_en.esm.d.ts` 引用未声明的 `PlayerConfig`、`MUTABLE_PARAMS`、`AgoraRTCPlayer`、`VideoPlayer`、`setParameter_2`，并未正确对外导出 ESM 的 createClient 类型。请检查该分支 `packages/main/scripts/build-api.ts` 的 ESM 声明抽取/清理规则与 API extractor 配置，保留导出函数和其引用的声明。
- **4.24.3**：`@agora-js/shared` 的发行声明引用 `sdp-parser2`、`ua-parser-js` 类型但消费者缺少对应可解析声明；protocol / services 还引用 shared 未导出的 `Extmap`、`FingerPrint`、`PayloadAttribute`、`Candidate`、`Setup`。请检查 shared 的 `generateApiDeclaration` 和公开类型入口，补齐必要导出及公开类型依赖，避免泄漏未发布内部类型。
- **4.24.3 ESM**：`AgoraRTCClient implements IAgoraRTCClient` 缺少 `_isPreRender`。请在该目标分支统一导出的类/接口契约，保证声明包本身可编译。

这些是所测历史 tgz 的结果，不代表当前所有新分支仍有问题。完整原始错误保存在本次交付的测试证据中。运行时 root/esm createClient 和 service 导入通过；类型错误仍使整体消费者校验失败。修改后生成新的合法候选，不能改写 npm 已发布版本；不在 GitHub 临时 patch 声明或以 skipLibCheck 绕过。

## rtcn.js：metadata 满足条件时无需为 OIDC 改 RTC 功能

目前 `packages/main/scripts/build-api.ts` 已在 `generatePackage` 中生成 dist/package.json，移除入口中的 `dist/`，设置 repository/types/exports，并把 `workspace:*` 改成版本。`shared` 的生成器也已生成发行 metadata。迁移 OIDC 本身不要求改 RTC API 或音视频逻辑。

真实历史 tgz 复验发现：4.18.2 的主包 package.json 完全没有 repository 字段，因此历史单包模型虽已支持，该原始 tgz 仍不能直接作为本仓库的 OIDC 候选；研发需要在旧分支构建生成器中补齐 metadata，生成待发布的新版本候选并完成 QA。不要改写已经发布的 4.18.2 或覆盖同版本。

只有最终 tgz 检查不通过时，由研发修复相应生成器，重构建并重做 QA：

| 检查失败 | 需要研发调整的位置/行为 |
| --- | --- |
| main/module/types/exports 指向 `dist/...` 或不存在文件 | 对应 `packages/*/scripts/build-api.ts` 的 `generatePackage`；路径相对于 dist 包根，保证承诺的文件在 pack 中 |
| `workspace:*` / file/link/内网 URL 残留 | 对应 `updateWorkspaceVersion` / 依赖生成规则；发布后依赖必须是公网可解析 semver |
| 子包独立版本与主包不同 | 当前把 `workspace:*` 直接改成当前包版本的逻辑不再适用；读取被依赖包的真实版本。若仍 lockstep，则无需改 |
| repository 错误 | 根 package.json metadata 与 dist 生成器保留 `git+https://github.com/AgoraIO/agora-rtc-web.git` |
| full/min 文件存在但未声明入口 | 主包 `exports` 补齐 `./full` / `./min` 及对应声明；不要在 GitHub 发布时临时修改 tgz |
| tar 中混入源码/密钥/生命周期脚本 | 修构建发行文件收集；保留 SDK 公开 JS、声明与文档，不把源码目录整体 pack |

可选：在发行 metadata 加 `publishConfig.access: public`。发布器已强制 `--access public`，因此不是迁移前置。不要求 SDK 全局写死公网 registry，避免影响内网构建；不要求修改旧 `scripts/release.ts`，新流程不调用它。

新依赖可能需要增加 packages 目录、有效 dist 生成规则和 config 白名单，但无需修改发布顺序。发布顺序来自 tgz 实际 dependencies / optionalDependencies / peerDependencies 的图，发现环、自依赖、缺主包或不可解析版本会失败。
