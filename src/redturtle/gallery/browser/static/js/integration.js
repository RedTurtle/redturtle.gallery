require(['jquery', 'slick.min'], function($) {
  'use strict';

  function modalAccessibility() {
    var inputs = $('.gallery-modal-wrapper').find(
      'select, input, textarea, button:not(.gallery-modal-close), a'
    );
    var firstInput = inputs.first();
    var lastInput = inputs.last();
    var closeInput = $('.gallery-modal-close').first();

    var dots = $('.gallery-modal .slick-dots');

    if (dots.length) {
      dots.attr('aria-hidden', true);
    }

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

    $(document).on('keydown', function(e) {
      if (e.which === 27) {
        $('.gallery-modal').remove();
      } else if (e.which === 37) {
        $('.gallery-slider').slick('slickPrev');
      } else if (e.which === 39) {
        $('.gallery-slider').slick('slickNext');
      }
    });

    setTimeout(function() {
      $('.gallery-slider .gallery-item.slick-active').focus();
    }, 0);
  }

  function checkSliderLoaded(slider, callback) {
    if ($(slider).length && $(slider).hasClass('slick-initialized')) {
      callback();
    } else {
      setTimeout(checkSliderLoaded, 200);
    }
  }

  function getTemplate(selector) {
    return $('#' + selector)
      .html()
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&');
  }

  function createModal(clickedEl, callback) {
    var elements = $('.photo-gallery .photo-gallery-item');

    var modal = $('<div class="gallery-modal" role="dialog" />');
    modal.html(getTemplate('photo-gallery-template'));

    var title = $('.photo-gallery').attr('data-gallery-title');
    modal.find('.gallery-modal-title span').text(title);

    var imgTemplate = getTemplate('photo-gallery-item-template');
    var elementsSrc = [];

    elements.each(function() {
      var $element = $(this);
      var $img = $element.find('img');
      elementsSrc.push($img.attr('src'));

      var el = $('<div class="gallery-item" />');
      el.html(imgTemplate);

      var $elImg = el.find('img');
      $elImg.attr({
        src: $img.attr('src'),
        alt: $img.attr('alt'),
      });

      var elTitle = $img.attr('alt');
      el.find('.item-title span').text(elTitle);

      modal.find('.gallery-slider').append(el);
    });

    var initialSlide = elementsSrc.indexOf(clickedEl.src);
    if (initialSlide < 0) initialSlide = 0;

    modal.find('.gallery-modal-close').on('click', function() {
      modal.remove();
    });

    $(document).on('click', function(e) {
      if (!$(e.target).closest('.gallery-modal-wrapper').length) {
        $(modal).remove();
      }
    });

    $('body').append(modal);

    if (callback) callback(initialSlide);
  }

  function createSlider(selector, initialSlide) {
    $(document).on('init', selector, function() {
      checkSliderLoaded(selector, function() {
        modalAccessibility();
      });
    });

    $(selector).slick({
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      accessibility: true,
      adaptiveHeight: true,
      initialSlide: initialSlide,
    });
  }

  $(document).on('click', '.photo-gallery-item a', function(e) {
    e.preventDefault();
    e.stopPropagation();

    createModal(e.target, function(initialSlide) {
      createSlider('.gallery-slider', initialSlide);
    });
  });
});
