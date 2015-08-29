
import Profession from '../../definitions/profession';

import * as Foods from '../items/foods';
import * as Weapons from '../items/weapons';
import * as Potions from '../items/potions';
import * as Projectiles from '../items/projectiles';

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

export default class Ranger extends Profession {
  constructor() {
    super(rangerCfg);
  }
}