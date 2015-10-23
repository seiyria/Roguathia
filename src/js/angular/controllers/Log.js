
import _ from 'lodash';

import Log from '../../rogue/lib/logger';

import module from '../module';
import GameState from '../../rogue/init/gamestate';

import { MessageTypes } from '../../rogue/display/message-handler';

module.controller('Log', ($scope) => {

  $scope.log = [];

  const addMessage = (msg, type) => {
    if(!type) {
      Log('GameLog', `Message "${msg}" has no type`);
    }
    $scope.log.push({ time: new Date(), msg, type });
  };

  GameState.on('gameover', () => {
    addMessage('Game over! Everyone died.', MessageTypes.META);
  });

  GameState.on('log', (logRef) => {

    const logObj = _.cloneDeep(logRef);

    addMessage(logObj.message, logObj.type);

    while($scope.log.length > 1000) {
      $scope.log.shift();
    }

    logRef = null;
  });
});