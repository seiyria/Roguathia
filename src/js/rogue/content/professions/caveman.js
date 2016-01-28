
import Profession from '../../definitions/profession';

import * as Weapons from '../items/_weapons';
import * as Bodys from '../items/bodys';
import * as Projectiles from '../items/projectiles';
import * as Thresholds from '../../constants/skill-thresholds';
import * as Traits from '../traits/_all';

const cavemanConfig = {
  hp  : '4d4',
  mp  : '0d0',
  str : '6d2',
  con : '1d2',
  int : '1d1',
  dex : '1d2',
  wis : '1d1',
  cha : '1d1',
  levelUp: {
    hp  : '1d4',
    mp  : '0d0',
    str : '2d2',
    con : '1d2',
    int : '1d1',
    dex : '1d2',
    wis : '1d1',
    cha : '0d0'
  },
  titles: ['Troglodyte',, 'Aborigine',,, 'Wanderer',,, 'Vagrant',,, 'Wayfarer',,, 'Roamer',,, 'Nomad',,, 'Rover',,, 'Pioneer'],
  traits: [Traits.Warning({ level: 3, req: 15 }), Traits.Haste({ level: 2, req: 7 })],
  skillCaps: { bash: Thresholds.Expert, stab: Thresholds.Basic, ranged: Thresholds.Basic, shot: Thresholds.Basic, unarmed: Thresholds.Master },
  startingItems: [
    { init: () => new Weapons.Club({ bucName: 'uncursed', enchantment: 1 }) },
    { init: () => new Weapons.Sling({ bucName: 'uncursed', enchantment: 2 }) },
    { init: () => new Projectiles.FlintStone({ charges: '1d12 + 10', bucName: 'uncursed' }) },
    { init: () => new Projectiles.Rock({ charges: '1d15 + 18', bucName: 'uncursed' }) },
    { init: () => new Bodys.StuddedLeatherArmor({ bucName: 'uncursed', startIdentified: true }) }
  ]
};

export default class Caveman extends Profession {
  constructor() {
    super(cavemanConfig);
  }
}