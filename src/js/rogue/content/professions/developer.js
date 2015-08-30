
import Profession from '../../definitions/profession';

import * as Foods from '../items/foods';
import * as Weapons from '../items/weapons';
import * as Potions from '../items/potions';
import * as Projectiles from '../items/projectiles';
import * as Thresholds from '../../constants/skill-thresholds';

let devCfg = {
  hp  : '9d5',
  mp  : '9d5',
  str : '4d5',
  con : '4d5',
  int : '4d5',
  dex : '4d5',
  wis : '4d5',
  cha : '4d5',
  titles: ['Developer'],
  skillCaps: { shot: Thresholds.Expert, stab: Thresholds.Skilled },
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
    super(devCfg);
  }
}