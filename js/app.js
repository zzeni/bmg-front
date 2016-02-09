var bmg = angular.module('bmg', ['pascalprecht.translate', 'ngCookies', 'apiService', 'config']);

bmg.config(['$logProvider', '$translateProvider', 'config', function ($logProvider, $translateProvider, config) {
  "use strict";

  $logProvider.debugEnabled(config.debug);

  $translateProvider
    .registerAvailableLanguageKeys(config.LANGUAGE_KEYS, {
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

