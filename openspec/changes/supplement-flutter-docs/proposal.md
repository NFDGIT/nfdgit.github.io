## Why

站点已有 Flutter 专题（底层原理、面试、高阶用法），读者与复习场景下仍会需要更多主题或更细的考点覆盖。继续补充 Flutter 相关文档可提升笔记的查全率与实用性，且与现有「网络对比择优、生动简练」的约定一致。

## What Changes

- 在 `note/Flutter/` 下**补充**文档内容：在现有「底层原理」「面试-原理 / 面试-实践」「高阶用法」中增加若干新小节、考点或例题；和/或新增独立文档（如**工程实践**：CI/CD、发布与渠道、版本管理；**调试与排错**：DevTools、常见崩溃与排查；**包与插件**：选包、发布、本地依赖等），并在 README 中增加导航。
- 补充内容须保持与现有文风一致：生动形象、言简意赅，可参考官方文档与优质社区资料；不降低已有文档的可读性。
- 若新增独立 md 文件，需运行 `scripts/generate-note-manifest.js` 以更新笔记浏览器目录。

## Capabilities

### New Capabilities

- 无

### Modified Capabilities

- `flutter-note-doc`：在现有「目录存在、分类文档、内容择优、体量要求」基础上，约定 Flutter 笔记须支持「继续补充」——即允许并鼓励在既有文档中增加小节/考点/例题，及可选的新增主题文档（如工程实践、调试排错、包与插件），并在 README 中提供入口；补充后仍须满足内容择优与文风简练。

## Impact

- **note/Flutter/**：现有 md 文件内容增补；可选新增 1～3 个 md（如 `工程实践.md`、`调试与排错.md`、`包与插件.md`）及 README 导航更新。
- **scripts/generate-note-manifest.js**：若新增文件则需执行一次以更新 manifest。
- **openspec/specs/flutter-note-doc/spec.md**：通过 delta 增加或调整与「补充」相关的需求描述。
