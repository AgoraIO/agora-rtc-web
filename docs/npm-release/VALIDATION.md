# 验证记录与上线状态

更新日期：2026-11-27。本次在正式项目同步独立演练中验证过的 npm 可见性等待和审批前预览清单。

## 正式项目本地验证

```bash
npm test --prefix scripts/npm-release
```

**14/14 通过**。Node 语法检查、两个 workflow YAML 解析、preview/审批/OIDC 权限边界与通道一致性检查、git diff --check 均通过。包含原有单/四/五/六包与独立版本、依赖排序、SHA256、路径/metadata、registry 错误、同版本冲突/复用、latest 防倒退、部分成功恢复测试，以及以下新增覆盖：

- 子包直到第 8 次轮询才可见，依赖它的主包此前不能提交；等待间隔为 10 秒。
- npm 接受但仍不可见时，停止后续包，不重复提交已接受的包。
- 审批清单包含真实/预览模式、版本、通道、Release/tgz 链接、SHA256SUMS 与 tgz 摘要。
- 在隔离 gh/npm/registry 替身下实际执行 review CLI：无 OIDC 凭据也能预览真实发布意图，导出 tgz 内主包版本，且不调用 npm；真实 run 无 OIDC 时拒绝。

测试中的 publish 使用隔离替身，不向生产 npm 或 GitHub 写入。workflow 的 preview 无 Environment/OIDC 权限，publish 依赖 preview 并经过 npm-production；发布 job 超时调整至 40 分钟，容纳多个包依次等待。通道与已有 workflow 改动对齐为 latest / hotfix / special。

## Jenkins 与历史制品复核

Jenkins 的 `docker_build` 分支提交 `e6f2310` 已包含 dist 内 npm pack、release/agora/npm-tgz 归档和同批 tgz 安装验证。此前通过单/四/五/六包 pack fixture 验证；本次仅核对代码，不修改其余本地文件，也未触发正式 Jenkins。

历史真实 tgz：4.19.0 四包、4.24.3 五包可识别并按依赖排序，主包最后；4.18.2 原始 tgz 缺 repository，被严格校验拒绝。旧分支补发需研发修 metadata 并重新构建，不能覆盖 npm 已有版本。

## 独立测试仓库已有证据

测试仓库：`qiaojin923/npm-oidc-release-lab`，测试包 qiaojin-oidc-lab-sdk 与 @qiaojin/oidc-lab-core。

- 45859020883：子包被 npm 接受后处于 Validating，旧等待时间过短，主包未提交。
- 45860757797：修正后复用子包、发布主包；主包等待约 4 分 20 秒后可见，运行成功。两包 0.0.1 与原 tgz 字节一致，special 均回读确认，并验证仅安装主包即可拉取子包。
- 测试仓库审批前清单通过本地测试及只读 review 集成验证；0.0.2 构建 45866332194 已下载、校验并交接，用户已熟悉新流程。
- 故意错误身份、主动 Reject、资产替换等负向演练不在本记录中标记完成。

## 尚待实际完成的生产事项

- 代码通过 PR 合入 AgoraIO/agora-rtc-web 的 main。
- 正式仓库 Environment reviewers、分支限制和每个生产 npm 包的 trust 配置。
- 线上 Jenkins 确实运行包含 e6f2310 的 Pipeline 并归档完整候选。
- 正式仓库新 workflow 的实际运行、人工审批和首次生产 npm 发布。

本次没有触发生产 Jenkins、创建生产 Release、运行生产 publish 或修改 npm trust/dist-tag。rtcn.js 保持只读。Confluence 手册是本次交付目标，发布结果以最终交付的页面链接为准。
