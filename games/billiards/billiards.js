(function () {
  var canvas = document.getElementById('billiards-canvas');
  var wrap = canvas && canvas.parentElement;
  var ctx = canvas.getContext('2d');
  var scoreEl = document.getElementById('score');
  var ballsLeftEl = document.getElementById('balls-left');
  var statusEl = document.getElementById('game-status');
  var overlayEl = document.getElementById('billiards-overlay');
  var overlayTitleEl = document.getElementById('overlay-title');
  var overlaySubEl = document.getElementById('overlay-sub');
  var startBtn = document.getElementById('start-btn');
  var resetBtn = document.getElementById('reset-btn');
  var powerFill = document.getElementById('power-fill');
  var threeContainer = document.getElementById('billiards-3d-container');
  var view2dBtn = document.getElementById('view-2d-btn');
  var view3dBtn = document.getElementById('view-3d-btn');

  var mobileStartBtn = document.getElementById('mobile-start-btn');
  var mobileResetBtn = document.getElementById('mobile-reset-btn');
  var mobileStatus = document.getElementById('mobile-status');
  var mobileScore = document.getElementById('mobile-score');
  var mobileBallsLeft = document.getElementById('mobile-balls-left');

  var renderMode = '2d';
  var scene3d = null;

  var BASE_LOGIC_W = 760;
  var BASE_LOGIC_H = 420;
  var NARROW_LOGIC_W = 420;
  var NARROW_LOGIC_H = 280;
  var NARROW_BREAKPOINT = 500;

  var LOGIC_W = BASE_LOGIC_W;
  var LOGIC_H = BASE_LOGIC_H;
  var RAIL_W = 24;
  var TABLE_X = RAIL_W;
  var TABLE_Y = RAIL_W;
  var TABLE_W = LOGIC_W - RAIL_W * 2;
  var TABLE_H = LOGIC_H - RAIL_W * 2;
  var BALL_R = 11;
  var POCKET_R = 16;
  var POCKET_SNAP = POCKET_R - 2;
  var FRICTION = 0.985;
  var STOP_THRESHOLD = 0.08;
  var MAX_DRAG = 150;
  var MAX_SPEED = 18;
  var POCKETS = [];

  var BALL_COLORS = [
    '#f5c800', '#003caa', '#c80000', '#7b0080', '#ff6000',
    '#006a1c', '#8b1000', '#1a1a1a', '#f5c800', '#003caa',
    '#c80000', '#7b0080', '#ff6000', '#006a1c', '#8b1000'
  ];

  var state = 'idle';
  var balls = [];
  var score = 0;
  var aimStart = null;
  var aimCurrent = null;
  var scale = 1;

  function computeLayout(availW) {
    if (availW < NARROW_BREAKPOINT) {
      LOGIC_W = NARROW_LOGIC_W;
      LOGIC_H = NARROW_LOGIC_H;
      BALL_R = 14;
      POCKET_R = 19;
    } else {
      LOGIC_W = BASE_LOGIC_W;
      LOGIC_H = BASE_LOGIC_H;
      BALL_R = 11;
      POCKET_R = 16;
    }
    RAIL_W = Math.round(LOGIC_W * 0.032);
    TABLE_X = RAIL_W;
    TABLE_Y = RAIL_W;
    TABLE_W = LOGIC_W - RAIL_W * 2;
    TABLE_H = LOGIC_H - RAIL_W * 2;
    POCKET_SNAP = POCKET_R - 2;
    POCKETS = [
      { x: TABLE_X + POCKET_R, y: TABLE_Y + POCKET_R },
      { x: TABLE_X + TABLE_W / 2, y: TABLE_Y },
      { x: TABLE_X + TABLE_W - POCKET_R, y: TABLE_Y + POCKET_R },
      { x: TABLE_X + POCKET_R, y: TABLE_Y + TABLE_H - POCKET_R },
      { x: TABLE_X + TABLE_W / 2, y: TABLE_Y + TABLE_H },
      { x: TABLE_X + TABLE_W - POCKET_R, y: TABLE_Y + TABLE_H - POCKET_R }
    ];
  }

  function createBalls() {
    var b = [];
    var cx = TABLE_X + TABLE_W * 0.66;
    var cy = TABLE_Y + TABLE_H / 2;
    var spacing = BALL_R * 2.12;
    var idx = 0;
    for (var row = 0; row < 5; row++) {
      for (var col = 0; col <= row; col++) {
        b.push({
          id: idx + 1,
          x: cx + row * spacing * 0.866,
          y: cy - row * spacing / 2 + col * spacing,
          vx: 0, vy: 0,
          color: BALL_COLORS[idx % BALL_COLORS.length],
          solid: idx < 8,
          pocketed: false,
          isCue: false
        });
        idx++;
      }
    }
    b.push({
      id: 0,
      x: TABLE_X + TABLE_W * 0.28,
      y: TABLE_Y + TABLE_H / 2,
      vx: 0, vy: 0,
      color: '#f5f5f0',
      pocketed: false,
      isCue: true
    });
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
      if (!b.pocketed && (Math.abs(b.vx) > STOP_THRESHOLD || Math.abs(b.vy) > STOP_THRESHOLD)) return false;
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
    var parent = canvas.parentElement;
    var availW = (parent && parent.clientWidth) || BASE_LOGIC_W;
    computeLayout(availW);
    scale = availW / LOGIC_W;
    var dpr = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = Math.round(LOGIC_W * scale * dpr);
    canvas.height = Math.round(LOGIC_H * scale * dpr);
    ctx.setTransform(scale * dpr, 0, 0, scale * dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
  }

  function toLogical(clientX, clientY) {
    var rect;
    var scaleX, scaleY;
    if (renderMode === '3d' && threeContainer && !threeContainer.hidden) {
      var el = (scene3d && scene3d.renderer && scene3d.renderer.domElement) ? scene3d.renderer.domElement : threeContainer;
      rect = el.getBoundingClientRect();
      scaleX = rect.width / LOGIC_W;
      scaleY = rect.height / LOGIC_H;
      return {
        x: (clientX - rect.left) / scaleX,
        y: (clientY - rect.top) / scaleY
      };
    }
    rect = (wrap && wrap.getBoundingClientRect) ? wrap.getBoundingClientRect() : canvas.getBoundingClientRect();
    return {
      x: (clientX - rect.left) / scale,
      y: (clientY - rect.top) / scale
    };
  }

  function isAimCurrentValid() {
    return aimCurrent &&
      typeof aimCurrent.x === 'number' && typeof aimCurrent.y === 'number' &&
      !isNaN(aimCurrent.x) && !isNaN(aimCurrent.y);
  }

  function drawTable() {
    ctx.fillStyle = getCss('--billiards-rail') || '#5c3b1e';
    ctx.beginPath();
    ctx.roundRect(0, 0, LOGIC_W, LOGIC_H, 5);
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
    var grad = ctx.createRadialGradient(
      b.x - BALL_R * 0.3, b.y - BALL_R * 0.35, BALL_R * 0.1,
      b.x, b.y, BALL_R
    );
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

  function drawArrow(ctx, x1, y1, x2, y2, color, lineW, headLen) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 2) return;
    var angle = Math.atan2(dy, dx);
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineW;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(
      x2 - headLen * Math.cos(angle - Math.PI / 6),
      y2 - headLen * Math.sin(angle - Math.PI / 6)
    );
    ctx.moveTo(x2, y2);
    ctx.lineTo(
      x2 - headLen * Math.cos(angle + Math.PI / 6),
      y2 - headLen * Math.sin(angle + Math.PI / 6)
    );
    ctx.stroke();
    ctx.restore();
  }

  function drawAimLine(cue) {
    if (!aimStart || !aimCurrent || !isAimCurrentValid()) return;
    var dx = aimStart.x - aimCurrent.x;
    var dy = aimStart.y - aimCurrent.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 4) return;

    var nx = dx / dist;
    var ny = dy / dist;
    var projLen = Math.min(dist * 2.8, LOGIC_W * 0.55);
    var ex = cue.x + nx * projLen;
    var ey = cue.y + ny * projLen;

    drawArrow(ctx, cue.x, cue.y, ex, ey, 'rgba(255,255,255,0.75)', 2, BALL_R * 0.8);

    ctx.save();
    ctx.strokeStyle = 'rgba(255,180,50,0.65)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.moveTo(aimStart.x, aimStart.y);
    ctx.lineTo(aimCurrent.x, aimCurrent.y);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255,255,255,0.35)';
    ctx.lineWidth = 2.5;
    ctx.arc(cue.x, cue.y, BALL_R + 3, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  function render() {
    ctx.clearRect(0, 0, LOGIC_W, LOGIC_H);
    drawTable();
    var cue = getCueBall();
    if (state !== 'idle' && cue && aimStart && isAimCurrentValid()) {
      drawAimLine(cue);
    }
    activeBalls().forEach(function (b) { drawBall(b); });
  }

  function init3D() {
    if (typeof THREE === 'undefined' || !threeContainer) return;
    try {
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(46, wrap.clientWidth / wrap.clientHeight, 1, 4000);
      camera.up.set(0, 1, 0);

      var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setSize(wrap.clientWidth, wrap.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setClearColor(getCss('--billiards-rail') || 0x5c3b1e, 1);
      threeContainer.appendChild(renderer.domElement);

      var ambient = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambient);
      var dir = new THREE.DirectionalLight(0xffffff, 0.8);
      dir.position.set(LOGIC_W / 2, 400, LOGIC_H / 2);
      scene.add(dir);

      var feltColor = (getCss('--billiards-felt') || '#1a5c2a').replace('#', '0x');
      var railColor = (getCss('--billiards-rail') || '#5c3b1e').replace('#', '0x');
      var pocketColor = (getCss('--billiards-pocket') || '#0a0a0a').replace('#', '0x');

      var tableGroup = new THREE.Group();
      var feltGeom = new THREE.PlaneGeometry(TABLE_W, TABLE_H);
      var feltMat = new THREE.MeshLambertMaterial({ color: parseInt(feltColor, 16) });
      var felt = new THREE.Mesh(feltGeom, feltMat);
      felt.rotation.x = -Math.PI / 2;
      felt.position.set(TABLE_X + TABLE_W / 2, 0, TABLE_Y + TABLE_H / 2);
      tableGroup.add(felt);

      var railH = 8;
      var railGeom = new THREE.BoxGeometry(LOGIC_W, railH, RAIL_W);
      var railMat = new THREE.MeshLambertMaterial({ color: parseInt(railColor, 16) });
      var railTop = new THREE.Mesh(railGeom, railMat);
      railTop.position.set(LOGIC_W / 2, railH / 2, RAIL_W / 2);
      tableGroup.add(railTop);
      var railBottom = new THREE.Mesh(railGeom, railMat);
      railBottom.position.set(LOGIC_W / 2, railH / 2, LOGIC_H - RAIL_W / 2);
      tableGroup.add(railBottom);
      var railSideGeom = new THREE.BoxGeometry(RAIL_W, railH, TABLE_H);
      var railLeft = new THREE.Mesh(railSideGeom, railMat);
      railLeft.position.set(RAIL_W / 2, railH / 2, LOGIC_H / 2);
      tableGroup.add(railLeft);
      var railRight = new THREE.Mesh(railSideGeom, railMat);
      railRight.position.set(LOGIC_W - RAIL_W / 2, railH / 2, LOGIC_H / 2);
      tableGroup.add(railRight);
      scene.add(tableGroup);

      var pocketGeom = new THREE.SphereGeometry(POCKET_R, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2);
      var pocketMat = new THREE.MeshLambertMaterial({ color: parseInt(pocketColor, 16) });
      POCKETS.forEach(function (p) {
        var pocket = new THREE.Mesh(pocketGeom.clone(), pocketMat.clone());
        pocket.position.set(p.x, POCKET_R / 2, p.y);
        pocket.rotation.x = Math.PI / 2;
        scene.add(pocket);
      });

      var ballMeshes = [];
      var ballGeom = new THREE.SphereGeometry(BALL_R, 16, 16);
      function ensureBallMeshes() {
        var active = activeBalls();
        while (ballMeshes.length < active.length) {
          var mat = new THREE.MeshLambertMaterial({ color: 0xffffff });
          var mesh = new THREE.Mesh(ballGeom.clone(), mat);
          scene.add(mesh);
          ballMeshes.push(mesh);
        }
        while (ballMeshes.length > active.length) {
          var m = ballMeshes.pop();
          scene.remove(m);
        }
      }
      var aimLine = null;
      scene3d = {
        scene: scene,
        camera: camera,
        renderer: renderer,
        ballMeshes: ballMeshes,
        ensureBallMeshes: ensureBallMeshes,
        aimLine: aimLine
      };
      sync3DViewport();
    } catch (e) {
      console.warn('3D init failed', e);
      scene3d = null;
    }
  }

  function sync3DViewport() {
    if (!scene3d || !scene3d.renderer || !scene3d.camera || !wrap) return;
    var viewW = Math.max(wrap.clientWidth || 0, 1);
    var viewH = Math.max(wrap.clientHeight || 0, 1);
    scene3d.renderer.setSize(viewW, viewH);
    scene3d.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    scene3d.camera.aspect = viewW / viewH;
    fit3DCameraToTable(scene3d.camera);
    scene3d.camera.updateProjectionMatrix();
  }

  function fit3DCameraToTable(camera) {
    // Use a bounding-sphere fit so table + rails + pockets remain visible in all aspect ratios.
    var centerX = LOGIC_W / 2;
    var centerZ = LOGIC_H / 2;
    var safeHalfW = LOGIC_W / 2 + RAIL_W + POCKET_R + BALL_R;
    var safeHalfH = LOGIC_H / 2 + RAIL_W + POCKET_R + BALL_R;
    var radius = Math.sqrt(safeHalfW * safeHalfW + safeHalfH * safeHalfH);
    var vFov = THREE.MathUtils.degToRad(camera.fov);
    var hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect);
    var limitingFov = Math.max(Math.min(vFov, hFov), 0.25);
    var dist = radius / Math.sin(limitingFov / 2);
    var dir = new THREE.Vector3(0, 1.05, 1.08).normalize();
    camera.position.set(
      centerX + dir.x * dist,
      BALL_R * 0.8 + dir.y * dist,
      centerZ + dir.z * dist
    );
    camera.near = Math.max(1, dist * 0.05);
    camera.far = dist * 8;
    camera.lookAt(centerX, 0, centerZ);
  }

  function dispose3D() {
    if (!scene3d) return;
    if (scene3d.renderer && scene3d.renderer.domElement && scene3d.renderer.domElement.parentNode) {
      scene3d.renderer.domElement.parentNode.removeChild(scene3d.renderer.domElement);
    }
    if (scene3d.renderer && scene3d.renderer.dispose) scene3d.renderer.dispose();
    scene3d = null;
  }

  function rebuild3DScene() {
    dispose3D();
    if (renderMode === '3d') {
      init3D();
      if (scene3d) sync3DViewport();
    }
  }

  function render3D() {
    if (!scene3d || !scene3d.renderer || !threeContainer || threeContainer.hidden) return;
    var s = scene3d;
    s.ensureBallMeshes();
    var active = activeBalls();
    var feltColor = (getCss('--billiards-felt') || '#1a5c2a').replace('#', '0x');
    active.forEach(function (b, i) {
      var mesh = s.ballMeshes[i];
      if (!mesh) return;
      mesh.position.set(b.x, BALL_R, b.y);
      mesh.visible = true;
      var col = b.color.replace('#', '0x');
      if (mesh.material.color.getHexString) {
        mesh.material.color.setHex(parseInt(col, 16));
      } else {
        mesh.material.color.setHex(parseInt(col, 16));
      }
    });
    for (var j = active.length; j < s.ballMeshes.length; j++) {
      s.ballMeshes[j].visible = false;
    }
    if (s.aimLine) s.scene.remove(s.aimLine);
    var cue = getCueBall();
    if (state !== 'idle' && cue && aimStart && isAimCurrentValid()) {
      var dx = aimStart.x - aimCurrent.x;
      var dy = aimStart.y - aimCurrent.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist >= 4) {
        var nx = dx / dist;
        var ny = dy / dist;
        var len = Math.min(dist * 2.8, LOGIC_W * 0.55);
        var geom = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(cue.x, BALL_R, cue.y),
          new THREE.Vector3(cue.x + nx * len, BALL_R, cue.y + ny * len)
        ]);
        var mat = new THREE.LineBasicMaterial({ color: 0xffffff });
        s.aimLine = new THREE.Line(geom, mat);
        s.scene.add(s.aimLine);
      }
    }
    s.renderer.render(s.scene, s.camera);
  }

  function setRenderMode(mode) {
    renderMode = mode;
    if (!wrap || !threeContainer) return;
    if (mode === '3d') {
      if (typeof THREE === 'undefined') {
        if (view3dBtn) view3dBtn.disabled = true;
        renderMode = '2d';
        return;
      }
      canvas.style.visibility = 'hidden';
      canvas.style.pointerEvents = 'none';
      threeContainer.hidden = false;
      if (!scene3d) init3D();
      sync3DViewport();
      requestAnimationFrame(sync3DViewport);
    } else {
      canvas.style.visibility = '';
      canvas.style.pointerEvents = '';
      threeContainer.hidden = true;
    }
    if (view2dBtn) {
      view2dBtn.classList.toggle('is-active', mode === '2d');
      view2dBtn.setAttribute('aria-pressed', mode === '2d');
    }
    if (view3dBtn) {
      view3dBtn.classList.toggle('is-active', mode === '3d');
      view3dBtn.setAttribute('aria-pressed', mode === '3d');
    }
  }

  function updatePowerBar(pct) {
    if (!powerFill) return;
    var w = Math.min(Math.max(pct, 0), 1) * 100;
    powerFill.style.width = w + '%';
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

      if (b.x - BALL_R < TABLE_X) { b.x = TABLE_X + BALL_R; b.vx = Math.abs(b.vx) * 0.9; }
      if (b.x + BALL_R > TABLE_X + TABLE_W) { b.x = TABLE_X + TABLE_W - BALL_R; b.vx = -Math.abs(b.vx) * 0.9; }
      if (b.y - BALL_R < TABLE_Y) { b.y = TABLE_Y + BALL_R; b.vy = Math.abs(b.vy) * 0.9; }
      if (b.y + BALL_R > TABLE_Y + TABLE_H) { b.y = TABLE_Y + TABLE_H - BALL_R; b.vy = -Math.abs(b.vy) * 0.9; }
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
            b.vx = 0; b.vy = 0;
          } else {
            b.pocketed = true;
            b.vx = 0; b.vy = 0;
            score++;
            syncStatus();
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
    a.vx += impulse * nx; a.vy += impulse * ny;
    b.vx -= impulse * nx; b.vy -= impulse * ny;
  }

  var lastTs = 0;
  function loop(ts) {
    requestAnimationFrame(loop);
    var dt = ts - lastTs;
    lastTs = ts;
    if (dt > 100) {
      if (renderMode === '3d' && scene3d) render3D(); else render();
      return;
    }

    if (state === 'playing' || state === 'moving') {
      updatePhysics();
      if (state === 'moving' && allStopped()) {
        if (coloredLeft() === 0) {
          state = 'won';
          showOverlay('🎉 通关！', '全部彩球已进袋！点击"重新开始"再来一局。');
          syncStatus();
          startBtn.textContent = '再来一局';
          if (mobileStartBtn) mobileStartBtn.textContent = '再来一局';
        } else {
          state = 'playing';
          syncStatus();
        }
      }
    }
    if (renderMode === '3d' && scene3d) render3D(); else render();
  }

  function getAimDirection() {
    if (!aimStart || !aimCurrent) return null;
    // Reverse-shot rule: cue ball goes opposite to drag direction.
    var dx = aimStart.x - aimCurrent.x;
    var dy = aimStart.y - aimCurrent.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 1e-6) return null;
    return { dx: dx / dist, dy: dy / dist };
  }

  function hitCueBall() {
    if (!aimStart || !aimCurrent || !isAimCurrentValid()) return;
    var cue = getCueBall();
    if (!cue) return;

    var dragDx = aimCurrent.x - aimStart.x;
    var dragDy = aimCurrent.y - aimStart.y;
    var dragDist = Math.sqrt(dragDx * dragDx + dragDy * dragDy);
    if (dragDist < 4) return;

    var dir = getAimDirection();
    if (!dir) return;

    var power = Math.min(dragDist, MAX_DRAG) / MAX_DRAG;
    var speed = power * MAX_SPEED;
    cue.vx = dir.dx * speed;
    cue.vy = dir.dy * speed;

    state = 'moving';
    syncStatus();
    updatePowerBar(0);
  }

  function syncStatus() {
    var left = coloredLeft();
    var statusText = state === 'won' ? '通关 🎉' : state === 'moving' ? '球在运动中…' : '准备击球';
    if (statusEl) statusEl.textContent = statusText;
    if (scoreEl) scoreEl.textContent = String(score);
    if (ballsLeftEl) ballsLeftEl.textContent = String(left);
    if (mobileStatus) mobileStatus.textContent = statusText;
    if (mobileScore) mobileScore.textContent = String(score);
    if (mobileBallsLeft) mobileBallsLeft.textContent = String(left);
  }

  function startGame() {
    balls = createBalls();
    score = 0;
    state = 'playing';
    aimStart = null;
    aimCurrent = null;
    updatePowerBar(0);
    hideOverlay();
    startBtn.textContent = '重新开始';
    if (mobileStartBtn) mobileStartBtn.textContent = '重新开始';
    syncStatus();
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
    var x, y;
    if (e.touches && e.touches.length > 0) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    } else if (e.changedTouches && e.changedTouches.length > 0) {
      x = e.changedTouches[0].clientX;
      y = e.changedTouches[0].clientY;
    } else {
      x = e.clientX;
      y = e.clientY;
    }
    return toLogical(x, y);
  }

  function onPointerDown(e) {
    if (state !== 'playing') return;
    var cue = getCueBall();
    if (!cue) return;
    var pos = getEventPos(e);
    aimStart = { x: pos.x, y: pos.y };
    aimCurrent = { x: pos.x, y: pos.y };
    e.preventDefault();
  }

  function onPointerMove(e) {
    if (!aimStart) return;
    aimCurrent = getEventPos(e);
    var dx = aimCurrent.x - aimStart.x;
    var dy = aimCurrent.y - aimStart.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    updatePowerBar(dist / MAX_DRAG);
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
    showOverlay('台球', '在球桌上任意位置拖拽来瞄准，松手击球。');
    startBtn.textContent = '开始游戏';
    if (mobileStartBtn) mobileStartBtn.textContent = '开始游戏';
    startBtn.addEventListener('click', startGame);
    resetBtn.addEventListener('click', startGame);
    if (mobileStartBtn) mobileStartBtn.addEventListener('click', startGame);
    if (mobileResetBtn) mobileResetBtn.addEventListener('click', startGame);

    var stage = wrap || canvas;
    stage.addEventListener('mousedown', onPointerDown);
    stage.addEventListener('mousemove', onPointerMove);
    stage.addEventListener('mouseup', onPointerUp);
    stage.addEventListener('touchstart', onPointerDown, { passive: false });
    stage.addEventListener('touchmove', onPointerMove, { passive: false });
    stage.addEventListener('touchend', onPointerUp, { passive: false });

    if (view2dBtn) view2dBtn.addEventListener('click', function () { setRenderMode('2d'); });
    if (view3dBtn) {
      view3dBtn.addEventListener('click', function () {
        if (typeof THREE === 'undefined') return;
        setRenderMode('3d');
      });
      if (typeof THREE === 'undefined') {
        view3dBtn.disabled = true;
        view3dBtn.title = '3D 不可用（需加载 Three.js）';
      }
    }

    function onViewportChange() {
      var prevW = LOGIC_W;
      resizeCanvas();
      if (scene3d) sync3DViewport();
      if (aimStart !== null) render();
      if (prevW !== LOGIC_W) {
        balls = createBalls();
        if (scene3d) rebuild3DScene();
      }
      if (renderMode === '3d' && scene3d) render3D(); else render();
    }

    window.addEventListener('resize', onViewportChange);
    window.addEventListener('orientationchange', function () {
      requestAnimationFrame(onViewportChange);
    });

    requestAnimationFrame(loop);
    syncStatus();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
