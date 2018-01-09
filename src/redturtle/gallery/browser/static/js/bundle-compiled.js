require(['jquery'], function($) {
  'use strict';

  function checkSliderLoaded() {
    if (
      $('.gallery-slider').length &&
      $('.gallery-slider').hasClass('slick-initialized')
    ) {
      return true;
    } else {
      setTimeout(checkSliderLoaded, 200);
    }
  }

  $(document).on('ready', function() {
    $('body').on('init', '.gallery-slider', function() {
      if (checkSliderLoaded()) {
        var inputs = $('.gallery-modal-wrapper').find(
          'select, input, textarea, button:not(.gallery-modal-close), a'
        );
        var firstInput = inputs.first();
        var lastInput = inputs.last();
        var closeInput = $('.gallery-modal-close').first();

        lastInput.on('keydown', function(e) {
          if (e.which === 9) {
            if (!e.shiftKey) {
              e.preventDefault();
              closeInput.focus();
            }
          }
        });

        firstInput.on('keydown', function(e) {
          if (e.which === 9) {
            if (e.shiftKey) {
              e.preventDefault();
              closeInput.focus();
            }
          }
        });

        closeInput.on('click', function() {
          $('.plone-modal-close').click();
        });

        closeInput.on('keydown', function(e) {
          if (e.which === 9) {
            e.preventDefault();

            if (e.shiftKey) {
              lastInput.focus();
            } else {
              firstInput.focus();
            }
          }
        });

        setTimeout(function() {
          $('.gallery-slider .gallery-item.slick-active').focus();
        }, 500);
      }
    });
  });
});

define("js/integration.js", function(){});


//# sourceMappingURL=bundle-compiled.js.map