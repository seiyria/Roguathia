
import { Spellbook } from '../../definitions/equipment';
import Attacks from '../attacks/_all';

export class ForceBolt extends Spellbook {
  static get rarity() { return 25; }
  constructor(opts = {}) {
    _.extend(opts, {
      manaCost: 2,
      attacks: [Attacks.Force({ roll: '2d6', range: 4 })]
    });
    super(opts);
  }
}