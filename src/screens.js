
import SETTINGS from "./settings";
import GameState from "./gamestate";
import MessageQueue from "./message-handler";

class Screen {
  static enter() {}
  static exit()  {}
  static render() {}
  static handleInput() {}
  static drawCenterText(display, y, text) {
    let x = Math.floor(SETTINGS.screen.width/2) - Math.floor(text.length/2);
    display.drawText(x, y, text);
  }
  static drawLeftText(display, y, text) {
    display.drawText(0, y, text);
  }
  static padText(text, width) {
    return _.pad(text, width);
  }
}

class GameScreen extends Screen {

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
      (x, y, radius, visibility) => {
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
          // TODO: display items
          
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

class ScrollingScreen extends Screen {}

class SingleScrollingScreen extends Screen {}
class SplitScrollingScreen extends Screen {}

class SingleVanquishedScreen extends SingleScrollingScreen {}
class SplitVanquishedScreen extends SplitScrollingScreen {}

class SingleTraitsScreen extends SingleScrollingScreen {}
class SplitTraitsScreen extends SplitScrollingScreen {}

// Dead -> Vanquished -> Traits -> Respawn
class RespawnScreen extends Screen {}

export class LoadScreen extends Screen {
  static enter(display) {
    this.flicker = 0;
    
    let dotStatus = ['.  ', '.. ', '...', ' ..', '  .'];
    
    this.interval = setInterval( () => {
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

export class DeadScreen extends Screen {
  static render(display) {
    const TOMBSTONE_WIDTH = 26;
    const goodbyes = ['Goodbye', 'Sayonara', 'Ciao', 'Adios', 'Toodles', 'Ta ta', 'Farewell', 'Bye-bye', 'Bye', 'So long', 'RIP'];
    
    let latestDeath = _.max(GameState.players, 'currentTurn');
    let score = latestDeath.getScore();
    let floor = GameState.currentFloor + 1;
    let paddedName = this.padText(latestDeath.name, TOMBSTONE_WIDTH);
    let paddedScore = this.padText(`Score: ${score}`, TOMBSTONE_WIDTH);
    let paddedKiller = this.padText(latestDeath.killerName, TOMBSTONE_WIDTH);
    
    let goodbye = _.sample(goodbyes);
    let mapName = GameState.world.tiles[GameState.currentFloor].mapName;
    let i = 3;
    
    this.drawCenterText(display, i++,                `------------------`);
    this.drawCenterText(display, i++,               `/                  \\`);
    this.drawCenterText(display, i++,              `/        REST        \\`);
    this.drawCenterText(display, i++,             `/          IN          \\`);
    this.drawCenterText(display, i++,            `/         POINTS         \\`);
    this.drawCenterText(display, i++,           `/                          \\`);
    this.drawCenterText(display, i++,           `|${paddedName}|`);
    this.drawCenterText(display, i++,           `|${paddedScore}|`);
    this.drawCenterText(display, i++,           `|                          |`);
    this.drawCenterText(display, i++,           `|         slain by         |`);
    this.drawCenterText(display, i++,           `|${paddedKiller}|`);
    this.drawCenterText(display, i++,           `|                          |`);
    this.drawCenterText(display, i++,      `&  * |      *                   $     *`);
    this.drawCenterText(display, i++,   `__\\\\)/_]_|____\\\\(\\\\_____//\\/_______\\{/____|____`);
    
    i++;
    
    this.drawLeftText(display, i++,     `${goodbye}, ${latestDeath.name} the ${latestDeath.getAlign()} ${latestDeath.profession}...`);
    this.drawLeftText(display, i++,     `You were level ${latestDeath.level}/${latestDeath.professionInst.level} after earning ${latestDeath.totalXpEarned} experience.`);
    this.drawLeftText(display, i++,     `You died in ${mapName} on dungeon level ${floor}.`);
    this.drawLeftText(display, i++,     `You earned ${score} points and ${latestDeath.gold} gold over ${latestDeath.currentTurn} steps.`);
  }
}

export class WinScreen extends Screen {
  static render(display) {
    this.drawCenterText(display, 11, '-You have won!-');
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
    var tag = `${player.name} the ${player.getAlign()} ${player.level}/${player.professionInst.level} ${player.professionInst.title} (${player.xp.cur}/${player.xp.max})`;
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
  }
  
  static render(display) {
    var player = GameState.players[0];
    this.drawTiles(display, player);
    this.drawHUD(display, player);
    this.drawMessages(display, player);
  }
}

export class SplitGameScreen extends GameScreen {}