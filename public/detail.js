const params = new URLSearchParams(location.search);
const ideaId = params.get('id');

const titleEl = document.getElementById('detailTitle');
const summaryEl = document.getElementById('detailSummary');
const tierEl = document.getElementById('detailTier');
const metaEl = document.getElementById('detailMeta');
const scoresEl = document.getElementById('detailScores');
const whyNowEl = document.getElementById('detailWhyNow');
const longformEl = document.getElementById('detailLongform');

const scoreKeys = [
  ['moneyProbability', '赚钱概率'],
  ['launchSpeed', '启动速度'],
  ['timeFriendliness', '时间友好度'],
  ['contentPotential', '内容传播性'],
  ['expansionPotential', '扩张性']
];

fetch('/data/ideas.json').then(r => r.json()).then(ideas => {
  const item = ideas.find(x => x.id === ideaId) || ideas[0];
  if (!item) return;

  document.title = `${item.name} - OpenClaw Money Radar`;
  titleEl.textContent = item.name;
  summaryEl.textContent = item.summary;
  tierEl.textContent = item.tier;
  tierEl.className = `badge ${item.tier}`;

  metaEl.innerHTML = `
    <article class="card"><strong>${item.positioning}</strong><span>项目定位</span></article>
    <article class="card"><strong>${item.repo}</strong><span>对应仓库</span></article>
    <article class="card"><strong>${(item.tags || []).join(' / ') || '--'}</strong><span>标签</span></article>
  `;

  scoresEl.innerHTML = scoreKeys.map(([key, label]) => `
    <article class="card"><strong>${item.scores?.[key] ?? '-'}</strong><span>${label}</span></article>
  `).join('');

  whyNowEl.innerHTML = `
    <h2>为什么现在值得做</h2>
    <ul>${(item.why_now || []).map(x => `<li>${x}</li>`).join('')}</ul>
  `;

  longformEl.innerHTML = `
    <h2>项目判断</h2>
    <p><strong>适合谁：</strong>${item.details?.fit || '暂无'}</p>
    <p><strong>怎么赚钱：</strong>${item.details?.monetization || '暂无'}</p>
  `;
});
