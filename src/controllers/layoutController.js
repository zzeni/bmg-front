bmg.controller('layoutController', ['$scope', 'utils', function ($scope, utils) {
  $scope.getCurrentLanguage = utils.getCurrentLanguage;
  $scope.getLanguages = utils.getLanguages;
  $scope.changeLanguage = utils.changeLanguage;

  $scope.scoped = function scoped(translScope, translKey) {
    return (translScope) ? translScope + '.' + translKey : translKey;
  };
}]);