# ideas.json 字段说明

## 目标
把项目机会从零散判断，收敛成可排序、可筛选、可扩展的数据结构。

---

## 当前字段
### id
唯一标识，建议使用 kebab-case。

### name
项目名称。

### tier
项目梯队：`T1` / `T2` / `T3`。

### positioning
项目定位，例如：
- `short-term-first-money`
- `long-term-retention-shell`
- `low-ticket-growth-entry`
- `knowledge-training-layer`
- `long-term-expansion`

### repo
对应仓库名。

### summary
一句话总结项目价值。

### why_now
字符串数组，说明当前为什么值得做。

### scores
评分对象，建议当前包含：
- `moneyProbability`
- `launchSpeed`
- `timeFriendliness`
- `contentPotential`
- `expansionPotential`

评分区间统一为 `1-10`。

---

## 后续可扩展字段
- `risks`
- `pricing`
- `firstMonthPlan`
- `channelFit`
- `status`
- `updatedAt`
