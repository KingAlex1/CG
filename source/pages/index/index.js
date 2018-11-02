import 'normalize.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import './about.scss';
import './animation.scss';
import './form.scss';
import './map.scss';
import './footer.scss';

const $ = require('jquery');
const _ = require('lodash');
const $script = require('scriptjs');

$(document).ready(function () {

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

  console.log('index.js');

  let arrow = document.getElementById('header__arrow');
  let i = arrow.offsetTop;
  let endPosition = i + 12;

  function moveBlock() {
    arrow.style.top = i + 'px';
    i = i + 0.2;
    if (i > endPosition) {
      i = i - 10;
      arrow.style.top = i + 'px';
    }
  }

  setInterval(moveBlock, 40);

  console.log(_.isEqual(5, 5));

});