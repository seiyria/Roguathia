// todo maybe make professions have their own xp/levelup stuff? that way it's not always 1/1 thief, 2/2 mage, etc. -- classes could grow at their own rates then, making some inherently more difficult than others.

import loadValue from './lib/value-assign';
import Factions from './factions';

import { Gold } from './items/special';
import * as Foods from './items/foods';
import * as Rings from './items/rings';
import * as Weapons from './items/weapons';
import * as Potions from './items/potions';
import * as Spellbooks from './items/spellbooks';
import * as Projectiles from './items/projectiles';
import * as Random from './items/random';

let defaultCfg = {
  ac  : 0,
  hp  : 0,
  mp  : 0,
  str : 0,
  con : 0,
  int : 0,
  dex : 0,
  wis : 0,
  cha : 0,
  luk : 0,
  speed: 0,
  sight: 0,
  spawnSteps: 0,
  titles: [],
  attacks: []
};

class Profession {
  constructor(config = {}) {
    config = _.clone(config); // to prevent overwriting stuff
    if(!config.addFactions) config.addFactions = [];
    config.addFactions.push(this.constructor.name);
    this.config = config;
    _.extend(this, defaultCfg, config, loadValue);
    this.level = 1;
    this.title = this.titles[0];
  }
  levelup() {
    this.level++;
    if(this.titles[this.level-1]) {
      this.title = this.titles[this.level-1];
    }
  }
}

export class Monster extends Profession {}

let touristCfg = {
  hp  : '1d5 + 5',
  mp  : '1d2 + 1',
  str : '1d3',
  con : '1d2',
  int : '1d3 - 3',
  dex : '1d2',
  wis : '1d2 - 3',
  cha : '1d3 + 1',
  luk : '1d3 - 1',
  titles: ['Rambler',, 'Sightseer',,, 'Excursionist',,, 'Perigrinator',,, 'Traveler',,, 'Journeyer',,, 'Voyager',,, 'Explorer',,, 'Adventurer'],
  startingItems: [
    { init: () => new Gold(+dice.roll('1d1000')) },
    { choices: { less: 5, more: 1 },
      choicesInit: { 
        less: () => new Projectiles.Dart({ charges: '1d5 + 5', bucName: 'uncursed' }),
        more: () => new Projectiles.Dart({ charges: '5d10 + 10', bucName: 'uncursed' })
      }
    },
    { probability: 30, init: () => new Weapons.Dagger({ bucName: 'uncursed' }) },
    { init: () => new Foods.Ration({ charges: '1d5 + 5', bucName: 'uncursed' }) },
    { init: () => new Potions.Healing({ charges: '1d3 + 1', bucName: 'blessed', startIdentified: true }) }
  ]
};

export class Tourist extends Profession {
  constructor() {
    super(touristCfg);
  }
}

let wizardCfg = {
  hp  : '1d4 + 1',
  mp  : '1d5 + 5',
  str : '1d2 - 4',
  con : '1d2 - 1',
  int : '2d3 + 1',
  dex : '1d2 - 4',
  wis : '1d2',
  cha : '1d3 - 1',
  regenHp: 40,
  regenMp: 7,
  titles: ['Evoker',, 'Conjurer',,, 'Thaumaturge',,, 'Magician',,, 'Enchantrex',,, 'Sorcerex',,, 'Necromancer',,, 'Wizard',,, 'Mage'],
  addFactions: [Factions.MAGIC],
  startingItems: [
    { init: () => Random.Ring({ bucName: 'uncursed' }) },
    { init: () => new Spellbooks.ForceBolt({ bucName: 'blessed' }) },
    { init: () => new Weapons.Quarterstaff({ bucName: 'uncursed' }) },
    { init: () => new Foods.Ration({ charges: '1d2', bucName: 'uncursed' }) },
    { init: () => new Potions.Healing({ charges: '1d2', bucName: 'uncursed' }) }
  ]
};

export class Wizard extends Profession {
  constructor() {
    super(wizardCfg);
  }
}

let rangerCfg = {
  hp  : '2d8 + 4',
  mp  : '0d0',
  str : '2d3',
  con : '1d5',
  int : '1d3',
  dex : '2d5',
  wis : '0d0',
  cha : '1d1',
  titles: ['Tenderfoot',, 'Lookout',,, 'Trailblazer',,, 'Reconnoiterex',,, 'Scout',,, 'Arbalester',,, 'Archer',,, 'Sharpshooter',,, 'Marksrex'],
  startingItems: [
    { choices: { less: 5, more: 1 },
      choicesInit: { 
        less: () => new Projectiles.Arrow({ charges: '1d10 + 5', bucName: 'uncursed' }),
        more: () => new Projectiles.Arrow({ charges: '2d10 + 10', bucName: 'uncursed' })
      }
    },
    { init: () => new Weapons.Bow({ bucName: 'uncursed' }) },
    { init: () => new Foods.Ration({ charges: '1d3', bucName: 'uncursed' }) },
    { init: () => new Potions.Healing({ charges: '1d2', bucName: 'uncursed', startIdentified: true }) }
  ]
};

export class Ranger extends Profession {
  constructor() {
    super(rangerCfg);
  }
}