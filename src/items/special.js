
import {Special} from "../items";

export class Gold extends Special {
  constructor(num) {
    let opts = {
      glyph: {key: '$', fg: 'yellow'}
    }
    super(opts);
    this.goldValue = num;
    this.name = `${this.goldValue} gold`;
  }
}