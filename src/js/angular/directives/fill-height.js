
import module from '../module';

module.directive('fillHeight', ($window, $parse) => {
  return {
    scope: {
      scrollBottom: '='
    },
    link: (scope, element, attrs) => {
      const setSize = () => {
        console.log(typeof attrs.offset);
        element[0].style.height = `${$window.innerHeight - ($parse(attrs.offset)(scope) || 0)}px`;
      };

      setSize();

      angular.element($window).bind('resize', setSize);

      scope.$watch(() => attrs.offset, setSize);

      if(scope.scrollBottom) {
        scope.$watchCollection('scrollBottom', (newValue) => {
          if(!newValue) return;
          element[0].scrollTop = element[0].scrollHeight;
        });
      }
    }
  };
});