
var WheelSwipe = require('../index');
var dat = require('exdat');

var text;
var defaultText = "&#8645;";
var transitionTime = 300;

// create new wheel swipe instance
var ws = new WheelSwipe();
var gui = new dat.GUI();

gui.add(ws.options, 'cancelScroll').onChange(ws.updateDebounceHandler.bind(ws));
gui.add(ws.options, 'debounceThreshold', 0, 1000).onChange(ws.updateDebounceHandler.bind(ws));
gui.add(ws.options, 'deltaThreshold', 0, 10);
gui.add(ws.options, 'reverseDelay', 0, 1000);



// update text message
function updateText(message) {
	text.innerHTML = message;
	transitioning = true;

	window.setTimeout(function() {
		text.innerHTML = defaultText;
		transitioning = false;
	}, transitionTime);
}


// add listeners
window.addEventListener('wheelup', function(e) { updateText(e.detail.toFixed(1)); });
window.addEventListener('wheeldown', function(e) { updateText(e.detail.toFixed(1)); });

// add text
text = document.createElement('div');
text.id = "text";
text.innerHTML = defaultText;
document.body.appendChild(text);