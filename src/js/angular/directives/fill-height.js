
import module from '../module';

module.directive('fillHeight', ($window) => {
  return {
    scope: {
      offset: '='
    },
    link: (scope, element) => {
      const setSize = () => {
        element[0].style.height = $window.innerHeight - scope.offset;
        // angular.element(element).height($window.innerHeight);
      };

      setSize();

      angular.element($window).bind('resize', setSize);
    }
  };
});