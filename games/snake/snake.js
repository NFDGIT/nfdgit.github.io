(function () {
  var GRID_SIZE = 18;
  var STORAGE_KEY = 'snake-best-score';
  var STEP_MS = 160;
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
  var renderSize = 432;
  var lastFrameTime = 0;
  var accumulator = 0;
  var bestScore = readBestScore();
  var game = createInitialState();
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
  render();
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

  function bindEvents() {
    window.addEventListener('resize', function () {
      resizeCanvas();
      render();
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
  }

  function queueDirection(direction) {
    if (!direction) return;

    if (game.status === 'idle' || game.status === 'gameover') {
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
    syncUi();
    render();
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
    game.status = 'gameover';
    if (game.score > bestScore) {
      bestScore = game.score;
      writeBestScore(bestScore);
      bestScoreEl.textContent = String(bestScore);
    }
    syncUi();
  }

  function loop(timestamp) {
    if (game.status === 'running') {
      if (!lastFrameTime) lastFrameTime = timestamp;
      accumulator += timestamp - lastFrameTime;
      lastFrameTime = timestamp;

      while (accumulator >= STEP_MS) {
        update();
        accumulator -= STEP_MS;
        if (game.status !== 'running') {
          accumulator = 0;
          break;
        }
      }
    } else {
      lastFrameTime = timestamp;
    }

    render();
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

  function render() {
    var cellSize = renderSize / GRID_SIZE;
    var i;

    ctx.clearRect(0, 0, renderSize, renderSize);
    drawBackground(cellSize);
    drawFood(cellSize);

    for (i = game.snake.length - 1; i >= 0; i -= 1) {
      drawSnakeSegment(game.snake[i], cellSize, i === 0);
    }
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

  function drawSnakeSegment(segment, cellSize, isHead) {
    var padding = cellSize * 0.08;
    var size = cellSize - padding * 2;
    var x = segment.x * cellSize + padding;
    var y = segment.y * cellSize + padding;

    ctx.fillStyle = getCssVariable(isHead ? '--snake-head' : '--snake-body') || '#22c55e';
    roundRect(x, y, size, size, cellSize * 0.18);
    ctx.fill();
  }

  function drawFood(cellSize) {
    var centerX = game.food.x * cellSize + cellSize / 2;
    var centerY = game.food.y * cellSize + cellSize / 2;

    ctx.beginPath();
    ctx.fillStyle = getCssVariable('--snake-food') || '#f97316';
    ctx.arc(centerX, centerY, cellSize * 0.28, 0, Math.PI * 2);
    ctx.fill();
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
      showOverlay('准备开始', '点击“开始游戏”或按任意方向键开始。');
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
      showOverlay('游戏暂停', '点击“继续”或再次按方向键即可恢复。');
      return;
    }

    statusEl.textContent = '已结束';
    startButton.textContent = '再来一局';
    pauseButton.textContent = '暂停';
    touchToggleButton.textContent = '重开';
    pauseButton.disabled = true;
    showOverlay('游戏结束', '本局得分 ' + game.score + '，点击“再来一局”重新开始。');
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
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
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
