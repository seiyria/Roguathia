
import Profession from '../../definitions/profession';
import * as Traits from '../traits/_all';

const monsterCfg = {
  traits: [Traits.Infravision({ level: 7 })]
};

export default class Monster extends Profession {
  constructor() {
    super(monsterCfg);
  }
}