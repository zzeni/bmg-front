bmg.controller('homeController', ['$scope', 'initializer', 'utils', function ($scope, initializer, utils) {
  $scope.activities = utils.activities;
  $scope.initializeIntro = initializer.initializeIntro;
  $scope.initializeSearch = initializer.initializeSearch;
  $scope.initializeHowItWorks = initializer.initializeHowItWorks;
  $scope.pickActivity = initializer.pickActivity;
}]);