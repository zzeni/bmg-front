var bmg = angular.module('bmg', [
  'ui.router',
  'ui.multiselect',
  'pascalprecht.translate',
  'ngCookies',
  'apiService',
  'config',
  'smoothScroll'
]);

bmg.config([
  '$logProvider',
  '$translateProvider',
  '$stateProvider',
  '$urlRouterProvider',
  'config',
  function ($logProvider, $translateProvider, $stateProvider, $urlRouterProvider, config) {
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

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'homeController'
      })
      .state('home_new', {
        url: '/home-v1',
        templateUrl: '/home_new.html',
        controller: 'homeController'
      })
      .state('login', {
        url: '/login',
        templateUrl: '/login.html',
        controller: 'layoutController'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: '/signup.html',
        controller: 'layoutController'
      });

    $urlRouterProvider.otherwise('home');
  }
]);

