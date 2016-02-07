bmg.controller('homeController', ['$scope', 'initializer', 'utils', '$http', function ($scope, initializer, utils, $http) {

  $scope.activities = [];

  console.log('Getting the activities list..');

  $http.get('http://api.bemyguide-dev.com:3000/activities.json')
  .success(function(data) {
    $scope.activities = data;
    console.log($scope.activities.length + ' activities obtained.');
  })
  .error(function (error) {
    console.log('Error while getting activities list! ' + error);
    $scope.activities = utils.ActivitiesFallbackData;
  });

//  utils.loadActivities();

  $scope.initializeIntro = initializer.initializeIntro;
  $scope.initializeSearch = initializer.initializeSearch;
  $scope.initializeHowItWorks = initializer.initializeHowItWorks;
  $scope.pickActivity = initializer.pickActivity;

  $scope.getCurrentLanguage = utils.getCurrentLanguage;
  $scope.getLanguages = utils.getLanguages;
  $scope.changeLanguage = utils.changeLanguage;
}]);