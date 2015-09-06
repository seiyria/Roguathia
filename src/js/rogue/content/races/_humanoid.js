
import Race from '../../definitions/race';
import * as Behaviors from '../behaviors/_all';

export default class Humanoid extends Race {
  constructor(opts) {
    opts.stats = opts.stats || {};
    opts.stats.addBehaviors = [Behaviors.Interacts(), Behaviors.PickUpItems(), Behaviors.DropsItems()];
    super(opts);
  }
}