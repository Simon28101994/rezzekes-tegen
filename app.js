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
function parseDate(str) {
  // DD/MM/YYYY → comparable number YYYYMMDD
  const [d, m, y] = str.split('/');
  return parseInt(`${y}${m.padStart(2,'0')}${d.padStart(2,'0')}`, 10);
}

function renderMatches() {
  const tbody = document.getElementById('match-tbody');
  const empty = document.getElementById('match-empty');
  tbody.innerHTML = '';

  if (!MATCHES.length) {
    document.getElementById('match-table').style.display = 'none';
    empty.style.display = 'block';
    return;
  }

  // Sort by date descending (most recent first), keep original indices
  const sorted = MATCHES
    .map((m, i) => ({ m, i }))
    .sort((a, b) => parseDate(b.m.date) - parseDate(a.m.date));

  sorted.forEach(({ m, i }) => {
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
      <td><a class="details-link" href="#">Bekijk details</a></td>
    `;
    tr.onclick = () => openMatchModal(i);
    tbody.appendChild(tr);
  });
}

// ── Upcoming games ───────────────────────────────────────────
function parseDateTime(dateStr, timeStr) {
  const [d, m, y] = dateStr.split('/');
  const [h, min]  = (timeStr || '00:00').split(':');
  return new Date(y, m - 1, d, h, min);
}

const DAY_ABBREV = ['Zo', 'Ma', 'Di', 'Woe', 'Do', 'Vrij', 'Za'];
function dayAbbrev(dateStr) {
  return DAY_ABBREV[parseDateTime(dateStr).getDay()];
}

function renderUpcoming() {
  const grid  = document.getElementById('upcoming-grid');
  const empty = document.getElementById('upcoming-empty');
  grid.innerHTML = '';

  const now = new Date();
  const upcoming = (typeof UPCOMING_GAMES !== 'undefined' ? UPCOMING_GAMES : [])
    .filter(g => parseDateTime(g.date, g.time) >= now)
    .sort((a, b) => parseDateTime(a.date, a.time) - parseDateTime(b.date, b.time));

  if (!upcoming.length) {
    grid.style.display  = 'none';
    empty.style.display = 'block';
    return;
  }
  grid.style.display  = 'grid';
  empty.style.display = 'none';

  upcoming.forEach(g => {
    const label = g.home
      ? `Rezzekes Tegen – ${g.opponent}`
      : `${g.opponent} – Rezzekes Tegen`;
    const card = document.createElement('div');
    card.className = 'upcoming-card';
    card.innerHTML = `
      <div><span class="u-date">${dayAbbrev(g.date)} ${g.date}</span><span class="u-time">${g.time}</span></div>
      <div class="u-match">${label}</div>
      <span class="u-tag ${g.home ? 'home' : 'away'}">${g.home ? 'Thuis' : 'Uit'}</span>
    `;
    grid.appendChild(card);
  });
}

// ── Match detail modal ───────────────────────────────────────
function openMatchModal(idx) {
  const m    = MATCHES[idx];
  const res  = matchResult(m.goalsFor, m.goalsAgainst);

  // Build a lookup for this match's player data
  const lookup = {};
  (m.players || []).forEach(mp => { lookup[mp.nr] = mp; });

  // Only present players, sorted by goals desc then lastName asc
  const presentPlayers = PLAYERS
    .filter(p => lookup[p.nr] && lookup[p.nr].present)
    .sort((a, b) => {
      const ga = lookup[a.nr].goals || 0;
      const gb = lookup[b.nr].goals || 0;
      if (gb !== ga) return gb - ga;
      return a.lastName.localeCompare(b.lastName);
    });

  const rows = presentPlayers.map(p => {
    const mp = lookup[p.nr];
    const g  = mp.goals        || 0;
    const y  = mp.yellowCards  || 0;
    const r  = mp.redCards     || 0;
    return `
      <tr>
        <td>${p.nr}</td>
        <td>${p.firstName} ${p.lastName}</td>
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

// ── Sponsors footer ────────────────────────────────────────────
async function loadSponsors() {
  const grid = document.getElementById('sponsors-grid');
  const template = document.getElementById('sponsor-logo-template');
  if (!grid || !template) return;

  try {
    const response = await fetch('https://api.github.com/repos/Simon28101994/rezzekes-tegen/contents/sponsors');
    if (!response.ok) throw new Error('Could not load sponsors');

    const files = await response.json();
    const imageFiles = files
      .filter(file => file.type === 'file' && (
        /^image\//.test(file?.content_type || '') ||
        /\.(png|jpe?g|svg|webp|gif)$/i.test(file.name)
      ))
      .sort((a, b) => a.name.localeCompare(b.name));

    imageFiles.forEach(file => {
      const item = template.content.firstElementChild.cloneNode(true);
      const img = item.querySelector('img');
      const readableName = file.name
        .replace(/\.[^.]+$/, '')
        .replace(/[_-]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      img.src = file.download_url;
      img.alt = readableName || 'Sponsor';
      item.title = readableName || 'Sponsor';
      item.addEventListener('click', () => openSponsorLightbox(file.download_url, readableName || 'Sponsor'));
      grid.appendChild(item);
    });
  } catch (err) {
    grid.innerHTML = '';
  }
}

// ── Sponsor lightbox ─────────────────────────────────────────
function openSponsorLightbox(src, alt) {
  const lb = document.getElementById('sponsor-lightbox');
  const img = lb.querySelector('img');
  img.src = src;
  img.alt = alt;
  lb.classList.add('open');
}
function closeSponsorLightbox() {
  const lb = document.getElementById('sponsor-lightbox');
  lb.classList.remove('open');
  lb.querySelector('img').src = '';
}
document.addEventListener('DOMContentLoaded', () => {
  const lb = document.getElementById('sponsor-lightbox');
  if (lb) {
    lb.addEventListener('click', closeSponsorLightbox);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSponsorLightbox(); });
  }
});
function renderPlayers(stats) {
  const tbody = document.getElementById('players-tbody');
  tbody.innerHTML = PLAYERS.map(p => {
    const att  = stats.attendance[p.nr] || 0;
    const pct  = MATCHES.length ? Math.round(att / MATCHES.length * 100) : 0;
    const g    = stats.totalGoals[p.nr]  || 0;
    const y    = stats.totalYellow[p.nr] || 0;
    const r    = stats.totalRed[p.nr]    || 0;
    return `
      <tr>
        <td>${p.nr}</td>
        <td>${p.firstName} ${p.lastName}</td>
        <td>${att}</td>
        <td>${MATCHES.length}</td>
        <td>${MATCHES.length ? pct + '%' : '–'}</td>
        <td>${g > 0 ? g : '–'}</td>
        <td>${y > 0 ? `<span class="card-y"></span> ${y}` : '–'}</td>
        <td>${r > 0 ? `<span class="card-r"></span> ${r}` : '–'}</td>
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

// ── Leaderboard ───────────────────────────────────────────────
function renderLeaderboard() {
  if (typeof LEADERBOARD === 'undefined') return;
  document.getElementById('leaderboard-date').textContent =
    `Publicatiedatum: ${LEADERBOARD.publishedDate}`;
  const tbody = document.getElementById('leaderboard-tbody');
  tbody.innerHTML = LEADERBOARD.teams.map(t => {
    const isSelf = t.name === 'REZZEKES TEGEN';
    const style  = isSelf ? ' style="color:var(--gold);font-weight:700;"' : '';
    return `<tr${style}>
      <td>${t.pos}</td>
      <td>${t.name}</td>
      <td>${t.gsp}</td>
      <td>${t.gew}</td>
      <td>${t.gel}</td>
      <td>${t.verl}</td>
      <td>${t.goalsFor}</td>
      <td>${t.goalsAgainst}</td>
      <td>${t.saldo > 0 ? '+' : ''}${t.saldo}</td>
      <td><strong>${t.ptn}</strong></td>
    </tr>`;
  }).join('');
}

// ── Sortable tables ───────────────────────────────────────────
const _sortState = new WeakMap();

function sortTable(th, colIndex, type) {
  const tbody = th.closest('table').querySelector('tbody');
  const state = _sortState.get(th) || { asc: false };
  const asc   = !state.asc;
  _sortState.set(th, { asc });

  // Clear indicators on siblings
  th.closest('tr').querySelectorAll('th').forEach(t => {
    t.removeAttribute('data-sort-dir');
  });
  th.setAttribute('data-sort-dir', asc ? 'asc' : 'desc');

  const rows = Array.from(tbody.querySelectorAll('tr'));
  rows.sort((a, b) => {
    const cellA = a.cells[colIndex] ? a.cells[colIndex].textContent.trim() : '';
    const cellB = b.cells[colIndex] ? b.cells[colIndex].textContent.trim() : '';

    let valA, valB;
    if (type === 'num') {
      valA = parseFloat(cellA.replace(/[^0-9.\-]/g, '')) || 0;
      valB = parseFloat(cellB.replace(/[^0-9.\-]/g, '')) || 0;
    } else if (type === 'pct') {
      valA = parseFloat(cellA) || 0;
      valB = parseFloat(cellB) || 0;
    } else if (type === 'date') {
      valA = parseDate(cellA) || 0;
      valB = parseDate(cellB) || 0;
    } else {
      valA = cellA.toLowerCase();
      valB = cellB.toLowerCase();
    }

    if (valA < valB) return asc ? -1 : 1;
    if (valA > valB) return asc ? 1 : -1;
    return 0;
  });

  rows.forEach(r => tbody.appendChild(r));
}

// ── All league matches ──────────────────────────────────────────
function normalizeTeam(s) {
  return s.toUpperCase().replace(/[^A-Z0-9]/g, '');
}

function renderLeagueMatches() {
  const wrap   = document.getElementById('league-matches-weeks');
  const empty  = document.getElementById('league-matches-empty');
  const filter = document.getElementById('league-team-filter');
  wrap.innerHTML = '';

  const matchIndexByOpponent = {};
  MATCHES.forEach((m, i) => { matchIndexByOpponent[normalizeTeam(m.opponent)] = i; });

  const all = typeof LEAGUE_MATCHES !== 'undefined' ? LEAGUE_MATCHES : [];
  if (!all.length) {
    wrap.style.display  = 'none';
    empty.style.display = 'block';
    return;
  }

  if (filter && !filter.dataset.populated) {
    const teams = [...new Set(all.flatMap(m => [m.home, m.away, m.bye].filter(Boolean)))].sort();
    filter.insertAdjacentHTML('beforeend', teams.map(t => `<option value="${t}">${t}</option>`).join(''));
    filter.dataset.populated = 'true';
  }
  const selectedTeam = filter ? filter.value : '';

  let weeks = [...new Set(all.map(m => m.week))].sort((a, b) => b - a);
  if (selectedTeam) {
    weeks = weeks.filter(week => all.some(m => m.week === week &&
      (m.home === selectedTeam || m.away === selectedTeam || m.bye === selectedTeam)));
  }

  if (!weeks.length) {
    wrap.style.display  = 'none';
    empty.style.display = 'block';
    return;
  }
  wrap.style.display  = 'block';
  empty.style.display = 'none';

  wrap.innerHTML = weeks.map(week => {
    const weekLabel = (all.find(m => m.week === week && m.label) || {}).label || `Week ${week}`;
    let games = all.filter(m => m.week === week);
    if (selectedTeam) {
      games = games.filter(m => m.home === selectedTeam || m.away === selectedTeam || m.bye === selectedTeam);
    }
    const bye   = games.find(m => m.bye);
    const played = games.filter(m => !m.bye);

    if (selectedTeam && bye) {
      return `<h3>${weekLabel}</h3><p style="color:var(--muted);">Vrij deze week.</p>`;
    }

    const rows = played.map(m => {
      const homeSelf = m.home === 'REZZEKES TEGEN';
      const awaySelf = m.away === 'REZZEKES TEGEN';
      const isPlayed = m.scoreHome !== undefined;
      const middle    = isPlayed
        ? `<strong>${m.scoreHome} – ${m.scoreAway}</strong>`
        : `<span style="color:var(--muted);">${m.date}${m.time ? ' · ' + m.time : ''}</span>`;

      let matchIdx;
      if (isPlayed && (homeSelf || awaySelf)) {
        const opponent = homeSelf ? m.away : m.home;
        matchIdx = matchIndexByOpponent[normalizeTeam(opponent)];
      }
      const clickable = matchIdx !== undefined;

      return `
        <tr${clickable ? ` class="match-row" onclick="openMatchModal(${matchIdx})"` : ''}>
          <td${homeSelf ? ' style="color:var(--gold);font-weight:700;"' : ''}>${m.home}</td>
          <td>${middle}</td>
          <td${awaySelf ? ' style="color:var(--gold);font-weight:700;"' : ''}>${m.away}</td>
          <td>${clickable ? '<a class="details-link" href="#">Bekijk details</a>' : ''}</td>
        </tr>`;
    }).join('');

    return `
      <h3>${weekLabel}${bye ? ` <span style="color:var(--muted);font-weight:400;font-size:0.8rem;">(vrij: ${bye.bye})</span>` : ''}</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Thuis</th><th>Score</th><th>Uit</th><th></th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;
  }).join('');
}

// ── Calendar export (.ics) ───────────────────────────────────
let calVisible = [];
const calSelected = new Set();

function weekLabelFor(week) {
  const hit = LEAGUE_MATCHES.find(m => m.week === week && m.label);
  return hit ? hit.label : `Week ${week}`;
}

function futureLeagueGames() {
  const now = new Date();
  return (typeof LEAGUE_MATCHES !== 'undefined' ? LEAGUE_MATCHES : [])
    .filter(m => m.home && m.date && m.scoreHome === undefined && parseDateTime(m.date, m.time) >= now)
    .map(m => ({
      ...m,
      start: parseDateTime(m.date, m.time),
      id: `${m.week}|${m.home}|${m.away}`,
      weekLabel: weekLabelFor(m.week),
    }))
    .sort((a, b) => a.start - b.start);
}

function renderCalendar(resetSelection) {
  const filter = document.getElementById('cal-team-filter');
  const list   = document.getElementById('cal-list');
  const empty  = document.getElementById('cal-empty');
  if (!filter) return;

  if (!filter.dataset.populated) {
    const teams = [...new Set(LEAGUE_MATCHES.flatMap(m => [m.home, m.away].filter(Boolean)))].sort();
    filter.innerHTML = '<option value="">Alle ploegen</option>' +
      teams.map(t => `<option value="${t}"${t === 'REZZEKES TEGEN' ? ' selected' : ''}>${t}</option>`).join('');
    filter.dataset.populated = 'true';
  }

  const team  = filter.value;
  const games = futureLeagueGames();
  calVisible  = team ? games.filter(g => g.home === team || g.away === team) : games;

  if (resetSelection) {
    calSelected.clear();
    calVisible.forEach(g => calSelected.add(g.id));
  }

  empty.style.display = calVisible.length ? 'none' : 'block';
  const hl = t => t === 'REZZEKES TEGEN' ? `<span style="color:var(--gold);font-weight:700;">${t}</span>` : t;
  list.innerHTML = calVisible.map((g, i) => `
    <label class="cal-item">
      <input type="checkbox" data-i="${i}"${calSelected.has(g.id) ? ' checked' : ''} />
      <span class="cal-when">${dayAbbrev(g.date)} ${g.date} · ${g.time}</span>
      <span class="cal-teams">${hl(g.home)} – ${hl(g.away)}</span>
      <span class="cal-week">${g.weekLabel}</span>
    </label>`).join('');
  updateCalButton();
}

function updateCalButton() {
  const n   = calVisible.filter(g => calSelected.has(g.id)).length;
  const btn = document.getElementById('cal-download');
  btn.textContent = `Download .ics (${n})`;
  btn.disabled    = n === 0;
}

function calSelectAll(on) {
  calVisible.forEach(g => on ? calSelected.add(g.id) : calSelected.delete(g.id));
  document.querySelectorAll('#cal-list input[type=checkbox]').forEach(cb => { cb.checked = on; });
  updateCalButton();
}

document.getElementById('cal-list').addEventListener('change', e => {
  const g = calVisible[e.target.dataset.i];
  if (!g) return;
  if (e.target.checked) calSelected.add(g.id); else calSelected.delete(g.id);
  updateCalButton();
});

function icsEscape(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

function icsFold(line) {
  const out = [];
  while (line.length > 75) { out.push(line.slice(0, 75)); line = ' ' + line.slice(75); }
  out.push(line);
  return out.join('\r\n');
}

function icsLocal(d) {
  const p = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}T${p(d.getHours())}${p(d.getMinutes())}00`;
}

function buildIcs(games, calName) {
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Rezzekes Tegen//Wedstrijden//NL',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${icsEscape(calName)}`,
    'X-WR-TIMEZONE:Europe/Brussels',
    'BEGIN:VTIMEZONE',
    'TZID:Europe/Brussels',
    'BEGIN:STANDARD',
    'DTSTART:19701025T030000',
    'TZOFFSETFROM:+0200',
    'TZOFFSETTO:+0100',
    'TZNAME:CET',
    'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU',
    'END:STANDARD',
    'BEGIN:DAYLIGHT',
    'DTSTART:19700329T020000',
    'TZOFFSETFROM:+0100',
    'TZOFFSETTO:+0200',
    'TZNAME:CEST',
    'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU',
    'END:DAYLIGHT',
    'END:VTIMEZONE',
  ];
  games.forEach(g => {
    const s = g.start;
    const e = new Date(s.getFullYear(), s.getMonth(), s.getDate(), s.getHours() + 1, s.getMinutes());
    lines.push(
      'BEGIN:VEVENT',
      `UID:rt-w${g.week}-${normalizeTeam(g.home)}-${normalizeTeam(g.away)}@rezzekes-tegen`,
      `DTSTAMP:${stamp}`,
      `DTSTART;TZID=Europe/Brussels:${icsLocal(s)}`,
      `DTEND;TZID=Europe/Brussels:${icsLocal(e)}`,
      `SUMMARY:${icsEscape(`${g.home} - ${g.away}`)}`,
      `DESCRIPTION:${icsEscape(g.weekLabel)}`,
      'END:VEVENT'
    );
  });
  lines.push('END:VCALENDAR');
  return lines.map(icsFold).join('\r\n') + '\r\n';
}

function downloadIcs() {
  const games = calVisible.filter(g => calSelected.has(g.id));
  if (!games.length) return;
  const team = document.getElementById('cal-team-filter').value;
  const name = team ? `Wedstrijden ${team}` : 'Wedstrijden alle ploegen';
  const blob = new Blob([buildIcs(games, name)], { type: 'text/calendar;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
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
  renderUpcoming();
  renderMatches();
  renderPlayers(stats);
  renderScorers(stats);
  renderCards(stats);
  renderLeaderboard();
  renderLeagueMatches();
  renderCalendar(true);
  loadSponsors();
})();

// Close modal on Escape key
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(null, true); });
