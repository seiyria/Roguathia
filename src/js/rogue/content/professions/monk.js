
import Profession from '../../definitions/profession';

import * as Foods from '../items/foods';
import * as Potions from '../items/potions';
import * as Bodys from '../items/bodys';
import * as Wrists from '../items/wrists';
import * as Thresholds from '../../constants/skill-thresholds';
import * as Traits from '../traits/_all';

const monkConfig = {
  hp  : '2d5',
  mp  : '1d7',
  str : '4d2',
  con : '2d2',
  int : '1d2',
  dex : '4d2',
  wis : '1d2',
  cha : '1d1',
  titles: ['Candidate',, 'Novice',,, 'Initiate',,, 'Student of Stones',,, 'Student of Waters',,, 'Student of Metals',,, 'Student of Winds',,, 'Student of Fire',,, 'Master'],
  traits: [
    Traits.PoisonResistance({ req: 3 }), Traits.Stealth({ level: 3, req: 5 }), Traits.Warning({ level: 2, req: 7 }),
    Traits.Haste({ level: 4, req: 9 }), Traits.FireResistance({ req: 11 }), Traits.IceResistance({ req: 13 }),
    Traits.ShockResistance({ req: 15 }), Traits.Infravision({ level: 3, req: 17 }), Traits.Protection({ level: 1, req: 19 })
  ],
  skillCaps: { bash: Thresholds.Basic, unarmed: Thresholds.Grandmaster, force: Thresholds.Basic },
  startingItems: [
    { init: () => new Bodys.Robe({ bucName: 'uncursed', enchantment: 2 }) },
    { init: () => new Wrists.LeatherGloves({ bucName: 'uncursed', enchantment: 2, startIdentified: true }) },
    { init: () => new Potions.Healing({ charges: '1d1', bucName: 'uncursed', startIdentified: true }) },
    { init: () => new Foods.Ration({ charges: '1d3 + 3', bucName: 'uncursed' }) },
    { init: () => new Foods.Apple({ charges: '1d5 + 5', bucName: 'uncursed' }) },
    { init: () => new Foods.Carrot({ charges: '1d5 + 5', bucName: 'uncursed' }) }
  ]
};

export default class Monk extends Profession {
  constructor() {
    super(monkConfig);
  }
}