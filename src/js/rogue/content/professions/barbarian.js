
import Profession from '../../definitions/profession';

import * as Foods from '../items/foods';
import * as Weapons from '../items/_weapons';
import * as Bodys from '../items/bodys';
import * as Thresholds from '../../constants/skill-thresholds';
import * as Traits from '../traits/_all';

const barbarianConfig = {
  hp  : '2d3',
  mp  : '0d0',
  str : '4d3',
  con : '3d2',
  int : '1d1',
  dex : '2d2',
  wis : '1d1',
  cha : '1d1',
  titles: ['Plunderex',, 'Pillager',,, 'Bandit',,, 'Brigand',,, 'Raider',,, 'Reaver',,, 'Slayer',,, 'Chiefterex',,, 'Conquerex'],
  traits: [Traits.Stealth({ level: 15, req: 15 }), Traits.Haste({ level: 2, req: 7 }), Traits.PoisonResistance()],
  skillCaps: { bash: Thresholds.Skilled, stab: Thresholds.Skilled, ranged: Thresholds.Basic, shot: Thresholds.Basic, slash: Thresholds.Skilled, unarmed: Thresholds.Master },
  startingItems: [
    { choices: { swordaxe: 1, axesword: 1 },
      choicesInit: {
        swordaxe: () => [new Weapons.Broadsword({ bucName: 'uncursed' }), new Weapons.Axe({ bucName: 'uncursed' })],
        axesword: () => [new Weapons.BattleAxe({ bucName: 'uncursed' }), new Weapons.Shortsword({ bucName: 'uncursed' })]
      }
    },
    { init: () => new Foods.Ration({ charges: '1d2', bucName: 'uncursed' }) },
    { init: () => new Bodys.RingMail({ bucName: 'uncursed', startIdentified: true }) }
  ]
};

export default class Barbarian extends Profession {
  constructor() {
    super(barbarianConfig);
  }
}