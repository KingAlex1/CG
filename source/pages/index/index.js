import 'normalize.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import './about.scss';
import './animation.scss';
import './form.scss';


console.log('index.js');
// let vimeo_player = document.querySelector('#vimeo_player');
// let video_height = vimeo_player.clientHeight;
// let overlay_height = document.querySelector('#overlay_background').clientHeight;
// let xx = vimeo_player.style.marginTop = video_height - overlay_height + 'px';
// console.log(xx);

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
