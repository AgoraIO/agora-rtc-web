# 验证记录与上线状态

日期：2026-11-26。此记录针对简化后的实现，取代上一版 manifest/consumer 流程的验证结论。

## 本地验证

执行：

```bash
npm ci --prefix scripts/npm-release --ignore-scripts --registry=https://registry.npmjs.org/
npm test --prefix scripts/npm-release
```

**10/10 通过**。脚本 Node 语法检查、两个 workflow YAML 解析和 git diff --check 通过。

测试覆盖真实 tgz 读取、单包/多包和独立版本、依赖排序、SHA256 文件完整性、资产替换、白名单/metadata/路径输入、registry 错误、同版本复用/冲突、latest 防倒退、部分发布失败重试，以及 upload/start 的完整 gh 参数。测试中发布写操作使用隔离替身，不向 npm 或 GitHub 写入。

Jenkins 打包代码此前已经通过单/四/五/六包真实 npm pack fixture 验证，覆盖清理旧产物、忽略 prepack hook、跳过非 SDK 包和摘要检查。该阶段与本次简化兼容；没有改动 docker_build 的其他本地文件。

## 历史真实 tgz 的 metadata/顺序复核

- 4.19.0 四包、4.24.3 五包均通过包识别和依赖排序，主包最后。此次没有重新运行 SDK 消费者测试。
- 4.18.2 原始 tgz 缺 repository 字段，被明确阻止；旧分支补发前由研发补齐 metadata，不能覆盖 npm 既有版本。

## 尚未执行的线上验证

- GitHub runner 的 workflow 实际执行、Environment 审批。
- 独立测试仓库/测试包的真实 OIDC 允许、拒绝和中途失败恢复（详见操作手册第 7 节）。
- 在线 Jenkins 使用 `e6f2310` 或包含它的提交，构建并归档完整 npm-tgz。
- 生产包 Trusted Publisher 配置和真实版本发布。

没有触发 Jenkins，没有执行生产 npm publish/dist-tag，没有创建 GitHub Release、启动 Actions、修改线上设置或更新 Confluence。rtcn.js 保持只读。
