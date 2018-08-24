// From: https://stackoverflow.com/questions/9038625/detect-if-device-is-ios#9039885
function iOS() {
  var iDevices = [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ];

  if (!!navigator.platform) {
    while (iDevices.length) {
      if (navigator.platform === iDevices.pop()){ return true; }
    }
  }

  return false;
}

let measureElement;
const keyboardHeight = { portrait: -1, landscape: -1 };
let measuring = false;

/**
 * Measures the software keyboard height on iOS. The value is measured once for portrait and
 * landscape orientation, and after that a cached value is used.
 *
 * You need to call this method during the same event loop when a user-originated focus event is
 * processed (it's not possible to force the software keyboard visible by calling input.focus()).
 *
 * A scroll event listener on the window object together with document.body.scrollTop is used to
 * measure the keyboard height.
 *
 * @return {Promise}  A promise which resolves with the measured keyboard height
 */
export function measureKeyboardHeight(originalFocusTarget) {
  // This script is tailored for iOS only
  // You should be able to get the keyboard height on Android using standard DOM APIs
  // (window.clientHeight etc)
  // TODO use the standard DOM APIs on Android to return a sensible value
  if (!iOS() || measuring) {
    return new Promise((resolve, reject) => {
      console.log(originalFocusTarget)
      reject(measuring ? 'Already measuring' : 'Only supported/needed on iOS');
    });
  };

  measuring = true;

  const orientation = Math.abs(window.orientation) == 90 ? 'landscape' : 'portrait';

  // Return the cached value
  if (keyboardHeight[orientation] > 0) {
    return new Promise((resolve) => {
      resolve(keyboardHeight[orientation]);
    });
  }

  if (!measureElement) {
    measureElement = document.createElement('input');
    measureElement.style.position = 'absolute';
    measureElement.style.bottom = '0';
    measureElement.style.margin = '0';
    // measureElement.style.fontSize = '20px';
    // measureElement.style.opacity = '0';
    // measureElement.style.pointerEvents = 'none';
  }

  document.body.appendChild(measureElement);
  document.body.style.position = 'relative';
  measureElement.focus();

  return new Promise((resolve) => {
    // setTimeout(function() {
    //   document.body.getBoundingClientRect();
    //   console.log(document.body.scrollTop);
    //   // keyboardHeight[orientation] = document.body.scrollTop;
    //   resolve(keyboardHeight[orientation]);
    //   measureElement.style.position = originalStyle.position;
    //   measureElement.style.bottom = originalStyle.bottom;
    // }, 300);
    window.addEventListener('scroll', function scrollListener() {
      window.removeEventListener('scroll', scrollListener);
      const offset = document.body.getBoundingClientRect();
      console.log(offset, document.body.scrollTop);
      // keyboardHeight[orientation] = document.body.scrollTop;
      resolve(keyboardHeight[orientation]);
      document.body.removeChild(measureElement);
      document.body.style.position = '';
      originalFocusTarget.focus();
      measuring = false;
    });
  });
}
