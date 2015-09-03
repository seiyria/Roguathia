
import { SingleScrollingScreen, SplitScrollingScreen } from '../screen';
import RespawnScreen from './respawn';
import ConductCalc from '../../constants/conducts';
import GameState from '../../init/gamestate';

export class SingleConductScreen extends SingleScrollingScreen {
  static enter() {
    super.enter();
    const target = this.getMainPlayer();
    const sortedConduct = ConductCalc(target);
    this.scrollContent = sortedConduct;
    this.title = `${target.name}'s Traits (${sortedConduct.length})`; // shorten this for splitscreen
    this.nextScreen = RespawnScreen;
  }
  // static get split() { return SplitConductScreen; }
}

export class SplitConductScreen extends SplitScrollingScreen {
  static enter() {
    super.enter();
    this.scrollContent = [];
    this.title = [];

    _.each(GameState.players, (target, i) => {
      const sortedConduct = ConductCalc(target);
      this.scrollContent[i] = sortedConduct;
      this.title[i] = `${target.name}'s Traits (${sortedConduct.length})`; // shorten this for splitscreen
    });

    this.nextScreen = RespawnScreen;
  }
  // static get split() { return SingleConductScreen; }
}
