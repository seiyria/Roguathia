
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
}

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

export class GameScreen extends Screen {
  
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
  
  static drawTiles(display, centerPoint) {
    var offset = this.getScreenOffsets();
    
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
    
    for(let x = offset.x; x < offset.x + SETTINGS.screen.width; x++) {
      for(let y = offset.y; y < offset.y + SETTINGS.screen.height; y++) {
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
  
  static getScreenOffsets() {
    var centerPoint = GameState.players[0];
    var topLeftX = Math.max(0, centerPoint.x - Math.round(SETTINGS.screen.width/2));
    topLeftX = Math.min(topLeftX, GameState.world.width - SETTINGS.screen.width);
    
    var topLeftY = Math.max(0, centerPoint.y - Math.round(SETTINGS.screen.height/2));
    topLeftY = Math.min(topLeftY, GameState.world.height - SETTINGS.screen.height);
    
    return {
      x: topLeftX,
      y: topLeftY
    };
  }
  
  static render(display) {
    var player = GameState.players[0];
    this.drawTiles(display, player);
    this.drawHUD(display, player);
    this.drawMessages(display, player);
  }
}

export class DeadScreen extends Screen {
  static render(display) {
    this.drawCenterText(display, 11, '-Alas, you are slain!-');
    
    let latestDeath = _.max(GameState.players, 'currentTurn');
    this.drawCenterText(display, 12, `${latestDeath.name} was killed by ${latestDeath.killerName}.`);
  }
}

export class WinScreen extends Screen {
  static render(display) {
    this.drawCenterText(display, 11, '-You have won!-');
  }
}