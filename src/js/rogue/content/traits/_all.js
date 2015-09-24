
import Trait from '../../definitions/trait';

class InfravisionTrait extends Trait {
  Infravision() { return this.level; }
}

export const Infravision = (opts) => new InfravisionTrait(opts);

class ProtectionTrait extends Trait {
  Protection() { return this.level; }
}

export const Protection = (opts) => new ProtectionTrait(opts);

class HasteTrait extends Trait {
  Haste() { return this.level * 25; }
}

export const Haste = (opts) => new HasteTrait(opts);

class TelepathyTrait extends Trait {
  Telepathy() { return this.level; }
}

export const Telepathy = (opts) => new TelepathyTrait(opts);

class ClairvoyanceTrait extends Trait {
  Clairvoyance() { return this.level; }
}

export const Clairvoyance = (opts) => new ClairvoyanceTrait(opts);

class WarningTrait extends Trait {
  Warning() { return this.level; }
}

export const Warning = (opts) => new WarningTrait(opts);

class InvisibleTrait extends Trait {
  Invisible() { return this.level; }
}

export const Invisible = (opts) => new InvisibleTrait(opts);

class SeeInvisibleTrait extends Trait {
  SeeInvisible() { return this.level; }
}

export const SeeInvisible = (opts) => new SeeInvisibleTrait(opts);

class StealthTrait extends Trait {
  Stealth() { return this.level; }
}

export const Stealth = (opts) => new StealthTrait(opts);

class PoisonResistanceTrait extends Trait {
  PoisonResistance() { return 1; }
}

export const PoisonResistance = () => new PoisonResistanceTrait();

class FireResistanceTrait extends Trait {
  FireResistance() { return 1; }
}

export const FireResistance = () => new FireResistanceTrait();

class ShockResistanceTrait extends Trait {
  ShockResistance() { return 1; }
}

export const ShockResistance = () => new ShockResistanceTrait();

class IceResistanceTrait extends Trait {
  IceResistance() { return 1; }
}

export const IceResistance = () => new IceResistanceTrait();

class AcidResistanceTrait extends Trait {
  AcidResistance() { return 1; }
}

export const AcidResistance = () => new AcidResistanceTrait();