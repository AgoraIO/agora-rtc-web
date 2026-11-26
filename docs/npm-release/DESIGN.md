# 方案评估与最终实现

原设计 v10（2026-11-19）方向正确：保留内网构建、发布最终 tgz、使用 OIDC + Environment 放行、逐包验证和恢复。需要简化的是首期为固定产品额外建设的 profile/schema/独立入口契约体系，而不是制品身份与发布校验。

| 原设计点 | 实现 | 原因/边界 |
| --- | --- | --- |
| profile + manifest schema + exports contract 多层配置 | 一份受评审 config.json + 自动生成 manifest；用代码逐字段/包内容校验 | 当前只有一个入口产品，包白名单、来源目录和通道已经能表达首期需求 |
| 固定五包 / 按版本阈值 | 主包实际依赖图 + 已批准包目录 | 覆盖单包、四包、五包和独立版本；避免 special 分支错误推断 |
| 手写 dependsOn / 顺序数组 | tgz 依赖 + semver + 拓扑排序 | 主包最后，禁止环和无关包；新依赖无需改排序代码 |
| 制品交接 | manifest PR + GitHub immutable Release | 清单在 main 受评审，asset hash 绑定 QA 字节；tag 必须来自 main 历史且含相同清单 |
| 生产/只读入口多层 workflow | 一个 workflow 的 validate → approval → publish → postcheck；一个 PR 测试 workflow | 默认 publish=false；OIDC 仅 publish job，无 reusable workflow 身份链 |
| 动态 registry / package target | config 固定 registry、包白名单和 repo；publish 硬性 upstream/main | fork 可做工具测试，不能直接发布生产包 |
| 每个入口产品配独立浏览器 harness | 读取实际 exports；SDK 入口 createClient，service 子路径导入 | types 和 bundle 所有明确子路径；RTC 产品行为仍由 QA 验收 |
| 复杂 tag 事务/恢复 | publish --tag；复用主包的 tag 不一致就阻断，由维护者处理 | 减少额外权限和隐式 tag 回退；无多包原子保证 |
| provenance | 显式 false + 真正 Jenkins 来源记录 | 不将 GitHub 发布误称为 SDK 在 GitHub 构建 |
| CDN/npm 总发布平台 | 本工具只管 npm，CDN/demo 沿用现有流程 | 缩小范围；原方案中的 CDN hash 对账与业务 QA 由既有 CI/QA 负责，未宣称本工具实现 |

config 内容 hash 进入清单；改白名单后必须生成新候选和清单。生产重新校验完整清单字节摘要，与 validate 计划相同。环境变量不能覆盖生产 registry/包名，scope/publishConfig 冲突会阻断。Node/npm 固定；Action 用核对过的 SHA。

全流程按常量 concurrency group 串行，避免重叠包同时修改通道；仍不可能阻止其他 npm 维护者在外部手工发布。因此审批后重查 tag 和外部解析，出现变化中止并重跑。

已有版本用完整 tarball integrity 对比后复用；没有 integrity 时下载 npm 官方 tarball 比较 SHA256。远端不存在版本与网络/权限失败分开处理。批外依赖逐个验证可用版本与 integrity，验证计划记录解析；消费者 lock 保存真实完整安装结果。不保证公共 registry 的浮动依赖以后永远不变。

安装镜像仅服务本次候选版本，避免 `^4.19.0` 测试时被更新的公共版本替换。公网 postcheck 则保留 npm 的真实 semver 行为，并记录实际选择的子包版本；不同于精确依赖的历史 caret 可能选择较新子包。

边界：禁止发布生命周期脚本、符号链接、非发行文件；暂不支持 wildcard exports、原生二进制或安装期脚本包。未来需要时应先增加相应发行与消费者契约。对 optional/peer 批外依赖采取严格策略：声明的范围必须公网可解析；不自动豁免按平台缺失的包。

管理员设置、CI 集成和真实 OIDC 验收仍需在组织环境执行；不能从本地脚本测试推定已经完成这些配置。详见操作手册与验证记录。
