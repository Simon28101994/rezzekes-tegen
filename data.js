/* ════════════════════════════════════════════════════════════
   DATA FILE  –  update this file each week
   ════════════════════════════════════════════════════════════

   PLAYERS  (edit list as roster changes)
   Each player: { nr, firstName, lastName }

   MATCHES  (add one object per match)
   Each match: {
     date         : 'DD/MM/YYYY',
     opponent     : 'Club naam',
     goalsFor     : 0,
     goalsAgainst : 0,
     players: [
       {
         nr          : 1,        // must match a player nr above
         present     : true,     // true / false
         goals       : 0,
         yellowCards : 0,
         redCards    : 0
       }, ...
     ]
   }
   ════════════════════════════════════════════════════════════ */

const PLAYERS = [
  { nr:  1, firstName: 'Vincent',   lastName: 'De Spiegeleer'      },
  { nr:  2, firstName: 'Yune',      lastName: 'De Donder'          },
  { nr:  3, firstName: 'Joran',     lastName: 'Lemaire'            },
  { nr:  4, firstName: 'Jens',      lastName: 'Du Mongh'           },
  { nr:  5, firstName: 'Matthias',  lastName: 'Bonte'              },
  { nr:  6, firstName: 'Simon',     lastName: 'De Spiegeleer'      },
  { nr:  7, firstName: 'Jeroen',    lastName: 'De Backer'          },
  { nr:  8, firstName: 'Kevin',     lastName: 'Vanhuffelen'        },
  { nr:  9, firstName: 'Lucas',     lastName: 'Van Droogenbroeck'  },
  { nr: 10, firstName: 'Jens',      lastName: 'De Rycke'           },
  { nr: 11, firstName: 'Jeroen',    lastName: 'Somers'             },
  { nr: 12, firstName: 'Thomas',    lastName: 'Heyvaert'           },
  { nr: 13, firstName: 'Perry',     lastName: 'Van Den Branden'    },
  { nr: 14, firstName: 'Tayson',    lastName: 'Van Bellingen'      },
  { nr: 15, firstName: 'Lucas',     lastName: 'Lemaire'            },
  { nr: 16, firstName: 'Jonathan',  lastName: 'Van Laethem'        },
];

// ── Leaderboard ───────────────────────────────────────────────
// Update this after each official ranking publication.
// ── Upcoming games ───────────────────────────────────────────
// Add future fixtures here as they're announced (e.g. from the
// club's .ics schedule). Once a game is played, remove it here
// and add the result as a new entry in MATCHES below.
// Each game: { date: 'DD/MM/YYYY', time: 'HH:MM', opponent: 'Club naam', home: true/false }
const UPCOMING_GAMES = [
  { date: '23/09/2026', time: '22:00', opponent: 'Pottekestamp', home: true  },
  { date: '30/09/2026', time: '21:00', opponent: 'De Skoeten',   home: true  },
];

const LEADERBOARD = {
  publishedDate: '08/09/2026',
  teams: [
    { pos:  1, name: "LA FAMILIA",       gsp: 1, gew: 1, gel: 0, verl: 0, goalsFor: 14, goalsAgainst:  4, saldo:  10, ptn: 3 },
    { pos:  2, name: "REZZEKES TEGEN",   gsp: 1, gew: 1, gel: 0, verl: 0, goalsFor: 13, goalsAgainst:  3, saldo:  10, ptn: 3 },
    { pos:  3, name: "POTTEKESTAMP",     gsp: 1, gew: 1, gel: 0, verl: 0, goalsFor:  9, goalsAgainst:  4, saldo:   5, ptn: 3 },
    { pos:  4, name: "DE WEKE TINGELS",  gsp: 1, gew: 1, gel: 0, verl: 0, goalsFor:  6, goalsAgainst:  3, saldo:   3, ptn: 3 },
    { pos:  5, name: "BLACK'XTRAS",      gsp: 1, gew: 0, gel: 1, verl: 0, goalsFor:  4, goalsAgainst:  4, saldo:   0, ptn: 1 },
    { pos:  5, name: "STB85",            gsp: 1, gew: 0, gel: 1, verl: 0, goalsFor:  4, goalsAgainst:  4, saldo:   0, ptn: 1 },
    { pos:  7, name: "BALKANOS",         gsp: 0, gew: 0, gel: 0, verl: 0, goalsFor:  0, goalsAgainst:  0, saldo:   0, ptn: 0 },
    { pos:  7, name: "BIEMEN",           gsp: 0, gew: 0, gel: 0, verl: 0, goalsFor:  0, goalsAgainst:  0, saldo:   0, ptn: 0 },
    { pos:  9, name: "GALACTICOS",       gsp: 1, gew: 0, gel: 0, verl: 1, goalsFor:  3, goalsAgainst:  6, saldo:  -3, ptn: 0 },
    { pos: 10, name: "DE SKOETEN",       gsp: 1, gew: 0, gel: 0, verl: 1, goalsFor:  4, goalsAgainst: 14, saldo: -10, ptn: 0 },
    { pos: 11, name: "COCKY'S",          gsp: 2, gew: 0, gel: 0, verl: 2, goalsFor:  7, goalsAgainst: 22, saldo: -15, ptn: 0 },
  ]
};

// ── League matches ───────────────────────────────────────────
// Every match played across the full competition (not just ours),
// grouped by week. Add "bye: 'TEAM'" for the team that had no game
// that week instead of home/away/scoreHome/scoreAway.
const LEAGUE_MATCHES = [
  { week: 1, bye: 'BALKANOS' },
  { week: 1, home: "COCKY'S",     away: 'REZZEKES TEGEN',  scoreHome:  3, scoreAway: 13 },
  { week: 1, home: "BLACK'XTRAS", away: 'STB85',            scoreHome:  4, scoreAway:  4 },
  { week: 2, bye: 'STB85' },
  { week: 2, home: 'LA FAMILIA',  away: 'DE SKOETEN',       scoreHome: 14, scoreAway:  4 },
  { week: 2, home: 'GALACTICOS',  away: 'DE WEKE TINGELS',  scoreHome:  3, scoreAway:  6 },
  { week: 2, home: "COCKY'S",     away: 'POTTEKESTAMP',     scoreHome:  4, scoreAway:  9 },
  { week: 3, home: 'BALKANOS',    away: 'REZZEKES TEGEN',   scoreHome:  6, scoreAway:  4 },
];

const MATCHES = [
  // ── Match 1 – 02/09/2026 ──────────────────────────────────
  {
    date: '02/09/2026',
    opponent: 'Cockys',
    goalsFor: 13,
    goalsAgainst: 3,
    players: [
      { nr:  1, present: true,  goals: 3, yellowCards: 0, redCards: 0 }, // Vincent De Spiegeleer
      { nr:  2, present: true,  goals: 0, yellowCards: 0, redCards: 0 }, // Yune De Donder
      { nr:  3, present: true,  goals: 0, yellowCards: 0, redCards: 0 }, // Joran Lemaire
      { nr:  4, present: true,  goals: 0, yellowCards: 0, redCards: 0 }, // Jens Du Mongh
      { nr:  5, present: true,  goals: 4, yellowCards: 0, redCards: 0 }, // Matthias Bonte
      { nr:  6, present: true,  goals: 1, yellowCards: 0, redCards: 0 }, // Simon De Spiegeleer
      { nr:  7, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Jeroen De Backer
      { nr:  8, present: true,  goals: 5, yellowCards: 0, redCards: 0 }, // Kevin Vanhuffelen
      { nr:  9, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Lucas Van Droogenbroeck
      { nr: 10, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Jens De Rycke
      { nr: 11, present: true,  goals: 0, yellowCards: 0, redCards: 0 }, // Jeroen Somers
      { nr: 12, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Thomas Heyvaert
      { nr: 13, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Perry Van Den Branden
      { nr: 14, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Tayson Van Bellingen
      { nr: 15, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Lucas Lemaire
      { nr: 16, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Jonathan Van Laethem
    ]
  },
  // ── Match 2 – 09/09/2026 ──────────────────────────────────
  {
    date: '09/09/2026',
    opponent: 'Balkanos',
    goalsFor: 4,
    goalsAgainst: 6,
    players: [
      { nr:  1, present: true,  goals: 0, yellowCards: 0, redCards: 0 }, // Vincent De Spiegeleer
      { nr:  2, present: true,  goals: 0, yellowCards: 0, redCards: 0 }, // Yune De Donder
      { nr:  3, present: true,  goals: 2, yellowCards: 0, redCards: 0 }, // Joran Lemaire
      { nr:  4, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Jens Du Mongh
      { nr:  5, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Matthias Bonte
      { nr:  6, present: true,  goals: 0, yellowCards: 0, redCards: 0 }, // Simon De Spiegeleer
      { nr:  7, present: true,  goals: 0, yellowCards: 0, redCards: 0 }, // Jeroen De Backer
      { nr:  8, present: true,  goals: 0, yellowCards: 0, redCards: 0 }, // Kevin Vanhuffelen
      { nr:  9, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Lucas Van Droogenbroeck
      { nr: 10, present: true,  goals: 0, yellowCards: 0, redCards: 0 }, // Jens De Rycke
      { nr: 11, present: true,  goals: 2, yellowCards: 0, redCards: 0 }, // Jeroen Somers
      { nr: 12, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Thomas Heyvaert
      { nr: 13, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Perry Van Den Branden
      { nr: 14, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Tayson Van Bellingen
      { nr: 15, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Lucas Lemaire
      { nr: 16, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Jonathan Van Laethem
    ]
  },
  // Add a match object here after each game:
  // {
  //   date: 'DD/MM/YYYY',
  //   opponent: 'Club naam',
  //   goalsFor: 0,
  //   goalsAgainst: 0,
  //   players: [
  //     { nr: 1,  present: true,  goals: 0, yellowCards: 0, redCards: 0 },
  //     ...
  //   ]
  // },
];
