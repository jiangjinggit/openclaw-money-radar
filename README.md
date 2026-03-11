# OpenClaw Money Radar

OpenClaw Money Radar 是一个围绕 OpenClaw 生态做“赚钱项目发现、筛选、排序、沉淀”的轻量化项目骨架。

它的目标不是泛泛地 brainstorm，而是持续输出可落地、可收费、适合独立开发者快速验证的项目卡，并逐步形成项目池与排行榜。

## 项目定位

- 面向 OpenClaw 生态创业者、独立开发者、技术博主、咨询服务商
- 核心价值：持续发现 OpenClaw 生态中的高价值商业机会
- 输出形式：项目定位、用户群体、盈利模式、为什么能挣钱、实现步骤、首月变现路径、内容获客打法、项目评分、排行榜视角

## 当前版本包含

- 投委会级提示词配置
- 项目说明与 PRD
- GitHub 发布前的基础文档
- 数据结构占位（便于后续沉淀项目池）
- 短期现金流与长期主壳的判断文档
- 产品矩阵判断文档

## 建议的产品化方向

1. **内容版**：每小时/每天产出一个高质量项目卡
2. **数据库版**：沉淀为项目池、排行榜、标签库
3. **SaaS 版**：支持按赛道、技术门槛、变现速度筛选
4. **服务版**：为创业者提供“项目评估 + MVP 路线 + 首月收钱方案”

## 推荐仓库结构

```text
openclaw-money-radar/
  README.md
  package.json
  docs/
    PRD.md
    ROADMAP.md
  prompts/
    investment-committee.prompt.md
  data/
    ideas.example.json
  src/
    schema.md
```

## 关键判断（当前）

- **短期 first money**：`openclaw-security-audit-lite`
  - 更适合卖安全体检 / 风险扫描 / 成本治理报告
- **长期 retention shell**：`openclaw-monitor-lite`
  - 更适合卖 Agent Ops Lite / 成本 / 告警 / 节点健康 / 错误日志
- **低价增长入口**：`openclaw-template-market`
- **知识 / 培训中层**：`openclaw-knowledge`

对应文档：
- `docs/SHORT_TERM_CASHFLOW.md`
- `docs/LONG_TERM_SHELLS.md`
- `docs/PRODUCT_MATRIX_2026_03.md`
- `docs/TIER_RANKING.md`
- `docs/CASHFLOW_VS_SHELL.md`
- `docs/TOP5_OPPORTUNITIES.md`
- `docs/IDEAS_SCHEMA.md`
- `docs/SCORING_MODEL.md`
- `data/ideas.json`

## 当前可预览内容

- 最小静态排行榜页：`public/index.html`
- 支持：梯队筛选、标签筛选、评分排序、Top 机会卡、全部项目列表
- 支持：详情展开（适合谁 / 怎么赚钱）
- 数据源：`data/ideas.json`
- 本地预览：`npm run dev` 后打开 `http://127.0.0.1:4340/public/`

## 下一步

- 扩充更多机会卡与字段
- 增加 sqlite / 更正式的数据层
- 接入定时任务产出沉淀
- 加上导出为 Markdown / Feishu / Notion 的能力
- 后续可补筛选、排序、详情页

## 说明

当前环境未安装 `gh` CLI，因此暂时无法直接创建 GitHub 远端仓库。
但这个目录已经整理成一个可直接发布的项目骨架，后续可在装好 `gh` 或网页端创建仓库后直接推送。
