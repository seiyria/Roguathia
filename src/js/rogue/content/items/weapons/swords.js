
import _ from 'lodash';
import { Hands } from '../../../definitions/equipment';
import Attacks from '../../attacks/_all';
import Materials from '../../../constants/materials';
import { material, rarity } from '../../../constants/decorators';

@rarity(5)
@material(Materials.Iron)
export class Scimitar extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: 'teal' },
      attacks: [Attacks.Slash({ roll: '1d8' })]
    });
    super(opts);
  }
}