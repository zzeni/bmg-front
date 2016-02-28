bmg.factory('utils', ['$log', '$translate', 'api', 'config', '$filter', function ($log, $translate, api, config, $filter) {
  "use strict";

  var factory = {};

  factory.activitiesFallbackData = [
//    {"id":1,"name":"biking","translation_key":"biking","icon_name":"9.svg","category":"land"},{"id":2,"name":"cannoeing","translation_key":"cannoeing","icon_name":"13.svg","category":"water"},{"id":3,"name":"canyoning","translation_key":"canyoning","icon_name":"16.svg","category":"water"},{"id":4,"name":"caving","translation_key":"caving","icon_name":"8.svg","category":"land"},{"id":5,"name":"climbing","translation_key":"climbing","icon_name":"6.svg","category":"land"},{"id":6,"name":"high_montain","translation_key":"high_montain","icon_name":"3.svg","category":"land"},{"id":7,"name":"hiking","translation_key":"hiking","icon_name":"2.svg","category":"land"},{"id":8,"name":"ice_climbing","translation_key":"ice_climbing","icon_name":"7.svg","category":"land"},{"id":9,"name":"kayaking","translation_key":"kayaking","icon_name":"14.svg","category":"land"},{"id":10,"name":"paragliding","translation_key":"paragliding","icon_name":"22.svg","category":"air"},{"id":11,"name":"rafting","translation_key":"rafting","icon_name":"15.svg","category":"water"},{"id":12,"name":"scuba_diving","translation_key":"scuba","icon_name":"18.svg","category":"water"},{"id":13,"name":"ski_touring","translation_key":"ski_touring","icon_name":"10.svg","category":"land"},{"id":14,"name":"skydiving","translation_key":"skydiving","icon_name":"24.svg","category":"air"},{"id":15,"name":"snowshoeing","translation_key":"snowshoeing","icon_name":"4.svg","category":"land"},{"id":16,"name":"wind_surfing","translation_key":"wind_surfing","icon_name":"21.svg","category":"water"},{"id":17,"name":"kite_surfing","translation_key":"kite_surfing","icon_name":"22.svg","category":"water"},{"id":18,"name":"trekking","translation_key":"trekking","icon_name":"1.svg","category":"land"},{"id":19,"name":"via ferrata","translation_key":"via_ferrata","icon_name":"5.svg","category":"land"},{"id":20,"name":"off-pist skiing","translation_key":"off_pist_skiing","icon_name":"11.svg","category":"land"},{"id":21,"name":"splitboard","translation_key":"splitboard","icon_name":"12.svg","category":"land"},{"id":22,"name":"balooning","translation_key":"balooning","icon_name":"23.svg","category":"air"},{"id":23,"name":"white-water","translation_key":"white_water","icon_name":"17.svg","category":"water"}
  ];

  factory.loadCountries = function loadActivities(scope) {
    $log.debug('Retrieving the list of activities ..');

    api.get('/countries.json')
    .success(function(data) {
      scope.countries = data;
      $log.debug(scope.countries.length + ' countries obtained.');
    })
    .error(function (error) {
      $log.debug('Error while getting countries list! ' + error);
    });
  };

  factory.loadActivities = function loadActivities(scope) {
    $log.debug('Retrieving the list of activities ..');

    api.get('/activities.json')
    .success(function(data) {
      var activities = [];
      angular.forEach(data, function (el) {
        $translate('utils.activities.' + el.translation_key).then(function (translation) {
          el.title = translation;
        });
        $translate('utils.activity_categories.' + el.category).then(function (translation) {
          el.category_title = translation;
        });
        activities.push(el);
      });
      scope.activities = $filter('orderBy')(activities, '+category');
      $log.debug(scope.activities.length + ' activities obtained.');
    })
    .error(function (error) {
      $log.debug('Error while getting activities list! ' + error);
//      scope.activities = factory.activitiesFallbackData;
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
