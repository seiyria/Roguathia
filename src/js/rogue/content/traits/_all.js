
import Trait from '../../definitions/trait';

class InfravisionTrait extends Trait {
  Infravision() { return this.level; }
}

export var Infravision = (level) => new InfravisionTrait(level);

class ProtectionTrait extends Trait {
  Protection() { return this.level; }
}

export var Protection = (level) => new ProtectionTrait(level);

class HasteTrait extends Trait {
  Haste() { return this.level * 25; }
}

export var Haste = (level) => new HasteTrait(level);

class TelepathyTrait extends Trait {
  Telepathy() { return this.level; }
}

export var Telepathy = (level) => new TelepathyTrait(level);

class ClairvoyanceTrait extends Trait {
  Clairvoyance() { return this.level; }
}

export var Clairvoyance = (level) => new ClairvoyanceTrait(level);

class WarningTrait extends Trait {
  Warning() { return this.level; }
}

export var Warning = (level) => new WarningTrait(level);

class InvisibleTrait extends Trait {
  Invisible() { return this.level; }
}

export var Invisible = (level) => new InvisibleTrait(level);

class SeeInvisibleTrait extends Trait {
  SeeInvisible() { return this.level; }
}

export var SeeInvisible = (level) => new SeeInvisibleTrait(level);