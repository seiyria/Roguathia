
import { SingleScrollingScreen, SplitScrollingScreen } from '../screen';
import { SingleConductScreen, SplitConductScreen } from './conduct';
import GameState from '../../init/gamestate';

export class SingleVanquishedScreen extends SingleScrollingScreen {
  static enter() {
    super.enter();
    const target = this.getMainPlayer();
    const killHash = target.conquest;
    const sortedKills = _(killHash).keys().map((mon) => ({ name: mon, num: killHash[mon] })).sortBy('name').value();
    this.scrollContent = _.map(sortedKills, (kill) => `${_.padLeft(kill.num, 4)} ${kill.name}`);
    const totalKills = _.reduce(sortedKills, ((prev, cur) => prev + cur.num), 0);
    this.title = `${target.name}'s Conquest (${sortedKills.length} types|${totalKills} total)`; // shorten this for splitscreen
    if(!this.scrollContent.length) {
      this.scrollContent = ['No kills.'];
    }
    this.nextScreen = SingleConductScreen;
  }

  // static get split() { return SplitVanquishedScreen; }
}

export class SplitVanquishedScreen extends SplitScrollingScreen {
  static enter() {
    super.enter();

    this.scrollContent = [];
    this.title = [];

    _.each(GameState.players, (target, i) => {
      const killHash = target.conquest;
      const sortedKills = _(killHash).keys().map((mon) => ({ name: mon, num: killHash[mon] })).sortBy('name').value();
      this.scrollContent[i] = _.map(sortedKills, (kill) => `${_.padLeft(kill.num, 4)} ${kill.name}`);
      const totalKills = _.reduce(sortedKills, ((prev, cur) => prev + cur.num), 0);
      this.title[i] = `${target.name}'s Conquest (${sortedKills.length} types|${totalKills} total)`; // shorten this for splitscreen
      if(!this.scrollContent[i].length) {
        this.scrollContent[i] = ['No kills.'];
      }
    });

    this.nextScreen = SplitConductScreen;
  }
  // static get split() { return SingleVanquishedScreen; }
}
