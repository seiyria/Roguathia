
import { Wrist } from '../../definitions/equipment';
import { AC } from '../../lib/default-calculations';
import Materials from '../../constants/materials';
import { material, rarity, twoHanded } from '../../constants/decorators';

@rarity(45)
@material(Materials.Leather)
@twoHanded
export class LeatherGloves extends Wrist {
  ac() {
    return AC(this);
  }
}

@rarity(45)
@material(Materials.Leather)
export class Bracer extends Wrist {
  ac() {
    return AC(this);
  }
}

@rarity(10)
@material(Materials.Leather)
@twoHanded
export class GauntletsOfDexterity extends Wrist {
  ac() {
    return AC(this);
  }
  dex() {
    return this.buc * -2;
  }
}

@rarity(10)
@material(Materials.Leather)
@twoHanded
export class GauntletsOfStrength extends Wrist {
  ac() {
    return AC(this);
  }
  str() {
    return this.buc * -2;
  }
}