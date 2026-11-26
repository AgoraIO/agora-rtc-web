# 方案评估与简化结果

保留原设计的 Jenkins 构建隔离、最终 tgz 交接、npm OIDC 和可选 Environment 审批。将发布边界明确放在人工验收之后；GitHub 仅接收并发布既有制品。

| 旧实现 | 简化后的实现 |
| --- | --- |
| 每批生成 manifest、提交 PR、与 GitHub tag 绑定 | 无 manifest、无每次发布的仓库提交；直接读取 Jenkins 的 tgz 和 SHA256SUMS |
| 手工填写源码 SHA、Node/pnpm、lock、QA URL | 删除这些发布输入；构建和验收记录留在 Jenkins/QA |
| 要求 immutable Release | 普通可修改的 Release（不标为 Latest）；支持手动纠错 |
| 手动按清单逐文件上传 | upload 命令校验本地目录并批量上传 |
| validate → approval → publish → consumer postcheck | 只读 preview 展示审批清单 → Environment 审批 → publish；只做制品/registry 检查，无 SDK 编译、pack 或消费者测试 |
| 完整 TypeScript/bundle/Playwright 发布工具链 | 发布助手只依赖 semver 和 tar |
| 固定版本区间推断子包 | tgz 中的实际依赖 + 小型包名白名单；对子包独立版本做 semver 检查 |

SHA256SUMS 是 Jenkins 已生成的标准文件，列出 tgz 的文件名和 SHA256。upload/start 验证它并自动把其摘要作为 workflow 输入。允许修改 GitHub Release，但修改后必须从重新确认的本地文件启动新运行；审批后下载的字节与启动时的字节不符就失败。它不是构建签名，也无法替代 Jenkins 访问控制和人工验收。

只保留与发布直接相关的检查：包名/版本/repository、SHA256、发布 registry、依赖顺序、已有版本内容、latest 防倒退。类型/入口/API/RTC/demo 检查由现有 Jenkins/QA 承担，不因迁移 OIDC 增加新的发布测试体系。

同名同版本若 npm 内容相同则复用，内容不同则停止。多包没有原子发布；子包先发、主包最后，同文件重试恢复。外部维护者仍能改 npm 通道，发布失败需核实后重试。复用子包不修改其通道；已有主包通道不一致时明确交给维护者修正。

每个新包被 npm 接受后，每 10 秒回读，最多 31 次，约等 5 分钟；确认版本、字节和目标通道后再处理依赖它的包。超时停止后续发布并提示检查 npm Validating；不循环重发。publish job 留出 40 分钟供多个包依次等待。超时后先等 npm 处理完成，再用原文件、原 tag 启动新运行恢复。

preview 不绑定 Environment，不授予 id-token:write；review 命令即使收到真实发布意图也强制只读。审批前 Summary 展示模式、Release tag、npm dist-tag、实际包版本、计划动作和 tgz/摘要链接。publish 依赖 preview，经过 npm-production 审批后重新下载校验并重算计划，只有它拥有 OIDC 权限。dry run 也保留审批供演练，不执行 npm publish。

生产脚本 config 固定指向 AgoraIO/agora-rtc-web 与公网 registry；没有运行时切换生产包的开关。测试演练复制实现到独立仓库并审核自己的 config 与测试包 metadata。发布入口要求配置仓库的 main、workflow_dispatch；npm 逐包 trust 决定 OIDC 发布授权。

Release 只存储公开 SDK 包，不存放源码、内网凭据、QA 私密报告或构建环境。GitHub tag 指向发布仓库的 main；SDK 源码及其构建来源沿用 Jenkins 记录。SDK 在 Jenkins 构建，因此关闭发布阶段 provenance，不宣称 GitHub 完成 SDK 构建。
