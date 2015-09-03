
import _ from 'lodash';

// behaviors are functionality that cascade, ie, a monster could have 10 behaviors that override die()
export default class Behavior {
  constructor(priority) {
    if(!_.isNumber(priority)) {
      throw new Error(`${this.constructor.name} should be instantiated with a priority.`);
    }
    this.priority = priority;
  }
}

// priorities determine the ordering of behavior execution
export const Priority = {
  ALWAYS: 0,
  STUN: 1,
  HEAL: 2,
  DEFENSE: 3,
  INTERACT: 4,
  TARGET: 5,
  MOVE: 6,
  DEFER: 10
};