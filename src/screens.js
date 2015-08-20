
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

let tempKills = {
  'newt': 100,
  'gas spore': 3,
  'jackal': 50,
  'Juiblex': 1,
  'Medusa': 1,
  'Rodney': 1,
  'quantum mechanic': 77,
  'giant ant': 10,
  'killer bee': 540,
  'soldier ant': 10,
  'queen bee': 2,
  'giant beetle': 1,
  'acid blob': 10,
  'green blob': 5,
  'gelatious cube': 1,
  'cockatrice': 5,
  'chickatrice': 10,
  'fox': 1,
  'coyote': 1,
  'werejackal': 1,
  'little dog': 1,
  'dog': 1,
  'large dog': 1,
  'dingo': 1,
  'wolf': 1,
  'werewolf': 1,
  'warg': 1,
  'winter wolf cub': 1,
  'winter wolf': 1,
  'hell hound pup': 100,
  'hell hound': 1,
  'zeta tau': 100
};

class ScrollingScreen extends Screen {}
class SingleScrollingScreen extends Screen {
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
        this.changeScreenWithDelay(RespawnScreen, 5000);
      } else {
        this.currentIndex++;
        this.render(display);
      }
    }, 2000);
  }
}
class SplitScrollingScreen extends ScrollingScreen {}

class SingleVanquishedScreen extends SingleScrollingScreen {
  static enter(display) {
    super.enter();
    let target = this.getMainPlayer();
    let killHash = tempKills;
    //target.conquest
    let sortedKills = _(killHash).keys().map((mon) => ({name: mon, num: killHash[mon]})).sortBy('name').value();
    this.scrollContent = _.map(sortedKills, (kill) => `${_.padLeft(kill.num, 4)} ${kill.name}`);
    let totalKills = _.reduce(sortedKills, ((prev, cur) => prev + cur.num), 0);
    this.title = `${target.name}'s Conquest (${sortedKills.length} types|${totalKills} total)`; //shorten this for splitscreen
  }
}
class SplitVanquishedScreen extends SplitScrollingScreen {}

class SingleTraitsScreen extends SingleScrollingScreen {}
class SplitTraitsScreen extends SplitScrollingScreen {}

// Dead -> Vanquished -> Traits -> Respawn
// draw random stars the farther countdown gets (/ | \ -)
class RespawnScreen extends Screen {
  static render(display) {
    this.drawCenterText(display,  11, 'Respawning soon (tm)...');
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

export class DeadScreen extends Screen {
  static enter() {
    GameState.game.engine.lock();
    
    this.changeScreenWithDelay(SingleVanquishedScreen, 5000);
  }
  static render(display) {
    const TOMBSTONE_WIDTH = 26;
    const goodbyes = ['Goodbye', 'Sayonara', 'Ciao', 'Adios', 'Toodles', 'Ta ta', 'Farewell', 'Bye-bye', 'Bye', 'So long', 'RIP'];
    
    let latestDeath = this.getMainPlayer();
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
    this.drawLeftText(display, i++,     `You scored ${score} points and ${latestDeath.gold} gold over ${latestDeath.currentTurn} steps.`);
  }
}

export class WinScreen extends Screen {
  static render(display) {
    this.drawCenterText(display, 11, '-You have won!-');
  }
}

export class SingleGameScreen extends GameScreen {
  
  static enter() {
    GameState.game.switchScreen(DeadScreen);
  }
  
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