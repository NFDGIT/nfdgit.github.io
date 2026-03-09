/**
 * 扫描 projects/note 目录，生成树形 manifest.json
 * 用法: node scripts/generate-note-manifest.js
 */

const fs = require('fs');
const path = require('path');

const NOTE_DIR = path.join(__dirname, '..', 'note');
const OUTPUT_JSON = path.join(NOTE_DIR, 'manifest.json');
const OUTPUT_JS = path.join(NOTE_DIR, 'manifest.js');
const EXCLUDE = ['index.html', 'manifest.json', 'manifest.js'];

function scanDir(dirPath, basePath = '') {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const children = [];

  const dirs = entries.filter((e) => e.isDirectory()).sort();
  const files = entries
    .filter((e) => e.isFile() && (e.name.endsWith('.md') || e.name.endsWith('.html')) && !EXCLUDE.includes(e.name))
    .sort();

  for (const d of dirs) {
    const fullPath = path.join(dirPath, d.name);
    const relPath = basePath ? `${basePath}/${d.name}` : d.name;
    children.push({
      name: d.name,
      type: 'dir',
      children: scanDir(fullPath, relPath),
    });
  }

  for (const f of files) {
    const relPath = basePath ? `${basePath}/${f.name}` : f.name;
    const fullPath = path.join(dirPath, f.name);
    const node = { name: f.name, type: 'file', path: relPath };
    if (f.name.endsWith('.md') || f.name.endsWith('.html')) {
      try {
        node.content = fs.readFileSync(fullPath, 'utf8');
      } catch (err) {
        node.content = '';
      }
    }
    children.push(node);
  }

  return children;
}

function main() {
  const tree = { children: scanDir(NOTE_DIR) };
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(tree, null, 2), 'utf8');
  fs.writeFileSync(OUTPUT_JS, 'window.NOTE_MANIFEST = ' + JSON.stringify(tree) + ';', 'utf8');
  console.log('manifest.json and manifest.js generated at', NOTE_DIR);
}

main();
