/**
 * 台球：数值工具与常量（无 DOM / 无游戏状态）
 */
var BilliardsUtils = (function () {
  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  var BALL_COLORS = [
    '#f5c800', '#003caa', '#c80000', '#7b0080', '#ff6000',
    '#006a1c', '#8b1000', '#1a1a1a', '#f5c800', '#003caa',
    '#c80000', '#7b0080', '#ff6000', '#006a1c', '#8b1000'
  ];

  return {
    clamp: clamp,
    CAMERA_DEFAULT_PITCH: Math.atan2(1.05, 1.08),
    CAMERA_MIN_PITCH: 0.22,
    CAMERA_MAX_PITCH: 1.15,
    CAMERA_ROTATE_SPEED: 0.0055,
    BASE_LOGIC_W: 760,
    BASE_LOGIC_H: 420,
    MOBILE_BREAKPOINT: 700,
    MOBILE_PORTRAIT_MIN_W: 430,
    MOBILE_PORTRAIT_MAX_W: 520,
    MOBILE_LANDSCAPE_MIN_W: 500,
    MOBILE_LANDSCAPE_MAX_W: 620,
    FRICTION: 0.985,
    STOP_THRESHOLD: 0.08,
    MAX_DRAG: 150,
    MAX_SPEED: 18,
    BALL_COLORS: BALL_COLORS,
  };
})();
