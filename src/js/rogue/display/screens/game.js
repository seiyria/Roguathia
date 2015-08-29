
import { Screen } from '../screen';
import MessageQueue from '../message-handler';
import GameState from '../../init/gamestate';
import SETTINGS from '../../constants/settings';

export class GameScreen extends Screen {

  static getScreenOffsets(centerPoint = GameState.players[0], width = SETTINGS.screen.width, height = SETTINGS.screen.height) {
    var topLeftX = Math.max(0, centerPoint.x - Math.round(width/2));
    topLeftX = Math.min(topLeftX, GameState.world.width - width);

    var topLeftY = Math.max(0, centerPoint.y - Math.round(height/2));
    topLeftY = Math.min(topLeftY, GameState.world.height - height);

    return {
      x: topLeftX,
      y: topLeftY
    };
  }

  static drawTiles(display, centerPoint, width = SETTINGS.screen.width, height = SETTINGS.screen.height, offset = this.getScreenOffsets()) {

    var visible = [];

    var world = GameState.world;
    var zLevel = centerPoint.z;

    world.fov[zLevel].compute(
      centerPoint.x, centerPoint.y, centerPoint.getSight(),
      (x, y) => {
        if(!visible[x]) visible[x] = [];
        visible[x][y] = true;
        world.setExplored(x, y, zLevel, true);
      }
    );

    for(let x = offset.x; x < offset.x + width; x++) {
      for(let y = offset.y; y < offset.y + height; y++) {
        if(!GameState.world.isExplored(x, y, centerPoint.z) && !GameState.renderAll) continue;

        var tile = world.getTile(x, y, zLevel);
        if(!tile) continue; // no out of bounds drawing

        var glyph = tile.glyph;
        var foreground = glyph.fg;
        var background = glyph.bg;

        if(visible[x] && visible[x][y]) {
          let items = world.getItemsAt(x, y, zLevel);
          if(items && items.length > 0) {
            glyph = items[items.length-1].glyph;
          }

          var entity = world.getEntity(x, y, zLevel);
          if(entity) {
            glyph = entity.glyph;
          }

          foreground = glyph.fg;
          background = '#333';

          // prevent taking color away from things that have it
        } else if(!foreground) {
          foreground = '#555';
        }

        display.draw(x - offset.x, y - offset.y, glyph.key, foreground, background);

      }
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
      var messageObj = GameState.messages[y];
      if(!messageObj || messageObj.turn < player.currentTurn - 4) continue;
      display.drawText(0, y, messageObj.message);
    }

    MessageQueue.viewAllMessages();
  }

  static drawHUD(display, player) {
    var tag = `${player.name} the ${player.getAlign()} ${player.level}/${player.professionInst.level} ${player.race} ${player.professionInst.title} (${player.xp.cur}/${player.xp.max})`;
    var stats = `STR:${player.getStr()} DEX:${player.getDex()} CON:${player.getCon()} INT:${player.getInt()} WIS:${player.getWis()} CHA:${player.getCha()}`;
    var miscInfo = `Floor:${1+GameState.currentFloor} $:${player.gold} HP:${player.hp.cur}/${player.hp.max} MP:${player.mp.cur}/${player.mp.max} AC:${player.getAC()} Turn:${player.currentTurn}`;

    for(let y = 1; y <= 3; y++) {
      for(let x = 0; x < SETTINGS.screen.width; x++) {
        display.drawText(x, SETTINGS.screen.height - y, ' ');
      }
    }

    display.drawText(0, SETTINGS.screen.height - 3, tag);
    display.drawText(0, SETTINGS.screen.height - 2, stats);
    display.drawText(0, SETTINGS.screen.height - 1, miscInfo);

    let redrawHp = (foreground) => {
      let str = (''+player.hp.cur);
      let index = miscInfo.indexOf(`HP:${player.hp.cur}`)+3;
      let length = str.length;
      let strIdx = 0;
      for(let i = index; i < index+length; i++) {
        display.draw(i, SETTINGS.screen.height - 1, str[strIdx], foreground);
      }
    };

    if(player.hp.ltePercent(20)) {
      redrawHp('#7f0000');
    } else if(player.hp.ltePercent(50)) {
      redrawHp('#ffd700');
    }
  }

  static render(display) {
    var player = GameState.players[0];
    this.drawTiles(display, player);
    this.drawHUD(display, player);
    this.drawMessages(display, player);
  }
}

// export class SplitGameScreen extends GameScreen {}