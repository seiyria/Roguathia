
import Behavior, { Priority } from '../../definitions/behavior';

/* monsters can attack with this */
class AttacksBehavior extends Behavior {
  constructor() { super(Priority.DEFENSE); }
  act(me) {
    return !me.tryAttack();
  }
}

export var Attacks = () => new AttacksBehavior();