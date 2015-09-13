
import _ from 'lodash';
import { Screen } from '../screen';
import { SingleVanquishedScreen, SplitVanquishedScreen } from './vanquished';
import GameState from '../../init/gamestate';
import ChangeTitle from '../../lib/page-title';

export default class DeadScreen extends Screen {
  static enter() {
    GameState.game.engine.lock();
    this.changeScreenWithDelay({ single: SingleVanquishedScreen, multi: SplitVanquishedScreen }, 5000);
  }
  static render(display) {
    const TOMBSTONE_WIDTH = 26;
    const goodbyes = ['Goodbye', 'Sayonara', 'Ciao', 'Adios', 'Toodles', 'Ta ta', 'Farewell', 'Bye-bye', 'Bye', 'So long', 'RIP'];

    const latestDeath = this.getMainPlayer();
    const score = latestDeath.getScore();
    const floor = GameState.currentFloor + 1;
    const paddedName = this.padText(latestDeath.name, TOMBSTONE_WIDTH);
    const paddedScore = this.padText(`Score: ${score}`, TOMBSTONE_WIDTH);
    const paddedKiller = this.padText(latestDeath.killerName, TOMBSTONE_WIDTH);

    const goodbye = _.sample(goodbyes);
    const mapName = GameState.world.tiles[GameState.currentFloor].mapName;
    let i = 3;

    this.drawCenterText(display, i++,                `------------------`);
    this.drawCenterText(display, i++,               '/                  \\');
    this.drawCenterText(display, i++,              '/        REST        \\');
    this.drawCenterText(display, i++,             '/          IN          \\');
    this.drawCenterText(display, i++,            '/         POINTS         \\');
    this.drawCenterText(display, i++,           '/                          \\');
    this.drawCenterText(display, i++,           `|${paddedName}|`);
    this.drawCenterText(display, i++,           `|${paddedScore}|`);
    this.drawCenterText(display, i++,           `|                          |`);
    this.drawCenterText(display, i++,           `|         slain by         |`);
    this.drawCenterText(display, i++,           `|${paddedKiller}|`);
    this.drawCenterText(display, i++,           `|                          |`);
    this.drawCenterText(display, i++,      `&  * |      *                   $     *`);
    this.drawCenterText(display, i++,   `__\\\\)/_]_|____\\\\(\\\\_____//\\/_______\\{/____|____`);

    i++;

    this.drawLeftText(display, i++,     `${goodbye}, ${latestDeath.name} the ${latestDeath.getAlign()} ${latestDeath.gender} ${latestDeath.race} ${latestDeath.profession}...`);
    this.drawLeftText(display, i++,     `You were level ${latestDeath.level} after earning ${latestDeath.totalXpEarned} experience.`);
    this.drawLeftText(display, i++,     `You died in ${mapName} on dungeon level ${floor}.`);
    this.drawLeftText(display, i++,     `You scored ${score} points and ${latestDeath.gold} gold over ${latestDeath.currentTurn} steps.`);
    this.drawLeftText(display, i++,     `You earned ${GameState.spEarned} SP and ${GameState.kpEarned} KP.`);

    ChangeTitle('Dead');
  }
}