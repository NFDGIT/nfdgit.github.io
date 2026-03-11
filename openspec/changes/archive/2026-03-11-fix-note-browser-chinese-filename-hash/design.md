# 笔记浏览器中文文件名 hash 修复 — 设计

## Context

笔记页用 `location.hash` 存当前文件路径（如 `#Flutter/底层原理.md`），点击时设置 hash 并调用 `loadFileByPath(node.path)`；同时监听 `hashchange`，在回调里用 `getFileFromHash()` 取 path 再 `loadFileByPath(p)`。manifest 中 `node.path` 为未编码路径。部分环境下从 `location.hash.slice(1)` 得到的是已编码字符串，导致 path 不一致、查找失败、fetch 双重编码。

## Goals / Non-Goals

**Goals:**

- 从 hash 读出的 path 与 manifest 中 path 一致（统一为「逻辑 path」，未编码形式），使 `findNodeByPath` 与 fetch URL 构建正确。
- 首次点击中文（或其它非 ASCII）文件名即可打开，无需二次点击。

**Non-Goals:**

- 不改变 manifest 结构或生成脚本；不改变点击时传入的 path 来源；不引入新依赖。

## Decisions

1. **在 getFileFromHash() 中解码**  
   对 `location.hash.slice(1)` 的结果做 `decodeURIComponent`；若解码抛异常（如含非法序列）则退回原字符串，避免破坏含 `%` 的罕见文件名。返回前仍过滤空串与含 `#` 的非法 hash。

2. **不改为存编码 hash**  
   当前点击处使用 `location.hash = node.path`（未编码）；若改为存编码则需同步改预览内链拦截等所有写 hash 的地方。仅读时解码即可达到 path 一致，改动最小。

3. **fetch 逻辑不变**  
   `loadFileByPath` 收到的 path 统一为逻辑 path 后，现有 `path.split('/').map(encodeURIComponent).join('/')` 只做一次编码，正确。

## Risks / Trade-offs

- **[取舍]** 文件名本身含 `%` 时，decodeURIComponent 可能误解；此类文件名极少，且当前未编码存 hash 时本就不会出现 `%`。若未来支持，可考虑「仅当 hash 中含 `%` 才解码」等策略，本次不必须。
