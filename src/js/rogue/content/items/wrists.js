
import { Wrist } from '../../definitions/equipment';
import { AC } from '../../lib/default-calculations';
import Materials from '../../constants/materials';
import { material, rarity } from '../../constants/decorators';

@rarity(45)
@material(Materials.Leather)
export class LeatherGloves extends Wrist {
  ac() {
    return AC(this);
  }
}

@rarity(10)
@material(Materials.Leather)
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
export class GauntletsOfStrength extends Wrist {
  ac() {
    return AC(this);
  }
  str() {
    return this.buc * -2;
  }
}