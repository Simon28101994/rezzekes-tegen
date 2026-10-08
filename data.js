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
  { date: '12/10/2026', time: '21:00', opponent: "Black'Xtras",  home: true  },
  { date: '19/10/2026', time: '20:00', opponent: 'STB85',        home: true  },
  { date: '26/10/2026', time: '20:00', opponent: 'Biemen',          home: false },
  { date: '16/11/2026', time: '21:00', opponent: 'De Weke Tingels', home: false },
  { date: '23/11/2026', time: '22:00', opponent: 'La Familia',      home: false },
];

const LEADERBOARD = {
  // Computed locally: official 5-10 table + week 6 results played on 07/10.
  // Replace with the real published table once available.
  publishedDate: '07/10/2026',
  teams: [
    { pos:  1, name: "BALKANOS",         gsp: 5, gew: 4, gel: 1, verl: 0, goalsFor: 43, goalsAgainst: 15, saldo:  28, ptn: 13 },
    { pos:  2, name: "COCKY'S",          gsp: 6, gew: 4, gel: 0, verl: 2, goalsFor: 70, goalsAgainst: 30, saldo:  40, ptn: 12 },
    { pos:  3, name: "DE WEKE TINGELS",  gsp: 4, gew: 4, gel: 0, verl: 0, goalsFor: 47, goalsAgainst: 15, saldo:  32, ptn: 12 },
    { pos:  4, name: "LA FAMILIA",       gsp: 5, gew: 3, gel: 1, verl: 1, goalsFor: 48, goalsAgainst: 14, saldo:  34, ptn: 10 },
    { pos:  5, name: "POTTEKESTAMP",     gsp: 4, gew: 3, gel: 1, verl: 0, goalsFor: 34, goalsAgainst: 15, saldo:  19, ptn: 10 },
    { pos:  6, name: "BIEMEN",           gsp: 4, gew: 3, gel: 0, verl: 1, goalsFor: 32, goalsAgainst: 12, saldo:  20, ptn:  9 },
    { pos:  7, name: "REZZEKES TEGEN",   gsp: 5, gew: 3, gel: 0, verl: 2, goalsFor: 36, goalsAgainst: 28, saldo:   8, ptn:  9 },
    { pos:  8, name: "GALACTICOS",       gsp: 5, gew: 0, gel: 1, verl: 4, goalsFor: 19, goalsAgainst: 30, saldo: -11, ptn:  1 },
    { pos:  9, name: "STB85",            gsp: 5, gew: 0, gel: 1, verl: 4, goalsFor: 13, goalsAgainst: 67, saldo: -54, ptn:  1 },
    { pos: 10, name: "BLACK'XTRAS",      gsp: 6, gew: 0, gel: 1, verl: 5, goalsFor: 17, goalsAgainst: 90, saldo: -73, ptn:  1 },
    { pos: 11, name: "DE SKOETEN",       gsp: 5, gew: 0, gel: 0, verl: 5, goalsFor: 16, goalsAgainst: 59, saldo: -43, ptn:  0 },
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
  { week: 4, home: 'STB85',       away: 'DE WEKE TINGELS', scoreHome:  5, scoreAway: 15 },
  { week: 4, home: 'REZZEKES TEGEN', away: 'POTTEKESTAMP', scoreHome:  2, scoreAway:  9 },

  { week: 5, bye: 'POTTEKESTAMP' },
  { week: 5, home: "BLACK'XTRAS", away: "COCKY'S",         scoreHome:  3, scoreAway: 20 },
  { week: 5, home: 'BALKANOS',    away: 'GALACTICOS',      scoreHome:  5, scoreAway:  3 },
  { week: 5, home: 'STB85',       away: 'LA FAMILIA',      scoreHome:  0, scoreAway:  9 },
  { week: 5, home: 'REZZEKES TEGEN', away: 'DE SKOETEN',   scoreHome:  9, scoreAway:  5 },
  { week: 5, home: 'BIEMEN',      away: 'DE WEKE TINGELS', scoreHome:  4, scoreAway:  7 },

  { week: 6, bye: 'DE WEKE TINGELS' },
  { week: 6, home: 'BALKANOS',    away: "BLACK'XTRAS",     scoreHome: 16, scoreAway:  4 },
  { week: 6, home: 'STB85',       away: "COCKY'S",         scoreHome:  1, scoreAway: 26 },
  { week: 6, home: 'REZZEKES TEGEN', away: 'GALACTICOS', scoreHome: 8, scoreAway: 5 },
  { week: 6, home: 'BIEMEN',      away: 'LA FAMILIA',      scoreHome:  4, scoreAway:  1 },
  { week: 6, home: 'POTTEKESTAMP', away: 'DE SKOETEN',     scoreHome: 13, scoreAway:  6 },

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

  { week: 9, bye: 'GALACTICOS' },
  { week: 9, home: 'BIEMEN',      away: 'REZZEKES TEGEN',  date: '26/10/2026', time: '20:00' },
  { week: 9, home: 'POTTEKESTAMP', away: 'STB85',          date: '26/10/2026', time: '21:00' },
  { week: 9, home: 'DE WEKE TINGELS', away: 'BALKANOS',    date: '26/10/2026', time: '22:00' },
  { week: 9, home: 'DE SKOETEN',  away: "BLACK'XTRAS",     date: '28/10/2026', time: '21:00' },
  { week: 9, home: 'LA FAMILIA',  away: "COCKY'S",         date: '28/10/2026', time: '22:00' },

  // Restweek 1 sits between week 9 and week 10 (week 9.5 only for sorting)
  { week: 9.5, label: 'Restweek 1', home: 'DE SKOETEN', away: 'DE WEKE TINGELS', date: '09/11/2026', time: '20:00' },
  { week: 9.5, home: 'LA FAMILIA',  away: 'POTTEKESTAMP',   date: '09/11/2026', time: '21:00' },
  { week: 9.5, home: 'GALACTICOS',  away: 'BIEMEN',         date: '09/11/2026', time: '22:00' },

  { week: 10, bye: "COCKY'S" },
  { week: 10, home: 'POTTEKESTAMP', away: 'BIEMEN',        date: '16/11/2026', time: '20:00' },
  { week: 10, home: 'DE WEKE TINGELS', away: 'REZZEKES TEGEN', date: '16/11/2026', time: '21:00' },
  { week: 10, home: 'DE SKOETEN',  away: 'STB85',          date: '16/11/2026', time: '22:00' },
  { week: 10, home: 'LA FAMILIA',  away: 'BALKANOS',       date: '18/11/2026', time: '21:00' },
  { week: 10, home: 'GALACTICOS',  away: "BLACK'XTRAS",    date: '18/11/2026', time: '22:00' },

  { week: 11, bye: "BLACK'XTRAS" },
  { week: 11, home: 'DE WEKE TINGELS', away: 'POTTEKESTAMP', date: '23/11/2026', time: '20:00' },
  { week: 11, home: 'GALACTICOS',  away: 'STB85',          date: '23/11/2026', time: '21:00' },
  { week: 11, home: 'LA FAMILIA',  away: 'REZZEKES TEGEN', date: '23/11/2026', time: '22:00' },
  { week: 11, home: 'DE SKOETEN',  away: 'BIEMEN',         date: '25/11/2026', time: '21:00' },
  { week: 11, home: "COCKY'S",     away: 'BALKANOS',       date: '25/11/2026', time: '22:00' },
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
  // ── Match 3 – 23/09/2026 ──────────────────────────────────
  {
    date: '23/09/2026',
    opponent: 'Pottekestamp',
    goalsFor: 2,
    goalsAgainst: 9,
    players: [
      { nr:  1, present: true,  goals: 0, yellowCards: 0, redCards: 0 }, // Simon De Spiegeleer
      { nr:  2, present: true,  goals: 0, yellowCards: 0, redCards: 0 }, // Matthias Bonte
      { nr:  3, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Yune De Donder
      { nr:  4, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Thomas Heyvaert
      { nr:  5, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Jeroen De Backer
      { nr:  6, present: true,  goals: 0, yellowCards: 0, redCards: 0 }, // Jens Du Mongh
      { nr:  7, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Lucas Lemaire
      { nr:  8, present: true,  goals: 0, yellowCards: 0, redCards: 0 }, // Vincent De Spiegeleer
      { nr:  9, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Perry Van Den Branden
      { nr: 10, present: true,  goals: 1, yellowCards: 0, redCards: 0 }, // Joran Lemaire
      { nr: 11, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Jeroen Somers
      { nr: 12, present: true,  goals: 1, yellowCards: 0, redCards: 0 }, // Jens De Rycke
      { nr: 13, present: true,  goals: 0, yellowCards: 0, redCards: 0 }, // Lucas Van Droogenbroeck
      { nr: 14, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Tayson Van Bellingen
      { nr: 16, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Jonathan Van Laethem
      { nr: 91, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Kevin Vanhuffelen
    ]
  },
  // ── Match 4 – 30/09/2026 ──────────────────────────────────
  {
    date: '30/09/2026',
    opponent: 'De Skoeten',
    goalsFor: 9,
    goalsAgainst: 5,
    players: [
      { nr:  1, present: true,  goals: 2, yellowCards: 0, redCards: 0 }, // Simon De Spiegeleer
      { nr:  2, present: true,  goals: 3, yellowCards: 0, redCards: 0 }, // Matthias Bonte
      { nr:  3, present: true,  goals: 0, yellowCards: 0, redCards: 0 }, // Yune De Donder
      { nr:  4, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Thomas Heyvaert
      { nr:  5, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Jeroen De Backer
      { nr:  6, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Jens Du Mongh
      { nr:  7, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Lucas Lemaire
      { nr:  8, present: true,  goals: 2, yellowCards: 0, redCards: 0 }, // Vincent De Spiegeleer
      { nr:  9, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Perry Van Den Branden
      { nr: 10, present: true,  goals: 1, yellowCards: 0, redCards: 0 }, // Joran Lemaire
      { nr: 11, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Jeroen Somers
      { nr: 12, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Jens De Rycke
      { nr: 13, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Lucas Van Droogenbroeck
      { nr: 14, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Tayson Van Bellingen
      { nr: 16, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Jonathan Van Laethem
      { nr: 91, present: true,  goals: 1, yellowCards: 0, redCards: 0 }, // Kevin Vanhuffelen
    ]
  },
  // ── Match 5 – 05/10/2026 ──────────────────────────────────
  {
    date: '05/10/2026',
    opponent: 'Galacticos',
    goalsFor: 8,
    goalsAgainst: 5,
    players: [
      { nr:  1, present: true,  goals: 1, yellowCards: 0, redCards: 0 }, // Simon De Spiegeleer
      { nr:  2, present: true,  goals: 3, yellowCards: 1, redCards: 0 }, // Matthias Bonte
      { nr:  3, present: true,  goals: 0, yellowCards: 1, redCards: 0 }, // Yune De Donder
      { nr:  4, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Thomas Heyvaert
      { nr:  5, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Jeroen De Backer
      { nr:  6, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Jens Du Mongh
      { nr:  7, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Lucas Lemaire
      { nr:  8, present: true,  goals: 2, yellowCards: 0, redCards: 0 }, // Vincent De Spiegeleer
      { nr:  9, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Perry Van Den Branden
      { nr: 10, present: true,  goals: 1, yellowCards: 0, redCards: 0 }, // Joran Lemaire
      { nr: 11, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Jeroen Somers
      { nr: 12, present: true,  goals: 0, yellowCards: 0, redCards: 0 }, // Jens De Rycke
      { nr: 13, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Lucas Van Droogenbroeck
      { nr: 14, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Tayson Van Bellingen
      { nr: 16, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Jonathan Van Laethem
      { nr: 91, present: true,  goals: 1, yellowCards: 0, redCards: 0 }, // Kevin Vanhuffelen
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
