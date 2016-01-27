(function() {
  var drawCanvas1, fitCanvas, fitIntro, showInfoBoxes, showMoto, updateCanvas, updateCanvas1, updateCanvas2;

  $(document).on('ready', function() {
    console.log("DOM is ready");

    $(window).scrollTop(0);

    $('#slippry-slider').slippry({
      transition: 'fade',
      useCSS: true,
      speed: 4000,
      pause: 30000,
      initSingle: false,
      auto: true,
      preload: 'visible',
      pager: false,
      captions: false,
      controls: false,
      autoHover: false,
      adaptiveHeight: true
    });

    fitIntro();

    $('.body-bg').hide();

    setTimeout(showMoto, 1000);

    $('#search input').focus(function() {
      return $('#custom-search-input').addClass('hover');
    });

    $('#search input').blur(function() {
      return $('#custom-search-input').removeClass('hover');
    });

    $('.activity-dropdown').on('click', function () {
      var offsetTop = $(this).offset().top + $(this).outerHeight();
      $('.activity-dropdown-menu').css({top: offsetTop + 'px', left: $(this).offset().left + 'px'});
      $('.activity-dropdown-menu').width($(this).outerWidth());
      $('.activity-dropdown-menu').toggle();
    });

    $('.activity-dropdown-menu a').click(function (e) {
      e.preventDefault();
      $('.activity-dropdown').val($(this).attr('data-value'));
      $('.activity-dropdown-menu').toggle();
    });

    return this;
  });

  $(window).on('load', function() {
    return fitIntro();
  });

  $(window).on('scroll', function() {
    return showInfoBoxes();
  });

  $(window).on('resize', function() {
    fitIntro();
    fitCanvas();
    return showInfoBoxes();
  });

  showMoto = function() {
    var container, drawCanvas, intId, offset, stopDrawing;
    fitCanvas();
    offset = 0;
    drawCanvas = function() {
      var error, error1, height;
      try {
        updateCanvas(offset);
        height = $('#canvas').height();
        offset++;
        if (offset >= height / 2) {
          $('#moto-2 h2').addClass('focused');
        }
        if (offset >= height) {
          $(canvas).addClass('done');
          return stopDrawing();
        }
      } catch (error1) {
        error = error1;
        console.error(error);
        return stopDrawing();
      }
    };
    intId = setInterval(drawCanvas, 10);
    stopDrawing = function() {
      return clearInterval(intId);
    };
    container = $('#moto h2');
    if (!container.hasClass('focused')) {
      return container.addClass('focused');
    }
  };

  fitCanvas = function() {
    var canvas, window_width;
    window_width = $(window).outerWidth();
    canvas = $('#canvas');
    if (canvas.length > 0) {
      canvas[0].width = window_width;
      if (window_width > 991) {
        canvas[0].height = canvas.attr("data-height-big");
      } else {
        canvas[0].height = canvas.attr("data-height-small");
      }
      if (canvas.hasClass('done')) {
        return updateCanvas(canvas[0].height);
      }
    }
  };

  updateCanvas2 = function(offset) {
    var canvas, ctx, height, step, width;
    canvas = $('#canvas')[0];
    width = canvas.width;
    height = canvas.height;
    step = height - offset * 0.2;
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.moveTo(0, step);
    ctx.bezierCurveTo(width * 0.33, step, width * 0.66, step, width, height - offset);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.fillStyle = "#fafafa";
    return ctx.fill();
  };

  updateCanvas = function(offset) {
    var canvas, ctx, height, middle, step, width;
    canvas = $('#canvas')[0];
    width = canvas.width;
    height = canvas.height;
    middle = width / 2;
    step = height - offset;
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.moveTo(0, step);
    ctx.quadraticCurveTo(middle, height, width, step);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.fillStyle = "#fafafa";
    return ctx.fill();
  };

  updateCanvas1 = function(offset) {
    var canvas, ctx, height, middle, step, width;
    canvas = $('#canvas')[0];
    width = canvas.width;
    height = canvas.height;
    middle = width / 2;
    step = height - offset;
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.moveTo(0, height);
    ctx.lineTo(width, height);
    ctx.lineTo(width, height - offset);
    ctx.lineTo(0, height);
    ctx.fillStyle = "#fafafa";
    return ctx.fill();
  };

  drawCanvas1 = function() {
    var canvas, ctx, height, middle, offset, step, width;
    width = $(window).outerWidth();
    height = width / 12;
    canvas = $('#canvas');
    if (canvas.length) {
      fitCanvas();
      canvas = canvas[0];
      height = canvas.height;
      width = canvas.width;
      offset = window.pageYOffset;
      if (offset >= 0 && offset < $(window).outerHeight()) {
        middle = width / 2;
        offset = Math.min(offset, height);
        step = height - offset;
        ctx = canvas.getContext("2d");
      }
      if (offset >= 0 && offset < $(window).outerHeight()) {
        middle = width / 2;
        offset = Math.min(offset, height);
        step = height - offset;
        ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.moveTo(0, step);
        ctx.quadraticCurveTo(middle, height + offset, width, step);
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.moveTo(0, step);
        ctx.fillStyle = "#fafafa";
        return ctx.fill();
      }
    }
  };

  fitIntro = function() {
    var hDiff, imgRatio, intro_height, intro_width, navbar_height, proposed_offset, search, searchOutlineTop, serach_height, window_height, window_width;
    imgRatio = 1152 / 768;
    hDiff = $(window).outerWidth() / imgRatio - $(window).outerHeight();
    if (hDiff > 0) {
      $('.sy-slide > a > img').css('margin-top', -hDiff / 2 + 'px');
    }
    search = $('#search');
    intro_width = $('#intro').outerWidth();
    window_width = $(window).outerWidth();
    window_height = $(window).outerHeight();
    navbar_height = $('.navbar-custom').outerHeight();
    searchOutlineTop = Number(search.css('outline-width').match(/^(\d+)\D/)[1]);
    proposed_offset = searchOutlineTop;
    serach_height = search.outerHeight() + 2 * searchOutlineTop;
    if (window_width > 767) {
      $('#intro .sy-box').show();
      intro_height = Math.min(window_height, $('#intro .sy-box').outerHeight());
      $('#intro').css('height', intro_height + 'px');
      proposed_offset = (Math.min(window_height, intro_height) - serach_height) / 3;
    } else {
      $('#intro .sy-box').hide();
      $('#intro').css('height', 'auto');
      proposed_offset = ($('#intro').outerHeight() - serach_height) / 2;
    }
    return search.offset({
      top: Math.max(navbar_height, proposed_offset) + searchOutlineTop
    });
  };

  showInfoBoxes = function() {
    var container, focusBoxes, max_height, offset;
    offset = window.pageYOffset + $(window).outerHeight() * 0.66;
    container = $('.info-boxes');
    container.find('p').height('auto');
    if ($(window).outerWidth() > 622) {
      max_height = 0;
      container.find('p').each(function() {
        if ($(this).height() > max_height) {
          return max_height = $(this).height();
        }
      });
      container.find('p').height(max_height + 'px');
    }
    if (offset > container.offset().top) {
      if (!container.hasClass('focused')) {
        container.addClass('focused');
        if ($(window).outerWidth() > 622) {
          focusBoxes = function(boxes) {
            return container.find(boxes).addClass('focused');
          };
          focusBoxes('.second, .third');
          return setTimeout(focusBoxes, 300, '.first, .fourth');
        } else {
          return container.find('.first, .second, .third, .fourth').addClass('focused');
        }
      }
    }
  };

}).call(this);
