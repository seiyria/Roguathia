
import { SingleScrollingScreen } from '../screen';
import RespawnScreen from './respawn';
import ConductCalc from '../../constants/conducts';

export class SingleConductScreen extends SingleScrollingScreen {
  static enter() {
    super.enter();
    let target = this.getMainPlayer();
    let sortedConduct = ConductCalc(target);
    this.scrollContent = sortedConduct;
    this.title = `${target.name}'s Traits (${sortedConduct.length})`; // shorten this for splitscreen
    this.nextScreen = RespawnScreen;
  }
}
// class SplitConductsScreen extends SplitScrollingScreen {}