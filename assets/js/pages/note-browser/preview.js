/**
 * 笔记浏览器：预览区、hash、面包屑、Markdown/HTML 加载
 */
import { PREVIEW_EL, PLACEHOLDER_EL } from './state.js';

function highlightCodeBlocks() {
  if (typeof hljs !== 'undefined' && PREVIEW_EL) {
    PREVIEW_EL.querySelectorAll('pre code').forEach(function (block) {
      hljs.highlightElement(block);
    });
  }
}

export function syncHljsTheme() {
  var link = document.getElementById('hljs-theme');
  if (!link) return;
  var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  var base = 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/';
  link.href = base + (isDark ? 'github-dark.min.css' : 'github.min.css');
}

new MutationObserver(function () {
  syncHljsTheme();
}).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

function clearPreview() {
  PREVIEW_EL.classList.add('is-switching');
  PREVIEW_EL.innerHTML = '';
  PREVIEW_EL.style.display = 'block';
  var previewPane = PREVIEW_EL.closest('.note-preview');
  if (previewPane) previewPane.scrollTop = 0;
  void PREVIEW_EL.offsetWidth;
  PREVIEW_EL.classList.remove('is-switching');
}

export function setActiveFile(path) {
  var nodes = document.querySelectorAll('.note-tree-node.file');
  var activeNode = null;
  nodes.forEach(function (node) {
    var isActive = node.dataset.path === path;
    node.classList.toggle('active', isActive);
    if (isActive) activeNode = node;
  });
  updateBreadcrumb(path);
  if (activeNode) scrollSidebarToNode(activeNode);
}

function scrollSidebarToNode(node) {
  var sidebar = document.getElementById('note-sidebar');
  if (!sidebar || !node) return;
  requestAnimationFrame(function () {
    var sidebarRect = sidebar.getBoundingClientRect();
    var nodeRect = node.getBoundingClientRect();
    if (nodeRect.top < sidebarRect.top || nodeRect.bottom > sidebarRect.bottom) {
      node.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  });
}

function updateBreadcrumb(path) {
  var bc = document.getElementById('note-breadcrumb');
  if (!bc) return;
  if (!path) {
    bc.innerHTML = '';
    return;
  }
  bc.innerHTML = '';
  var parts = path.split('/');
  parts.forEach(function (p, i) {
    if (i > 0) {
      var sep = document.createElement('span');
      sep.className = 'note-breadcrumb-sep';
      sep.textContent = '›';
      bc.appendChild(sep);
    }
    var isLast = i === parts.length - 1;
    var span = document.createElement('span');
    span.className = isLast ? 'note-breadcrumb-item is-current' : 'note-breadcrumb-item is-clickable';
    span.textContent = p;
    if (!isLast) {
      var folderPath = parts.slice(0, i + 1).join('/');
      span.dataset.folderPath = folderPath;
      span.addEventListener('click', function () {
        navigateBreadcrumbFolder(folderPath);
      });
    }
    bc.appendChild(span);
  });
}

function navigateBreadcrumbFolder(folderPath) {
  var dirNode = document.querySelector('.note-tree-node.dir[data-path="' + folderPath + '"]');
  if (!dirNode) return;
  expandParentDirs(folderPath + '/dummy');
  if (dirNode.dataset.expanded !== 'true') dirNode.click();
  scrollSidebarToNode(dirNode);
  dirNode.focus();
}

export function getFileFromHash() {
  var hash = location.hash.slice(1);
  if (!hash || hash.indexOf('#') !== -1) return null;
  try {
    return decodeURIComponent(hash);
  } catch (e) {
    return hash;
  }
}

function resolveNotePath(currentPath, href) {
  if (!currentPath || !href) return null;
  if (href.charAt(0) === '#' || href.indexOf('://') !== -1) return null;
  var dir = currentPath.split('/').slice(0, -1).join('/');
  var base = dir ? dir + '/' : '';
  var parts = (base + href).split('/');
  var result = [];
  for (var i = 0; i < parts.length; i++) {
    if (parts[i] === '..') result.pop();
    else if (parts[i] !== '.' && parts[i] !== '') result.push(parts[i]);
  }
  return result.join('/');
}

export function initPreviewLinkInterceptor() {
  if (!PREVIEW_EL) return;
  PREVIEW_EL.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a || !a.href) return;
    var href = a.getAttribute('href');
    if (!href) return;
    var lower = href.toLowerCase();

    if (lower.indexOf('://') !== -1) {
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
      return;
    }

    if (href.charAt(0) === '#') return;
    if (!lower.endsWith('.md') && !lower.endsWith('.html')) return;
    var currentPath = getFileFromHash();
    if (!currentPath) return;
    var targetPath = resolveNotePath(currentPath, href);
    if (!targetPath) return;
    e.preventDefault();
    location.hash = targetPath;
  });
}

function findNodeByPath(children, path) {
  if (!children) return null;
  for (var i = 0; i < children.length; i++) {
    var node = children[i];
    if (node.type === 'file' && node.path === path) return node;
    if (node.type === 'dir') {
      var found = findNodeByPath(node.children, path);
      if (found) return found;
    }
  }
  return null;
}

function expandParentDirs(path) {
  var parts = path.split('/');
  if (parts.length <= 1) return;
  var dirNodes = document.querySelectorAll('.note-tree-node.dir');
  for (var i = 1; i < parts.length; i++) {
    var parentPath = parts.slice(0, i).join('/');
    for (var j = 0; j < dirNodes.length; j++) {
      var dirNode = dirNodes[j];
      if (dirNode.dataset.path !== parentPath) continue;
      dirNode.dataset.expanded = 'true';
      var arrow = dirNode.querySelector('.note-tree-arrow');
      if (arrow) arrow.classList.add('expanded');
      var childrenEl = dirNode.nextElementSibling;
      if (childrenEl && childrenEl.classList.contains('note-tree-children')) {
        childrenEl.classList.remove('collapsed');
      }
      break;
    }
  }
}

function loadMarkdown(path, content) {
  PLACEHOLDER_EL.style.display = 'none';
  clearPreview();

  if (content !== undefined && content !== null) {
    setActiveFile(path);
    if (typeof marked !== 'undefined') {
      PREVIEW_EL.innerHTML = marked.parse(content);
    } else {
      PREVIEW_EL.textContent = content;
    }
    highlightCodeBlocks();
    return;
  }

  setActiveFile(path);
  var url = './' + path.split('/').map(encodeURIComponent).join('/');
  PREVIEW_EL.innerHTML = '<p style="color:#999">加载中...</p>';
  fetch(url)
    .then(function (res) {
      if (!res.ok) throw new Error('加载失败');
      return res.text();
    })
    .then(function (text) {
      if (typeof marked !== 'undefined') {
        PREVIEW_EL.innerHTML = marked.parse(text);
      } else {
        PREVIEW_EL.textContent = text;
      }
      highlightCodeBlocks();
    })
    .catch(function () {
      PREVIEW_EL.innerHTML = '<p style="color:#c00">无法加载文件</p>';
    });
}

function getIframeThemeStyle() {
  var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  return '<style>:root{color-scheme:' + (isDark ? 'dark' : 'light') +
    '}body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC",sans-serif;' +
    'color:' + (isDark ? '#f5f5f7' : '#1d1d1f') + ';' +
    'background:' + (isDark ? '#1c1c1e' : '#fff') + ';' +
    'margin:0;padding:1rem;line-height:1.6}</style>';
}

function injectThemeIntoSrcdoc(html) {
  var themeStyle = getIframeThemeStyle();
  if (html.indexOf('<head') !== -1) {
    return html.replace(/<head([^>]*)>/, '<head$1>' + themeStyle);
  }
  return themeStyle + html;
}

function createPreviewIframe(html) {
  var iframe = document.createElement('iframe');
  iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts');
  iframe.style.cssText = 'width:100%;height:80vh;min-height:400px;border:none;border-radius:8px;background:var(--note-preview-bg);';
  iframe.srcdoc = injectThemeIntoSrcdoc(html);
  return iframe;
}

function loadHtml(path, content) {
  PLACEHOLDER_EL.style.display = 'none';
  clearPreview();

  if (content !== undefined && content !== null) {
    setActiveFile(path);
    PREVIEW_EL.appendChild(createPreviewIframe(content));
    return;
  }

  setActiveFile(path);
  var url = './' + path.split('/').map(encodeURIComponent).join('/');
  PREVIEW_EL.innerHTML = '<p style="color:#999">加载中...</p>';
  fetch(url)
    .then(function (res) {
      if (!res.ok) throw new Error('加载失败');
      return res.text();
    })
    .then(function (text) {
      clearPreview();
      PREVIEW_EL.appendChild(createPreviewIframe(text));
    })
    .catch(function () {
      PREVIEW_EL.innerHTML = '<p style="color:#c00">无法加载文件</p>';
    });
}

export function loadFileByPath(path) {
  var data = window.NOTE_MANIFEST;
  if (!data || !data.children) return;
  var node = findNodeByPath(data.children, path);
  var isMd = path.toLowerCase().endsWith('.md');
  if (node && node.content !== undefined && node.content !== null) {
    if (isMd) {
      loadMarkdown(path, node.content);
    } else {
      loadHtml(path, node.content);
    }
  } else {
    if (isMd) {
      loadMarkdown(path, undefined);
    } else {
      loadHtml(path, undefined);
    }
  }
  expandParentDirs(path);
}
