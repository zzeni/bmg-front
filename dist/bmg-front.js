"use strict";

angular.module('config', [])

.constant('config', {debug:true,LANGUAGE_KEYS:['en','es'],ENV:'development',API_ENDPOINT_URL:'http://api.bemyguide-dev.com:3000'})

;;
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
bmg.filter('range', function () {
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
//bmg.directive('typeahead', ['$timeout', function ($timeout) {
bmg.directive('typeahead', [function () {
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
;
angular.module("multiselect.tpl.html", []).run(["$templateCache", "$http", function($templateCache, $http) {
	$http.get('/templates/home/_activities_dropdown.html')
  .success(function(data) {
    $templateCache.put("multiselect.tpl.html", data);
  });
}]);;
bmg.controller('homeController', ['$scope', 'initializer', 'utils', function ($scope, initializer, utils) {

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
      next: 'whybemyguide',
      offset: -50
    },
    whybemyguide: {
      next: 'blog',
      offset: -50
    },
    blog: {
      next: 'howitworks'
    },
    howitworks: {
      next: 'top',
      offset: 50
    }
  };
}]);;
bmg.factory('initializer', ['$log', function ($log) {
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
bmg.controller('layoutController', ['$scope', 'utils', function ($scope, utils) {
  $scope.getCurrentLanguage = utils.getCurrentLanguage;
  $scope.getLanguages = utils.getLanguages;
  $scope.changeLanguage = utils.changeLanguage;

  $scope.scoped = function scoped(translScope, translKey) {
    return (translScope) ? translScope + '.' + translKey : translKey;
  };
}]);;
bmg.controller('sessionController', ['$scope', function ($scope) {
}]);