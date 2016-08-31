var mouseWheel = require('mouse-wheel');
var mergeDefaults = require('lodash.defaults');
var trigger = require('compat-trigger-event');
var debounce = require('./debounce');
var sign = require('./sign');

var defaults = {
	deltaThreshold: 1,
	debounceThreshold: 50,
	cancelScroll: true,
	reverseDelay: 0
}

var WheelSwipe = function(el, opts) {

	// if dom element isn't specified
	if(!el || !(el instanceof Element)) {
		opts = el;
		el = window;
	}

	// make sure opts isn't undefined
	opts = (opts || {});

	this.options = mergeDefaults(opts, defaults);
	this.el = el;

	// used for minimizing accidental reversals
	this.reverseTimeoutID = undefined;
	this.lastSign = undefined;

	// set handler for mouse wheel event
	this.updateDebounceHandler();
}

WheelSwipe.prototype.handleMouseWheel = function(dx, dy, dz) {

	// check to see if this is within the reversal 
	if(this.checkReverseTimeout(dy)) {

		if(Math.abs(dy) >= this.options.deltaThreshold) {

			this.setReverseTimeout(dy);

			if(dy > 0) {
				trigger(this.el, 'wheelup', { detail: dy } );
			} else {
				trigger(this.el, 'wheeldown', { detail: dy } );
			}
		}	

	}
};

WheelSwipe.prototype.updateDebounceHandler = function(n) {

	// update the option if number is specified
	if(typeof n === 'number') {
		this.options.debounceThreshold = n;
	}

	// not sure if this will actually do what i need it to do
	if(this.handler) delete this.handler;

	// set the handler with debounce threhold
	this.handler = debounce(this.handleMouseWheel.bind(this), this.options.debounceThreshold, true);

	// add mousewheel event listener
	if(this.listener) {
		this.el.removeEventListener('wheel', this.listener);
	}

		// bind event
	this.listener = mouseWheel(this.el, this.handler, this.options.cancelScroll);
}

WheelSwipe.prototype.checkReverseTimeout = function(dy) {

	// pass through if no reverse delay set, or no current last sign
	if(!this.options.reverseDelay || typeof this.lastSign === 'undefined') {
		return true;
	}

	// only true if the same sign
	return this.lastSign === sign(dy);
}

WheelSwipe.prototype.setReverseTimeout = function(dy) {

	// reset
	function reverseTimeout() {
		this.lastSign = undefined;
		this.reverseTimeoutID = undefined;
	}

	// set timeout if reverse delay is set
	if(this.options.reverseDelay) {

		// clear timeout if exists
		if(this.reverseTimeoutID) {
			window.clearTimeout(this.reverseTimeoutID);
		}

		this.lastSign = sign(dy);
		this.reverseTimeoutID = window.setTimeout(reverseTimeout.bind(this), this.options.reverseDelay);
	}
}


module.exports = WheelSwipe;