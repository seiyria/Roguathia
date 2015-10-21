
import module from '../module';
import GameState from '../../rogue/init/gamestate';

module.controller('Log', ($scope) => {

  $scope.log = [];

  GameState.on('log', (logObj) => {
    $scope.log.push({
      time: new Date(),
      msg: logObj.message
    });

    while($scope.log.length > 1000) {
      $scope.log.shift();
    }
  });
});