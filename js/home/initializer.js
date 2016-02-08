bmg.factory('initializer', [function () {
  "use strict";

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

    var imgPrependObj = document.getElementById('imgPrepend')
    if (typeof(imgPrependObj) === "object" && imgPrependObj != null) {
      console.log(bgImgId + " prepended..");
      imgPrependObj.className = 'intro-bg-' + bgImgId;
    }
  };

  fitIntro = function fitIntro(introObj) {
    introObj.width = windowObj.outerWidth();
    introObj.height = Math.max(windowObj.outerHeight(), 680);
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
          console.log(error.message);
        } else {
          console.error(error);
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

    curveHeight = Math.min(160, height * 0.7);
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
    searchOutlineTop = Number(search.css('outline-width').match(/^(\d+)\D/)[1]);
    serach_height = search.outerHeight() + 2 * searchOutlineTop;
    if (windowObj.outerWidth() > 767) {
      proposed_offset = (intro_height - serach_height) / 3;
    } else {
      proposed_offset = (intro_height - serach_height) / 2;
    }
    return search.offset({
      top: proposed_offset + searchOutlineTop
    });
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

  fitActivityDropdown2 = function fitActivityDropdown2() {
    var dropdownMenu = $('.activity-dropdown-menu-2'),
        dropdownToggle = $('.activity-dropdown-2:first'),
        offsetTop = dropdownToggle.offset().top + dropdownToggle.outerHeight(),
        comulWidth = sumElementsWidth($('.activity-dropdown-2'));
    dropdownMenu.css({
      top: offsetTop + 'px',
      left: dropdownToggle.offset().left + 'px'
    });
    dropdownMenu.width(comulWidth);
  };

  factory = {
    initializeIntro: function initialize() {

      console.log("initializing intro..");

      //      $(window).scrollTop(0);

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

      $('.activity-dropdown-2').on('click', function () {
        if ($(this).hasClass('caret')) {
          $('.activity-dropdown-menu-2').toggleClass('open');
          $('.activity-dropdown-2.caret .fa').toggleClass('fa-chevron-down').toggleClass('fa-chevron-up');
        } else if (!$('.activity-dropdown-menu-2').hasClass('open')) {
          $('.activity-dropdown-menu-2').addClass('open');
          $('.activity-dropdown-2.caret .fa').removeClass('fa-chevron-down').addClass('fa-chevron-up');
        }
        if ($('.activity-dropdown-menu-2').hasClass('open')) fitActivityDropdown2();
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

    pickActivity: function pickActivity(value) {
      $('input.activity-dropdown-1').val(value);
      $('input.activity-dropdown-2').val(value);
      $('.activity-dropdown-menu-1').removeClass('open');
      $('.activity-dropdown-menu-2').removeClass('open');
      $('.activity-dropdown-1.caret .fa').removeClass('fa-chevron-up').addClass('fa-chevron-down');
      $('.activity-dropdown-2.caret .fa').removeClass('fa-chevron-up').addClass('fa-chevron-down');
    }
  };

  return factory;
}]);


//  updateCanvas2 = function(offset) {
//    var canvas, ctx, height, step, width;
//    canvas = $('#canvas')[0];
//    width = canvas.width;
//    height = canvas.height;
//    step = height - offset * 0.2;
//    ctx = canvas.getContext("2d");
//    ctx.clearRect(0, 0, width, height);
//    ctx.beginPath();
//    ctx.moveTo(0, step);
//    ctx.bezierCurveTo(width * 0.33, step, width * 0.66, step, width, height - offset);
//    ctx.lineTo(width, height);
//    ctx.lineTo(0, height);
//    ctx.fillStyle = "#fafafa";
//    return ctx.fill();
//  };

//  updateCanvas1 = function(offset) {
//    var canvas, ctx, height, middle, step, width;
//    canvas = $('#canvas')[0];
//    width = canvas.width;
//    height = canvas.height;
//    middle = width / 2;
//    step = height - offset;
//    ctx = canvas.getContext("2d");
//    ctx.clearRect(0, 0, width, height);
//    ctx.beginPath();
//    ctx.moveTo(0, height);
//    ctx.lineTo(width, height);
//    ctx.lineTo(width, height - offset);
//    ctx.lineTo(0, height);
//    ctx.fillStyle = "#fafafa";
//    return ctx.fill();
//  };

//  drawCanvas1 = function() {
//    var canvas, ctx, height, middle, offset, step, width;
//    width = $(window).outerWidth();
//    height = width / 12;
//    canvas = $('#canvas');
//    if (canvas.length) {
//      fitCanvas();
//      canvas = canvas[0];
//      height = canvas.height;
//      width = canvas.width;
//      offset = window.pageYOffset;
//      if (offset >= 0 && offset < $(window).outerHeight()) {
//        middle = width / 2;
//        offset = Math.min(offset, height);
//        step = height - offset;
//        ctx = canvas.getContext("2d");
//      }
//      if (offset >= 0 && offset < $(window).outerHeight()) {
//        middle = width / 2;
//        offset = Math.min(offset, height);
//        step = height - offset;
//        ctx = canvas.getContext("2d");
//        ctx.clearRect(0, 0, width, height);
//        ctx.beginPath();
//        ctx.moveTo(0, step);
//        ctx.quadraticCurveTo(middle, height + offset, width, step);
//        ctx.lineTo(width, height);
//        ctx.lineTo(0, height);
//        ctx.moveTo(0, step);
//        ctx.fillStyle = "#fafafa";
//        return ctx.fill();
//      }
//    }
//  };

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