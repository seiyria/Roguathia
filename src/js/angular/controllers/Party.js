
import module from '../module';
import GameState from '../../rogue/init/gamestate';

module.controller('Party', ($scope) => {

  $scope.dropItem = (player, item) => player.dropItem(item);

  GameState.on('redraw', () => {
    $scope.players = GameState.players;
    $scope.$apply();
  });
});