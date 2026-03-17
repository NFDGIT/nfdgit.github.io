(function () {
  var GRID_SIZE = 18;
  var STORAGE_KEY = 'snake-best-score';
  var BASE_STEP_MS = 160;
  var SPEED_INCREMENT = 3;
  var MIN_STEP_MS = 70;
  var canvas = document.getElementById('game-canvas');
  var ctx = canvas.getContext('2d');
  var scoreEl = document.getElementById('score');
  var bestScoreEl = document.getElementById('best-score');
  var statusEl = document.getElementById('game-status');
  var overlayEl = document.getElementById('game-overlay');
  var overlayTitleEl = document.getElementById('overlay-title');
  var overlayTextEl = document.getElementById('overlay-text');
  var startButton = document.getElementById('start-button');
  var pauseButton = document.getElementById('pause-button');
  var restartButton = document.getElementById('restart-button');
  var touchToggleButton = document.querySelector('[data-action="toggle"]');
  var canvasWrap = document.querySelector('.snake-canvas-wrap');
  var renderSize = 432;
  var lastFrameTime = 0;
  var accumulator = 0;
  var bestScore = readBestScore();
  var game = createInitialState();
  var particles = [];
  var prevSnakePositions = null;
  var dyingTimer = 0;
  var dyingBlink = false;
  var touchStartX = 0;
  var touchStartY = 0;
  var directionMap = {
    ArrowUp: 'up',
    KeyW: 'up',
    ArrowDown: 'down',
    KeyS: 'down',
    ArrowLeft: 'left',
    KeyA: 'left',
    ArrowRight: 'right',
    KeyD: 'right'
  };
  var vectors = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 }
  };
  var oppositeDirections = {
    up: 'down',
    down: 'up',
    left: 'right',
    right: 'left'
  };

  bestScoreEl.textContent = String(bestScore);
  resizeCanvas();
  syncUi();
  render(performance.now());
  bindEvents();
  requestAnimationFrame(loop);

  function createInitialState() {
    var state = {
      snake: [
        { x: 8, y: 9 },
        { x: 7, y: 9 },
        { x: 6, y: 9 }
      ],
      direction: 'right',
      nextDirection: 'right',
      food: null,
      score: 0,
      status: 'idle'
    };

    state.food = generateFood(state.snake);
    return state;
  }

  function getCurrentStepMs() {
    return Math.max(BASE_STEP_MS - game.score * SPEED_INCREMENT, MIN_STEP_MS);
  }

  function bindEvents() {
    window.addEventListener('resize', function () {
      resizeCanvas();
      render(performance.now());
    });

    document.addEventListener('keydown', function (event) {
      var direction = directionMap[event.code];
      if (!direction) return;
      event.preventDefault();
      queueDirection(direction);
    });

    startButton.addEventListener('click', function () {
      if (game.status === 'running') return;
      if (game.status === 'paused') {
        resumeGame();
        return;
      }
      startFreshGame();
    });

    pauseButton.addEventListener('click', function () {
      if (game.status === 'paused') {
        resumeGame();
      } else if (game.status === 'running') {
        pauseGame();
      }
    });

    restartButton.addEventListener('click', function () {
      startFreshGame();
    });

    document.querySelectorAll('.snake-control').forEach(function (button) {
      button.addEventListener('click', function () {
        var action = button.getAttribute('data-action');
        if (action === 'toggle') {
          if (game.status === 'running') {
            pauseGame();
          } else if (game.status === 'paused') {
            resumeGame();
          } else {
            startFreshGame();
          }
          return;
        }

        queueDirection(button.getAttribute('data-direction'));
      });
    });

    canvasWrap.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      e.preventDefault();
    }, { passive: false });

    canvasWrap.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - touchStartX;
      var dy = e.changedTouches[0].clientY - touchStartY;
      var absDx = Math.abs(dx);
      var absDy = Math.abs(dy);

      if (Math.max(absDx, absDy) < 30) return;

      var direction;
      if (absDx > absDy) {
        direction = dx > 0 ? 'right' : 'left';
      } else {
        direction = dy > 0 ? 'down' : 'up';
      }

      queueDirection(direction);
      e.preventDefault();
    }, { passive: false });
  }

  function queueDirection(direction) {
    if (!direction) return;

    if (game.status === 'idle' || game.status === 'gameover' || game.status === 'dying') {
      startFreshGame(direction);
      return;
    }

    if (game.status === 'paused') {
      resumeGame();
    }

    var current = game.nextDirection || game.direction;
    if (direction === current || direction === oppositeDirections[current]) return;
    game.nextDirection = direction;
  }

  function startFreshGame(initialDirection) {
    game = createInitialState();
    if (initialDirection && initialDirection !== oppositeDirections[game.direction]) {
      game.direction = initialDirection;
      game.nextDirection = initialDirection;
    }
    game.status = 'running';
    accumulator = 0;
    lastFrameTime = 0;
    particles = [];
    prevSnakePositions = null;
    dyingTimer = 0;
    dyingBlink = false;
    canvasWrap.classList.remove('is-shaking');
    syncUi();
    render(performance.now());
  }

  function pauseGame() {
    game.status = 'paused';
    syncUi();
  }

  function resumeGame() {
    if (game.status !== 'paused') return;
    game.status = 'running';
    lastFrameTime = 0;
    syncUi();
  }

  function endGame() {
    game.status = 'dying';
    dyingTimer = 0;
    dyingBlink = false;
    canvasWrap.classList.add('is-shaking');
    if (game.score > bestScore) {
      bestScore = game.score;
      writeBestScore(bestScore);
      bestScoreEl.textContent = String(bestScore);
    }
  }

  function finishDying() {
    game.status = 'gameover';
    dyingTimer = 0;
    dyingBlink = false;
    canvasWrap.classList.remove('is-shaking');
    syncUi();
  }

  function loop(timestamp) {
    var stepMs = getCurrentStepMs();
    var delta = 0;

    if (game.status === 'running') {
      if (!lastFrameTime) lastFrameTime = timestamp;
      delta = timestamp - lastFrameTime;
      lastFrameTime = timestamp;
      accumulator += delta;

      while (accumulator >= stepMs) {
        prevSnakePositions = game.snake.map(function (s) { return { x: s.x, y: s.y }; });
        update();
        accumulator -= stepMs;
        if (game.status !== 'running') {
          accumulator = 0;
          break;
        }
      }
    } else if (game.status === 'dying') {
      if (!lastFrameTime) lastFrameTime = timestamp;
      delta = timestamp - lastFrameTime;
      lastFrameTime = timestamp;
      dyingTimer += delta;
      dyingBlink = Math.floor(dyingTimer / 80) % 2 === 0;

      if (dyingTimer >= 480) {
        finishDying();
      }
    } else {
      delta = lastFrameTime ? timestamp - lastFrameTime : 0;
      lastFrameTime = timestamp;
    }

    if (particles.length > 0) {
      updateParticles(delta || 16);
    }

    render(timestamp);
    requestAnimationFrame(loop);
  }

  function update() {
    var nextDirection = game.nextDirection || game.direction;
    var movement = vectors[nextDirection];
    var willEat;
    var nextHead = {
      x: game.snake[0].x + movement.x,
      y: game.snake[0].y + movement.y
    };

    willEat = nextHead.x === game.food.x && nextHead.y === game.food.y;

    if (isOutOfBounds(nextHead) || isSnakeCollision(nextHead, willEat)) {
      endGame();
      return;
    }

    game.direction = nextDirection;
    game.snake.unshift(nextHead);

    if (willEat) {
      game.score += 1;
      scoreEl.textContent = String(game.score);
      if (game.score > bestScore) {
        bestScore = game.score;
        bestScoreEl.textContent = String(bestScore);
      }
      spawnParticles(game.food.x, game.food.y);
      game.food = generateFood(game.snake);
    } else {
      game.snake.pop();
    }
  }

  function isSnakeCollision(nextHead, willEat) {
    var segments = willEat ? game.snake : game.snake.slice(0, -1);

    return segments.some(function (segment) {
      return segment.x === nextHead.x && segment.y === nextHead.y;
    });
  }

  function isOutOfBounds(position) {
    return (
      position.x < 0 ||
      position.y < 0 ||
      position.x >= GRID_SIZE ||
      position.y >= GRID_SIZE
    );
  }

  function generateFood(snake) {
    var available = [];
    var x;
    var y;

    for (y = 0; y < GRID_SIZE; y += 1) {
      for (x = 0; x < GRID_SIZE; x += 1) {
        if (!snake.some(function (segment) { return segment.x === x && segment.y === y; })) {
          available.push({ x: x, y: y });
        }
      }
    }

    return available[Math.floor(Math.random() * available.length)];
  }

  function resizeCanvas() {
    var dpr = Math.max(window.devicePixelRatio || 1, 1);
    var width = canvas.clientWidth || 432;
    renderSize = width;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(width * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = false;
  }

  function render(timestamp) {
    var cellSize = renderSize / GRID_SIZE;
    var i, pos, drawX, drawY;
    var stepMs = getCurrentStepMs();
    var t = (game.status === 'running' && prevSnakePositions)
      ? Math.min(Math.max(accumulator / stepMs, 0), 1)
      : 1;

    ctx.clearRect(0, 0, renderSize, renderSize);
    drawBackground(cellSize);
    drawFood(cellSize, timestamp || performance.now());

    if (game.status !== 'dying' || dyingBlink) {
      for (i = game.snake.length - 1; i >= 0; i -= 1) {
        pos = game.snake[i];
        drawX = pos.x;
        drawY = pos.y;

        if (prevSnakePositions && prevSnakePositions[i] && t < 1) {
          drawX = prevSnakePositions[i].x + (pos.x - prevSnakePositions[i].x) * t;
          drawY = prevSnakePositions[i].y + (pos.y - prevSnakePositions[i].y) * t;
        }

        drawSnakeSegment(drawX, drawY, cellSize, i === 0);
      }
    }

    drawParticles(cellSize);
  }

  function drawBackground(cellSize) {
    var x;
    var y;

    ctx.fillStyle = getCssVariable('--snake-canvas-bg') || '#111827';
    ctx.fillRect(0, 0, renderSize, renderSize);

    ctx.strokeStyle = getCssVariable('--snake-grid-line') || 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;

    for (x = 0; x <= GRID_SIZE; x += 1) {
      ctx.beginPath();
      ctx.moveTo(Math.round(x * cellSize), 0);
      ctx.lineTo(Math.round(x * cellSize), renderSize);
      ctx.stroke();
    }

    for (y = 0; y <= GRID_SIZE; y += 1) {
      ctx.beginPath();
      ctx.moveTo(0, Math.round(y * cellSize));
      ctx.lineTo(renderSize, Math.round(y * cellSize));
      ctx.stroke();
    }
  }

  function drawSnakeSegment(sx, sy, cellSize, isHead) {
    var padding = cellSize * 0.08;
    var size = cellSize - padding * 2;
    var x = sx * cellSize + padding;
    var y = sy * cellSize + padding;

    ctx.fillStyle = getCssVariable(isHead ? '--snake-head' : '--snake-body') || '#22c55e';
    roundRect(x, y, size, size, cellSize * 0.18);
    ctx.fill();
  }

  function drawFood(cellSize, timestamp) {
    var pulse = 0.85 + 0.15 * (0.5 + 0.5 * Math.sin(timestamp * 0.004));
    var radius = cellSize * 0.28 * pulse;
    var centerX = game.food.x * cellSize + cellSize / 2;
    var centerY = game.food.y * cellSize + cellSize / 2;

    ctx.beginPath();
    ctx.fillStyle = getCssVariable('--snake-food') || '#f97316';
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  function spawnParticles(cellX, cellY) {
    var cellSize = renderSize / GRID_SIZE;
    var cx = cellX * cellSize + cellSize / 2;
    var cy = cellY * cellSize + cellSize / 2;
    var count = 8 + Math.floor(Math.random() * 5);
    var i, angle, speed;

    for (i = 0; i < count; i += 1) {
      angle = Math.random() * Math.PI * 2;
      speed = 60 + Math.random() * 80;
      particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        life: 400
      });
    }
  }

  function updateParticles(dt) {
    var dtSec = dt / 1000;
    var i = particles.length;
    var p;

    while (i--) {
      p = particles[i];
      p.x += p.vx * dtSec;
      p.y += p.vy * dtSec;
      p.life -= dt;
      p.alpha = Math.max(0, p.life / 400);

      if (p.life <= 0) {
        particles.splice(i, 1);
      }
    }
  }

  function drawParticles(cellSize) {
    if (particles.length === 0) return;
    var color = getCssVariable('--snake-food') || '#f97316';
    var i, p;

    for (i = 0; i < particles.length; i += 1) {
      p = particles[i];
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.arc(p.x, p.y, cellSize * 0.1, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function roundRect(x, y, width, height, radius) {
    var r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + width, y, x + width, y + height, r);
    ctx.arcTo(x + width, y + height, x, y + height, r);
    ctx.arcTo(x, y + height, x, y, r);
    ctx.arcTo(x, y, x + width, y, r);
    ctx.closePath();
  }

  function syncUi() {
    scoreEl.textContent = String(game.score);
    bestScoreEl.textContent = String(bestScore);

    if (game.status === 'idle') {
      statusEl.textContent = '未开始';
      startButton.textContent = '开始游戏';
      pauseButton.textContent = '暂停';
      touchToggleButton.textContent = '开始';
      pauseButton.disabled = true;
      showOverlay('准备开始', '点击"开始游戏"或滑动画布开始。');
      return;
    }

    if (game.status === 'running') {
      statusEl.textContent = '进行中';
      startButton.textContent = '重新开局';
      pauseButton.textContent = '暂停';
      touchToggleButton.textContent = '暂停';
      pauseButton.disabled = false;
      hideOverlay();
      return;
    }

    if (game.status === 'paused') {
      statusEl.textContent = '已暂停';
      startButton.textContent = '继续游戏';
      pauseButton.textContent = '继续';
      touchToggleButton.textContent = '继续';
      pauseButton.disabled = false;
      showOverlay('游戏暂停', '点击"继续"或再次按方向键即可恢复。');
      return;
    }

    statusEl.textContent = '已结束';
    startButton.textContent = '再来一局';
    pauseButton.textContent = '暂停';
    touchToggleButton.textContent = '重开';
    pauseButton.disabled = true;
    showOverlay('游戏结束', '本局得分 ' + game.score + '，点击"再来一局"重新开始。');
  }

  function showOverlay(title, text) {
    overlayTitleEl.textContent = title;
    overlayTextEl.textContent = text;
    overlayEl.classList.remove('is-hidden');
  }

  function hideOverlay() {
    overlayEl.classList.add('is-hidden');
  }

  function getCssVariable(name) {
    return (typeof SiteUtils !== 'undefined') ? SiteUtils.getCssVar(name) : getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function readBestScore() {
    try {
      return Number(localStorage.getItem(STORAGE_KEY) || 0);
    } catch (error) {
      return 0;
    }
  }

  function writeBestScore(value) {
    try {
      localStorage.setItem(STORAGE_KEY, String(value));
    } catch (error) {}
  }
})();
