
import _ from 'lodash';
import { Hands } from '../../../definitions/equipment';
import Attacks from '../../attacks/_all';
import Materials from '../../../constants/materials';

export class Scimitar extends Hands {
  get material() { return Materials.Iron; }
  static get rarity() { return 5; }
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: 'teal' },
      attacks: [Attacks.Slash({ roll: '1d8' })]
    });
    super(opts);
  }
}