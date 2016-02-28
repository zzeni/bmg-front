bmg.directive('typeahead', function ($timeout) {
  return {
    restrict: 'AEC',
    scope: {
      items: '=',
      prompt: '=',
      label: '@',
      model: '=',
      onSelect: '&'
    },
    link: function (scope, elem, attrs) {
      scope.handleSelection = function (selectedItem, label) {
        scope.filter = selectedItem[label];
        scope.model = selectedItem;
        scope.current = 0;
        scope.selected = true;
        if (scope.onSelect) {
          $timeout(function () {
            scope.onSelect();
          }, 200);
        }
      };
      scope.current = 0;
      scope.filter = "";
      scope.selected = true;
      scope.isCurrent = function (index) {
        return scope.current === index;
      };
      scope.setCurrent = function (index) {
        scope.current = index;
      };
    },
    templateUrl: '/js/directives/_typeahead.html'
  };
});
