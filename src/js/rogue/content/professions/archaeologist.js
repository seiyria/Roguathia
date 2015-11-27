
import Profession from '../../definitions/profession';

import * as Foods from '../items/foods';
import * as Weapons from '../items/_weapons';
import * as Bodys from '../items/bodys';
import * as Heads from '../items/heads';
import * as Thresholds from '../../constants/skill-thresholds';
import * as Traits from '../traits/_all';

const archaeologistConfig = {
  hp  : '6d3',
  mp  : '0d0',
  str : '2d2',
  con : '1d4',
  int : '1d2',
  dex : '3d3',
  wis : '1d2',
  cha : '1d1',
  titles: ['Digger',, 'Field Worker',,, 'Investigator',,, 'Exhumer',,, 'Excavator',,, 'Spelunker',,, 'Speleologist',,, 'Collector',,, 'Curator'],
  traits: [Traits.Stealth({ level: 10 }), Traits.Haste({ level: 2 })],
  skillCaps: { bash: Thresholds.Skilled, stab: Thresholds.Basic, slash: Thresholds.Skilled, unarmed: Thresholds.Expert },
  startingItems: [
    { init: () => new Weapons.Bullwhip({ bucName: 'uncursed', enchantment: 2 }) },
    { init: () => new Foods.Ration({ charges: '3d2', bucName: 'uncursed' }) },
    { init: () => new Bodys.LeatherJacket({ bucName: 'uncursed', startIdentified: true }) },
    { init: () => new Heads.Fedora({ bucName: 'uncursed', startIdentified: true }) }
  ]
};

export default class Archaeologist extends Profession {
  constructor() {
    super(archaeologistConfig);
  }
}