
import Race from '../../definitions/race';

let lizardOpts = { slots: { hands: 3 } };
export default class Lizard extends Race {
  constructor() {
    super(lizardOpts);
  }
}