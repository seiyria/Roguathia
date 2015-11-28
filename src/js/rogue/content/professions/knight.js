
import Profession from '../../definitions/profession';

import * as Foods from '../items/foods';
import * as Bodys from '../items/bodys';
import * as Heads from '../items/heads';
import * as Weapons from '../items/_weapons';
import * as Wrists from '../items/wrists';
import * as Thresholds from '../../constants/skill-thresholds';
import * as Traits from '../traits/_all';

const knightConfig = {
  hp  : '2d7',
  mp  : '0d0',
  str : '3d2',
  con : '3d2',
  int : '3d2',
  dex : '3d2',
  wis : '3d2',
  cha : '3d2',
  titles: ['Gallant',, 'Esquire',,, 'Bachelor',,, 'Sergeant',,, 'Knight',,, 'Banneret',,, 'Chevalierex',,, 'Seignieur',,, 'Paladin'],
  traits: [Traits.Haste({ level: 2, req: 7 })],
  skillCaps: { bash: Thresholds.Expert, stab: Thresholds.Basic, ranged: Thresholds.Basic, slash: Thresholds.Expert, unarmed: Thresholds.Expert, force: Thresholds.Basic },
  startingItems: [
    { init: () => new Weapons.Longsword({ bucName: 'uncursed', enchantment: 1 }) },
    { init: () => new Weapons.Spear({ bucName: 'uncursed', enchantment: 1 }) },
    { init: () => new Bodys.RingMail({ bucName: 'uncursed', enchantment: 1 }) },
    { init: () => new Wrists.LeatherGloves({ bucName: 'uncursed', startIdentified: true }) },
    { init: () => new Heads.Helm({ bucName: 'uncursed', startIdentified: true }) },
    { init: () => new Foods.Apple({ charges: '1d10 + 10', bucName: 'uncursed' }) },
    { init: () => new Foods.Carrot({ charges: '1d10 + 10', bucName: 'uncursed' }) }
  ]
};

export default class Knight extends Profession {
  constructor() {
    super(knightConfig);
  }
}