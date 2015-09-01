
import Behavior, { Priority } from '../../definitions/behavior';
import MessageQueue from '../../display/message-handler';

/* being stunned sucks */
class StunnedBehavior extends Behavior {
  constructor(numTurns = 1) {
    super(Priority.STUN);
    this.stunTurns = numTurns;
  }
  act(me) {
    if(this.stunTurns <= 0) {
      me.removeBehavior(this);
      MessageQueue.add({ message: `${me.name} is no longer stunned.` });
      return true;
    }

    MessageQueue.add({ message: `${me.name} is stunned!` });
    this.stunTurns--;
    return false;
  }
}

export var Stunned = (numTurns) => new StunnedBehavior(numTurns);