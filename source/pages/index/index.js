/* global ymaps */

import 'normalize.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/index.scss';
import './style/about.scss';
import './style/animation.scss';
import './style/form.scss';
import './style/map.scss';
import './style/footer.scss';
import './style/buttom.scss';


const $ = require('jquery');
// const _ = require('lodash');
const $script = require('scriptjs');

$(document).ready(function () {

  let blockUpPosission = window.innerHeight;
  let scrollTimeout;
  $script('https://api-maps.yandex.ru/2.1/?lang=ru_RU', function () {
    ymaps.ready(function () {
      let myMap = new ymaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 10,
        controls: [],
      });

      let myPlacemark = new ymaps.Placemark([55.86, 37.67], {
        balloonContentBody: [
          '<address>',
          '<strong>Офис Крона Групп в Москве</strong>',
          '<br/>',
          'Адрес: 129327, Москва, ул. Коминтерна , 7к2',
          '<br/>',
          '</address>',
        ].join(''),
      }, {
        preset: 'islands#redDotIcon',
      });

      myMap.geoObjects.add(myPlacemark);

      myMap.behaviors
      // Отключаем часть включенных по умолчанию поведений:
      //  - drag - перемещение карты при нажатой левой кнопки мыши;
      //  - magnifier.rightButton - увеличение области, выделенной правой кнопкой мыши.
        .disable(['drag', 'rightMouseButtonMagnifier', 'scrollZoom']);
    });
  });

  $('.side-bar__link, .header__arrow_img , .presentation__button').on('click', (e) => {
    let href = $(e.target).attr('href');
    let section = $(href);

    $('html, body').animate({
      scrollTop: section.offset().top - 60,
    }, 400);
  });

  $('.btn_up').on('click', () => {
    $('html, body').animate({
      scrollTop: 0,
    }, 400);
  });


  $(window).on('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {

      if (scrollY > blockUpPosission) {
        $('.btn_up').slideDown(400);
      } else {
        $('.btn_up').slideUp(400);
      }

      activeNavMenu();
    }, 100);
  });


  function activeNavMenu() {
    $('.side-bar__link-top').each(function () {

      let href = $(this).attr('href');
      let section = $(href);

      let winTop = $(window).scrollTop();
      let sectioTop = section.offset().top;

      if (winTop > sectioTop - 150) {
        $('.side-bar__link').removeClass('active').filter(this).addClass('active');
      }
    });
  }

});


