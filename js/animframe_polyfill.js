(function() {
  let lastTime = 0;
  for (let vendor of ['webkit', 'moz']) {
    window.requestAnimationFrame = window[vendor+'RequestAnimationFrame'];
    window.cancelAnimationFrame =
    window[vendor+'CancelAnimationFrame'] || window[vendor+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
      let currTime = new Date().getTime();
      let timeToCall = Math.max(0, 16 - (currTime - lastTime));
      let id = window.setTimeout(function() { callback(currTime + timeToCall); },
      timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }
}());
