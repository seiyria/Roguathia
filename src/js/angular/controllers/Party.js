
import module from '../module';
import GameState from '../../rogue/init/gamestate';

module.controller('Party', ($scope) => {
  GameState.on('redraw', () => {
    $scope.players = GameState.players;
    $scope.$apply();
  });
});