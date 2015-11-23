
import Humanoid from './_humanoid';
import * as Thresholds from '../../constants/skill-thresholds';
import * as Traits from '../traits/_all';

const opts = { stats: { dex: 1, str: 1, con: 1, int: -4, wis: -2, sight: 1,
  skillBonus: { smash: Thresholds.Basic },
  traits: [Traits.Infravision({ level: 2 })]
} };

export default class Kobold extends Humanoid {
  constructor() {
    super(opts);
  }
}