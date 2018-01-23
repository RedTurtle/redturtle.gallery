require([
  'jquery',
  'slick.min'
], function($) {
  'use strict';

  /*
  function init() {
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

  function checkSliderLoaded() {
    if (
      $('.gallery-slider').length &&
      $('.gallery-slider').hasClass('slick-initialized')
    ) {
      init();
    } else {
      setTimeout(checkSliderLoaded, 200);
    }
  }
  */

  function createModal(callback) {
    var elements = document.querySelectorAll(
      '.photo-gallery .photo-gallery-item'
    );

    var modal = document.createElement('div');
    modal.classList.add('gallery-modal');

    var contentStructure = document
      .getElementById('photo-gallery-template')
      .innerHTML.replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&');
    modal.innerHTML += contentStructure;

    var imgTemplate = document
      .getElementById('photo-gallery-item-template')
      .innerHTML.replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&');

    var title = document
      .getElementsByClassName('photo-gallery')[0]
      .getAttribute('data-gallery-title');

    modal.querySelector('.gallery-modal-title span').textContent = title;

    for (var i = 0; i < elements.length; i++) {
      var img = elements[i].getElementsByTagName('img')[0];

      var el = document.createElement('div');
      el.classList.add('gallery-item');
      el.innerHTML = imgTemplate;

      var elImg = el.getElementsByTagName('img')[0];
      elImg.src = img.src;
      elImg.alt = img.alt;

      var elTitle = img.alt;
      el.querySelector('.item-title span').textContent = elTitle;

      modal.getElementsByClassName('gallery-slider')[0].append(el);
    }

    modal.getElementsByClassName(
      'gallery-modal-close'
    )[0].onclick = function() {
      modal.remove();
    };

    document.querySelector('body').append(modal);

    if (callback) callback(modal);
  }

  function createSlider(selector) {
    $(selector).slick({
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      responsive: true,
      accessibility: true,
      adaptiveHeight: true,
    });
  }

  $(document).on('ready', function() {
    // $('body').on('init', '.gallery-slider', function() {
    //   checkSliderLoaded();
    // });

    $('.photo-gallery-item a').on('click', function(e) {
      e.preventDefault();

      createModal(function() {
        createSlider('.gallery-slider');
      });
    });
  });
});
