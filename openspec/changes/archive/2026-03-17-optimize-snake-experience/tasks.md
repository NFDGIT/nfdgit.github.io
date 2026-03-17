## 1. 触摸滑动手势操控

- [x] 1.1 在 `snake.css` 中为 `.snake-canvas-wrap` 添加 `touch-action: none` 阻止画布区域页面滚动
- [x] 1.2 在 `snake.js` 的 `bindEvents` 中为画布容器注册 `touchstart` 和 `touchend` 事件监听
- [x] 1.3 实现滑动方向计算：取 touchend - touchstart 的位移，忽略距离 < 30px 的手势，对角线取绝对值较大轴
- [x] 1.4 滑动识别结果调用 `queueDirection()`，复用现有方向队列和反向保护逻辑
- [x] 1.5 处理非运行状态下的滑动：idle/gameover 时滑动触发 `startFreshGame(direction)`

## 2. 难度递进机制

- [x] 2.1 将 `STEP_MS` 改为运行时可变量，新增常量 `BASE_STEP_MS = 160`、`SPEED_INCREMENT = 3`、`MIN_STEP_MS = 70`
- [x] 2.2 新增 `getCurrentStepMs()` 函数：返回 `Math.max(BASE_STEP_MS - game.score * SPEED_INCREMENT, MIN_STEP_MS)`
- [x] 2.3 修改 `loop()` 中的 accumulator 比较，将固定 `STEP_MS` 替换为 `getCurrentStepMs()` 的返回值
- [x] 2.4 在 `startFreshGame()` 中确保 score 重置为 0（已有），速度自然回到基准值

## 3. 蛇身平滑移动插值

- [x] 3.1 在 `render()` 中计算插值因子 `t = accumulator / getCurrentStepMs()`，clamp 到 [0, 1]
- [x] 3.2 记录蛇头上一帧的逻辑位置（`prevSnakePositions`），每次 `update()` 前保存当前蛇的位置快照
- [x] 3.3 修改 `drawSnakeSegment()` 接收插值后的坐标：蛇头位置 = prevPos + (currentPos - prevPos) * t
- [x] 3.4 身体各段同样做插值：每段用前一帧自身位置和当前位置做 lerp

## 4. 食物脉冲动画

- [x] 4.1 在 `render()` 或 `drawFood()` 中使用 `performance.now()` 或传入的 timestamp 计算脉冲因子
- [x] 4.2 食物半径乘以脉冲因子 `0.85 + 0.15 * (0.5 + 0.5 * sin(time * 0.004))`，实现缓慢呼吸效果

## 5. 吃食物粒子爆炸动画

- [x] 5.1 定义粒子数据结构：`{ x, y, vx, vy, alpha, life }` 和全局粒子数组 `particles`
- [x] 5.2 新增 `spawnParticles(cellX, cellY)` 函数：在食物网格位置生成 8-12 个随机方向粒子
- [x] 5.3 在 `update()` 中蛇吃到食物后调用 `spawnParticles(food.x, food.y)`
- [x] 5.4 新增 `updateParticles(dt)` 函数：更新粒子位置、衰减 alpha、移除 life <= 0 的粒子
- [x] 5.5 新增 `drawParticles(cellSize)` 函数：用食物颜色 CSS 变量绘制半透明圆形粒子
- [x] 5.6 在 `render()` 末尾调用 `drawParticles()`，在 `loop()` 中调用 `updateParticles(dt)`

## 6. 死亡反馈动画

- [x] 6.1 在 `snake.css` 中定义 `@keyframes shake` 关键帧动画和 `.is-shaking` 类
- [x] 6.2 修改 `endGame()` 函数：设置死亡动画状态 `game.status = 'dying'`，不立即显示 overlay
- [x] 6.3 在 `loop()` 中处理 `dying` 状态：蛇身交替显示/隐藏实现闪烁，画布容器添加 shake 类
- [x] 6.4 闪烁 2-3 次后（约 400-500ms）将状态切换为 `gameover`，移除 shake 类，显示结束 overlay
