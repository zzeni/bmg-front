var languageKeys = ['en', 'es'];
var bmg = angular.module('bmg', ['pascalprecht.translate', 'ngCookies'])
  .config(['$translateProvider', function ($translateProvider) {
    "use strict";

    $translateProvider
      .registerAvailableLanguageKeys(languageKeys, {
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