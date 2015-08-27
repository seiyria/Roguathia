
import {Potion} from "../items";

export class Healing extends Potion {
  constructor(opts = {charges: 1}) {
    _.extend(opts, {healRoll: '4d4', autoRemove: true});
    super(opts);
  }
}
Healing.rarity = 50;