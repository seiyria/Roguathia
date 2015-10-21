
import { Screen } from '../screen';

export class LoadScreen extends Screen {
  static enter(display) {
    this.flicker = 0;

    const dotStatus = ['.  ', '.. ', '...', ' ..', '  .'];

    this.interval = setInterval(() => {
      display.clear();
      this.render(display);

      this.drawCenterText(display, 12, `Generating ${dotStatus[this.flicker]}`);

      this.flicker = ++this.flicker % dotStatus.length;
    }, 500);
  }

  static exit() {
    window.clearInterval(this.interval);
  }

  static render(display) {
    this.drawCenterText(display,  11, '-Welcome to Roguathia-');
  }
}