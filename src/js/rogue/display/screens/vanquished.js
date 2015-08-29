
import { SingleScrollingScreen } from '../screen';
import { SingleConductScreen } from './conduct';

export class SingleVanquishedScreen extends SingleScrollingScreen {
  static enter() {
    super.enter();
    let target = this.getMainPlayer();
    let killHash = target.conquest;
    let sortedKills = _(killHash).keys().map((mon) => ({ name: mon, num: killHash[mon] })).sortBy('name').value();
    this.scrollContent = _.map(sortedKills, (kill) => `${_.padLeft(kill.num, 4)} ${kill.name}`);
    let totalKills = _.reduce(sortedKills, ((prev, cur) => prev + cur.num), 0);
    this.title = `${target.name}'s Conquest (${sortedKills.length} types|${totalKills} total)`; // shorten this for splitscreen
    if(!this.scrollContent.length) {
      this.scrollContent = ['No kills.'];
    }
    this.nextScreen = SingleConductScreen;
  }
}
// class SplitVanquishedScreen extends SplitScrollingScreen {}