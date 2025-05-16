export interface RuleContent {
  title?: string;
  text: string;
}

export interface RuleSection {
  id: string;
  title: string;
  content: RuleContent[];
}

const rules: RuleSection[] = [
  {
    id: 'game-basics',
    title: 'Game Basics',
    content: [
      {
        title: 'Game Overview',
        text: 'Warcrow is a tabletop wargame set in a world of dark fantasy. Players control armies from different factions, each with unique strengths and abilities. The goal is to complete objectives while defeating your opponent\'s forces.'
      },
      {
        title: 'Army Composition',
        text: 'Each army consists of units organized into Troops, Elites, Heroes, Monsters, and War Machines. Your army must follow specific composition rules based on the points level of the game.'
      },
      {
        title: 'Standard Game',
        text: 'A standard game of Warcrow is played at 300 points. Your army must include at least one Hero and one Troops unit. You cannot have more than one Monster or War Machine per 100 points.'
      }
    ]
  },
  {
    id: 'turn-sequence',
    title: 'Turn Sequence',
    content: [
      {
        text: 'Each game round consists of the following phases:'
      },
      {
        title: '1. Command Phase',
        text: 'Players allocate command points to units, determine initiative, and reveal objective cards.'
      },
      {
        title: '2. Movement Phase',
        text: 'Units move across the battlefield. Running allows extra movement but prevents shooting.'
      },
      {
        title: '3. Shooting Phase',
        text: 'Units with ranged weapons make shooting attacks against enemy units.'
      },
      {
        title: '4. Charge Phase',
        text: 'Units can charge into combat with enemy units within range.'
      },
      {
        title: '5. Combat Phase',
        text: 'Units in combat make melee attacks against enemy units.'
      },
      {
        title: '6. Morale Phase',
        text: 'Units that have suffered casualties must make morale checks or flee.'
      }
    ]
  },
  {
    id: 'movement',
    title: 'Movement',
    content: [
      {
        text: 'During the Movement phase, each unit can move up to its Movement characteristic in inches. Units cannot move through other units or impassable terrain.'
      },
      {
        title: 'Run',
        text: 'Instead of a normal move, a unit can run, moving up to twice its Movement characteristic. A unit that runs cannot shoot or charge in the same turn (unless a special rule states otherwise).'
      },
      {
        title: 'Difficult Terrain',
        text: 'Units moving through difficult terrain halve their Movement characteristic for that move.'
      }
    ]
  },
  {
    id: 'combat',
    title: 'Combat',
    content: [
      {
        title: 'Making Attacks',
        text: 'To make an attack, roll a die for each attack the unit has. A roll equal to or higher than the unit\'s Combat or Shooting characteristic (depending on the type of attack) is a hit. For each hit, roll a die against the target\'s Defense. If the roll equals or exceeds the target\'s Defense, the hit causes a wound.'
      },
      {
        title: 'Saving Throws',
        text: 'When a unit suffers a wound, it may make a saving throw if it has one. Roll a die for each wound; on the required result or higher, the wound is saved and has no effect.'
      },
      {
        title: 'Multiple Wounds',
        text: 'Some units have more than one wound. When such a unit loses its last wound, it is removed from play.'
      }
    ]
  },
  {
    id: 'morale',
    title: 'Morale',
    content: [
      {
        text: 'When a unit loses one or more models to wounds in a single phase, it must take a morale check in the Morale phase. Roll a die and add the number of models lost from the unit in this turn. If the result is higher than the unit\'s Bravery characteristic, the unit fails the morale check and must retreat.'
      },
      {
        title: 'Retreating',
        text: 'A retreating unit must move directly toward its own table edge by the shortest route, and away from enemy units if possible. It cannot shoot, charge, or fight in its next turn.'
      },
      {
        title: 'Rally',
        text: 'A retreating unit can attempt to rally in its next Command phase by rolling a die. On a 4+, the unit rallies and can act normally from that point on.'
      }
    ]
  },
  {
    id: 'terrain',
    title: 'Terrain',
    content: [
      {
        title: 'Cover',
        text: 'Units that are in or behind terrain features that provide cover gain +1 to their save rolls against shooting attacks.'
      },
      {
        title: 'Line of Sight',
        text: 'To target a unit with a shooting attack, the attacking unit must be able to see it. Line of sight is blocked by terrain features that are taller than the units involved.'
      },
      {
        title: 'Terrain Types',
        text: 'Common terrain types include forests (difficult terrain, provides cover), buildings (impassable, units can garrison them), hills (provides line of sight advantage), and obstacles (difficult terrain, provides cover).'
      }
    ]
  },
  {
    id: 'special-rules',
    title: 'Special Rules',
    content: [
      {
        title: 'Command Abilities',
        text: 'Hero units have unique command abilities that can be used by spending command points during the Command phase.'
      },
      {
        title: 'Faction Abilities',
        text: 'Each faction has unique abilities that affect all units in the army. These reflect the faction\'s fighting style and cultural strengths.'
      },
      {
        title: 'Magical Attacks',
        text: 'Some units can make magical attacks, which ignore certain types of saves. These are noted in the unit\'s abilities.'
      },
      {
        title: 'Flying',
        text: 'Units with the Flying ability can move over other units and terrain features without penalty, but must end their movement in a valid position.'
      }
    ]
  },
  {
    id: 'victory',
    title: 'Victory Conditions',
    content: [
      {
        text: 'Victory in Warcrow is determined by victory points earned from completing objectives and destroying enemy units. The player with the most victory points at the end of the game is the winner.'
      },
      {
        title: 'Primary Objectives',
        text: 'Each game has primary objectives worth significant victory points. These are determined by the scenario being played.'
      },
      {
        title: 'Secondary Objectives',
        text: 'Players can choose secondary objectives that fit their army\'s strengths. These are worth fewer points than primary objectives but can add up over the course of the game.'
      },
      {
        title: 'Tiebreakers',
        text: 'In case of a tie, the player who has destroyed more points of enemy units wins. If still tied, the player with more surviving Heroes wins.'
      }
    ]
  }
];

export const getRules = (): RuleSection[] => rules;