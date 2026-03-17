(function () {
  var overlayEl = document.getElementById('demo-overlay');
  var showBtn = document.getElementById('show-overlay-btn');
  var closeBtn = document.getElementById('close-overlay-btn');

  if (showBtn && overlayEl) {
    showBtn.addEventListener('click', function () {
      overlayEl.classList.remove('is-hidden');
    });
  }
  if (closeBtn && overlayEl) {
    closeBtn.addEventListener('click', function () {
      overlayEl.classList.add('is-hidden');
    });
  }

  var replayBtn = document.getElementById('replay-anim-btn');
  if (replayBtn) {
    replayBtn.addEventListener('click', function () {
      var items = document.querySelectorAll('.anim-replay-target');
      items.forEach(function (el) {
        var classes = [];
        el.classList.forEach(function (c) {
          if (c.indexOf('anim-') === 0 || c.indexOf('stagger-') === 0) classes.push(c);
        });
        classes.forEach(function (c) { el.classList.remove(c); });
        void el.offsetWidth;
        classes.forEach(function (c) { el.classList.add(c); });
      });
    });
  }
})();
