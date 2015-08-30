
import Profession from '../../definitions/profession';

import * as Foods from '../items/foods';
import * as Weapons from '../items/weapons';
import * as Heads from '../items/heads';
import * as Necks from '../items/necks';
import * as Potions from '../items/potions';
import * as Thresholds from '../../constants/skill-thresholds';
import * as Traits from '../traits/_all';

let devCfg = {
  hp  : '9d5',
  mp  : '9d5',
  str : '4d5',
  con : '4d5',
  int : '4d5',
  dex : '4d1',
  wis : '4d5',
  cha : '4d5',
  titles: ['Developer'],
  traits: [Traits.Infravision(3), Traits.Haste(4), Traits.Clairvoyance(10)],
  skillCaps: { shot: Thresholds.Expert, stab: Thresholds.Skilled },
  startingItems: [
    { init: () => new Weapons.Bow({ bucName: 'uncursed' }) },
    { init: () => new Heads.NightGoggles({ bucName: 'uncursed' }) },
    { init: () => new Necks.Protective({ bucName: 'uncursed' }) },
    { init: () => new Foods.Ration({ charges: '1d3', bucName: 'uncursed' }) },
    { init: () => new Potions.Healing({ charges: '5d5', bucName: 'uncursed', startIdentified: true }) }
  ]
};

export default class Ranger extends Profession {
  constructor() {
    super(devCfg);
  }
}