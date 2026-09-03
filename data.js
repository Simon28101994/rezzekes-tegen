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
  // Add a match object here after each game, for example:
  // {
  //   date: '07/09/2025',
  //   opponent: 'Tegenstander FC',
  //   goalsFor: 3,
  //   goalsAgainst: 1,
  //   players: [
  //     { nr: 6,  present: true,  goals: 2, yellowCards: 0, redCards: 0 },
  //     { nr: 9,  present: true,  goals: 1, yellowCards: 1, redCards: 0 },
  //     { nr: 11, present: false, goals: 0, yellowCards: 0, redCards: 0 },
  //   ]
  // },
];
