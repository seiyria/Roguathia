
import Trait from '../../definitions/trait';

class InfravisionTrait extends Trait {
  Infravision() { return this.level; }
}

export var Infravision = (opts) => new InfravisionTrait(opts);

class ProtectionTrait extends Trait {
  Protection() { return this.level; }
}

export var Protection = (opts) => new ProtectionTrait(opts);

class HasteTrait extends Trait {
  Haste() { return this.level * 25; }
}

export var Haste = (opts) => new HasteTrait(opts);

class TelepathyTrait extends Trait {
  Telepathy() { return this.level; }
}

export var Telepathy = (opts) => new TelepathyTrait(opts);

class ClairvoyanceTrait extends Trait {
  Clairvoyance() { return this.level; }
}

export var Clairvoyance = (opts) => new ClairvoyanceTrait(opts);

class WarningTrait extends Trait {
  Warning() { return this.level; }
}

export var Warning = (opts) => new WarningTrait(opts);

class InvisibleTrait extends Trait {
  Invisible() { return this.level; }
}

export var Invisible = (opts) => new InvisibleTrait(opts);

class SeeInvisibleTrait extends Trait {
  SeeInvisible() { return this.level; }
}

export var SeeInvisible = (opts) => new SeeInvisibleTrait(opts);