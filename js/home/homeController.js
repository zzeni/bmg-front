bmg.controller('homeController', ['$scope', 'initializer', 'utils', function ($scope, initializer, utils) {

  $scope.activities = [];
  $scope.activitiesByCategory = {};

  utils.loadActivities($scope);

  $scope.initializeIntro = initializer.initializeIntro;
  $scope.initializeSearch = initializer.initializeSearch;
  $scope.initializeHowItWorks = initializer.initializeHowItWorks;
  $scope.pickActivity = initializer.pickActivity;
  $scope.initializePageScrollers = initializer.initializePageScrollers;

  $scope.sections = {
    search: {
      next: 'activities'
    },
    activities: {
      next: 'whybemyguide',
      offset: -50
    },
    whybemyguide: {
      next: 'blog',
      offset: -50
    },
    blog: {
      next: 'howitworks'
    },
    howitworks: {
      next: 'top',
      offset: 50
    }
  };
}]);