const summary = document.getElementById('summary');
const topCards = document.getElementById('topCards');
const tierBoards = document.getElementById('tierBoards');
const allIdeas = document.getElementById('allIdeas');
const tierFilter = document.getElementById('tierFilter');
const tagFilter = document.getElementById('tagFilter');
const sortBy = document.getElementById('sortBy');

const scoreKeys = [
  ['moneyProbability', '赚钱概率'],
  ['launchSpeed', '启动速度'],
  ['timeFriendliness', '时间友好度'],
  ['contentPotential', '内容传播性'],
  ['expansionPotential', '扩张性']
];

function averageScore(scores = {}) {
  const values = scoreKeys.map(([key]) => Number(scores[key] || 0));
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function scoreValue(item, key) {
  if (key === 'avg') return averageScore(item.scores);
  return Number(item.scores?.[key] || 0);
}

function fillTagOptions(ideas) {
  const tags = [...new Set(ideas.flatMap(item => item.tags || []))].sort();
  tagFilter.innerHTML = '<option value="ALL">全部标签</option>' + tags.map(tag => `<option value="${tag}">${tag}</option>`).join('');
}

function detailBlock(item) {
  return `
    <details class="details-box">
      <summary>查看详情</summary>
      <div class="details-content">
        <p><strong>适合谁：</strong>${item.details?.fit || '暂无'}</p>
        <p><strong>怎么赚钱：</strong>${item.details?.monetization || '暂无'}</p>
        <p><a class="text-link" href="/public/detail.html?id=${encodeURIComponent(item.id)}">打开单独详情页</a></p>
      </div>
    </details>
  `;
}

function render(ideas) {
  const tierValue = tierFilter.value;
  const tagValue = tagFilter.value;
  const sortKey = sortBy.value;

  const filtered = ideas.filter(item => {
    const tierOk = tierValue === 'ALL' ? true : item.tier === tierValue;
    const tagOk = tagValue === 'ALL' ? true : (item.tags || []).includes(tagValue);
    return tierOk && tagOk;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (scoreValue(b, sortKey) !== scoreValue(a, sortKey)) {
      return scoreValue(b, sortKey) - scoreValue(a, sortKey);
    }
    return averageScore(b.scores) - averageScore(a.scores);
  });

  const t1 = sorted.filter(i => i.tier === 'T1');
  const t2 = sorted.filter(i => i.tier === 'T2');
  const t3 = sorted.filter(i => i.tier === 'T3');

  summary.innerHTML = `
    <article class="card"><strong>${filtered.length}</strong><span>当前展示项目</span></article>
    <article class="card"><strong>${t1.length}</strong><span>T1 优先方向</span></article>
    <article class="card"><strong>${t2.length}</strong><span>T2 备选方向</span></article>
    <article class="card"><strong>${t3.length}</strong><span>T3 暂不优先</span></article>
  `;

  topCards.innerHTML = sorted.slice(0, 5).map(item => `
    <article class="card idea-card">
      <div class="idea-top"><span class="tier ${item.tier}">${item.tier}</span><span class="avg">综合 ${averageScore(item.scores).toFixed(1)}</span></div>
      <h3>${item.name}</h3>
      <p>${item.summary}</p>
      <div class="tag-list">${(item.tags || []).map(tag => `<span>${tag}</span>`).join('')}</div>
      <div class="meta">定位：${item.positioning}</div>
      <div class="meta">仓库：${item.repo}</div>
      ${detailBlock(item)}
    </article>
  `).join('') || '<article class="card">暂无结果</article>';

  const board = (title, list) => `
    <section class="tier-board">
      <h3>${title}</h3>
      ${list.length ? list.map(item => `
        <div class="tier-row">
          <strong>${item.name}</strong>
          <span>${item.positioning}</span>
          <span><a class="text-link" href="/public/detail.html?id=${encodeURIComponent(item.id)}">查看详情</a></span>
        </div>
      `).join('') : '<div class="tier-row empty">暂无项目</div>'}
    </section>
  `;

  tierBoards.innerHTML = [board('T1', t1), board('T2', t2), board('T3', t3)].join('');

  allIdeas.innerHTML = sorted.map(item => `
    <article class="card idea-card">
      <div class="idea-top"><span class="tier ${item.tier}">${item.tier}</span><span class="avg">综合 ${averageScore(item.scores).toFixed(1)}</span></div>
      <h3>${item.name}</h3>
      <p>${item.summary}</p>
      <div class="tag-list">${(item.tags || []).map(tag => `<span>${tag}</span>`).join('')}</div>
      <div class="score-list">
        ${scoreKeys.map(([key, label]) => `<span>${label}：${item.scores?.[key] ?? '-'}</span>`).join('')}
      </div>
      <div class="why-now">
        <strong>为什么现在值得做</strong>
        <ul>${(item.why_now || []).map(x => `<li>${x}</li>`).join('')}</ul>
      </div>
      ${detailBlock(item)}
    </article>
  `).join('') || '<article class="card">暂无结果</article>';
}

fetch('/data/ideas.json').then(r => r.json()).then(ideas => {
  fillTagOptions(ideas);
  render(ideas);
  tierFilter.addEventListener('change', () => render(ideas));
  tagFilter.addEventListener('change', () => render(ideas));
  sortBy.addEventListener('change', () => render(ideas));
});
