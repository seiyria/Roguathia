
import module from '../module';

module.controller('Root', ($scope, $http, $interval, $window) => {

  // get the current version
  $http.get('version.json').then(res => {
    $scope.tag = res.data.tag;
  });

  // title is either the game name or with the version tag if available
  $scope.title = () => {
    if($scope.tag) {
      return `Roguathia v${$scope.tag}`;
    }

    return 'Roguathia';
  };

  $scope.reload = () => $window.location.reload();

  // check for an update every 10 minutes
  $interval(() => {
    $http.get('https://api.github.com/repos/seiyria/Roguathia/tags').then(res => {
      $scope.latestTag = res.data ? res.data[0].name : null;
      $scope.updateAvailable = $scope.tag != $scope.latestTag;
    });
  }, 600000);
});