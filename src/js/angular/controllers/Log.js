
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

  $scope.filters = $localStorage.filters;

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
    addMessage({ message: 'Game over! Everyone died.', type: MessageTypes.META, turn: $scope.log[$scope.log.length-1].turn+1 });
  });

  GameState.on('log', (logObj) => {
    addMessage(logObj);
  });
});