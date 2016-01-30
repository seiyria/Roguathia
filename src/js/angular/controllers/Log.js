
import Log from '../../rogue/lib/logger';

import module from '../module';
import GameState from '../../rogue/init/gamestate';

import { MessageTypes } from '../../rogue/display/message-handler';

module.controller('Log', ($scope, $localStorage) => {

  $localStorage.filters = $localStorage.filters || {
    Meta: true,
    Item: true,
    Combat: true,
    Dungeon: true
  };

  $localStorage.deathLog = $localStorage.deathLog || [];

  $scope.filters = $localStorage.filters;
  $scope.deathLog = $localStorage.deathLog;

  $scope.log = [];

  const addMessage = (msgObj) => {
    if(!msgObj.type) {
      Log('GameLog', `Message "${msgObj.message}" has no type`);
    }

    $scope.log.push(msgObj);

    if($scope.log.length > 100) {
      $scope.log.shift();
    }
  };

  const addMetaMessage = (msg) => {
    addMessage({ message: msg, type: MessageTypes.META, turn: $scope.log[$scope.log.length-1].turn+1 });
  };

  GameState.on('victory', () => {
    addMetaMessage('You win!');
    addMetaMessage(`You earned ${GameState.spEarned} SP, ${GameState.kpEarned} KP, and ${GameState.vpEarned} VP.`);
  });

  GameState.on('gameover', () => {
    addMetaMessage('Game over! Everyone died.');
    addMetaMessage(`You earned ${GameState.spEarned} SP and ${GameState.kpEarned} KP.`);
  });

  GameState.on('log', (logObj) => {
    addMessage(logObj);
  });

  GameState.on('die', player => {
    $scope.deathLog.unshift({
      name: player.name,
      level: player.level,
      align: player.getAlign(),
      gender: player.gender,
      title: player.professionInst.title,
      race: player.race,
      profession: player.profession,
      floor: GameState.currentFloor,
      spEarned: player.getScore(),
      deathTime: Date.now()
    });

    if($scope.deathLog.length > 25) {
      $scope.deathLog.pop();
    }
  });
});