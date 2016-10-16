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
    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    })
    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });
    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: -1
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
    $("#contact-form").validate();
    $("button#submit").click(function() {
       $.ajax({
         type: "POST",
         url: "/gocontacts",
         data: $('form#contact-form').serialize(),
         success: function(msg){
           $('form#contact-form').hide();
           $('div#success').fadeIn();
         }
     });
   });
})(jQuery);
