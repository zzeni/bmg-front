app.factory('utils', ['$log', '$translate', 'api', 'config', '$filter', function ($log, $translate, api, config, $filter) {
  "use strict";

  var factory = {};
  factory.loadCountries = function loadActivities(scope) {
    $log.debug('Retrieving the list of activities ..');

    api.get('/countries')
    .success(function(data) {
      scope.countries = data.data;
      $log.debug(scope.countries.length + ' countries obtained.');
    })
    .error(function (error) {
      $log.debug('Error while getting countries list! ' + error);
    });
  };

  factory.loadActivities = function loadActivities(scope) {
    $log.debug('Retrieving the list of activities ..');

    api.get('/activities')
    .success(function(data) {
      var activities = data.data;
      activities.forEach(function (el) {
        $translate('utils.activities.' + el.name).then(function (translation) {
          el.title = translation;
        });
        $translate('utils.activity_categories.' + el.category).then(function (translation) {
          el.category_title = translation;
        });
      });
      scope.activities = $filter('orderBy')(activities, '+category');
      $log.debug(scope.activities.length + ' activities obtained.');
    })
    .error(function (error) {
      $log.debug('Error while getting activities list! ' + error);
    });
  };

  return factory;
}]);
