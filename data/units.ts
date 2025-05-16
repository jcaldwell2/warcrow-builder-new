export interface UnitAbility {
  name: string;
  description: string;
}

export interface Unit {
  id: string;
  name: string;
  faction: string;
  factionKey: string;
  type: string;
  points: number;
  movement: number;
  combat: number;
  shooting: number;
  bravery: number;
  wounds: number;
  description?: string;
  imageUrl?: string;
  abilities?: UnitAbility[];
}

const units: Unit[] = [
  // Twilight Kingdom
  {
    id: 'tk-royal-guard',
    name: 'Royal Guard',
    faction: 'twilight-kingdom',
    factionKey: 'twilightKingdom',
    type: 'Troops',
    points: 80,
    movement: 5,
    combat: 4,
    shooting: 3,
    bravery: 4,
    wounds: 1,
    description: 'Elite warriors of the Twilight Kingdom, sworn to protect the royal lineage.',
    imageUrl: 'https://images.pexels.com/photos/6542756/pexels-photo-6542756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    abilities: [
      {
        name: 'Shield Wall',
        description: 'When this unit is the target of a shooting attack, reduce the damage suffered by 1 (to a minimum of 1).'
      },
      {
        name: 'For the Kingdom!',
        description: 'This unit can reroll failed bravery checks when within 6" of a Hero unit.'
      }
    ]
  },
  {
    id: 'tk-archmage',
    name: 'Archmage',
    faction: 'twilight-kingdom',
    factionKey: 'twilightKingdom',
    type: 'Hero',
    points: 120,
    movement: 6,
    combat: 3,
    shooting: 5,
    bravery: 5,
    wounds: 4,
    description: 'Powerful spellcaster who has mastered the ancient arcane arts of the Twilight Kingdom.',
    imageUrl: 'https://images.pexels.com/photos/6540980/pexels-photo-6540980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    abilities: [
      {
        name: 'Arcane Bolt',
        description: 'Once per turn, choose an enemy unit within 12". That unit suffers 1D3 wounds.'
      },
      {
        name: 'Magical Barrier',
        description: 'This unit has a 5+ ward save against all damage.'
      }
    ]
  },
  {
    id: 'tk-dragon-knight',
    name: 'Dragon Knight',
    faction: 'twilight-kingdom',
    factionKey: 'twilightKingdom',
    type: 'Elite',
    points: 150,
    movement: 8,
    combat: 5,
    shooting: 0,
    bravery: 4,
    wounds: 3,
    description: 'Mounted warriors who ride enchanted drakes into battle.',
    imageUrl: 'https://images.pexels.com/photos/6540947/pexels-photo-6540947.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    abilities: [
      {
        name: 'Drake\'s Breath',
        description: 'Once per battle, this unit can make a shooting attack with a range of 8" and damage of 1D6.'
      }
    ]
  },
  
  // Mercenary Guild
  {
    id: 'mg-gunslinger',
    name: 'Gunslinger',
    faction: 'mercenary-guild',
    factionKey: 'mercenaryGuild',
    type: 'Hero',
    points: 100,
    movement: 6,
    combat: 3,
    shooting: 5,
    bravery: 4,
    wounds: 3,
    description: 'A deadly marksman with unparalleled accuracy and a notorious reputation.',
    imageUrl: 'https://images.pexels.com/photos/8112157/pexels-photo-8112157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    abilities: [
      {
        name: 'Quickdraw',
        description: 'This unit always shoots first in the shooting phase.'
      },
      {
        name: 'Deadly Aim',
        description: 'When this unit makes a shooting attack, it scores a critical hit on a roll of 5+.'
      }
    ]
  },
  {
    id: 'mg-mercenary-squad',
    name: 'Mercenary Squad',
    faction: 'mercenary-guild',
    factionKey: 'mercenaryGuild',
    type: 'Troops',
    points: 70,
    movement: 5,
    combat: 3,
    shooting: 4,
    bravery: 3,
    wounds: 1,
    description: 'Hired guns who fight for coin rather than cause.',
    imageUrl: 'https://images.pexels.com/photos/8112162/pexels-photo-8112162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    abilities: [
      {
        name: 'Take Cover',
        description: 'When this unit is in cover, it gains +2 to its save rolls instead of +1.'
      }
    ]
  },
  {
    id: 'mg-artillery',
    name: 'Heavy Artillery',
    faction: 'mercenary-guild',
    factionKey: 'mercenaryGuild',
    type: 'War Machine',
    points: 140,
    movement: 3,
    combat: 2,
    shooting: 5,
    bravery: 3,
    wounds: 5,
    description: 'Devastating long-range weapon that can turn the tide of battle.',
    imageUrl: 'https://images.pexels.com/photos/8112122/pexels-photo-8112122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    abilities: [
      {
        name: 'Bombardment',
        description: 'This unit can target enemy units that are not visible to it. When it does so, reduce its shooting by 1.'
      },
      {
        name: 'Splash Damage',
        description: 'When this unit successfully hits a target, all enemy units within 3" of the target suffer 1 wound.'
      }
    ]
  },
  
  // First Temporal
  {
    id: 'ft-chronomancer',
    name: 'Chronomancer',
    faction: 'first-temporal',
    factionKey: 'firstTemporal',
    type: 'Hero',
    points: 140,
    movement: 7,
    combat: 3,
    shooting: 4,
    bravery: 5,
    wounds: 4,
    description: 'Master of time who can manipulate the flow of battle.',
    imageUrl: 'https://images.pexels.com/photos/3760609/pexels-photo-3760609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    abilities: [
      {
        name: 'Time Slip',
        description: 'Once per battle, this unit can be placed anywhere on the battlefield more than 9" away from enemy units.'
      },
      {
        name: 'Temporal Shield',
        description: 'This unit can force an enemy to reroll a successful hit roll once per turn.'
      }
    ]
  },
  {
    id: 'ft-temporal-warrior',
    name: 'Temporal Warrior',
    faction: 'first-temporal',
    factionKey: 'firstTemporal',
    type: 'Troops',
    points: 85,
    movement: 6,
    combat: 4,
    shooting: 3,
    bravery: 4,
    wounds: 1,
    description: 'Soldiers who can briefly step outside the flow of time to gain tactical advantages.',
    imageUrl: 'https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    abilities: [
      {
        name: 'Phase Shift',
        description: 'This unit can retreat and still charge in the same turn.'
      }
    ]
  },
  {
    id: 'ft-paradox-beast',
    name: 'Paradox Beast',
    faction: 'first-temporal',
    factionKey: 'firstTemporal',
    type: 'Monster',
    points: 200,
    movement: 8,
    combat: 5,
    shooting: 0,
    bravery: 4,
    wounds: 6,
    description: 'A creature born from a temporal anomaly, existing in multiple timestreams simultaneously.',
    imageUrl: 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    abilities: [
      {
        name: 'Temporal Echo',
        description: 'This unit can make two combat attacks instead of one, but the second attack has -1 to hit.'
      },
      {
        name: 'Reality Tear',
        description: 'Enemy units within 3" of this unit suffer -1 to their hit rolls.'
      }
    ]
  },
  
  // Drake Hold
  {
    id: 'dh-drake-rider',
    name: 'Drake Rider',
    faction: 'drake-hold',
    factionKey: 'drakeHold',
    type: 'Elite',
    points: 130,
    movement: 9,
    combat: 4,
    shooting: 3,
    bravery: 4,
    wounds: 3,
    description: 'Warriors mounted on fierce drakes, combining speed with deadly attacks.',
    imageUrl: 'https://images.pexels.com/photos/2534423/pexels-photo-2534423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    abilities: [
      {
        name: 'Swift Strike',
        description: 'This unit can charge after running in the same turn.'
      },
      {
        name: 'Drake Bite',
        description: 'When this unit rolls a 6 to hit in combat, that hit causes 2 wounds instead of 1.'
      }
    ]
  },
  {
    id: 'dh-beastmaster',
    name: 'Beastmaster',
    faction: 'drake-hold',
    factionKey: 'drakeHold',
    type: 'Hero',
    points: 110,
    movement: 6,
    combat: 4,
    shooting: 3,
    bravery: 4,
    wounds: 4,
    description: 'A skilled tamer who commands drakes and beasts with unnatural control.',
    imageUrl: 'https://images.pexels.com/photos/2534441/pexels-photo-2534441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    abilities: [
      {
        name: 'Command Beast',
        description: 'Drake units within 12" of this unit can reroll failed charge rolls.'
      },
      {
        name: 'Whip Crack',
        description: 'This unit has a 12" range attack that does 1 damage but does not benefit from modifiers.'
      }
    ]
  },
  {
    id: 'dh-elder-drake',
    name: 'Elder Drake',
    faction: 'drake-hold',
    factionKey: 'drakeHold',
    type: 'Monster',
    points: 220,
    movement: 8,
    combat: 5,
    shooting: 4,
    bravery: 5,
    wounds: 8,
    description: 'An ancient drake of immense size and power, capable of devastating breath attacks.',
    imageUrl: 'https://images.pexels.com/photos/2522656/pexels-photo-2522656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    abilities: [
      {
        name: 'Fiery Breath',
        description: 'This unit can make a shooting attack with a range of 12" that hits all units (friend and foe) in a straight line.'
      },
      {
        name: 'Terrifying Presence',
        description: 'Enemy units within 8" must subtract 1 from their bravery characteristic.'
      },
      {
        name: 'Thick Scales',
        description: 'This unit has a 4+ ward save against damage caused by shooting attacks.'
      }
    ]
  }
];

export const getAllUnits = (): Unit[] => units;

export const getUnitsByFaction = (factionId: string): Unit[] => 
  units.filter(unit => unit.faction === factionId);

export const getUnitById = (unitId: string): Unit | undefined =>
  units.find(unit => unit.id === unitId);