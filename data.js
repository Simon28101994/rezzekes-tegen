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
  { nr:  1, firstName: 'Simon',     lastName: 'De Spiegeleer'      },
  { nr:  2, firstName: 'Matthias',  lastName: 'Bonte'              },
  { nr:  3, firstName: 'Yune',      lastName: 'De Donder'          },
  { nr:  4, firstName: 'Thomas',    lastName: 'Heyvaert'           },
  { nr:  5, firstName: 'Jeroen',    lastName: 'De Backer'          },
  { nr:  6, firstName: 'Jens',      lastName: 'Du Mongh'           },
  { nr:  7, firstName: 'Lucas',     lastName: 'Lemaire'            },
  { nr:  8, firstName: 'Vincent',   lastName: 'De Spiegeleer'      },
  { nr:  9, firstName: 'Perry',     lastName: 'Van Den Branden'    },
  { nr: 10, firstName: 'Joran',     lastName: 'Lemaire'            },
  { nr: 11, firstName: 'Jeroen',    lastName: 'Somers'             },
  { nr: 12, firstName: 'Jens',      lastName: 'De Rycke'           },
  { nr: 13, firstName: 'Lucas',     lastName: 'Van Droogenbroeck'  },
  { nr: 14, firstName: 'Tayson',    lastName: 'Van Bellingen'      },
  { nr: 16, firstName: 'Jonathan',  lastName: 'Van Laethem'        },
  { nr: 91, firstName: 'Kevin',     lastName: 'Vanhuffelen'        },
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
  { date: '05/10/2026', time: '22:00', opponent: 'Galacticos',   home: true  },
  { date: '12/10/2026', time: '21:00', opponent: "Black'Xtras",  home: true  },
  { date: '19/10/2026', time: '20:00', opponent: 'STB85',        home: true  },
];

const LEADERBOARD = {
  publishedDate: '21/09/2026',
  teams: [
    { pos:  1, name: "LA FAMILIA",       gsp: 3, gew: 2, gel: 1, verl: 0, goalsFor: 38, goalsAgainst: 10, saldo:  28, ptn: 7 },
    { pos:  2, name: "BALKANOS",         gsp: 3, gew: 2, gel: 1, verl: 0, goalsFor: 22, goalsAgainst:  8, saldo:  14, ptn: 7 },
    { pos:  3, name: "BIEMEN",           gsp: 2, gew: 2, gel: 0, verl: 0, goalsFor: 24, goalsAgainst:  4, saldo:  20, ptn: 6 },
    { pos:  4, name: "DE WEKE TINGELS",  gsp: 2, gew: 2, gel: 0, verl: 0, goalsFor: 25, goalsAgainst:  6, saldo:  19, ptn: 6 },
    { pos:  5, name: "COCKY'S",          gsp: 4, gew: 2, gel: 0, verl: 2, goalsFor: 24, goalsAgainst: 26, saldo:  -2, ptn: 6 },
    { pos:  6, name: "POTTEKESTAMP",     gsp: 2, gew: 1, gel: 1, verl: 0, goalsFor: 12, goalsAgainst:  7, saldo:   5, ptn: 4 },
    { pos:  7, name: "REZZEKES TEGEN",   gsp: 2, gew: 1, gel: 0, verl: 1, goalsFor: 17, goalsAgainst:  9, saldo:   8, ptn: 3 },
    { pos:  8, name: "GALACTICOS",       gsp: 3, gew: 0, gel: 1, verl: 2, goalsFor: 11, goalsAgainst: 17, saldo:  -6, ptn: 1 },
    { pos:  9, name: "STB85",            gsp: 2, gew: 0, gel: 1, verl: 1, goalsFor:  7, goalsAgainst: 17, saldo: -10, ptn: 1 },
    { pos: 10, name: "BLACK'XTRAS",      gsp: 4, gew: 0, gel: 1, verl: 3, goalsFor: 10, goalsAgainst: 54, saldo: -44, ptn: 1 },
    { pos: 11, name: "DE SKOETEN",       gsp: 3, gew: 0, gel: 0, verl: 3, goalsFor:  5, goalsAgainst: 37, saldo: -32, ptn: 0 },
  ]
};

// ── League matches ───────────────────────────────────────────
// Every match across the full competition (not just ours), grouped
// by week. Add "bye: 'TEAM'" for the team that had no game that
// week. A played match has scoreHome/scoreAway; a scheduled-but-not
// -yet-played match has date/time instead — fill in the score once
// it's known and drop the date/time (or keep it, it's just unused).
const LEAGUE_MATCHES = [
  { week: 1, bye: 'BALKANOS' },
  { week: 1, home: "COCKY'S",     away: 'REZZEKES TEGEN',  scoreHome:  3, scoreAway: 13 },
  { week: 1, home: "BLACK'XTRAS", away: 'STB85',            scoreHome:  4, scoreAway:  4 },
  { week: 2, bye: 'STB85' },
  { week: 2, home: 'LA FAMILIA',  away: 'DE SKOETEN',       scoreHome: 14, scoreAway:  4 },
  { week: 2, home: 'GALACTICOS',  away: 'DE WEKE TINGELS',  scoreHome:  3, scoreAway:  6 },
  { week: 2, home: "COCKY'S",     away: 'POTTEKESTAMP',     scoreHome:  4, scoreAway:  9 },
  { week: 2, home: "BLACK'XTRAS", away: 'BIEMEN',            scoreHome:  1, scoreAway: 11 },
  { week: 2, home: 'BALKANOS',    away: 'REZZEKES TEGEN',   scoreHome:  6, scoreAway:  4 },
  { week: 3, bye: 'REZZEKES TEGEN' },
  { week: 3, home: 'GALACTICOS',  away: 'LA FAMILIA',       scoreHome:  4, scoreAway:  4 },
  { week: 3, home: "COCKY'S",     away: 'DE SKOETEN',       scoreHome: 10, scoreAway:  0 },
  { week: 3, home: "BLACK'XTRAS", away: 'DE WEKE TINGELS',  scoreHome:  3, scoreAway: 19 },
  { week: 3, home: 'BALKANOS',    away: 'POTTEKESTAMP',     scoreHome:  3, scoreAway:  3 },
  { week: 3, home: 'STB85',       away: 'BIEMEN',           scoreHome:  3, scoreAway: 13 },

  { week: 4, bye: 'BIEMEN' },
  { week: 4, home: "COCKY'S",     away: 'GALACTICOS',      scoreHome:  7, scoreAway:  4 },
  { week: 4, home: "BLACK'XTRAS", away: 'LA FAMILIA',      scoreHome:  2, scoreAway: 20 },
  { week: 4, home: 'BALKANOS',    away: 'DE SKOETEN',      scoreHome: 13, scoreAway:  1 },
  { week: 4, home: 'STB85',       away: 'DE WEKE TINGELS', date: '23/09/2026', time: '21:00' },
  { week: 4, home: 'REZZEKES TEGEN', away: 'POTTEKESTAMP', date: '23/09/2026', time: '22:00' },

  { week: 5, bye: 'POTTEKESTAMP' },
  { week: 5, home: "BLACK'XTRAS", away: "COCKY'S",         date: '28/09/2026', time: '20:00' },
  { week: 5, home: 'BALKANOS',    away: 'GALACTICOS',      date: '28/09/2026', time: '21:00' },
  { week: 5, home: 'STB85',       away: 'LA FAMILIA',      date: '28/09/2026', time: '22:00' },
  { week: 5, home: 'REZZEKES TEGEN', away: 'DE SKOETEN',   date: '30/09/2026', time: '21:00' },
  { week: 5, home: 'BIEMEN',      away: 'DE WEKE TINGELS', date: '30/09/2026', time: '22:00' },

  { week: 6, bye: 'DE WEKE TINGELS' },
  { week: 6, home: 'BALKANOS',    away: "BLACK'XTRAS",     date: '05/10/2026', time: '20:00' },
  { week: 6, home: 'STB85',       away: "COCKY'S",         date: '05/10/2026', time: '21:00' },
  { week: 6, home: 'REZZEKES TEGEN', away: 'GALACTICOS',   date: '05/10/2026', time: '22:00' },
  { week: 6, home: 'BIEMEN',      away: 'LA FAMILIA',      date: '07/10/2026', time: '21:00' },
  { week: 6, home: 'POTTEKESTAMP', away: 'DE SKOETEN',     date: '07/10/2026', time: '22:00' },

  { week: 7, bye: 'DE SKOETEN' },
  { week: 7, home: 'STB85',       away: 'BALKANOS',        date: '12/10/2026', time: '20:00' },
  { week: 7, home: 'REZZEKES TEGEN', away: "BLACK'XTRAS",  date: '12/10/2026', time: '21:00' },
  { week: 7, home: 'BIEMEN',      away: "COCKY'S",         date: '12/10/2026', time: '22:00' },
  { week: 7, home: 'POTTEKESTAMP', away: 'GALACTICOS',     date: '14/10/2026', time: '21:00' },
  { week: 7, home: 'DE WEKE TINGELS', away: 'LA FAMILIA',  date: '14/10/2026', time: '22:00' },

  { week: 8, bye: 'LA FAMILIA' },
  { week: 8, home: 'REZZEKES TEGEN', away: 'STB85',        date: '19/10/2026', time: '20:00' },
  { week: 8, home: 'BIEMEN',      away: 'BALKANOS',        date: '19/10/2026', time: '21:00' },
  { week: 8, home: 'POTTEKESTAMP', away: "BLACK'XTRAS",    date: '19/10/2026', time: '22:00' },
  { week: 8, home: 'DE WEKE TINGELS', away: "COCKY'S",     date: '21/10/2026', time: '21:00' },
  { week: 8, home: 'DE SKOETEN',  away: 'GALACTICOS',      date: '21/10/2026', time: '22:00' },
];

const MATCHES = [
  // ── Match 1 – 02/09/2026 ──────────────────────────────────
  {
    date: '02/09/2026',
    opponent: 'Cockys',
    goalsFor: 13,
    goalsAgainst: 3,
    players: [
      { nr:  1, present: true,  goals: 1, yellowCards: 0, redCards: 0 }, // Simon De Spiegeleer
      { nr:  2, present: true,  goals: 4, yellowCards: 0, redCards: 0 }, // Matthias Bonte
      { nr:  3, present: true,  goals: 0, yellowCards: 0, redCards: 0 }, // Yune De Donder
      { nr:  4, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Thomas Heyvaert
      { nr:  5, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Jeroen De Backer
      { nr:  6, present: true,  goals: 0, yellowCards: 0, redCards: 0 }, // Jens Du Mongh
      { nr:  7, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Lucas Lemaire
      { nr:  8, present: true,  goals: 3, yellowCards: 0, redCards: 0 }, // Vincent De Spiegeleer
      { nr:  9, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Perry Van Den Branden
      { nr: 10, present: true,  goals: 0, yellowCards: 0, redCards: 0 }, // Joran Lemaire
      { nr: 11, present: true,  goals: 0, yellowCards: 0, redCards: 0 }, // Jeroen Somers
      { nr: 12, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Jens De Rycke
      { nr: 13, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Lucas Van Droogenbroeck
      { nr: 14, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Tayson Van Bellingen
      { nr: 16, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Jonathan Van Laethem
      { nr: 91, present: true,  goals: 5, yellowCards: 0, redCards: 0 }, // Kevin Vanhuffelen
    ]
  },
  // ── Match 2 – 09/09/2026 ──────────────────────────────────
  {
    date: '09/09/2026',
    opponent: 'Balkanos',
    goalsFor: 4,
    goalsAgainst: 6,
    players: [
      { nr:  1, present: true,  goals: 0, yellowCards: 0, redCards: 0 }, // Simon De Spiegeleer
      { nr:  2, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Matthias Bonte
      { nr:  3, present: true,  goals: 0, yellowCards: 0, redCards: 0 }, // Yune De Donder
      { nr:  4, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Thomas Heyvaert
      { nr:  5, present: true,  goals: 0, yellowCards: 0, redCards: 0 }, // Jeroen De Backer
      { nr:  6, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Jens Du Mongh
      { nr:  7, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Lucas Lemaire
      { nr:  8, present: true,  goals: 0, yellowCards: 0, redCards: 0 }, // Vincent De Spiegeleer
      { nr:  9, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Perry Van Den Branden
      { nr: 10, present: true,  goals: 2, yellowCards: 0, redCards: 0 }, // Joran Lemaire
      { nr: 11, present: true,  goals: 2, yellowCards: 0, redCards: 0 }, // Jeroen Somers
      { nr: 12, present: true,  goals: 0, yellowCards: 0, redCards: 0 }, // Jens De Rycke
      { nr: 13, present: true,  goals: 0, yellowCards: 0, redCards: 0 }, // Lucas Van Droogenbroeck
      { nr: 14, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Tayson Van Bellingen
      { nr: 16, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Jonathan Van Laethem
      { nr: 91, present: true,  goals: 0, yellowCards: 0, redCards: 0 }, // Kevin Vanhuffelen
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
