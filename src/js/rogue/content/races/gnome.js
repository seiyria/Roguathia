
import Race from '../../definitions/race';
import * as Thresholds from '../../constants/skill-thresholds';

const opts = { stats: { str: -2, con: -2, dex: -1, int: 3, wis: 3, cha: -1, sight: 1,
  skillBonus: { bash: Thresholds.Basic }
} };
export default class Gnome extends Race {
  constructor() {
    super(opts);
  }
}