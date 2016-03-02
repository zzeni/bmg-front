bmg.directive('pagescroll', [function () {
  return {
    restrict: 'AEC',
    scope: {
      next: '=',
      offset: '='
    },
    link: function (scope, elem, attrs) {
      scope.scrollToId = scope.next;
      scope.scrollToOffset = scope.offset;
    },
    templateUrl: function (element, attrs) {
      return attrs['template'] || '/templates/directives/_pagescroll.html';
    }
  };
}]);
