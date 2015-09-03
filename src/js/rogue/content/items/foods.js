
import { Comestible } from '../../definitions/equipment';

export class Ration extends Comestible {
  static get rarity() { return 50; }
  constructor(opts) {
    super(opts);
    this.name = 'ration';
  }
}