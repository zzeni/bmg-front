var app = angular.module('app', [
  'ui.router',
  'ui.multiselect',
  'pascalprecht.translate',
  'ngCookies',
  'apiService',
  'config',
  'smoothScroll'
]);

app.controller('mainController', ['$scope', '$state', function ($scope, $state) {
  $scope.$state = $state;
}]);

app.config([
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
        templateUrl: '/templates/home/_home.html',
        controller: 'homeController'
      })
      .state('home_new', {
        url: '/home-v1',
        templateUrl: 'templates/home/_home_new.html',
        controller: 'homeController'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'templates/session/_login.html'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'templates/session/_signup.html'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'templates/user/_profile.html'
      });

    $urlRouterProvider.otherwise('home');
  }
]);
