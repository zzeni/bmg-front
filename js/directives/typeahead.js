bmg.directive('typeahead', function ($timeout) {
  return {
    restrict: 'AEC',
    scope: {
      items: '=',
      prompt: '=',
      template: '@',
      label: '@',
      model: '=',
      onSelect: '&'
    },
    link: function (scope, elem, attrs) {
      scope.handleSelection = function (selectedItem) {
        scope.filter = selectedItem[scope.label];
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
    templateUrl: function (element, attrs) {
      return attrs['template'] || '/js/directives/_typeahead.html';
    }
  };
});
