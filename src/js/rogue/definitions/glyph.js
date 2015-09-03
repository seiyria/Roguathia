
export default class Glyph {
  constructor(key, fg, bg) {
    this.key = key ? key.substring(0, 1) : '';
    this.fg = fg;
    this.bg = bg;
  }
}