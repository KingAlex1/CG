import 'normalize.css';
import './style/main.scss';
import '../../components/footer/index.js';


import preloader from './js/preloader';

const $ = require('jquery');


$(document).ready(function () {

  preloader();

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
    }, 3000);

    reqItem.animate({
      left: 0,
      opacity: 1,
    }, 3000, function () {
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
  }, 2000);

});


