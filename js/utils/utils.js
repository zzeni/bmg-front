bmg.factory('utils', ['$log', '$translate', 'api', 'config', function ($log, $translate, api, config) {
  "use strict";

  var factory = {};

  factory.activitiesFallbackData = [
    { name: 'biking', translation_key: 'biking' },
    { name: 'cannoeing', translation_key: 'cannoeing' },
    { name: 'canyoning', translation_key: 'canyoning' },
    { name: 'caving', translation_key: 'caving' },
    { name: 'climbing', translation_key: 'climbing' },
    { name: 'cycling', translation_key: 'cycling' },
    { name: 'high_montain', translation_key: 'high_montain' },
    { name: 'hiking', translation_key: 'hiking' },
    { name: 'ice_climbing', translation_key: 'ice_climbing' },
    { name: 'kayaking', translation_key: 'kayaking' },
    { name: 'paragliding', translation_key: 'paragliding' },
    { name: 'rafting', translation_key: 'rafting' },
    { name: 'scuba diving', translation_key: 'scuba' },
    { name: 'ski touring', translation_key: 'ski_touring' },
    { name: 'skydiving', translation_key: 'skydiving' },
    { name: 'snowshoeing', translation_key: 'snowshoeing' },
    { name: 'wind_surfing', translation_key: 'wind_surfing' },
    { name: 'kite_surfing', translation_key: 'kite_surfing' },
    { name: 'trekking', translation_key: 'trekking' }
  ];

  factory.loadActivities = function loadActivities(scope) {
    $log.debug('Retrieving the list of activities ..');

    api.get('/activities.json')
    .success(function(data) {
      scope.activities = [];
      angular.forEach(data, function(el) {
        $translate('utils.activities.' + el.translation_key).then(function (translation) {
          el.name = translation;
//          el.icon = '<img src="/img/icons/activities/' + el.icon_name + '" width="15px">';
        });
        scope.activities.push(el);
      });
      $log.debug(scope.activities.length + ' activities obtained.');
    })
    .error(function (error) {
      $log.debug('Error while getting activities list! ' + error);
      scope.activities = factory.activitiesFallbackData;
    });
  };

  factory.getCurrentLanguage = function getCurrentLanguage() {
    return $translate.use() ||
    $translate.storage().get($translate.storageKey()) ||
    $translate.preferredLanguage();
  };

  factory.getLanguages = function getLanguages() {
    return config.LANGUAGE_KEYS;
  };

  factory.changeLanguage = function changeLanguage(langKey) {
    $translate.use(langKey);
  };

  return factory;
}]);
