
import { Wrist } from '../../definitions/equipment';
import { AC } from '../../lib/default-calculations';
import Materials from '../../constants/materials';
import { rarity } from '../../constants/decorators';

@rarity(45)
export class LeatherGloves extends Wrist {
  get material() { return Materials.Leather; }
  ac() {
    return AC(this);
  }
}

@rarity(10)
export class GauntletsOfDexterity extends Wrist {
  get material() { return Materials.Leather; }
  ac() {
    return AC(this);
  }
  dex() {
    return this.buc * -2;
  }
}

@rarity(10)
export class GauntletsOfStrength extends Wrist {
  get material() { return Materials.Leather; }
  ac() {
    return AC(this);
  }
  str() {
    return this.buc * -2;
  }
}