(function() {
  jQuery(function() {
    $("a[rel~=popover], .has-popover").popover();
    $("a[rel~=tooltip], .has-tooltip").tooltip();
    $('a.page-scroll').click(function(event) {
      $('html, body').stop().animate({
        scrollTop: $($(this).attr('href')).offset().top
      }, 1500, 'easeInOutExpo');
      return event.preventDefault();
    });
    $('.navbar-collapse ul li a').click(function() {
      return $('.navbar-toggle:visible').click();
    });
    return $(window).scroll(function() {
      if ($(".navbar").offset().top > 50) {
        return $(".navbar-fixed-top").addClass("top-nav-collapse");
      } else {
        return $(".navbar-fixed-top").removeClass("top-nav-collapse");
      }
    });
  });

  jQuery.fn.bsShow = function() {
    return $(this).removeClass('hidden');
  };

  jQuery.fn.bsHide = function() {
    return $(this).addClass('hidden');
  };

}).call(this);
