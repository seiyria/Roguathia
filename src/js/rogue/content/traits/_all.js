
import Trait from '../../definitions/trait';

class InfravisionTrait extends Trait {
  constructor(level) { super(); this.level = level; }
  infravision() { return this.level; }
}

export var Infravision = (level) => new InfravisionTrait(level);