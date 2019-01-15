/* global ymaps */

import 'normalize.css';
import './style/main.scss';
// import '../../components/footer/index.js';


import preloader from './js/preloader';

const $ = require('jquery');
const $script = require('scriptjs');

$(document).ready(function () {

  preloader();

  //ymaps

  // $script('https://api-maps.yandex.ru/2.1/?lang=ru_RU', function () {
  //   ymaps.ready(function () {
  //     let myMap = new ymaps.Map('map', {
  //       center: [55.76, 37.64],
  //       zoom: 10,
  //       controls: [],
  //     });
  //
  //     myMap.behaviors
  //     // Отключаем часть включенных по умолчанию поведений:
  //     //  - drag - перемещение карты при нажатой левой кнопки мыши;
  //     //  - magnifier.rightButton - увеличение области, выделенной правой кнопкой мыши.
  //       .disable(['drag', 'rightMouseButtonMagnifier', 'scrollZoom']);
  //   });
  // });


  // карусель

  $('.info__right-item-info').on('click', function () {
    let article = $(this).next();
    $('.info__right-item-desc').not(article).slideUp(300);
    article.slideDown(300);

    let arrow = $(this).children('.triangle');
    $('.triangle').not(arrow).removeClass('active_triangle');
    arrow.addClass('active_triangle');

  });

  // slider

  const duration = 500;
  let counter = 1;
  let inProgress = false;

  const moveSlides = (container, direction) => {

    let items = container.find('.slider__block');
    let activeItem = items.filter('.slider__active');
    let strafeTopPercents = direction === 'right' ? 100 : -100;

    if (counter >= items.length) {
      counter = 0;
    }

    const reqItem = items.eq(counter);

    if (direction === 'right') {
      items.not(activeItem).css('left', '-100%');
    } else if (direction === 'left') {
      items.not(activeItem).css('left', '100%');
    }

    activeItem.animate({
      opacity: 0,
      left: `${strafeTopPercents}%`,
    }, 2000);

    reqItem.animate({
      left: 0,
      opacity: 1,
    }, 2000, function () {
      activeItem.removeClass('slider__active').css('left', `${-strafeTopPercents}%`);
      $(this).addClass('slider__active');
      inProgress = false;
    });
  };

  $('.slider__button-right').on('click', function () {
    if (inProgress) return;
    inProgress = true;
    moveSlides($('.slider__container'), 'right');
    counter++;
    clearInterval(sliderLoop);
  });
  $('.slider__button-left').on('click', function () {
    if (inProgress) return;
    inProgress = true;
    moveSlides($('.slider__container'), 'left');
    counter++;
    clearInterval(sliderLoop);
  });

  let sliderLoop = setInterval(function () {
    if (inProgress) return;
    inProgress = true;
    moveSlides($('.slider__container'), 'right');
    counter++;
  }, 1000);

  /// second sllider

  let counter2 = 1;
  let inProgress2 = false;


  const moveSlides2 = (container, direction) => {

    let items = container.find('.slider__block-2');
    let activeItem = items.filter('.slider__active');
    let strafeTopPercents = direction === 'right' ? 100 : -100;

    if (counter2 >= items.length) {
      counter2 = 0;
    }

    const reqItem = items.eq(counter2);

    if (direction === 'right') {
      items.not(activeItem).css('left', '-100%');
    } else if (direction === 'left') {
      items.not(activeItem).css('left', '100%');
    }

    activeItem.animate({
      opacity: 0,
      left: `${strafeTopPercents}%`,
    }, 2000);

    reqItem.animate({
      left: 0,
      opacity: 1,
    }, 2000, function () {
      activeItem.removeClass('slider__active').css('left', `${-strafeTopPercents}%`);
      $(this).addClass('slider__active');
      inProgress2 = false;
    });
  };

  $('.slider__button-right').on('click', function () {
    if (inProgress2) return;
    inProgress2 = true;
    moveSlides2($('.slider__container-2'), 'right');
    counter2++;
    clearInterval(sliderLoop2);
  });
  $('.slider__button-left').on('click', function () {
    if (inProgress2) return;
    inProgress2 = true;
    moveSlides2($('.slider__container-2'), 'left');
    counter2++;
    clearInterval(sliderLoop2);
  });

  let sliderLoop2 = setInterval(function () {
    if (inProgress2) return;
    inProgress2 = true;
    moveSlides2($('.slider__container-2'), 'right');
    counter2++;
  }, 1000);










    // Open map

  let map = $('.map');
  let mapInfo = $('.map__info');
  let close = $('.close');
  let height = $('.map').css('height');

  mapInfo.on('click', function () {
    map.animate({
      height: '600px',
    }, 500);
    mapInfo.fadeOut(500);
    close.fadeIn(500);
  });

  close.on('click', function () {
    map.animate({
      height: height,
    });
    close.fadeOut(500);
    mapInfo.fadeIn(500);
  });


  // nav-bar
  $('.navigation__link').on('click', function () {
    let href = $(this).attr('href');
    let section = $(href);
    $('html, body').animate({
      scrollTop: section.offset().top,
    },700);

  });
});


