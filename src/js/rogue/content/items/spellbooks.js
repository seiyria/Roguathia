
import { Spellbook } from '../../definitions/equipment';
import Attacks from '../attacks/attacks';

export class ForceBolt extends Spellbook {
  constructor(opts = {}) {
    _.extend(opts, {
      manaCost: 2,
      attacks: [Attacks.Force({ roll: '2d6', range: 4 })]
    });
    super(opts);
  }
}
ForceBolt.rarity = 25;