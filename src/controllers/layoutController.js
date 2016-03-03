app.controller('layoutController', ['$scope', '$translate', 'config', function ($scope, $translate, config) {

  $scope.getCurrentLanguage = function getCurrentLanguage() {
    return $translate.use() ||
    $translate.storage().get($translate.storageKey()) ||
    $translate.preferredLanguage();
  };

  $scope.getLanguages = function getLanguages() {
    return config.LANGUAGE_KEYS;
  };

  $scope.changeLanguage = function changeLanguage($event, langKey) {
    $event.preventDefault();
//    $event.stopPropagation();
    $translate.use(langKey);
  };

  $scope.scoped = function scoped(translScope, translKey) {
    return (translScope) ? translScope + '.' + translKey : translKey;
  };
}]);