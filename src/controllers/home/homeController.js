bmg.controller('homeController', ['$scope', 'initializer', 'utils', function ($scope, initializer, utils) {

  $scope.activities = [];
  $scope.countries = [];

  utils.loadActivities($scope);
  utils.loadCountries($scope);

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
      next: 'whybemyguide'
    },
    whybemyguide: {
      next: 'blog'
    },
    blog: {
      next: 'howitworks'
    },
    howitworks: {
      next: 'top',
//      offset: 50
    }
  };
  
  $scope.interests = [
    'art',
    'birds',
    'astronomy',
    'geology',
    'music',
    'dancing',
    'butterflies',
    'mushrooms',
    'archeology',
    'observation',
    'reading',
    'photography',
    'religion',
    'sports',
    'fishing',
    'botany',
    'ecology',
    'history',
    'travel',
    'yoga'
  ];
}]);