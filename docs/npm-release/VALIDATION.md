# 验证记录

日期：2026-11-26。平台：本地 macOS，Node v22.15.0、npm 10.9.2。生产 workflow 固定 npm 11.21.0；真实 OIDC 发布尚未执行。

## 工具测试

命令：

```bash
npm ci --prefix scripts/npm-release --ignore-scripts --registry=https://registry.npmjs.org/
SMOKE_BROWSER_CHANNEL=chrome npm test --prefix scripts/npm-release
```

**11/11 通过**。测试使用独立临时 Git 仓库、真实 npm pack/tar、HTTP 隔离 registry、真实 npm install、TypeScript、esbuild、浏览器。包含：

- 单包、四包、五包、独立子包版本；主包最后与依赖 semver。
- 缺文件/metadata、私有 registry/workspace 依赖、生命周期脚本、敏感文件、未批准新包。
- 环、自依赖、重复/无关包、零主包、manifest 元数据覆盖、制品篡改、输入路径和 prerelease/latest。
- 明确不存在的版本、403/503/未知状态、已发布 integrity 相同/冲突、外部依赖范围、latest 倒退和主包通道错误。
- 仅申请安装主包，由声明解析子包；完整 fixture 的类型/打包/浏览器创建客户端通过。
- 部分发布后的 plan 恢复：确认子包字节后 reuse，主包继续 planned publish；子包字节冲突则阻断。

浏览器使用本机 Chrome **158.0.8127.88**，由 Playwright 1.56.1 驱动；本机 Playwright Chromium 下载因网络超时未完成，所以未伪称使用了其 bundled Chromium。GitHub workflow 会安装 Playwright 固定版本的 Chromium；该 CI 运行仍待合入后验证。`SMOKE_BROWSER_CHANNEL=chrome` 只是无 OIDC 消费者验证的本地选择，不会绕过任何类型/打包/运行时检查。

脚本 Node 语法检查、两个 workflow YAML 解析和 git diff --check 通过。actionlint 二进制下载因网络超时未完成，因此没有宣称 actionlint 检查通过。

## 官方真实 tgz 复验

从 npm 官方 registry 下载原始已发布包，保持原始字节不变。fixture manifest 中 source/build/QA 均明确标为测试占位信息，**不是 Jenkins 构建来源证据，也未提交到 `.release/`**。

| 样本 | 包检查 | 仅主包安装 | bundle/browser | 严格 TypeScript | 整体验收 |
| --- | --- | --- | --- | --- | --- |
| 4.18.2 单包 | 阻断：缺 repository | 未继续 | 未继续 | 未继续 | 未通过 |
| 4.19.0 四包 | 4/4 通过 | 通过 | root/esm createClient 通过 | ESM 声明引用未定义类型/导出 | 未通过 |
| 4.24.3 五包 | 5/5 通过 | 通过 | root/esm createClient + 9 个 service 导入通过 | shared/protocol/ESM 类型错误 | 未通过 |

TypeScript 为 5.9.3，strict=true、skipLibCheck=false。具体类型失败和研发修改位置见 [SDK-CHANGES.md](SDK-CHANGES.md)。这说明发布前校验可以检出真实发行声明缺陷，不代表当前目标分支必然有同样问题；应对将来真实候选重新验证。

## 只读环境核对

- Confluence 初步方案：pageId 2058846747，version 10，更新于 2026-11-19；已读取。
- GitHub：主仓库公开、main；本地初始 HEAD 与 upstream main 同为 `2588e65b9d540eb92d3119f616b8f13951678131`。本地 origin 为用户 fork，upstream 为 AgoraIO；当前账号对 upstream 为 READ。
- Jenkins：job 配置指向 docker_build 的 release/JenkinsFile；最近成功构建 #176，归档中已有主包 tgz 与 demo/CDN，未统一归档本地子包 tgz。
- rtcn.js：只读核对 `9195ad77756db109884e21c8edd2bf53cf63a651`，当前生成器已处理入口/dist metadata；未写入源码。
- npm 官方当前文档核对：Node/npm 门槛、GitHub-hosted runner、repository 匹配、逐包 Trusted Publisher、首次发布时限、provenance 显式关闭与 dist-tag 独立权限。
- GitHub immutable API 字段已用公开不可变 Release 只读确认；本实现检查实际 `immutable: true`，不依赖名称或备注。

## 上线前尚需执行

1. 合入后在 GitHub 跑 PR CI，验证 GitHub runner 的完整依赖/Chromium 安装。
2. CI 维护者落实 Jenkins stage、单次 pack、有效 lock 与完整 tgz 归档；QA 用真实候选验收。
3. GitHub/npm 管理员完成 Environment reviewers、main 保护、Release immutability、逐包 OIDC 配置。
4. 独立测试包/测试仓库验证真实 OIDC 成功及错误 repo/workflow/environment 拒绝，验证中途失败与恢复。生产代码无 registry/repo 切换参数，测试仓库需另行审核自己的配置及 metadata。
5. 按计划发布真实版本并回读 npm/消费者，确认 CDN/demo 交付，收口旧 token。

本次没有触发 Jenkins 构建，没有执行真实 npm publish/dist-tag/stage，没有创建生产 Release，没有修改管理员设置，也没有更新原 Confluence 页。脚本和本地验证已交付；线上接入与生产验收不能由本地 fixture 测试代替。
