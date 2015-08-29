
import Race from '../../definitions/race';

const opts = { stats: { con: 1, int: 1 } };
export default class Salamander extends Race {
  constructor() {
    super(opts);
  }
}