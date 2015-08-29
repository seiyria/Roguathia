
import Race from '../../definitions/race';

let spiderOpts = { slots: { hands: 0, body: 1, feet: 8, heads: 1, neck: 1, ring: 0, cloak: 0, wrist: 0 } };
export default class Spider extends Race {
  constructor() {
    super(spiderOpts);
  }
}
