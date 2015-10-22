
import module from '../module';
import GameState from '../../rogue/init/gamestate';

module.controller('Dungeon', ($scope) => {

  GameState.on('start', () => {
    $scope.world = GameState.world;
    $scope.victory = GameState.winCondition;
  });

});