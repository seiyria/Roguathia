
import { Reagent, SkilledAttack } from '../../definitions/attack';
import Glyph from '../../definitions/glyph';

export class Bash extends SkilledAttack {}

export class Ranged extends Reagent {}

export class Shot extends SkilledAttack {
  init() {
    this.glyph = new Glyph(')', '#00f');
  }
}

export class Slash extends SkilledAttack {}

export class Smash extends SkilledAttack {}

export class Stab extends SkilledAttack {}

export class Thrust extends SkilledAttack {}

export class Unarmed extends SkilledAttack {}