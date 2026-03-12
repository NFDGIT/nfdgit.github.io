## 1. 现有文档补充

- [x] 1.1 在 `note/Flutter/底层原理.md` 中增加一小节「常见坑与排查」（如 setState 时机、build 里创建对象、列表不用 builder 等），保持与现有小节风格一致，言简意赅
- [x] 1.2 在 `note/Flutter/面试-原理.md` 或 `note/Flutter/面试-实践.md` 中增加至少 3～5 道新题及要点（可来自渲染、Dart、状态管理、工程实践等），按现有分类插入或新开小标题
- [x] 1.3 在 `note/Flutter/高阶用法.md` 中增加「发布与 CI 要点」或「工程实践速查」（如 build 模式、渠道包、版本号、常见 CI 步骤），保持列表/表格形式、简练

## 2. 可选：新增主题文档

- [x] 2.1 若需新增独立文档：在 `note/Flutter/` 下新增 `工程实践.md` 或 `调试与排错.md`（二选一或两者皆做），内容涵盖 CI/CD、发布渠道、DevTools 使用、常见崩溃与排查等中的若干项，结构清晰、文风与现有文档一致；并在 `note/Flutter/README.md` 的导航表格中增加对应链接与简短说明

## 3. 收尾

- [x] 3.1 运行 `node scripts/generate-note-manifest.js`，确认笔记浏览器中 Flutter 目录及新增/修改文件均能正确展示
