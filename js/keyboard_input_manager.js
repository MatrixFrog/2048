class KeyboardInputManager {
  constructor() {
    this.events = {};

    this.listen();
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  };

  emit(event, data) {
    let callbacks = this.events[event];
    if (callbacks) {
      for (let callback of callbacks) {
        callback(data);
      }
    }
  };

  listen() {
    let map = {
      38: 0, // Up
      39: 1, // Right
      40: 2, // Down
      37: 3, // Left
      75: 0, // vim keybindings
      76: 1,
      74: 2,
      72: 3,
      87: 0, // W
      68: 1, // D
      83: 2, // S
      65: 3  // A
    };

    document.addEventListener("keydown", (event) => {
      let modifiers = event.altKey || event.ctrlKey || event.metaKey ||
                      event.shiftKey;
      let mapped    = map[event.which];

      if (!modifiers) {
        if (mapped !== undefined) {
          event.preventDefault();
          this.emit("move", mapped);
        }

        if (event.which === 32) this.restart(event);
      }
    });

    let retry = document.querySelector(".retry-button");
    retry.addEventListener("click", this.restart.bind(this));
    retry.addEventListener("touchend", this.restart.bind(this));

    var keepPlaying = document.querySelector(".keep-playing-button");
    keepPlaying.addEventListener("click", this.keepPlaying.bind(this));
    keepPlaying.addEventListener("touchend", this.keepPlaying.bind(this));

    // Listen to swipe events
    let touchStartClientX, touchStartClientY;
    let gameContainer = document.getElementsByClassName("game-container")[0];

    gameContainer.addEventListener("touchstart", (event) => {
      if (event.touches.length > 1) return;

      touchStartClientX = event.touches[0].clientX;
      touchStartClientY = event.touches[0].clientY;
      event.preventDefault();
    });

    gameContainer.addEventListener("touchmove", (event) => {
      event.preventDefault();
    });

    gameContainer.addEventListener("touchend", (event) => {
      if (event.touches.length > 0) return;

      let dx = event.changedTouches[0].clientX - touchStartClientX;
      let absDx = Math.abs(dx);

      let dy = event.changedTouches[0].clientY - touchStartClientY;
      let absDy = Math.abs(dy);

      if (Math.max(absDx, absDy) > 10) {
        // (right : left) : (down : up)
        this.emit("move", absDx > absDy ? (dx > 0 ? 1 : 3) : (dy > 0 ? 2 : 0));
      }
    });
  };

  restart(event) {
    event.preventDefault();
    this.emit("restart");
  };

  keepPlaying(event) {
    event.preventDefault();
    this.emit("keepPlaying");
  };
}
window.KeyboardInputManager = KeyboardInputManager;
