# design-system（变更增量）

## ADDED Requirements

### Requirement: CSS 应提供 inset 属性回退

系统 SHALL 在所有使用 `inset: 0` 的地方同时声明 `top: 0; right: 0; bottom: 0; left: 0` 作为回退，确保旧版 Safari 正确渲染。

#### Scenario: overlay 在旧版 Safari 上正常显示

- **WHEN** 用户在不支持 `inset` 的浏览器打开带 overlay 的页面
- **THEN** overlay SHALL 仍然正确覆盖全屏

### Requirement: blur 函数不应使用 calc

系统 SHALL 不在 `blur()` 函数内使用 `calc()`，改为预计算的固定像素值，确保旧版 Safari 不丢失模糊效果。

#### Scenario: 按钮在旧版 Safari 上有模糊效果

- **WHEN** 用户在旧版 Safari 上查看液态玻璃按钮
- **THEN** 按钮 SHALL 正常显示模糊背景
