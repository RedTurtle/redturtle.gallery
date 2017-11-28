require([
  'jquery',
], function ($) {
  'use strict';
  $(document).on('ready', function() {
    $('body').on('init', '.gallery-slider', function(e) {
      setTimeout(function() {
        $('.gallery-slider .slick-active').focus();

        var inputs = $('.gallery-modal-wrapper').find('select, input, textarea, button:not(.gallery-modal-close), a');
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

        closeInput.on('click', function(e) {
          $('.plone-modal-close').click();
        });

        closeInput.on('keydown', function(e) {
          if (e.which === 9) {
            e.preventDefault();

            if (e.shiftKey) {
              lastInput.focus();
            }
            else {
              firstInput.focus();
            }
          }
        });

      }, 100);
    });
  });
});

define("js/integration.js", function(){});


//# sourceMappingURL=bundle-compiled.js.map