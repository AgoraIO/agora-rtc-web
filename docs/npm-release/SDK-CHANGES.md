# Jenkins 与 rtcn.js 配合事项

## Jenkins：代码已增加 pack 和归档

实际修改位于 docker_build 仓库：`jenkins/test/webRTC_test/webRTC_deploy/release/JenkinsFile`，本地 websdk 分支提交 `e6f2310`（`update release job --- add npm`）。本次核对时目标文件没有未提交改动；在线是否生效需确认 Job 使用该提交并执行一次实际构建。

- Build 后有 `Pack npm Release Candidates`：遍历实际 `packages/*/dist/package.json`，在 dist 内单次 npm pack，输出 `release/agora/npm-tgz/*.tgz` 和 SHA256SUMS。
- archiveArtifacts 已收集 `release/agora/npm/**/*,release/agora/npm-tgz/*`。
- CDN 准备阶段只清理自己的 cdn/test 目录，保留 npm 产物。
- `NPM Integration Verification` 已安装同批归档 tgz 并验证摘要，不再重复 pack。

不需要额外的 RELEASE_ID、RELEASE_TOOLS_COMMIT、QA_REPORT_URL 参数，也不需要将本仓库工具加入 Jenkins。确认旧 token 发布入口已停用，验收后改用本手册 upload/start。CDN/demo 沿用原流程。

## rtcn.js：只读，不修改源码

只读核对的本地版本为 `9195ad77756db109884e21c8edd2bf53cf63a651`（release/4.24.8）。迁移 OIDC 本身不要求更改 RTC 功能。研发只需确认最终 dist/package.json 和 tgz 满足以下条件；不满足时由有权限的人修构建生成器，再构建、验收新候选。

| 条件 | 对应修改位置或动作 |
| --- | --- |
| name/version 正确，非 private | `packages/*/scripts/build-api.ts` 的发行 package.json 生成逻辑 |
| repository 指向 `git+https://github.com/AgoraIO/agora-rtc-web.git` | 根 metadata 及 dist 生成器保留该字段；历史 4.18.2 原始包缺少它，旧分支补发前需要补齐 |
| dependencies 不残留 workspace/file/link/内网 URL | 生成 dist 时转换为合法公网 semver；现有生成器已转换 workspace:* |
| 子包独立版本与主包不同 | 依赖转换读取被依赖包的真实版本；若始终 lockstep 无需改当前规则 |
| main/module/types/exports 指向包内实际文件 | 各包发行生成器保证路径相对于 dist 根；不要在 GitHub 临时修改 tgz |
| publishConfig 不指定内网 registry、私有访问或冲突 tag | 删除冲突字段或设公网/public；发布器已强制公网和 public |

新增内部包时：Jenkins 会发现 `@agora-js/*` dist；发布仓库 config.json 加包名，并在 npm 初始化该包、配置它自己的 Trusted Publisher。无需按版本号改分支判断或手写发布顺序。

此前用历史公网 tgz 做严格 TypeScript 检查发现 4.19.0 的 ESM 声明缺失类型，4.24.3 的 shared/protocol/ESM 声明存在缺失导出/外部类型等问题。这些是历史样本结果，不代表目标分支仍有问题，也不是本次 OIDC 迁移新增的发布门槛。相关发行质量继续由现有 Jenkins/QA 处理，不在发布 workflow 内增加重复消费者测试。
