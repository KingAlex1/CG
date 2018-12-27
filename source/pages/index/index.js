/* global ymaps */


import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'material-design-icons/iconfont/material-icons.css';
import './style/main.scss';
import '../../components/footer/index.js';


import preloader from './js/preloader';

const $ = require('jquery');
const $script = require('scriptjs');

$(document).ready(function () {

  preloader();

  let blockUpPosission = window.innerHeight;
  let scrollTimeout;
  let navBlog = $('.navigation');

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
        navBlog.slideDown(400);
      } else if (scrollY < navBlog.height() + 30) {
        navBlog.fadeIn(400);
      } else {
        navBlog.fadeOut(200);


      }

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

  $('.order__form').submit(function () {
    $.ajax({
      type: 'POST',
      url: 'order/add',
      data: $(this).serialize(),
    }).done(function (data) {
      let info = JSON.parse(data);
      console.log(info[1]);
      if (info[1]) {
        btnSubmit.attr('disabled', 'disabled');
        captch.addClass('captcha__display');
        $('.order__form').trigger('reset');
      }
      alert(info[0]);


    });
    return false;
  });

  let btnSubmit = $('.btn-primary'),
    btnGood = $('#good').val(),
    btnEmail = $('#email').val(),
    btnPhone = $('#phone').val(),
    emptyRow = '',
    order__form = $('.order__form'),
    captch = $('.captcha__display');

  btnSubmit.attr('disabled', 'disabled');


  order__form.on('input', function () {
    btnGood = $('#good').val();
    btnEmail = $('#email').val();
    btnPhone = $('#phone').val();
    if (btnGood !== emptyRow && (btnEmail !== emptyRow || btnPhone !== emptyRow)) {
      btnSubmit.removeAttr('disabled');
      captch.removeClass('captcha__display');

    } else {
      btnSubmit.attr('disabled', 'disabled');
      captch.addClass('captcha__display');
    }
  });

  $('.section__list_trigger').on('click', function () {
    let answer = $(this).next();

    $(this).parent().toggleClass('active__list');
    $(this).parent().siblings().not($(this)).removeClass('active__list');
    $('.section__list_content').not(answer).slideUp(400);
    answer.slideToggle(400);
  });
});


