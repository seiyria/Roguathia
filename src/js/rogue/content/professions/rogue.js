
import Profession from '../../definitions/profession';

import * as Bodys from '../items/bodys';
import * as Weapons from '../items/_weapons';
import * as Projectiles from '../items/projectiles';
import * as Thresholds from '../../constants/skill-thresholds';
import * as Traits from '../traits/_all';

const rogueConfig = {
  hp  : '2d6',
  mp  : '0d0',
  str : '3d3',
  con : '1d4',
  int : '1d2',
  dex : '2d5',
  wis : '1d2',
  cha : '1d2',
  titles: ['Footpad',, 'Cutpurse',,, 'Rogue',,, 'Pilferer',,, 'Robber',,, 'Burglar',,, 'Filcher',,, 'Magsrex',,, 'Thief'],
  traits: [Traits.Stealth({ level: 20 })],
  skillCaps: { bash: Thresholds.Expert, stab: Thresholds.Basic, ranged: Thresholds.Basic, slash: Thresholds.Expert, unarmed: Thresholds.Expert, force: Thresholds.Basic },
  startingItems: [
    { init: () => new Weapons.Shortsword({ bucName: 'uncursed', enchantment: 1 }) },
    { init: () => new Projectiles.Stiletto({ charges: '1d10 + 5', bucName: 'uncursed' }) },
    { init: () => new Weapons.Spear({ bucName: 'uncursed', enchantment: 1 }) },
    { init: () => new Bodys.LeatherJacket({ bucName: 'uncursed', enchantment: 1 }) }
  ]
};

export default class Rogue extends Profession {
  constructor() {
    super(rogueConfig);
  }
}