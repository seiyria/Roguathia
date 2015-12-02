
import Log from '../../rogue/lib/logger';

import module from '../module';
import GameState from '../../rogue/init/gamestate';

import { MessageTypes } from '../../rogue/display/message-handler';

module.controller('Log', ($scope) => {

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

  GameState.on('gameover', () => {
    addMessage('Game over! Everyone died.', MessageTypes.META);
  });

  GameState.on('log', (logObj) => {
    addMessage(logObj);
  });
});