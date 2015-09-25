
import _ from 'lodash';
import { Hands } from '../../../definitions/equipment';
import Attacks from '../../attacks/_all';
import Materials from '../../../constants/materials';
import { material, rarity, twoHanded } from '../../../constants/decorators';

@rarity(25)
@material(Materials.Wood)
@twoHanded
export class Quarterstaff extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: '#49311c' },
      attacks: [Attacks.Bash({ roll: '1d6' })]
    });
    super(opts);
  }
}
