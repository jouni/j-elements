const dummyClass = '__anim_perfo__';

const style = document.createElement('style');
style.innerHTML = `
  .${dummyClass} {
    position: fixed !important;
    width: 500px !important;
    height: 500px !important;
    top: 0 !important;
    left: 0 !important;
    pointer-events: none !important;
    animation: ${dummyClass} 1s !important;
    background: linear-gradient(rgba(255,0,0,0), rgba(255,0,0,0)) !important;
  }

  .${dummyClass} > div {
    position: fixed !important;
    width: 50% !important;
    height: 50% !important;
    top: 0 !important;
    left: 0 !important;
    background: inherit !important;
    animation: ${dummyClass}-child 1s !important;
  }

  @keyframes ${dummyClass} {
    0% {
      transform: translateX(-100%);
    }
  }

  @keyframes ${dummyClass}-child {
    100% {
      width: 100%;
      height: 100%;
    }
  }
`;

let countFrames = false;
let frameCount = 0;

function countFPS() {
  requestAnimationFrame(() => {
    frameCount++;
    if (countFrames) {
      countFPS();
    }
  });
}



function heavyLifting(dummy) {
  for (let i = 0; i < 50; i++) {
    const el = document.createElement('div');
    el.style.setProperty('animation-delay', i + 'ms');
    dummy.appendChild(el);
  }
}

let activeMeasurement;

export function measureAnimationPerformance() {
  if (!activeMeasurement) {
    activeMeasurement = new Promise(function(resolve, reject) {
      let dummy = document.createElement('div');
      dummy.classList.add(dummyClass);

      if (window.performance) {
        performance.mark(dummyClass + 'start');
      }

      countFrames = true;
      frameCount = 0;

      document.body.appendChild(style);
      document.body.appendChild(dummy);

      heavyLifting(dummy);
      countFPS();

      dummy.addEventListener('animationend', e => {
        if (e.animationName != dummyClass) return;
        document.body.removeChild(dummy);
        document.body.removeChild(style);
        countFrames = false;

        requestAnimationFrame(() => {
          setTimeout(() => {
            let duration = -1;
            if (window.performance) {
              performance.mark(dummyClass + 'end');
              performance.measure(dummyClass + 'time', dummyClass + 'start', dummyClass + 'end');
              const entries = performance.getEntriesByName(dummyClass + 'time');
              duration = parseInt(entries[entries.length - 1].duration);
            }
            activeMeasurement = undefined;
            resolve({ fps: frameCount, duration: duration });
          });
        });
      });
    });
  }
  return activeMeasurement;
}

export class AnimationPerformance {
  static measure() {
    return measureAnimationPerformance();
  }
}
