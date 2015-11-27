
import Profession from '../../definitions/profession';

import * as Potions from '../items/potions';
import * as Weapons from '../items/_weapons';
import * as Bodys from '../items/bodys';
import * as Thresholds from '../../constants/skill-thresholds';
import * as Traits from '../traits/_all';

const priestConfig = {
  hp  : '2d5',
  mp  : '0d0',
  str : '1d2',
  con : '1d2',
  int : '2d2',
  dex : '1d2',
  wis : '3d2',
  cha : '1d2',
  titles: ['Aspirant',, 'Acolyte',,, 'Adept',,, 'Priest',,, 'Curate',,, 'Canon',,, 'Lama',,, 'Patriarch',,, 'High Priest'],
  traits: [
    Traits.Warning({ level: 15, req: 15 }), Traits.FireResistance({ req: 20 })
  ],
  skillCaps: { bash: Thresholds.Expert, unarmed: Thresholds.Basic, stab: Thresholds.Skilled, ranged: Thresholds.Basic, smash: Thresholds.Skilled, thrust: Thresholds.Skilled },
  startingItems: [
    { init: () => new Weapons.Mace({ bucName: 'uncursed', enchantment: 1 }) },
    { init: () => new Bodys.Robe({ bucName: 'uncursed', enchantment: 1 }) },
    { init: () => new Potions.Healing({ charges: '1d1', bucName: 'uncursed', startIdentified: true }) }
  ]
};

export default class Priest extends Profession {
  constructor() {
    super(priestConfig);
  }
}