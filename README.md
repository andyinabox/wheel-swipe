# WheelSwipe

Trigger swipe-like events with mousewheel and trackpad.

[![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

```js

var WheelSwipe = require('wheel-swipe');

var ws = new WheelSwipe();

window.addEventListener('wheelup', function(e) { 
	console.log('swipe up!');
});

window.addEventListener('wheeldown', function(e) { 
	console.log('swipe down!');
});

```

## Usage

[![NPM](https://nodei.co/npm/wheel-swipe.png)](https://nodei.co/npm/wheel-swipe/)

#### `WheelSwipe([el], [opts])`

Construct a new instance.

 * `el` is the element to listen to. Optional, defaults to `window` object.
 * `opts` is also optional, contains the following settings: 
  * `deltaThreshold` - threshold for scroll delta, can be used to only trigger when the scroll delta is a high number. Defaults to `1`
  * `debounceThreshold` - threshold for scrolling debounce. Defaults to `50`.
  * `cancelScroll` - Boolean, whether or not to cancel default scrolling behavior. Defaults to `true`.
  *  `reverseDelay` - This sets a delay to avoid accidental reversals of swipe (can happen on some devices, namely the Apple Magic Mouse). Defaults to `0` (disabled).

## Demo

To run the demo using [budo](https://github.com/mattdesl/budo):

```bash
npm install
npm run demo
```

## Dependencies

 * [mouse-wheel](https://www.npmjs.com/package/mouse-wheel)
 * [lodash.defaults](https://www.npmjs.com/package/lodash.defaults)
 * [compat-trigger-event](https://www.npmjs.com/package/compat-trigger-event)

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/no-op/blob/master/LICENSE.md) for details.
