
import { Screen } from '../screen';

export class WinScreen extends Screen {
  static render(display) {
    this.drawCenterText(display, 11, '-You have won!-');
  }
}