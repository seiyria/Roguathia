
import {Comestible} from "../items";

export class Corpse extends Comestible {
  constructor(monster) {
    super({});
    this.name = `corpse of ${monster.name}`;
  }
}