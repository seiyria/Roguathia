
import Profession from '../../definitions/profession';

import Factions from '../../constants/factions';

import * as Foods from '../items/foods';
import * as Weapons from '../items/_weapons';
import * as Potions from '../items/potions';
import * as Spellbooks from '../items/spellbooks';
import * as Random from '../../constants/random';
import * as Thresholds from '../../constants/skill-thresholds';

const wizardCfg = {
  hp  : '1d2 + 1',
  mp  : '1d5 + 5',
  str : '1d2',
  con : '1d2',
  int : '2d3 + 1',
  dex : '1d2 - 1',
  wis : '1d2',
  cha : '1d3 - 1',
  levelUp: {
    hp  : '1d2 - 1',
    mp  : '1d4 + 1',
    str : '1d2 - 1',
    con : '1d2 - 1',
    int : '1d2',
    dex : '1d2 - 1',
    wis : '1d1',
    cha : '1d2 - 1'
  },
  regenHp: 20,
  regenMp: -3,
  titles: ['Evoker',, 'Conjurer',,, 'Thaumaturge',,, 'Magician',,, 'Enchantrex',,, 'Sorcerex',,, 'Necromancer',,, 'Wizard',,, 'Mage'],
  skillCaps: { bash: Thresholds.Skilled, stab: Thresholds.Skilled, force: Thresholds.Expert },
  addFactions: [Factions.MAGIC],
  startingItems: [
    { init: () => Random.Ring({ bucName: 'uncursed' }) },
    { init: () => Random.Wand({ bucName: 'uncursed' }) },
    { init: () => new Spellbooks.ForceBolt({ bucName: 'blessed' }) },
    { init: () => new Weapons.Quarterstaff({ bucName: 'uncursed' }) },
    { init: () => new Foods.Ration({ charges: '1d2', bucName: 'uncursed' }) },
    { init: () => new Potions.Healing({ charges: '1d2', bucName: 'uncursed' }) }
  ]
};

export default class Wizard extends Profession {
  constructor() {
    super(wizardCfg);
  }
}