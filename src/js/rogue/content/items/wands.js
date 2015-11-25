
import _ from 'lodash';
import { Wand } from '../../definitions/equipment';
import Attacks from '../attacks/_all';
import { rarity } from '../../constants/decorators';

@rarity(25)
export class WandOfStriking extends Wand {
  constructor(opts = {}) {
    _.extend(opts, {
      charges: '2d5',
      attacks: [Attacks.Force({ roll: '2d6', range: 4 })]
    });
    super(opts);
  }
}
