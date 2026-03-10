(function () {
  var canvas = document.getElementById('billiards-canvas');
  var ctx = canvas.getContext('2d');
  var scoreEl = document.getElementById('score');
  var ballsLeftEl = document.getElementById('balls-left');
  var statusEl = document.getElementById('game-status');
  var overlayEl = document.getElementById('billiards-overlay');
  var overlayTitleEl = document.getElementById('overlay-title');
  var overlaySubEl = document.getElementById('overlay-sub');
  var startBtn = document.getElementById('start-btn');
  var resetBtn = document.getElementById('reset-btn');

  var LOGIC_W = 760;
  var LOGIC_H = 420;
  var RAIL_W = 28;
  var TABLE_X = RAIL_W;
  var TABLE_Y = RAIL_W;
  var TABLE_W = LOGIC_W - RAIL_W * 2;
  var TABLE_H = LOGIC_H - RAIL_W * 2;
  var BALL_R = 11;
  var POCKET_R = 17;
  var FRICTION = 0.985;
  var STOP_THRESHOLD = 0.08;
  var MAX_DRAG = 120;
  var MAX_SPEED = 18;
  var POCKET_SNAP = POCKET_R - 2;

  var BALL_COLORS = [
    '#f5c800', '#003caa', '#c80000', '#7b0080', '#ff6000',
    '#006a1c', '#8b1000', '#1a1a1a', '#f5c800', '#003caa',
    '#c80000', '#7b0080', '#ff6000', '#006a1c', '#8b1000'
  ];

  var POCKETS = [
    { x: TABLE_X + POCKET_R, y: TABLE_Y + POCKET_R },
    { x: TABLE_X + TABLE_W / 2, y: TABLE_Y },
    { x: TABLE_X + TABLE_W - POCKET_R, y: TABLE_Y + POCKET_R },
    { x: TABLE_X + POCKET_R, y: TABLE_Y + TABLE_H - POCKET_R },
    { x: TABLE_X + TABLE_W / 2, y: TABLE_Y + TABLE_H },
    { x: TABLE_X + TABLE_W - POCKET_R, y: TABLE_Y + TABLE_H - POCKET_R }
  ];

  var state = 'idle';
  var balls = [];
  var score = 0;
  var aimStart = null;
  var aimCurrent = null;
  var scale = 1;

  function createBalls() {
    var b = [];
    var cx = TABLE_X + TABLE_W * 0.68;
    var cy = TABLE_Y + TABLE_H / 2;
    var spacing = BALL_R * 2.1;
    var idx = 0;
    for (var row = 0; row < 5; row++) {
      for (var col = 0; col <= row; col++) {
        b.push({
          id: idx + 1,
          x: cx + row * spacing * 0.866,
          y: cy - row * spacing / 2 + col * spacing,
          vx: 0,
          vy: 0,
          color: BALL_COLORS[idx % BALL_COLORS.length],
          solid: idx < 8,
          pocketed: false,
          isCue: false
        });
        idx++;
      }
    }
    var cue = {
      id: 0,
      x: TABLE_X + TABLE_W * 0.28,
      y: TABLE_Y + TABLE_H / 2,
      vx: 0,
      vy: 0,
      color: '#f5f5f0',
      pocketed: false,
      isCue: true
    };
    b.push(cue);
    return b;
  }

  function getCueBall() {
    for (var i = 0; i < balls.length; i++) {
      if (balls[i].isCue && !balls[i].pocketed) return balls[i];
    }
    return null;
  }

  function allStopped() {
    for (var i = 0; i < balls.length; i++) {
      var b = balls[i];
      if (!b.pocketed && (Math.abs(b.vx) > STOP_THRESHOLD || Math.abs(b.vy) > STOP_THRESHOLD)) {
        return false;
      }
    }
    return true;
  }

  function activeBalls() {
    return balls.filter(function (b) { return !b.pocketed; });
  }

  function coloredLeft() {
    return balls.filter(function (b) { return !b.isCue && !b.pocketed; }).length;
  }

  function resizeCanvas() {
    var wrap = canvas.parentElement;
    var availW = wrap.clientWidth || LOGIC_W;
    scale = Math.min(availW / LOGIC_W, 1);
    var dpr = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = Math.round(LOGIC_W * scale * dpr);
    canvas.height = Math.round(LOGIC_H * scale * dpr);
    ctx.setTransform(scale * dpr, 0, 0, scale * dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
  }

  function toLogical(clientX, clientY) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: (clientX - rect.left) / scale,
      y: (clientY - rect.top) / scale
    };
  }

  function drawTable() {
    ctx.fillStyle = getCss('--billiards-rail') || '#5c3b1e';
    ctx.beginPath();
    ctx.roundRect(0, 0, LOGIC_W, LOGIC_H, 6);
    ctx.fill();

    ctx.fillStyle = getCss('--billiards-felt') || '#1a5c2a';
    ctx.fillRect(TABLE_X, TABLE_Y, TABLE_W, TABLE_H);

    ctx.strokeStyle = getCss('--billiards-felt-light') || '#1e6830';
    ctx.lineWidth = 1;
    ctx.strokeRect(TABLE_X + 2, TABLE_Y + 2, TABLE_W - 4, TABLE_H - 4);

    POCKETS.forEach(function (p) {
      ctx.beginPath();
      ctx.fillStyle = getCss('--billiards-pocket') || '#0a0a0a';
      ctx.arc(p.x, p.y, POCKET_R, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function drawBall(b) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(b.x, b.y, BALL_R, 0, Math.PI * 2);

    var grad = ctx.createRadialGradient(b.x - BALL_R * 0.3, b.y - BALL_R * 0.35, BALL_R * 0.1, b.x, b.y, BALL_R);
    grad.addColorStop(0, lightenColor(b.color, 0.35));
    grad.addColorStop(0.6, b.color);
    grad.addColorStop(1, darkenColor(b.color, 0.3));
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.strokeStyle = 'rgba(0,0,0,0.25)';
    ctx.lineWidth = 0.8;
    ctx.stroke();

    if (!b.isCue && b.id >= 9) {
      ctx.beginPath();
      ctx.arc(b.x, b.y, BALL_R * 0.58, 0, Math.PI * 2);
      ctx.fillStyle = '#f5f5f2';
      ctx.fill();
    }

    ctx.restore();
  }

  function drawAimLine(cue) {
    if (!aimStart || !aimCurrent) return;
    var dx = aimCurrent.x - aimStart.x;
    var dy = aimCurrent.y - aimStart.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 4) return;

    var nx = -dx / dist;
    var ny = -dy / dist;

    ctx.save();
    ctx.setLineDash([6, 4]);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cue.x, cue.y);
    ctx.lineTo(cue.x + nx * Math.min(dist * 2.5, 200), cue.y + ny * Math.min(dist * 2.5, 200));
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 200, 100, 0.7)';
    ctx.lineWidth = 1.2;
    ctx.moveTo(cue.x, cue.y);
    ctx.lineTo(aimCurrent.x, aimCurrent.y);
    ctx.stroke();
    ctx.restore();
  }

  function render() {
    ctx.clearRect(0, 0, LOGIC_W, LOGIC_H);
    drawTable();

    var cue = getCueBall();
    if (state !== 'idle' && cue && aimStart) {
      drawAimLine(cue);
    }

    activeBalls().forEach(function (b) {
      drawBall(b);
    });
  }

  function updatePhysics() {
    var active = activeBalls();
    active.forEach(function (b) {
      b.x += b.vx;
      b.y += b.vy;
      b.vx *= FRICTION;
      b.vy *= FRICTION;
      if (Math.abs(b.vx) < STOP_THRESHOLD) b.vx = 0;
      if (Math.abs(b.vy) < STOP_THRESHOLD) b.vy = 0;

      if (b.x - BALL_R < TABLE_X) {
        b.x = TABLE_X + BALL_R;
        b.vx = Math.abs(b.vx) * 0.9;
      }
      if (b.x + BALL_R > TABLE_X + TABLE_W) {
        b.x = TABLE_X + TABLE_W - BALL_R;
        b.vx = -Math.abs(b.vx) * 0.9;
      }
      if (b.y - BALL_R < TABLE_Y) {
        b.y = TABLE_Y + BALL_R;
        b.vy = Math.abs(b.vy) * 0.9;
      }
      if (b.y + BALL_R > TABLE_Y + TABLE_H) {
        b.y = TABLE_Y + TABLE_H - BALL_R;
        b.vy = -Math.abs(b.vy) * 0.9;
      }
    });

    for (var i = 0; i < active.length; i++) {
      for (var j = i + 1; j < active.length; j++) {
        resolveCollision(active[i], active[j]);
      }
    }

    active.forEach(function (b) {
      POCKETS.forEach(function (p) {
        var dx = b.x - p.x;
        var dy = b.y - p.y;
        if (Math.sqrt(dx * dx + dy * dy) < POCKET_SNAP) {
          if (b.isCue) {
            b.pocketed = false;
            b.x = TABLE_X + TABLE_W * 0.28;
            b.y = TABLE_Y + TABLE_H / 2;
            b.vx = 0;
            b.vy = 0;
          } else {
            b.pocketed = true;
            b.vx = 0;
            b.vy = 0;
            score++;
            scoreEl.textContent = String(score);
            ballsLeftEl.textContent = String(coloredLeft());
          }
        }
      });
    });
  }

  function resolveCollision(a, b) {
    var dx = b.x - a.x;
    var dy = b.y - a.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > BALL_R * 2 || dist === 0) return;

    var overlap = BALL_R * 2 - dist;
    var nx = dx / dist;
    var ny = dy / dist;

    a.x -= nx * overlap * 0.5;
    a.y -= ny * overlap * 0.5;
    b.x += nx * overlap * 0.5;
    b.y += ny * overlap * 0.5;

    var dvx = b.vx - a.vx;
    var dvy = b.vy - a.vy;
    var dot = dvx * nx + dvy * ny;
    if (dot > 0) return;

    var impulse = dot * 0.95;
    a.vx += impulse * nx;
    a.vy += impulse * ny;
    b.vx -= impulse * nx;
    b.vy -= impulse * ny;
  }

  var lastTs = 0;
  function loop(ts) {
    requestAnimationFrame(loop);
    var dt = ts - lastTs;
    lastTs = ts;
    if (dt > 100) {
      render();
      return;
    }

    if (state === 'playing' || state === 'moving') {
      updatePhysics();

      if (state === 'moving' && allStopped()) {
        if (coloredLeft() === 0) {
          state = 'won';
          showOverlay('🎉 通关！', '全部彩球已进袋！点击"重新开始"再来一局。');
          statusEl.textContent = '通关';
          startBtn.textContent = '再来一局';
        } else if (!getCueBall()) {
          state = 'playing';
          statusEl.textContent = '准备击球';
        } else {
          state = 'playing';
          statusEl.textContent = '准备击球';
        }
      }
    }

    render();
  }

  function hitCueBall() {
    if (!aimStart || !aimCurrent) return;
    var cue = getCueBall();
    if (!cue) return;

    var dx = aimCurrent.x - aimStart.x;
    var dy = aimCurrent.y - aimStart.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 4) return;

    var power = Math.min(dist, MAX_DRAG) / MAX_DRAG;
    var speed = power * MAX_SPEED;
    cue.vx = (-dx / dist) * speed;
    cue.vy = (-dy / dist) * speed;

    state = 'moving';
    statusEl.textContent = '球在运动中…';
  }

  function startGame() {
    balls = createBalls();
    score = 0;
    scoreEl.textContent = '0';
    ballsLeftEl.textContent = '15';
    state = 'playing';
    statusEl.textContent = '准备击球';
    aimStart = null;
    aimCurrent = null;
    hideOverlay();
    startBtn.textContent = '重新开始';
  }

  function showOverlay(title, sub) {
    overlayTitleEl.textContent = title;
    overlaySubEl.textContent = sub;
    overlayEl.classList.remove('is-hidden');
  }

  function hideOverlay() {
    overlayEl.classList.add('is-hidden');
  }

  function getEventPos(e) {
    if (e.touches && e.touches.length > 0) {
      return toLogical(e.touches[0].clientX, e.touches[0].clientY);
    }
    return toLogical(e.clientX, e.clientY);
  }

  function onPointerDown(e) {
    if (state !== 'playing') return;
    var cue = getCueBall();
    if (!cue) return;
    var pos = getEventPos(e);
    var dx = pos.x - cue.x;
    var dy = pos.y - cue.y;
    if (Math.sqrt(dx * dx + dy * dy) > BALL_R * 3) return;
    aimStart = { x: pos.x, y: pos.y };
    aimCurrent = { x: pos.x, y: pos.y };
    e.preventDefault();
  }

  function onPointerMove(e) {
    if (!aimStart) return;
    aimCurrent = getEventPos(e);
    e.preventDefault();
  }

  function onPointerUp(e) {
    if (!aimStart) return;
    aimCurrent = getEventPos(e);
    hitCueBall();
    aimStart = null;
    aimCurrent = null;
    e.preventDefault();
  }

  function getCss(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function lightenColor(hex, amount) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    if (isNaN(r)) return '#ffffff';
    r = Math.min(255, Math.round(r + (255 - r) * amount));
    g = Math.min(255, Math.round(g + (255 - g) * amount));
    b = Math.min(255, Math.round(b + (255 - b) * amount));
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  function darkenColor(hex, amount) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    if (isNaN(r)) return '#000000';
    r = Math.max(0, Math.round(r * (1 - amount)));
    g = Math.max(0, Math.round(g * (1 - amount)));
    b = Math.max(0, Math.round(b * (1 - amount)));
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  function init() {
    resizeCanvas();
    balls = createBalls();
    render();
    showOverlay('台球', '点击"开始游戏"后从母球向外拖拽瞄准，松开击球。');
    startBtn.textContent = '开始游戏';
    startBtn.addEventListener('click', startGame);
    resetBtn.addEventListener('click', startGame);

    canvas.addEventListener('mousedown', onPointerDown);
    canvas.addEventListener('mousemove', onPointerMove);
    canvas.addEventListener('mouseup', onPointerUp);
    canvas.addEventListener('touchstart', onPointerDown, { passive: false });
    canvas.addEventListener('touchmove', onPointerMove, { passive: false });
    canvas.addEventListener('touchend', onPointerUp, { passive: false });

    window.addEventListener('resize', function () {
      resizeCanvas();
      render();
    });

    requestAnimationFrame(loop);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
