## ADDED Requirements

### Requirement: 游戏速度随分数递进加快

系统 SHALL 根据当前得分动态调整蛇的移动速度，分数越高蛇移动越快，提供递进式的挑战体验。

#### Scenario: 游戏开始时速度为基准值

- **WHEN** 新游戏开始时分数为 0
- **THEN** 蛇的移动间隔 SHALL 为 160ms（基准速度）

#### Scenario: 每吃一个食物速度加快

- **WHEN** 蛇吃到食物使分数增加
- **THEN** 移动间隔 SHALL 减少 3ms（即 `160 - score × 3`），蛇的移动速度加快

#### Scenario: 速度不超过上限

- **WHEN** 计算后的移动间隔低于 70ms
- **THEN** 移动间隔 SHALL 保持在 70ms 下限，不再继续加快

### Requirement: 游戏重新开始时速度重置

系统 SHALL 在每次新游戏开始时将移动速度重置为基准值。

#### Scenario: 玩家重新开始游戏

- **WHEN** 玩家触发重新开始
- **THEN** 移动间隔 SHALL 重置为 160ms 基准速度
