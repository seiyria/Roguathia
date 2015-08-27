
import {Comestible} from "../items";

export class Ration extends Comestible {
  constructor(opts) {
    super(opts);
    this.name = 'ration';
  }
}
Ration.rarity = 50;