
import { Screen } from '../screen';
import Start from '../../init/game-starter';

// this exists solely to transition and start a new game. I'm bad. :(
export default class NewGameScreen extends Screen {
  static enter() {
    Start();
  }
}