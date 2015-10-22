
import module from '../module';

module.directive('fillHeight', ($window) => {
  return {
    scope: {
      offset: '=',
      scrollBottom: '='
    },
    link: (scope, element) => {
      const setSize = () => {
        element[0].style.height = `${$window.innerHeight - scope.offset}px`;
      };

      setSize();

      angular.element($window).bind('resize', setSize);

      if(scope.scrollBottom) {
        scope.$watchCollection('scrollBottom', (newValue) => {
          if(!newValue) return;
          element[0].scrollTop = element[0].scrollHeight;
        });
      }
    }
  };
});