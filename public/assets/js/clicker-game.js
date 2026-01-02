(function() {
  const STORAGE_KEY = 'rosa_clicks';
  let clicks = parseInt(localStorage.getItem(STORAGE_KEY) || '0');
  let gameInitialized = false;

  function updateDisplay() {
    const counter = document.getElementById('click-counter');
    if (counter) {
      counter.textContent = clicks;
      localStorage.setItem(STORAGE_KEY, clicks);
    }
  }

  function shakeImage(img) {
    img.style.animation = 'clicker-text 0s linear forwards, click-shake 0.3s ease';
    img.style.animationDelay = '0s, 0s';
    setTimeout(() => {
      img.style.animation = 'clicker-text 0s linear forwards';
      img.style.animationDelay = '0.54s';
    }, 300);
  }

  function initGame() {
    if (gameInitialized) return;
    gameInitialized = true;

    const img = document.getElementById('clicker-img');
    if (!img) return;

    updateDisplay();
    img.addEventListener('click', () => {
      clicks++;
      updateDisplay();
      shakeImage(img);
    });
  }

  let keys = [];
  window.addEventListener('keydown', e => {
    keys = [...keys, e.key.toLowerCase()].slice(-4);
    if (keys.join('') === 'rosa') {
      const game = document.getElementById('clicker-game');
      if (game.style.display !== 'flex') {
        game.style.display = 'flex';
        initGame();
      }
    }
  });

  document.addEventListener('click', e => {
    if (e.target.closest('.clicker-close')) {
      document.getElementById('clicker-game').style.display = 'none';
    }
  });
})();