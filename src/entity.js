
//import _ from "lodash";
import Glyph from "./glyph";
import Abstract from "./abstract";

export default class Entity extends Abstract {
  constructor(glyphOpts, x = 0, y = 0, z = 0) {
    super();
    this.density = 1;
    this.opacity = 0;
    this.x = x;
    this.y = y;
    this.z = z;
    this.setGlyph(glyphOpts);
  }
  
  setGlyph(glyphOpts) {
    this.glyph = new Glyph(glyphOpts.key, glyphOpts.fg, glyphOpts.bg);
  }
  
  isDense() {
    return this.density;
  }
  
  isBlockingLight() {
    return this.opacity;
  }
}