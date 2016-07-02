var mouseWheel = require('mouse-wheel');
var mergeDefaults = require('lodash.defaults');
var trigger = require('compat-trigger-event');
var debounce = require('./debounce');

var defaults = {
	deltaThreshold: 1,
	debounceThreshold: 50,
	cancelScroll: true
}

var WheelSwipe = function(el, opts) {
	var handler;

	// if dom element isn't specified
	if(!el || !(el instanceof Element)) {
		opts = el;
		el = window;
	}

	// make sure opts isn't undefined
	opts = (opts || {});

	this.options = mergeDefaults(opts, defaults);
	this.el = el;

	// set handler for mouse wheel event
	handler = debounce(this.handleMouseWheel.bind(this), this.options.debounceThreshold, true);

	// bind event
	mouseWheel(el, handler, this.options.cancelScroll);
}

WheelSwipe.prototype.handleMouseWheel = function(dx, dy, dz) {

		if(Math.abs(dy) >= this.options.deltaThreshold) {
			if(dy > 0) {
				trigger(this.el, 'wheelup');
			} else {
				trigger(this.el, 'wheeldown');
			}
		}	
};


module.exports = WheelSwipe;