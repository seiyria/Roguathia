
import Profession from '../../definitions/profession';
import * as Traits from '../traits/_all';

const monsterCfg = {
  hp  : '1d1',
  str : '1d1',
  con : '1d1',
  int : '1d1',
  dex : '1d1',
  wis : '1d1',
  cha : '1d1',
  levelUp: {
    hp  : '2d1',
    str : '2d1',
    con : '2d1',
    int : '2d1',
    dex : '2d1',
    wis : '2d1',
    cha : '2d1'
  },
  titles: ['Monster'],
  traits: [Traits.Infravision({ level: 7 })]
};

export default class Monster extends Profession {
  constructor() {
    super(monsterCfg);
  }
}