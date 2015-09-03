
import _ from 'lodash';
import { Screen } from '../screen';
import MessageQueue from '../message-handler';
import GameState from '../../init/gamestate';
import SETTINGS from '../../constants/settings';

export class GameScreen extends Screen {

  static getScreenOffsets(centerPoint = GameState.players[0], width = SETTINGS.screen.width, height = SETTINGS.screen.height) {
    let topLeftX = Math.max(0, centerPoint.x - Math.round(width/2));
    topLeftX = Math.min(topLeftX, GameState.world.width - width);

    let topLeftY = Math.max(0, centerPoint.y - Math.round(height/2));
    topLeftY = Math.min(topLeftY, GameState.world.height - height);

    return {
      x: topLeftX,
      y: topLeftY
    };
  }

  static drawTiles(display, centerPoint, options = { width: SETTINGS.screen.width, height: SETTINGS.screen.height, offset: this.getScreenOffsets(), gameOffset: { x: 0, y: 0 } }) {

    const { width, height, offset, gameOffset } = options;

    const visible = [];

    const world = GameState.world;
    const zLevel = centerPoint.z;

    const isDead = centerPoint.hp.atMin();

    world.fov[zLevel].compute(
      centerPoint.x, centerPoint.y, isDead ? 1 : centerPoint.getSight(),
      (x, y) => {
        if(!visible[x]) visible[x] = [];
        visible[x][y] = true;
        world.setExplored(x, y, zLevel, true);
      }
    );

    const cache = {};
    _.each(['Telepathy', 'Clairvoyance', 'Warning'], (trait) => cache[trait] = centerPoint.getTraitValue(trait));

    const isVisible = (x, y) => {
      return visible[x] && visible[x][y];
    };

    const hasValid = (trait, x, y) => {
      return !isDead && cache[trait] && centerPoint.distBetweenXY(x, y) <= cache[trait];
    };

    // white (doesn't count), green, yellow, orange, red, purple
    const warningColors = ['#fff', '#0f0', '#ff0', '#ffa500', '#f00', '#ff0'];

    for(let x = offset.x; x < offset.x + width; x++) {
      for(let y = offset.y; y < offset.y + height; y++) {
        const hasTelepathy = hasValid('Telepathy', x, y);
        const hasClairvoyance = hasValid('Clairvoyance', x, y);
        const hasWarning = hasValid('Warning', x, y);
        const hasSeen = GameState.world.isExplored(x, y, centerPoint.z);
        if(!hasSeen && !GameState.renderAll && !hasTelepathy && !hasClairvoyance && !hasWarning) continue;

        const tile = world.getTile(x, y, zLevel);
        if(!tile) continue; // no out of bounds drawing

        let glyph = { key: null };
        let foreground = null;
        let background = null;

        const baseIsVisible = isVisible(x, y) || hasClairvoyance;

        if(baseIsVisible || hasSeen) {
          glyph = tile.glyph;
          foreground = glyph.fg;
          background = glyph.bg;
        }

        if(baseIsVisible) {
          const items = world.getItemsAt(x, y, zLevel);
          if (items && items.length > 0) {
            glyph = items[items.length - 1].glyph;
            foreground = glyph.fg;
          }
        }

        if(baseIsVisible || hasTelepathy || hasWarning) {
          const entity = world.getEntity(x, y, zLevel);
          if(entity) {

            if(baseIsVisible || hasTelepathy) {
              glyph = entity.glyph;
              foreground = glyph.fg;

            } else if(hasWarning && centerPoint.canAttack(entity)) {
              const difficulty = centerPoint.calcDifficulty(entity);
              glyph = { key: difficulty };
              foreground = warningColors[difficulty];
            }
          }
        }

        // visible things have a black background
        if(baseIsVisible) {
          background = '#333';
        }

        // prevent taking color away from things that have it
        if(!baseIsVisible && !foreground) {
          foreground = '#555';
        }

        display.draw(gameOffset.x + x - offset.x, gameOffset.y + y - offset.y, glyph.key, foreground, background);

      }
    }
  }

  static redrawHp(display, foreground, player, string, x = 0, y = SETTINGS.screen.height - 1) {
    const str = (''+player.hp.cur);
    const index = string.indexOf(`HP:${player.hp.cur}`)+3;
    const length = str.length;
    const strIdx = 0;
    for(let i = index; i < index+length; i++) {
      display.draw(x+i, y, str[strIdx], foreground);
    }
  }
}

export class SingleGameScreen extends GameScreen {

  static drawMessages(display, player) {

    if(!GameState.messages) return;

    for(let y = 0; y < 3; y++) {

      for(let x = 0; x < SETTINGS.screen.width; x++) {
        display.drawText(x, y, ' ');
      }
    }

    for(let y = 0; y < 3; y++) {
      const messageObj = GameState.messages[y];
      if(!messageObj || messageObj.turn < player.currentTurn - 4) continue;
      display.drawText(0, y, messageObj.message);
    }

    MessageQueue.viewAllMessages();
  }

  static drawHUD(display, player) {
    const tag = `${player.name} the ${player.getAlign()} ${player.gender} level ${player.level} ${player.race} ${player.professionInst.title} (${player.xp.cur}/${player.xp.max})`;
    const stats = `STR:${player.getStr()} DEX:${player.getDex()} CON:${player.getCon()} INT:${player.getInt()} WIS:${player.getWis()} CHA:${player.getCha()} AC:${player.getAC()}`;
    const miscInfo = `Floor:${1+GameState.currentFloor} (${GameState.world.tiles[GameState.currentFloor].shortMapName}) $:${player.gold} HP:${player.hp.cur}/${player.hp.max} MP:${player.mp.cur}/${player.mp.max} Turn:${player.currentTurn}`;

    for(let y = 1; y <= 3; y++) {
      for(let x = 0; x < SETTINGS.screen.width; x++) {
        display.drawText(x, SETTINGS.screen.height - y, ' ');
      }
    }

    display.drawText(0, SETTINGS.screen.height - 3, tag);
    display.drawText(0, SETTINGS.screen.height - 2, stats);
    display.drawText(0, SETTINGS.screen.height - 1, miscInfo);

    if(player.hp.ltePercent(20)) {
      this.redrawHp(display, '#7f0000', player, miscInfo);
    } else if(player.hp.ltePercent(50)) {
      this.redrawHp(display, '#ffd700', player, miscInfo);
    }
  }

  static render(display) {
    const player = GameState.players[0];
    this.drawTiles(display, player);
    this.drawHUD(display, player);
    this.drawMessages(display, player);
  }

  static get split() { return SplitGameScreen; }
}

export class SplitGameScreen extends GameScreen {

  static enter() {
    this.width = GameState.players.length > 2 ? (SETTINGS.screen.width / 2) : SETTINGS.screen.width;
    this.height = SETTINGS.screen.height / 2;

    this.tlCoords = [
      { x: 0, y: 0 },
      { x: 0, y: this.height+1 },
      { x: this.width+1, y: 0 },
      { x: this.width+1, y: this.height+1 }
    ];

    this.hudCoords = [
      { x: 0, y: this.height-1 },
      { x: 0, y: (this.height*2)-1 },
      { x: this.width+1, y: this.height-1 },
      { x: this.width+1, y: (this.height*2)-1 }
    ];
  }

  static render(display) {

    _.each(GameState.players, (player, i) => {
      this.drawTiles(display, player, { width: this.width, height: this.height, offset: this.getScreenOffsets(player, this.width, this.height), gameOffset: this.tlCoords[i] });
      this.drawHUDs(display, player, this.hudCoords[i]);
    });

    this.drawBorder(display);
  }

  static drawBorder(display) {

    const middleY = SETTINGS.screen.height / 2;
    for(let i = 0; i < SETTINGS.screen.width; i++) {
      display.draw(i, middleY, '=');
    }

    if(GameState.players.length > 2) {
      const middleX = SETTINGS.screen.width / 2;
      for(let i = 0; i < SETTINGS.screen.height; i++) {
        display.draw(middleX, i, '‖');
      }
    }

    this.drawLeftCenterText(display, middleY, `Floor:${GameState.currentFloor+1} (${GameState.world.tiles[GameState.currentFloor].shortMapName})`);
    this.drawRightCenterText(display, middleY, `Turns:${_.max(GameState.players, 'currentTurn').currentTurn}`);
  }

  static stripTo3(string) {
    return string.substring(0, 3);
  }

  static drawHUDs(display, player, hudCoords) {
    const { x, y } = hudCoords;

    const topString = `${player.name} ${this.stripTo3(player.getAlign())} ${this.stripTo3(player.gender)} ${this.stripTo3(player.race)} ${this.stripTo3(player.profession)}`;
    const bottomString = `Lv.${player.level} (${player.xp.cur}/${player.xp.max}) HP:${player.hp.cur}/${player.hp.max} MP:${player.mp.cur}/${player.mp.max}`;

    display.drawText(x, y-1, topString);
    display.drawText(x, y, bottomString);

    if(player.hp.ltePercent(20)) {
      this.redrawHp(display, '#7f0000', player, bottomString, x, y);
    } else if(player.hp.ltePercent(50)) {
      this.redrawHp(display, '#ffd700', player, bottomString, x, y);
    }
  }

  static get split() { return SingleGameScreen; }
}
