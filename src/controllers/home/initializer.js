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
}]);