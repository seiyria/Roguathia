
import chai from 'chai';
chai.should();

import Behavior, { Priority } from '../../../src/js/rogue/definitions/behavior';

describe('Behavior', () => {

  it('should have a priority assigned to it', () => {
    const behavior = new Behavior(Priority.ALWAYS);
    behavior.priority.should.eq(Priority.ALWAYS);

    (() => {
      new Behavior();
    }).should.throw(Error);
  });

  describe('#priority', () => {
    it('should treat Priority.ALWAYS as priority #1', () => {
      Priority.ALWAYS.should.be.lt(Priority.DEFENSE);
      Priority.ALWAYS.should.be.lt(Priority.DEFER);
      Priority.ALWAYS.should.be.lt(Priority.HEAL);
      Priority.ALWAYS.should.be.lt(Priority.INTERACT);
      Priority.ALWAYS.should.be.lt(Priority.MOVE);
      Priority.ALWAYS.should.be.lt(Priority.STUN);
      Priority.ALWAYS.should.be.lt(Priority.TARGET);
    });
    it('should treat Priority.STUN as priority #2', () => {
      Priority.STUN.should.be.lt(Priority.DEFENSE);
      Priority.STUN.should.be.lt(Priority.DEFER);
      Priority.STUN.should.be.lt(Priority.HEAL);
      Priority.STUN.should.be.lt(Priority.INTERACT);
      Priority.STUN.should.be.lt(Priority.MOVE);
      Priority.STUN.should.be.lt(Priority.TARGET);
    });
    it('should treat Priority.HEAL as priority #3', () => {
      Priority.HEAL.should.be.lt(Priority.DEFENSE);
      Priority.HEAL.should.be.lt(Priority.DEFER);
      Priority.HEAL.should.be.lt(Priority.INTERACT);
      Priority.HEAL.should.be.lt(Priority.MOVE);
      Priority.HEAL.should.be.lt(Priority.TARGET);
    });
    it('should treat Priority.DEFENSE as priority #4', () => {
      Priority.DEFENSE.should.be.lt(Priority.DEFER);
      Priority.DEFENSE.should.be.lt(Priority.INTERACT);
      Priority.DEFENSE.should.be.lt(Priority.MOVE);
      Priority.DEFENSE.should.be.lt(Priority.TARGET);
    });
    it('should treat Priority.INTERACT as priority #5', () => {
      Priority.INTERACT.should.be.lt(Priority.DEFER);
      Priority.INTERACT.should.be.lt(Priority.MOVE);
      Priority.INTERACT.should.be.lt(Priority.TARGET);
    });
    it('should treat Priority.TARGET as priority #6', () => {
      Priority.TARGET.should.be.lt(Priority.DEFER);
      Priority.TARGET.should.be.lt(Priority.MOVE);
    });
    it('should treat Priority.MOVE as priority #7', () => {
      Priority.MOVE.should.be.lt(Priority.DEFER);
    });
  });
});