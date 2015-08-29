
import SETTINGS from '../constants/settings';
import GameState from '../init/gamestate';

export class Screen {
  static enter() {}
  static exit()  {}
  static render() {}
  static handleInput() {}
  static drawCenterText(display, y, text) {
    let x = Math.floor(SETTINGS.screen.width/2) - Math.floor(text.length/2);
    display.drawText(x, y, text);
    return { x, y };
  }
  static drawLeftText(display, y, text) {
    display.drawText(0, y, text);
  }
  static drawLeftTextNoTrim(display, y, text = '') {
    for(let i = 0; i < text.length; i++) {
      display.draw(i, y, text[i]);
    }
  }
  static padText(text, width) {
    return _.pad(text, width);
  }
  static getMainPlayer() {
    return _.max(GameState.players, 'currentTurn');
  }
  static changeScreenWithDelay(newScreen, delay) {
    setTimeout(() => GameState.game.switchScreen(newScreen), delay);
  }
}

class ScrollingScreen extends Screen {}
export class SingleScrollingScreen extends ScrollingScreen {
  static enter() {
    this.currentIndex = 0;
  }
  static render(display) {
    display.clear();
    this.drawLeftText(display, 0, this.title);
    this.drawLeftText(display, 1, _.repeat('-', this.title.length));
    
    let remainingHeight = SETTINGS.screen.height - 3;
    let slice = this.scrollContent.slice(this.currentIndex, remainingHeight+this.currentIndex);
    for(let i = 0; i < remainingHeight; i++) {
      this.drawLeftTextNoTrim(display, i+2, slice[i]);
    }
    
    setTimeout(() => {
      if(slice.length < remainingHeight) {
        this.changeScreenWithDelay(this.nextScreen, 4000);
      } else {
        this.currentIndex++;
        this.render(display);
      }
    }, 2000);
  }
}
// class SplitScrollingScreen extends ScrollingScreen {}