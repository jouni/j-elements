<maturity-badge poc>(Proof of concept)</maturity-badge>

# Animation performance

## Problem

There is no web standard to get the GPU performance metrics of the device. Those would be useful for example in adjusting some UI animations (richer animations for more capable devices).

## Solution

Run some computationally heavy JavaScript at the same time as running a CSS animation visually hidden from the user and count the number of animation frames during that animations using `requestAnimationFrame`.

## Examples

```javascript
import {AnimationPerformance} from 'j-elements';
// or
import {AnimationPerformance} from 'j-elements/src/util/AnimationPerformance.js';
```

```html,live
<h5>Measured during page load</h5>
<div class="performance-at-startup">Measuring…</div>

<h5>Measured manually <button id="measure-performance">Measure</button></h5>
<div class="measured-performance"></div>

<script>
  const startup = document.querySelector('.performance-at-startup');
  const measured = document.querySelector('.measured-performance');

  if (window._animationPerformanceAtStartup) {
    startup.textContent = window._animationPerformanceAtStartup;
  }

  document.querySelector('#measure-performance').addEventListener('click', () => {
    measured.textContent = 'Measuring…';
    AnimationPerformance.measure().then(({fps, duration}) => {
      measured.textContent = `FPS: ${fps} — Duration: ${duration}ms`;
    });
  });
</script>
```

---

## Limitations

### Measures the combination of CPU and GPU performance
A bit of computationally heavy JavaScript is run simultaneous during the measurement. It couples the GPU measurement to the CPU performance as well so it is not necessarily representative of the devices animation capabilities under less heavy load.

### Additional resource usage
The performance measurement will use additional network bandwidth, processing power and battery on the users device. That said, it could also end up saving those same things if the app adjusts itself based on the measurements.
