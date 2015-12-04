
import _ from 'lodash';

import module from '../module';
import GameState from '../../rogue/init/gamestate';

module.controller('Party', ($scope, $uibModal, $timeout) => {

  $scope.inventoryOffset = () => 60 + document.getElementsByClassName('player-block')[0].offsetHeight;

  $scope.countSlotsTaken = (equipment) => _.reduce(equipment, (prev, item) => prev + item.slotsTaken, 0);

  $scope.openEditWindow = (player, index) => {
    $uibModal.open({
      templateUrl: 'player-edit',
      controller: 'PartyMemberEdit',
      keyboard: false,
      backdrop: 'static',
      resolve: { player, index }
    });
  };

  $scope.isBelow = (player, stat, threshold) => (player[stat].cur/player[stat].max*100<threshold);
  $scope.isAbove = (player, stat, threshold) => (player[stat].cur/player[stat].max*100>threshold);

  GameState.on('redraw', () => {

    $timeout(function() {
      $scope.players = GameState.players;
    });

  });
});

module.controller('PartyMemberEdit', ($scope, $uibModalInstance, TemplateDataManager, UpgradeDataManager, player, index) => {
  $scope.close = $uibModalInstance.close;

  const upgradesBySplit = (split, defaultVal = 'Random') => {
    return [{ key: defaultVal, val: undefined }].concat(_(UpgradeDataManager.upgrades)
      .filter(u => _.contains(u, split))
      .map(u => u.split(split)[1].trim())
      .map(u => ({ key: u, val: u }))
      .value());
  };

  $scope.templateDataManager = TemplateDataManager;
  $scope.upgradeDataManager = UpgradeDataManager;
  $scope.index = index;
  $scope.player = player;

  $scope.genders = [
    { key: 'Random', val: undefined },
    { key: 'Male', val: 'Male' },
    { key: 'Female', val: 'Female' }
  ];

  $scope.aligns = [
    { key: 'Random', val: undefined },
    { key: 'Eviler', val: -200 },
    { key: 'Evil', val: -100 },
    { key: 'Neutral', val: 0 },
    { key: 'Good', val: 100 },
    { key: 'Gooder', val: 200 }
  ];

  $scope.professions = upgradesBySplit('Class:');

  $scope.races = upgradesBySplit('Race:');

  $scope.colors = [
    { key: 'Default', val: undefined },
    { key: 'Red', val: '#f00' },
    { key: 'Blue', val: '#00f' },
    { key: 'Green', val: '#0f0' },
    { key: 'Yellow', val: '#ff0' },
    { key: 'Cyan', val: '#0ff' },
    { key: 'Magenta', val: '#f0f' }
  ];

  $scope.greater = upgradesBySplit('Trait: G.', 'None');
  $scope.lesser = upgradesBySplit('Trait: L.', 'None');
  $scope.utility = upgradesBySplit('Trait: U.', 'None');
  $scope.buff = upgradesBySplit('Buff:', 'None');

  $scope.ais = [
    { key: 'Explore Dungeon', val: undefined },
    { key: 'Wander', val: 'Wander' }
  ];
});
