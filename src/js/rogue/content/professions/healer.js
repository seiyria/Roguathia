
import Profession from '../../definitions/profession';

import Roll from '../../lib/dice-roller';
import { Gold } from '../items/_special';
import * as Foods from '../items/foods';
import * as Potions from '../items/potions';
import * as Spellbooks from '../items/spellbooks';
import * as Weapons from '../items/_weapons';
import * as Wrists from '../items/wrists';
import * as Thresholds from '../../constants/skill-thresholds';
import * as Traits from '../traits/_all';

const healerConfig = {
  hp  : '10d5',
  mp  : '3d3',
  str : '1d2',
  con : '1d2',
  int : '2d2',
  dex : '1d2',
  wis : '2d3',
  cha : '1d1',
  titles: ['Rhizotomist',, 'Empiric',,, 'Embalmer',,, 'Dresser',,, 'Medicus ossium',,, 'Herbalist',,, 'Magisterex',,, 'Physician',,, 'Chirurgeon'],
  traits: [Traits.Warning({ level: 15, req: 15 }), Traits.PoisonResistance()],
  skillCaps: { bash: Thresholds.Expert, stab: Thresholds.Skilled, ranged: Thresholds.Basic, slash: Thresholds.Basic, unarmed: Thresholds.Basic },
  startingItems: [
    { init: () => new Gold(Roll('1d1000 + 1000')) },
    { init: () => new Weapons.Scalpel({ bucName: 'uncursed' }) },
    { init: () => new Wrists.LeatherGloves({ enchantment: 2, bucName: 'uncursed', startIdentified: true }) },
    { init: () => new Spellbooks.CureSelf({ bucName: 'blessed', startIdentified: true }) },
    { init: () => new Spellbooks.ExtraCureSelf({ bucName: 'blessed', startIdentified: true }) },
    { init: () => new Foods.Apple({ charges: '1d4 + 4', bucName: 'uncursed' }) },
    { init: () => new Potions.Healing({ charges: '4d1', bucName: 'uncursed', startIdentified: true }) },
    { init: () => new Potions.ExtraHealing({ charges: '4d1', bucName: 'uncursed', startIdentified: true }) }
  ]
};

export default class Healer extends Profession {
  constructor() {
    super(healerConfig);
  }
}