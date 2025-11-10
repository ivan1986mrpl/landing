'use strict';

import pageNavigation from './modules/pageNavigation';
import headerFon from '../components/header/headerFon';
import Header from './../components/header/Header';
import spollers from '../components/spollers/spollers';
import ScrollUpButton from '../components/scrollUpButton/ScrollUpButton';
import CountdownTimer from '../components/timer/CountdownTimer';
import VideoLazy from '../components/video/video-lazy/VideoLazy';
import PopupCollection from '../components/popup-fix/Popup';
// import CounterAnimationCollection from './../components/CounterAnimation/CounterAnimation';
import VideoPlayerCollection from './../components/video/video-player/VideoPlayer';

window.addEventListener('DOMContentLoaded', () => {
  pageNavigation();
  headerFon();
  new Header();
  spollers();
  new ScrollUpButton();
  new CountdownTimer('.countdown', 86440, 'Time is up!');
  new VideoLazy(
    'https://www.youtube.com/embed/ARf4aoFmxBs?si=ug3ktJzKGB0Embdw',
    {
      container: document.getElementById('video-1'),
    },
  );
  new PopupCollection();
  // new CounterAnimationCollection();
  new VideoPlayerCollection();
});
