
import chai from 'chai';
chai.should();

import Entity from '../../../src/js/rogue/definitions/entity';

describe('Entity', () => {
  let entity;

  beforeEach(() => entity = new Entity({ key: '@', fg: '#fff', bg: '#000' }, 0, 1, 2));

  it('should have a glyph initialized properly', () => {
    entity.glyph.key.should.eq('@');
    entity.glyph.fg.should.eq('#fff');
    entity.glyph.bg.should.eq('#000');
  });

  it('should be dense and not opaque by default', () => {
    entity.density.should.eq(1);
    entity.opacity.should.eq(0);
    entity.isDense().should.eq(true);
    entity.isBlockingLight().should.eq(false);
  });

  it('should have coordinates set properly', () => {
    entity.x.should.eq(0);
    entity.y.should.eq(1);
    entity.z.should.eq(2);
  });

  it('should have types properly set up', () => {
    entity.getType().should.eq('entity');
    entity.getParentType().should.eq('abstract');
    entity.getCanonName().should.eq('entity');
  });

  it('should calculate the distance between it and another entity properly', () => {
    entity.distBetween({ x: 2, y: 1 }).should.eq(2);
    entity.distBetween({ x: 0, y: 3 }).should.eq(2);
  });

  it('should calculate the distance between it and another point properly', () => {
    entity.distBetweenXY(2, 1).should.eq(2);
    entity.distBetweenXY(0, 3).should.eq(2);
  });

});