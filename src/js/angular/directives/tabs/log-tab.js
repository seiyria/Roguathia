
import module from '../../module';

module.directive('log', () => {
  return {
    controller: 'Log',
    restrict: 'E',
    templateUrl: 'log-tab'
  };
});