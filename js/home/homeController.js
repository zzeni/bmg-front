bmg.controller('homeController', ['$scope', 'initializer', 'utils', '$translate', function ($scope, initializer, utils, $translate) {
  $scope.activities = utils.activities;
  $scope.initializeIntro = initializer.initializeIntro;
  $scope.initializeSearch = initializer.initializeSearch;
  $scope.initializeHowItWorks = initializer.initializeHowItWorks;
  $scope.pickActivity = initializer.pickActivity;

  $scope.getCurrentLanguage = function getCurrentLanguage() {
    return $translate.use() ||
    $translate.storage().get($translate.storageKey()) ||
    $translate.preferredLanguage();
  };

  $scope.getLanguages = function getLanguages() {
    return languageKeys;
  };

  $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
  };
}]);