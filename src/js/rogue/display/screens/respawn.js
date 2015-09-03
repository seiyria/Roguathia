
import SETTINGS from '../../constants/settings';
import { Screen } from '../screen';
import NewGameScreen from './newgame';
import GameState from '../../init/gamestate';

export default class RespawnScreen extends Screen {
  static enter() {
    // would be nice if it redrew properly without needing duplicates in the list
    this.phases = ['/', '/', '|', '|', '\\', '\\', '-', '-'];
    this.stars = [];
    this.timer = 15;

    // one tick per star move, 4 ticks = new star and timer countdown
    this.ticks = this.timer * this.phases.length;
  }

  static addStar(x, y, length) {
    const minX = x - 1;
    const maxX = x + length + 1;
    const minY = y - 1;
    const maxY = y + 1;

    let inBadZone = true;
    let star = null;

    const distBetween = (me, target) => {
      const a = target.x - me.x;
      const b = target.y - me.y;
      return Math.sqrt(a*a + b*b);
    };

    while(inBadZone) {
      const myX = ROT.RNG.getUniformInt(0, SETTINGS.screen.width);
      const myY = ROT.RNG.getUniformInt(0, SETTINGS.screen.height);
      const me = { x: myX, y: myY };

      if(_.filter(this.stars, (star) => distBetween(me, star) < 4).length !== 0 ||
        myX >= minX && myX <= maxX &&
        myY >= minY && myY <= maxY) {
        continue;
      }

      inBadZone = false;
      star = { x: myX, y: myY, phase: ROT.RNG.getUniformInt(0, this.phases.length-1) };
    }

    this.stars.push(star);
  }

  static drawStars(display) {
    _.each(this.stars, (star) => {
      display.draw(star.x, star.y, this.phases[star.phase]);
      star.phase++;
      if(star.phase > this.phases.length - 1) {
        star.phase = 0;
      }
    });
  }

  static render(display) {
    display.clear();
    const text = `Respawning in ${this.timer} seconds...`;
    const { x, y } = this.drawCenterText(display,  11, text);

    if(this.ticks % this.phases.length === 0) {
      this.addStar(x, y, text.length);
      this.timer--;
    }

    this.ticks--;

    if(this.ticks <= 0) {
      GameState.game.safeSwitchScreen(this, NewGameScreen);
      return;
    }

    this.drawStars(display);
    setTimeout(() => this.render(display), 1000/this.phases.length);
  }
}