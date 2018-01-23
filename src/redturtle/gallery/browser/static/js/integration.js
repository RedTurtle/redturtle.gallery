require([
  'jquery',
  'slick.min'
], function($) {
  'use strict';

  function modalAccessibility() {
    var inputs = $('.gallery-modal-wrapper').find(
      'select, input, textarea, button:not(.gallery-modal-close), a'
    );
    var firstInput = inputs.first();
    var lastInput = inputs.last();
    var closeInput = $('.gallery-modal-close').first();

    var dots = document.querySelector('.gallery-modal .slick-dots');

    if (dots) {
      $(dots).attr('aria-hidden', true);
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
      }
      else if (e.which === 37) {
        $('.slick-prev').click();
      }
      else if (e.which === 39) {
        $('.slick-next').click();
      }
    })

    setTimeout(function() {
      $('.gallery-slider .gallery-item.slick-active').focus();
    }, 0);
  }

  function checkSliderLoaded(slider, callback) {
    if (
      $(slider).length &&
      $(slider).hasClass('slick-initialized')
    ) {
      callback();
    } else {
      setTimeout(checkSliderLoaded, 200);
    }
  }

  function getTemplate(selector) {
    return document
      .getElementById(selector)
      .innerHTML.replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&');
  }

  function createModal(clickedEl, callback) {
    var elements = document.querySelectorAll(
      '.photo-gallery .photo-gallery-item'
    );

    var modal = document.createElement('div');
    modal.classList.add('gallery-modal');
    modal.setAttribute('role', 'dialog');

    var contentStructure = getTemplate('photo-gallery-template');
    modal.innerHTML += contentStructure;

    var imgTemplate = getTemplate('photo-gallery-item-template');

    var title = document
      .getElementsByClassName('photo-gallery')[0]
      .getAttribute('data-gallery-title');

    modal.querySelector('.gallery-modal-title span').textContent = title;

    var elementsSrc = [];

    for (var i = 0; i < elements.length; i++) {
      var img = elements[i].getElementsByTagName('img')[0];
      elementsSrc.push(elements[i].getElementsByTagName('img')[0].src);

      var el = document.createElement('div');
      el.classList.add('gallery-item');
      el.innerHTML = imgTemplate;

      var elImg = el.getElementsByTagName('img')[0];
      elImg.src = img.src;
      elImg.alt = img.alt;

      var elTitle = img.alt;
      el.querySelector('.item-title span').textContent = elTitle;

      modal.getElementsByClassName('gallery-slider')[0].appendChild(el);
    }

    var initialSlide = elementsSrc.indexOf(clickedEl.src);
    if (initialSlide < 0) initialSlide = 0;

    modal.getElementsByClassName(
      'gallery-modal-close'
    )[0].onclick = function() {
      $(modal).remove();
    };

    $(document).on('click', function(e) {
      if (!$(e.target).closest('.gallery-modal-wrapper').length) {
        $(modal).remove();
      }
    });

    document.querySelector('body').appendChild(modal);

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
