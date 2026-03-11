const summary = document.getElementById('summary');
const topCards = document.getElementById('topCards');
const tierBoards = document.getElementById('tierBoards');
const allIdeas = document.getElementById('allIdeas');

const scoreKeys = [
  ['moneyProbability', '赚钱概率'],
  ['launchSpeed', '启动速度'],
  ['timeFriendliness', '时间友好度'],
  ['contentPotential', '内容传播性'],
  ['expansionPotential', '扩张性']
];

function averageScore(scores = {}) {
  const values = scoreKeys.map(([key]) => Number(scores[key] || 0));
  return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
}

fetch('/data/ideas.json').then(r => r.json()).then(ideas => {
  const sorted = [...ideas].sort((a, b) => {
    if (a.tier !== b.tier) return a.tier.localeCompare(b.tier);
    return Number(averageScore(b.scores)) - Number(averageScore(a.scores));
  });

  const t1 = sorted.filter(i => i.tier === 'T1');
  const t2 = sorted.filter(i => i.tier === 'T2');
  const t3 = sorted.filter(i => i.tier === 'T3');

  summary.innerHTML = `
    <article class="card"><strong>${ideas.length}</strong><span>当前机会卡</span></article>
    <article class="card"><strong>${t1.length}</strong><span>T1 优先方向</span></article>
    <article class="card"><strong>${t2.length}</strong><span>T2 备选方向</span></article>
    <article class="card"><strong>${t3.length}</strong><span>T3 暂不优先</span></article>
  `;

  topCards.innerHTML = sorted.slice(0, 5).map(item => `
    <article class="card idea-card">
      <div class="idea-top"><span class="tier ${item.tier}">${item.tier}</span><span class="avg">综合 ${averageScore(item.scores)}</span></div>
      <h3>${item.name}</h3>
      <p>${item.summary}</p>
      <div class="meta">定位：${item.positioning}</div>
      <div class="meta">仓库：${item.repo}</div>
    </article>
  `).join('');

  const board = (title, list) => `
    <section class="tier-board">
      <h3>${title}</h3>
      ${list.length ? list.map(item => `
        <div class="tier-row">
          <strong>${item.name}</strong>
          <span>${item.positioning}</span>
          <span>综合 ${averageScore(item.scores)}</span>
        </div>
      `).join('') : '<div class="tier-row empty">暂无项目</div>'}
    </section>
  `;

  tierBoards.innerHTML = [
    board('T1', t1),
    board('T2', t2),
    board('T3', t3)
  ].join('');

  allIdeas.innerHTML = sorted.map(item => `
    <article class="card idea-card">
      <div class="idea-top"><span class="tier ${item.tier}">${item.tier}</span><span class="avg">综合 ${averageScore(item.scores)}</span></div>
      <h3>${item.name}</h3>
      <p>${item.summary}</p>
      <div class="score-list">
        ${scoreKeys.map(([key, label]) => `<span>${label}：${item.scores?.[key] ?? '-'}</span>`).join('')}
      </div>
      <div class="why-now">
        <strong>为什么现在值得做</strong>
        <ul>${(item.why_now || []).map(x => `<li>${x}</li>`).join('')}</ul>
      </div>
    </article>
  `).join('');
});
