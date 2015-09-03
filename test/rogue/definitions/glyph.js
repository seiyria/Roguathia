
import chai from 'chai';
const expect = chai.expect;
chai.should();

import Glyph from '../../../src/js/rogue/definitions/glyph';

describe('Glyph', () => {
  let glyph;

  beforeEach(() => glyph = new Glyph('@b', '#fff', '#000'));

  it('should only take 1 character keys', () => {
    glyph.key.should.have.length(1);
  });

  it('should have only key, fg, bg properties', () => {
    expect(glyph.key).to.exist;
    expect(glyph.fg).to.exist;
    expect(glyph.bg).to.exist;
    Object.keys(glyph).should.be.length(3);
  });
});