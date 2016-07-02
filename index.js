var WheelSwipe = require('./wheel-swipe');

var text;
var defaultText = "&#9774;";
var transitionTime = 300;

// create new wheel swipe instance
var ws = new WheelSwipe();

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
window.addEventListener('wheelup', function(e) { updateText("&#11014;") });
window.addEventListener('wheeldown', function(e) { updateText("&#11015;") });

// add text
text = document.createElement('div');
text.id = "text";
text.innerHTML = defaultText;
document.body.appendChild(text);