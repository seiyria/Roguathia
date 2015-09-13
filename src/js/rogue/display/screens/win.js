
import { Screen } from '../screen';
import { SingleVanquishedScreen, SplitVanquishedScreen } from './vanquished';
import GameState from '../../init/gamestate';
import ChangeTitle from '../../lib/page-title';

export default class WinScreen extends Screen {
  static enter() {
    GameState.game.engine.lock();
    this.changeScreenWithDelay({ single: SingleVanquishedScreen, multi: SplitVanquishedScreen }, 5000);
  }
  static render(display) {
    this.drawCenterText(display, 11, 'You have won!');
    this.drawCenterText(display, 12, GameState.winCondition.message);
    this.drawCenterText(display, 13, `You earned ${GameState.spEarned} SP, ${GameState.kpEarned} KP and ${GameState.vpEarned} VP.`);
    ChangeTitle('Victory');
  }
}