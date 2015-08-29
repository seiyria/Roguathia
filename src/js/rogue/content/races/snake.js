
import Race from '../../definitions/race';

const opts = { slots: { hands: 0, body: 1, feet: 0, heads: 1, neck: 1, ring: 1, cloak: 0, wrist: 0 } };
export default class Snake extends Race {
  constructor() {
    super(opts);
  }
}