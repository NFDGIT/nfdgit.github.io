/**
 * 校验 sw.js 的 CORE_ASSETS 与首页实际引用的资源是否同步
 * 用法: node scripts/verify-sw-cache.js
 *
 * - 解析 index.html 中的 <link rel="stylesheet" href> 与 <script src>
 * - 与 sw.js 的 CORE_ASSETS 数组比对
 * - 漂移时返回非零退出码（适合接入 CI）
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const INDEX_HTML = path.join(ROOT, 'index.html');
const SW_JS = path.join(ROOT, 'sw.js');

function normalize(href) {
  return href.replace(/^\.\//, '/').replace(/^\/+/, '/');
}

function extractFromIndex() {
  const html = fs.readFileSync(INDEX_HTML, 'utf8');
  const refs = new Set();

  const linkRe = /<link[^>]+href=["']([^"']+\.css)["']/g;
  const scriptRe = /<script[^>]+src=["']([^"']+\.js)["']/g;

  let m;
  while ((m = linkRe.exec(html))) refs.add(normalize(m[1]));
  while ((m = scriptRe.exec(html))) refs.add(normalize(m[1]));

  return refs;
}

function extractFromSw() {
  const src = fs.readFileSync(SW_JS, 'utf8');
  const match = src.match(/CORE_ASSETS\s*=\s*\[([\s\S]*?)\]/);
  if (!match) throw new Error('在 sw.js 中未找到 CORE_ASSETS 数组');

  const items = new Set();
  const itemRe = /['"]([^'"]+)['"]/g;
  let m;
  while ((m = itemRe.exec(match[1]))) items.add(m[1]);
  return items;
}

function main() {
  const fromIndex = extractFromIndex();
  const fromSw = extractFromSw();

  const missing = [...fromIndex].filter(p => !fromSw.has(p));
  const stale = [...fromSw]
    .filter(p => p.endsWith('.css') || p.endsWith('.js'))
    .filter(p => !fromIndex.has(p))
    // 允许 SW 单独维护的非首页资源（offline.html 兜底页、运行时按需加载的模块）
    .filter(p => !/legacy\.js$|theme-init\.js$|core\/|utils\/|offline\.html$/.test(p));

  if (missing.length === 0 && stale.length === 0) {
    console.log('✓ sw.js CORE_ASSETS 与 index.html 同步');
    return 0;
  }

  if (missing.length) {
    console.error('✗ index.html 引用但 CORE_ASSETS 缺失:');
    missing.forEach(p => console.error('  - ' + p));
  }
  if (stale.length) {
    console.error('✗ CORE_ASSETS 中可能已废弃的条目:');
    stale.forEach(p => console.error('  - ' + p));
  }
  return 1;
}

process.exit(main());
