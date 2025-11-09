'use strict';

import pageNavigation from './modules/pageNavigation';
// import headerFon from '../components/header/headerFon';
import Header from './../components/header/Header';
import spollers from '../components/spollers/spollers';
import ScrollUpButton from '../components/scrollUpButton/ScrollUpButton';
import CountdownTimer from '../components/timer/CountdownTimer';
// import CounterAnimationCollection from './../components/CounterAnimation/CounterAnimation';
// import VideoPlayerCollection from './../components/video/video-player/VideoPlayer';
// import PopupCollection from '../components/popup/popup';

window.addEventListener('DOMContentLoaded', () => {
  pageNavigation();
  // headerFon();
  new Header();
  spollers();
  new ScrollUpButton();
  new CountdownTimer('.countdown', 86440, 'Time is up!');
  // new CounterAnimationCollection();
  // new VideoPlayerCollection();
  // new PopupCollection();
});
