
import Race from '../../definitions/race';

const opts = { stats: { int: 2, dex: 2, wis: 1, sight: 1,
  skillBonus: { shot: 1 }
} };
export default class Elf extends Race {
  constructor() {
    super(opts);
  }
}