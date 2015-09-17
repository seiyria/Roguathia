
import Race from '../../definitions/race';

const opts = { slots: { hands: 0, body: 1, feet: 4, heads: 1, neck: 0, ring: 0, cloak: 0, wrist: 0 }, stats: { con: 1, int: 1 } };
export default class Lizard extends Race {
  constructor() {
    super(opts);
  }
}