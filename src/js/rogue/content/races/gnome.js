
import Race from '../../definitions/race';

const opts = { stats: { str: -2, con: -2, dex: -1, int: 3, wis: 3, cha: -1, sight: 1 } };
export default class Gnome extends Race {
  constructor() {
    super(opts);
  }
}