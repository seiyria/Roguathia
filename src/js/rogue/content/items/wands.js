
import { Wand } from '../../definitions/equipment';
import Attacks from '../attacks/_all';

export class Striking extends Wand {
  static get rarity() { return 25; }
  constructor(opts = {}) {
    _.extend(opts, {
      charges: '2d5',
      attacks: [Attacks.Force({ roll: '2d6', range: 4 })]
    });
    super(opts);
  }
}
