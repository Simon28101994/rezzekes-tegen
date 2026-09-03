/* ════════════════════════════════════════════════════════════
   APP LOGIC  –  do not edit data here, use data.js instead
   ════════════════════════════════════════════════════════════ */

// ── Helpers ──────────────────────────────────────────────────
function playerName(nr) {
  const p = PLAYERS.find(x => x.nr === nr);
  return p ? `${p.firstName} ${p.lastName}` : `Speler #${nr}`;
}

function matchResult(goalsFor, goalsAgainst) {
  if (goalsFor > goalsAgainst) return { label: 'Win',  cls: 'badge-win'  };
  if (goalsFor < goalsAgainst) return { label: 'Verlies', cls: 'badge-loss' };
  return { label: 'Gelijk', cls: 'badge-draw' };
}

// ── Aggregate stats ──────────────────────────────────────────
function buildStats() {
  const totalGoals    = {};
  const totalYellow   = {};
  const totalRed      = {};
  const attendance    = {};

  PLAYERS.forEach(p => {
    totalGoals[p.nr]  = 0;
    totalYellow[p.nr] = 0;
    totalRed[p.nr]    = 0;
    attendance[p.nr]  = 0;
  });

  MATCHES.forEach(m => {
    (m.players || []).forEach(mp => {
      if (mp.present)       attendance[mp.nr]  = (attendance[mp.nr]  || 0) + 1;
      totalGoals[mp.nr]   = (totalGoals[mp.nr]  || 0) + (mp.goals        || 0);
      totalYellow[mp.nr]  = (totalYellow[mp.nr] || 0) + (mp.yellowCards  || 0);
      totalRed[mp.nr]     = (totalRed[mp.nr]    || 0) + (mp.redCards     || 0);
    });
  });

  return { totalGoals, totalYellow, totalRed, attendance };
}

// ── Summary boxes ────────────────────────────────────────────
function renderSummary(stats) {
  const wins   = MATCHES.filter(m => m.goalsFor > m.goalsAgainst).length;
  const losses = MATCHES.filter(m => m.goalsFor < m.goalsAgainst).length;
  const draws  = MATCHES.filter(m => m.goalsFor === m.goalsAgainst).length;
  const gf     = MATCHES.reduce((a, m) => a + (m.goalsFor || 0), 0);
  const ga     = MATCHES.reduce((a, m) => a + (m.goalsAgainst || 0), 0);

  document.getElementById('summary-boxes').innerHTML = `
    <div class="stat-card"><div class="value">${MATCHES.length}</div><div class="label">Gespeeld</div></div>
    <div class="stat-card"><div class="value">${wins}</div><div class="label">Gewonnen</div></div>
    <div class="stat-card"><div class="value">${draws}</div><div class="label">Gelijk</div></div>
    <div class="stat-card"><div class="value">${losses}</div><div class="label">Verloren</div></div>
    <div class="stat-card"><div class="value">${gf}</div><div class="label">Goals voor</div></div>
    <div class="stat-card"><div class="value">${ga}</div><div class="label">Goals tegen</div></div>
  `;
}

// ── Match history table ──────────────────────────────────────
function renderMatches() {
  const tbody = document.getElementById('match-tbody');
  const empty = document.getElementById('match-empty');
  tbody.innerHTML = '';

  if (!MATCHES.length) {
    document.getElementById('match-table').style.display = 'none';
    empty.style.display = 'block';
    return;
  }

  MATCHES.forEach((m, i) => {
    const res       = matchResult(m.goalsFor, m.goalsAgainst);
    const presentCt = (m.players || []).filter(p => p.present).length;
    const tr        = document.createElement('tr');
    tr.className    = 'match-row';
    tr.innerHTML    = `
      <td>${i + 1}</td>
      <td class="match-date">${m.date}</td>
      <td>${m.opponent}</td>
      <td><strong>${m.goalsFor} – ${m.goalsAgainst}</strong></td>
      <td><span class="badge ${res.cls}">${res.label}</span></td>
      <td>${presentCt} / ${PLAYERS.length}</td>
    `;
    tr.onclick = () => openMatchModal(i);
    tbody.appendChild(tr);
  });
}

// ── Match detail modal ───────────────────────────────────────
function openMatchModal(idx) {
  const m    = MATCHES[idx];
  const res  = matchResult(m.goalsFor, m.goalsAgainst);

  // Build a lookup for this match's player data
  const lookup = {};
  (m.players || []).forEach(mp => { lookup[mp.nr] = mp; });

  // Build rows for every player
  const rows = PLAYERS.map(p => {
    const mp  = lookup[p.nr];
    const att = mp ? mp.present : false;
    const g   = mp ? (mp.goals        || 0) : 0;
    const y   = mp ? (mp.yellowCards  || 0) : 0;
    const r   = mp ? (mp.redCards     || 0) : 0;
    return `
      <tr>
        <td>${p.nr}</td>
        <td>${p.firstName} ${p.lastName}</td>
        <td>${att ? '<span class="dot-yes">✔</span>' : '<span class="dot-no">✘</span>'}</td>
        <td>${g > 0 ? g : '–'}</td>
        <td>${y > 0 ? `<span class="card-y"></span> ${y}` : '–'}</td>
        <td>${r > 0 ? `<span class="card-r"></span> ${r}` : '–'}</td>
      </tr>`;
  }).join('');

  document.getElementById('modal-content').innerHTML = `
    <h2>Wedstrijd ${idx + 1} &nbsp;·&nbsp; ${m.date}</h2>
    <p style="color:var(--muted);margin-bottom:1rem;">
      vs <strong style="color:var(--text)">${m.opponent}</strong>
      &nbsp;&nbsp;
      <strong style="font-size:1.1rem">${m.goalsFor} – ${m.goalsAgainst}</strong>
      &nbsp;
      <span class="badge ${res.cls}">${res.label}</span>
    </p>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Nr</th>
            <th>Naam</th>
            <th>Aanw.</th>
            <th>⚽ Goals</th>
            <th><span class="card-y"></span> Geel</th>
            <th><span class="card-r"></span> Rood</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
  document.getElementById('modal-overlay').classList.add('open');
}

function closeModal(e, force) {
  if (force || (e && e.target === document.getElementById('modal-overlay'))) {
    document.getElementById('modal-overlay').classList.remove('open');
  }
}

// ── Players / Attendance table ───────────────────────────────
function renderPlayers(stats) {
  const tbody = document.getElementById('players-tbody');
  tbody.innerHTML = PLAYERS.map(p => {
    const att  = stats.attendance[p.nr] || 0;
    const pct  = MATCHES.length ? Math.round(att / MATCHES.length * 100) : 0;
    return `
      <tr>
        <td>${p.nr}</td>
        <td>${p.firstName} ${p.lastName}</td>
        <td>${att}</td>
        <td>${MATCHES.length}</td>
        <td>${MATCHES.length ? pct + '%' : '–'}</td>
      </tr>`;
  }).join('');
}

// ── Top scorers ───────────────────────────────────────────────
function renderScorers(stats) {
  const tbody = document.getElementById('scorers-tbody');
  const empty = document.getElementById('scorers-empty');
  const rows  = PLAYERS
    .map(p => ({ p, goals: stats.totalGoals[p.nr] || 0 }))
    .filter(x => x.goals > 0)
    .sort((a, b) => b.goals - a.goals);

  if (!rows.length) {
    document.getElementById('tab-scorers').querySelector('table').style.display = 'none';
    empty.style.display = 'block';
    return;
  }

  tbody.innerHTML = rows.map((x, i) => `
    <tr>
      <td>${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}</td>
      <td>${x.p.firstName} ${x.p.lastName}</td>
      <td><strong>${x.goals}</strong></td>
    </tr>`).join('');
}

// ── Cards table ───────────────────────────────────────────────
function renderCards(stats) {
  const tbody = document.getElementById('cards-tbody');
  const empty = document.getElementById('cards-empty');
  const rows  = PLAYERS
    .map(p => ({ p, y: stats.totalYellow[p.nr] || 0, r: stats.totalRed[p.nr] || 0 }))
    .filter(x => x.y > 0 || x.r > 0)
    .sort((a, b) => (b.y + b.r * 2) - (a.y + a.r * 2));

  if (!rows.length) {
    document.getElementById('tab-cards').querySelector('table').style.display = 'none';
    empty.style.display = 'block';
    return;
  }

  tbody.innerHTML = rows.map(x => `
    <tr>
      <td>${x.p.firstName} ${x.p.lastName}</td>
      <td>${x.y > 0 ? `<span class="card-y"></span> ${x.y}` : '–'}</td>
      <td>${x.r > 0 ? `<span class="card-r"></span> ${x.r}` : '–'}</td>
    </tr>`).join('');
}

// ── Tab switching ─────────────────────────────────────────────
function openTab(e, id) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  e.currentTarget.classList.add('active');
}

// ── Init ──────────────────────────────────────────────────────
(function init() {
  const stats = buildStats();
  renderSummary(stats);
  renderMatches();
  renderPlayers(stats);
  renderScorers(stats);
  renderCards(stats);
})();

// Close modal on Escape key
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(null, true); });
