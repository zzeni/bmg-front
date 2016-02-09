bmg.controller('homeController', ['$scope', 'initializer', 'utils', '$http', function ($scope, initializer, utils, $http) {

  $scope.activities = [];

  utils.loadActivities($scope);

  $scope.initializeIntro = initializer.initializeIntro;
  $scope.initializeSearch = initializer.initializeSearch;
  $scope.initializeHowItWorks = initializer.initializeHowItWorks;
  $scope.pickActivity = initializer.pickActivity;

  $scope.getCurrentLanguage = utils.getCurrentLanguage;
  $scope.getLanguages = utils.getLanguages;
  $scope.changeLanguage = utils.changeLanguage;

  $scope.scoped = function scoped(translScope, translKey) {
    return (translScope) ? translScope + '.' + translKey : translKey;
  };
}]);