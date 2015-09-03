
import _ from 'lodash';
import { Potion } from '../../definitions/equipment';

export class Healing extends Potion {
  static get rarity() { return 50; }
  constructor(opts = { charges: 1 }) {
    _.extend(opts, { healRoll: '4d4', autoRemove: true });
    super(opts);
  }
}