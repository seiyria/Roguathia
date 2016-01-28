
import Profession from '../../definitions/profession';

import * as Foods from '../items/foods';
import * as Weapons from '../items/_weapons';
import * as Thresholds from '../../constants/skill-thresholds';
import * as Traits from '../traits/_all';

const valkyrieConfig = {
  hp  : '2d5',
  mp  : '0d0',
  str : '2d3',
  con : '1d5',
  int : '1d3',
  dex : '3d2',
  wis : '1d2',
  cha : '1d2',
  levelUp: {
    hp  : '1d4',
    mp  : '0d0',
    str : '1d2',
    con : '1d2',
    int : '1d2 - 1',
    dex : '1d2',
    wis : '1d1',
    cha : '1d2 - 1'
  },
  titles: ['Stripling',, 'Skirmisher',,, 'Fighter',,, 'Man-at-arms',,, 'Warrior',,, 'Swashbuckler',,, 'Hero',,, 'Champion',,, 'Lord'],
  traits: [Traits.IceResistance(), Traits.Stealth({ level: 2 }), Traits.Haste({ level: 3, req: 7 })],
  skillCaps: { bash: Thresholds.Expert, stab: Thresholds.Skilled, ranged: Thresholds.Expert, smash: Thresholds.Expert, thrust: Thresholds.Expert, slash: Thresholds.Expert, unarmed: Thresholds.Expert },
  startingItems: [
    { init: () => new Weapons.Spear({ bucName: 'uncursed', enchantment: 3 }) },
    { init: () => new Weapons.Dagger({ bucName: 'uncursed', enchantment: 1 }) },
    { init: () => new Foods.Ration({ charges: '1d3', bucName: 'uncursed' }) }
  ]
};

export default class Valkyrie extends Profession {
  constructor() {
    super(valkyrieConfig);
  }
}