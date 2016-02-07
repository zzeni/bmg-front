var bmg = angular.module('bmg', ['pascalprecht.translate', 'ngCookies', 'apiService', 'config']);

bmg.config(['$translateProvider', 'LANGUAGE_KEYS', function ($translateProvider, LANGUAGE_KEYS) {
  "use strict";

  $translateProvider
    .registerAvailableLanguageKeys(LANGUAGE_KEYS, {
      'en_US': 'en',
      'en_UK': 'en'
    })
    .useStaticFilesLoader({
      prefix: '/translations/',
      suffix: '.json'
    })
    .determinePreferredLanguage()
    .fallbackLanguage('en')
    .useCookieStorage();

  // Enable escaping of HTML
  $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
}]);

