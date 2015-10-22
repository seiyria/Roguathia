
import _ from 'lodash';

import module from '../module';
import GameState from '../../rogue/init/gamestate';

module.controller('Log', ($scope) => {

  $scope.log = [];

  const addMessage = (msg) => $scope.log.push({ time: new Date(), msg });

  GameState.on('gameover', () => {
    addMessage('Game over! Everyone died.');
  });

  GameState.on('log', (logRef) => {

    const logObj = _.cloneDeep(logRef);

    addMessage(logObj.message);

    while($scope.log.length > 1000) {
      $scope.log.shift();
    }

    logRef = null;
  });
});