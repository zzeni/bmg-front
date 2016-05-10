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
;
var apiService = angular.module('apiService', ['ngResource', 'config']);

apiService.factory('api', ['$resource', '$http', 'config', function ($resource, $http, config) {
  "use strict";

  var service = {};

  service.get = function get(uri_path) {
    return $http.get(config.API_ENDPOINT_URL + uri_path);
  };

  return service;
}]);;
app.filter('range', function () {
  return function (input, total) {
    total = parseInt(total);

    for (var i=0; i<total; i++) {
      input.push(i);
    }

    return input;
  };
})
.filter('uniq', function () {
    return function (input, key) {
        var unique = {};
        var uniqueList = [];
        for(var i = 0; i < input.length; i++){
            if(typeof unique[input[i][key]] == "undefined"){
                unique[input[i][key]] = "";
                uniqueList.push(input[i]);
            }
        }
        return uniqueList;
    };
})
.filter('map', function () {
  return function (input, key) {
    var result = [];
    for (var i=0; i<input.length; i++) {
      result.push(input[i][key]);
    }
    return result;
  };
});
;
app.directive('pagescroll', [function () {
  return {
    restrict: 'AEC',
    scope: {
      next: '=',
      offset: '='
    },
    link: function (scope, elem, attrs) {
      scope.scrollToId = scope.next;
      scope.scrollToOffset = scope.offset;
    },
    templateUrl: function (element, attrs) {
      return attrs['template'] || '/templates/directives/_pagescroll.html';
    }
  };
}]);
;
//app.directive('typeahead', ['$timeout', function ($timeout) {
app.directive('typeahead', [function () {
  return {
    restrict: 'AEC',
    scope: {
      items: '=',
      prompt: '=',
      template: '@',
      label: '@',
      model: '=',
      onSelect: '&'
    },
    link: function (scope, elem, attrs) {
      scope.handleSelection = function (selectedItem) {
        scope.filter = selectedItem[scope.label];
        scope.model = selectedItem;
        scope.current = 0;
        scope.selected = true;
//        if (scope.onSelect) {
//          $timeout(function () {
//            scope.onSelect();
//          }, 200);
//        }
      };
      scope.current = 0;
      scope.filter = "";
      scope.selected = true;
      scope.isCurrent = function (index) {
        return scope.current === index;
      };
      scope.setCurrent = function (index) {
        scope.current = index;
      };
    },
    templateUrl: function (element, attrs) {
      return attrs['template'] || '/templates/directives/_typeahead.html';
    }
  };
}]);
;
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
        $translate('utils.activities.' + el.translation_key).then(function (translation) {
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
;
angular.module("multiselect.tpl.html", []).run(["$templateCache", "$http", function($templateCache, $http) {
	$http.get('/templates/home/_activities_dropdown.html')
  .success(function(data) {
    $templateCache.put("multiselect.tpl.html", data);
  });
}]);;
app.controller('homeController', ['$scope', 'initializer', 'utils', function ($scope, initializer, utils) {

  $scope.activities = [];
  $scope.countries = [];

  utils.loadActivities($scope);
  utils.loadCountries($scope);

  $scope.initializeIntro = initializer.initializeIntro;
  $scope.initializeSearch = initializer.initializeSearch;
  $scope.initializeHowItWorks = initializer.initializeHowItWorks;
  $scope.pickActivity = initializer.pickActivity;
  $scope.initializePageScrollers = initializer.initializePageScrollers;

  $scope.sections = {
    search: {
      next: 'activities'
    },
    activities: {
      next: 'whybemyguide'
    },
    whybemyguide: {
      next: 'blog'
    },
    blog: {
      next: 'howitworks'
    },
    howitworks: {
      next: 'top',
//      offset: 50
    }
  };
  
  $scope.interests = [
    'art',
    'birds',
    'astronomy',
    'geology',
    'music',
    'dancing',
    'butterflies',
    'mushrooms',
    'archeology',
    'observation',
    'reading',
    'photography',
    'religion',
    'sports',
    'fishing',
    'botany',
    'ecology',
    'history',
    'travel',
    'yoga'
  ];
}]);;
app.factory('initializer', ['$log', function ($log) {
  "use strict";

  var INTRO_MIN_HEIGHT = 660;

  var factory, slideShow, showMoto, fitIntro, updateCanvas, flowControlError,
      fitSearch, fitActivityDropdown1, fitActivityDropdown2;

  var windowObj = $(window),
      bgImgId = 1;

  flowControlError = function flowControlError(msg) {
    if (msg === undefined || !msg) msg = 'flow control error';
    var error = new Error(msg);
    error.isFlowControl = true;
    return error;
  };

  slideShow = function slideShow(introObj) {
    introObj.className = 'intro-bg-' + bgImgId;
    bgImgId = bgImgId % 5 + 1;

    var imgPrependObj = document.getElementById('imgPrepend');
    if (typeof(imgPrependObj) === "object" && imgPrependObj !== null) {
      $log.debug("Background " + bgImgId + " prepended..");
      imgPrependObj.className = 'intro-bg-' + bgImgId;
    }
  };

  fitIntro = function fitIntro(introObj) {
    introObj.width = windowObj.outerWidth();
    introObj.height = Math.max(windowObj.outerHeight(), INTRO_MIN_HEIGHT);
  };

  showMoto = function showMoto(canvas) {
    var counter = 0,
      drawCanvas, intId, stopDrawing;
    drawCanvas = function drawCanvas() {
      try {
        canvas.setAttribute('data-drawing-step', counter);
        updateCanvas(canvas);
        if (canvas.hasAttribute('data-drawing-done')) {
          throw flowControlError('drawing is done.');
        }
        counter++;
      } catch (error) {
        if (error.isFlowControl) {
          $log.debug(error.message);
        } else {
          $log.error(error);
        }
        return stopDrawing();
      }
    };
    intId = setInterval(drawCanvas, 10);
    stopDrawing = function stopDrawing() {
      return clearInterval(intId);
    };
  };

  updateCanvas = function updateCanvas(canvas) {
    var ctx, height, middle, width, curveHeight, step, offset;

    width = canvas.width;
    height = canvas.height;
    middle = width / 2;

    curveHeight = Math.min(canvas.getAttribute('data-offset'), height * 0.7);
    step = canvas.getAttribute('data-drawing-step');
    offset = (width >= 992) ? 0 : (width < 768) ? step / 2 : step / 4;

    if (step >= curveHeight / 2 && !$('#moto h2').hasClass('focused')) {
      $('#moto h2').addClass('focused');
    }
    if (step >= curveHeight && !canvas.getAttribute('data-drawing-done')) {
      canvas.setAttribute('data-drawing-done', 'done');
    }

    ctx = canvas.getContext("2d");
    ctx.clearRect(0, height - curveHeight, width, height);
    ctx.beginPath();
    ctx.moveTo(0, height - step);
    ctx.quadraticCurveTo(middle, height - offset, width, height - step);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.fillStyle = "#fafafa";
    return ctx.fill();
  };

  fitSearch = function fitSearch() {
    var intro_height, intro_offset, navbar_height, proposed_offset, search, searchOutlineTop, serach_height;

    search = $('#search');
    var introObj = document.getElementById('introCanvas');
    intro_height = introObj.height;
    serach_height = search.outerHeight();
    if (windowObj.outerWidth() > 767) {
      proposed_offset = (intro_height - serach_height) / 3;
    } else {
      proposed_offset = (intro_height - serach_height) / 2;
    }
    search.css('top', proposed_offset);
  };

  factory = {
    initializePageScrollers: function initializePageScrollers() {
      setTimeout(function() { $('.page-scroller').removeClass('hidden-cs'); }, 3000);
      setTimeout(function() { $('.page-scroller .faa-pulse').removeClass('faa-pulse'); }, 10000);
    },

    initializeIntro: function initialize() {

      $log.debug("initializing intro..");

      var canvas = document.getElementById('introCanvas');

      fitIntro(canvas);
      slideShow(canvas);

      setInterval(
        slideShow, 30000, canvas
      );

      $(window).on('resize', function () {
        fitIntro(canvas);
        updateCanvas(canvas);
      });

      $(window).resize();

      setTimeout(showMoto, 1000, canvas);
    },

    initializeSearch: function initializeSearch() {},

    initializeHowItWorks: function initializeHowItWorks() {
      $(window).on('scroll', function () {
        //        return showInfoBoxes();
      });

      $(window).on('resize', function () {
        //        return showInfoBoxes();
      });
    },
  };

  return factory;
}]);;
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
}]);;
app.controller('sessionController', ['$scope', function ($scope) {
}]);