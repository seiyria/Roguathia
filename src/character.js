
import Entity from "./entity";
import NumberRange from "./lib/number-range";
import * as Professions from "./profession";
import GameState from "./gamestate";

export default class Character extends Entity {
  
  constructor(game, glyph, x, y, z, opts = { align: 'Neutral', speed: 100, sight: 7, name: 'Dudley', profession: 'Tourist'}) {
    super(glyph, x, y, z);
    _.extend(this, opts);
    
    this.ac  = 10;
    this.str = 5;
    this.con = 5;
    this.dex = 5;
    this.int = 5;
    this.wis = 5;
    this.cha = 5;
    this.luk = 0;
    this.gold = 0;
    this.level = 1;
    
    this.professionInst = new Professions[this.profession]();
    let [profHp, profMp] = [this.professionInst.hp, this.professionInst.mp];
    this.hp = new NumberRange(0, 15+profHp, 15+profHp);
    this.mp = new NumberRange(0, 0+profMp, 0+profMp);
    
    GameState.world.moveEntity(this, this.x, this.y, this.z);
    
    this.game = game;
    this.game.scheduler.add(this, true);
  }
  
  die() {
    this.game.scheduler.remove(this);
  }
  
  tryMove() {}
  
  move(newTile) {
    GameState.world.moveEntity(this, newTile.x, newTile.y, newTile.z);
  }
  
  getSight() {
    return this.sight;
  }
  
  getSpeed() {
    return this.speed;
  }
  
  getStat(stat) {
    return this[stat] + this.professionInst[stat];
  }
  
  getAC() {
    return this.getStat('ac');
  }
  
  getStr() {
    return this.getStat('str');
  }
  
  getDex() {
    return this.getStat('dex');
  }
  
  getCon() {
    return this.getStat('con');
  }
  
  getInt() {
    return this.getStat('int');
  }
  
  getWis() {
    return this.getStat('wis');
  }
  
  getCha() {
    return this.getStat('cha');
  }
  
  getLuk() {
    return this.getStat('luk');
  }
}