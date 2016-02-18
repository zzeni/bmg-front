bmg.factory('initializer', ['$log', function ($log) {
  "use strict";

  var INTRO_MIN_HEIGHT = 660;

  var factory, slideShow, showMoto, fitIntro, updateCanvas, flowControlError,
      fitSearch, fitActivityDropdown1, fitActivityDropdown2, sumElementsWidth;

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

  sumElementsWidth = function (elArray) {
    var result = 0, widths = elArray.map(function() { return $(this).outerWidth(); });
    $.each(widths, function (i) { result = result + widths[i]; });
    return result;
  };

  fitActivityDropdown1 = function fitActivityDropdown1() {
    var dropdownMenu = $('.activity-dropdown-menu-1'),
        dropdownToggle = $('.activity-dropdown-1:first'),
        offsetTop = dropdownToggle.offset().top + dropdownToggle.outerHeight(),
        comulWidth = sumElementsWidth($('.activity-dropdown-1'));
    dropdownMenu.css({
      top: offsetTop + 'px',
      left: dropdownToggle.offset().left + 'px'
    });
    dropdownMenu.width(comulWidth);
  };

  factory = {
    initializePageScrollers: function initializePageScrollers() {
      setTimeout(function() { $('.page-scroller').removeClass('hidden-cs'); }, 3000);
      setTimeout(function() { $('.page-scroller .faa-pulse').removeClass('faa-pulse'); }, 10000);
    },

    initializeIntro: function initialize() {

      $log.debug("initializing intro..");

      var canvas = document.getElementById('introCanvas');

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

    initializeSearch: function initializeSearch() {
      $(window).on("resize", function () {
        fitSearch();
        $('.activity-dropdown-menu-1').removeClass('open');
        $('.activity-dropdown-menu-2').removeClass('open');
        $('.activity-dropdown-1.caret .fa').removeClass('fa-chevron-up').addClass('fa-chevron-down');
        $('.activity-dropdown-2.caret .fa').removeClass('fa-chevron-up').addClass('fa-chevron-down');
      });
      setTimeout(fitSearch, 200);

      $('.activity-select span').on('click', function () {
        $('#activityDropdown').click();
      });

      $('.activity-dropdown-1').on('click', function () {
        if ($(this).hasClass('caret')) {
          $('.activity-dropdown-menu-1').toggleClass('open');
          $('.activity-dropdown-1.caret .fa').toggleClass('fa-chevron-down').toggleClass('fa-chevron-up');
        } else if (!$('.activity-dropdown-menu-1').hasClass('open')) {
          $('.activity-dropdown-menu-1').addClass('open');
          $('.activity-dropdown-1.caret .fa').removeClass('fa-chevron-down').addClass('fa-chevron-up');
        }
        if ($('.activity-dropdown-menu-1').hasClass('open')) fitActivityDropdown1();
      });
    },

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

//  showInfoBoxes = function() {
//    var container, focusBoxes, max_height, offset;
//    offset = window.pageYOffset + $(window).outerHeight() * 0.66;
//    container = $('.info-boxes');
//    container.find('p').height('auto');
//    if ($(window).outerWidth() > 622) {
//      max_height = 0;
//      container.find('p').each(function() {
//        if ($(this).height() > max_height) {
//          return max_height = $(this).height();
//        }
//      });
//      container.find('p').height(max_height + 'px');
//    }
//    if (offset > container.offset().top) {
//      if (!container.hasClass('focused')) {
//        container.addClass('focused');
//        if ($(window).outerWidth() > 622) {
//          focusBoxes = function(boxes) {
//            return container.find(boxes).addClass('focused');
//          };
//          focusBoxes('.second, .third');
//          return setTimeout(focusBoxes, 300, '.first, .fourth');
//        } else {
//          return container.find('.first, .second, .third, .fourth').addClass('focused');
//        }
//      }
//    }
//  };