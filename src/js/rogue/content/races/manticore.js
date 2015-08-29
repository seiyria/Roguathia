
import Race from '../../definitions/race';

const opts = { slots: { hands: 0, body: 3, feet: 0, heads: 3, neck: 3, ring: 0, cloak: 0, wrist: 0 } };
export default class Manticore extends Race {
  constructor() {
    super(opts);
  }
}