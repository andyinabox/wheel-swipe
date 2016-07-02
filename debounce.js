module.exports = function debounce(func, always, threshold, execAsap) {
 
    var timeout;

    // swap args if `always` function isn't provided
    if(typeof always === 'number') {
      execAsap = threshold;
      threshold = always;
      always = undefined;
    }
 
    return function() {
        var obj = this, args = arguments;

        function delayed () {
          if (!execAsap) {
              func.apply(obj, args);
          }
          timeout = null; 
        }
 
        if (timeout) {
          clearTimeout(timeout);
        } else if (execAsap) {
          func.apply(obj, args);
        }
 
        timeout = setTimeout(delayed, threshold || 100);

        if(always) {
          always.apply(obj, args); 
        }
    };
 
}