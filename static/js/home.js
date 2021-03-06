(function($) {
    "use strict";
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        $('.fa-arrow-down').removeClass('infinite');
        event.preventDefault();
    });

    $('body').scrollspy({
        target: '#mainNav',
        offset: 51
    })
    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a img').click(function() {
        $('.navbar-toggle:visible').click();
    });

    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    var $window = $(window);
    var win_height_padded = $window.height() * 1.1;

    $window.on('scroll', revealOnScroll);

    function revealOnScroll() {
      var scrolled = $window.scrollTop();
      win_height_padded = $window.height() * 1.1;

      $(".animate-on-visibility:not(.animated)").each(function () {
        var $this = $(this);
        var offsetTop = $this.offset().top;

        if (scrolled + win_height_padded > offsetTop) {
          if ($this.data('timeout')) {
            window.setTimeout(function() {
              $this.addClass('bounceIn ' + $this.data('animation'));
            }, parseInt($this.data('timeout'), 100));
          } else {
            $this.addClass('bounceIn animated');
          }
        }
      });
    }

    revealOnScroll();
})(jQuery);
