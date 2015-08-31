
import SETTINGS from '../constants/settings';
import GameState from '../init/gamestate';

export class Screen {
  static enter() {}
  static exit()  {}
  static render() {}
  static handleInput() {}
  static drawCenterText(display, y, text, divisor = 2, xOffset = 0) {
    let x = xOffset + Math.floor(SETTINGS.screen.width/divisor) - Math.floor(text.length/2);
    display.drawText(x, y, text);
    return { x, y };
  }
  static drawLeftCenterText(display, y, text) {
    return this.drawCenterText(display, y, text, 4);
  }
  static drawRightCenterText(display, y, text) {
    return this.drawCenterText(display, y, text, 4, SETTINGS.screen.width/2);
  }
  static drawLeftText(display, y, text, xOffset = 0) {
    display.drawText(xOffset, y, text);
  }
  static drawLeftTextNoTrim(display, y, text = '', xOffset = 0) {
    for(let i = 0; i < text.length; i++) {
      display.draw(i+xOffset, y, text[i]);
    }
  }
  static padText(text, width) {
    return _.pad(text, width);
  }
  static getMainPlayer() {
    return _.max(GameState.players, 'currentTurn');
  }
  static changeScreenWithDelay(newScreen, delay) {
    setTimeout(() => {
      let multiChoice = GameState.game.splitScreen ? newScreen.multi : newScreen.single;
      let screen = newScreen.single && newScreen.multi ? multiChoice : newScreen;
      GameState.game.switchScreen(screen);
    }, delay);
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

export class SplitScrollingScreen extends ScrollingScreen {
  static enter() {
    this.currentIndices = _.map(GameState.players, () => 0);

    let width = SETTINGS.screen.width / 2;
    let height = GameState.players.length > 2 ? (SETTINGS.screen.height / 2): SETTINGS.screen.height;

    this.tlCoords = [
      { x: 0, y: 0 },
      { x: width+1, y: 0 },
      { x: 0, y: height+1 },
      { x: width+1, y: height+1 }
    ];
  }
  static isDone() {
    return _.every(this.currentIndices, (index) => index === true);
  }

  static drawBorder(display) {

    let middleX = SETTINGS.screen.width / 2;
    for (let i = 0; i < SETTINGS.screen.height; i++) {
      display.draw(middleX, i, '‖');
    }

    if (GameState.players.length > 2) {
      let middleY = SETTINGS.screen.height / 2;
      for (let i = 0; i < SETTINGS.screen.width; i++) {
        display.draw(i, middleY, '=');
      }
    }
  }

  static drawList(display, playerIndex) {

    let offset = this.tlCoords[playerIndex];

    this.drawLeftText(display, offset.y, this.title[playerIndex], offset.x);
    this.drawLeftText(display, offset.y+1, _.repeat('-', this.title[playerIndex].length), offset.x);

    let remainingHeight = (GameState.players.length > 2 ? (SETTINGS.screen.height / 2): SETTINGS.screen.height) - 3;
    let slice = this.scrollContent[playerIndex].slice(this.currentIndices[playerIndex], remainingHeight+this.currentIndices[playerIndex]);
    for(let i = 0; i < remainingHeight; i++) {
      this.drawLeftTextNoTrim(display, offset.y+i+2, slice[i], offset.x);
    }

    if(slice.length < remainingHeight) this.currentIndices[playerIndex] = true;
  }

  static render(display) {
    display.clear();

    _.each(this.currentIndices, (value, i) => {
      this.drawList(display, i);
    });

    this.drawBorder(display);

    setTimeout(() => {
      if(this.isDone()) {
        this.changeScreenWithDelay(this.nextScreen, 6000);
      } else {
        this.currentIndices = _.map(this.currentIndices, (index) => index === true ? true : index + 1);
        this.render(display);
      }
    }, 2000);
  }
}