
import Race from '../../definitions/race';
import * as Thresholds from '../../constants/skill-thresholds';
import * as Traits from '../traits/_all';

const opts = { stats: { dex: -1, str: 3, con: 3, int: -3, wis: -2, sight: 1,
  skillBonus: { smash: Thresholds.Basic },
  traits: [Traits.Infravision(2)]
} };
export default class Orc extends Race {
  constructor() {
    super(opts);
  }
}