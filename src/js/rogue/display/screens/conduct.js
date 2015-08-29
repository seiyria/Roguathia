
import { SingleScrollingScreen } from '../screen';
import RespawnScreen from './respawn';

export class SingleConductScreen extends SingleScrollingScreen {
  static enter() {
    super.enter();
    let target = this.getMainPlayer();
    let conductHash = target.conduct;
    let sortedConduct = _(conductHash).values().compact().sortBy().value();
    this.scrollContent = sortedConduct;
    this.title = `${target.name}'s Conduct (${sortedConduct.length} types)`; // shorten this for splitscreen
    this.nextScreen = RespawnScreen;
    if(!this.scrollContent.length) {
      this.scrollContent = ['All conduct broken.'];
    }
  }
}
// class SplitConductsScreen extends SplitScrollingScreen {}