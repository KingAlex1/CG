import 'normalize.css';
import './index.scss';

console.log('index.js');
let vimeo_player = document.querySelector('#vimeo_player');
let video_height = vimeo_player.clientHeight ;
let overlay_height = document.querySelector('#overlay_background').clientHeight;
let xx = vimeo_player.style.marginTop = video_height - overlay_height + 'px' ;
console.log(xx);



