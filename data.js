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

const MATCHES = [
  // ── Match 1 – 02/09/2026 ──────────────────────────────────
  {
    date: '02/09/2026',
    opponent: 'Cockys',
    goalsFor: 13,
    goalsAgainst: 3,
    players: [
      { nr:  1, present: true,  goals: 3, yellowCards: 0, redCards: 0 }, // Vincent De Spiegeleer
      { nr:  2, present: false, goals: 0, yellowCards: 0, redCards: 0 }, // Yune De Donder
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
