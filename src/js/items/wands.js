
import { Wand } from '../items';
import Attacks from '../attacks';

export class Striking extends Wand {
  constructor(opts = {}) {
    _.extend(opts, {
      charges: '2d5',
      attacks: [Attacks.Force({ roll: '2d6', range: 4 })]
    });
    super(opts);
  }
}
Striking.rarity = 25;