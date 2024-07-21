// src/styles.js

import mCSBButtons from './images/mCSB_buttons.png';
import owlVideoPlay from './images/owl.video.play.png';
import fevicon from './images/fevicon.png';

const styles = `
  .custom-scrollbar {
    background-image: url(${mCSBButtons});
  }
  .owl-carousel {
    background-image: url(${owlVideoPlay});
  }
  .favicon {
    background-image: url(${fevicon});
  }
`;

export default styles;
