
import module from '../module';
import GameState from '../../rogue/init/gamestate';

module.controller('Dungeon', ($scope) => {

  $scope.currentFloor = 0;

  GameState.on('start', () => {
    $scope.world = GameState.world;
    $scope.victory = GameState.winCondition;
  });

  GameState.on('descend', () => {
    $scope.currentFloor = GameState.currentFloor;
  });

});