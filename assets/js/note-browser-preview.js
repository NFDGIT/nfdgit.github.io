/**
 * 笔记浏览器：预览区、hash、面包屑、Markdown/HTML 加载
 */
(function () {
  var NB = window.NoteBrowser;

  function highlightCodeBlocks() {
    if (typeof hljs !== 'undefined' && NB.PREVIEW_EL) {
      NB.PREVIEW_EL.querySelectorAll('pre code').forEach(function (block) {
        hljs.highlightElement(block);
      });
    }
  }

  function syncHljsTheme() {
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
    NB.PREVIEW_EL.innerHTML = '';
    NB.PREVIEW_EL.style.display = 'block';
    NB.PREVIEW_EL.style.animation = 'none';
    void NB.PREVIEW_EL.offsetWidth;
    NB.PREVIEW_EL.style.animation = '';
  }

  function setActiveFile(path) {
    var nodes = document.querySelectorAll('.note-tree-node.file');
    nodes.forEach(function (node) {
      node.classList.toggle('active', node.dataset.path === path);
    });
    updateBreadcrumb(path);
  }

  function updateBreadcrumb(path) {
    var bc = document.getElementById('note-breadcrumb');
    if (!bc) return;
    if (!path) {
      bc.innerHTML = '';
      return;
    }
    var parts = path.split('/');
    bc.innerHTML = parts
      .map(function (p, i) {
        var isLast = i === parts.length - 1;
        var cls = isLast ? 'note-breadcrumb-item is-current' : 'note-breadcrumb-item';
        return '<span class="' + cls + '">' + p + '</span>';
      })
      .join('<span class="note-breadcrumb-sep">›</span>');
  }

  function getFileFromHash() {
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

  function initPreviewLinkInterceptor() {
    if (!NB.PREVIEW_EL) return;
    NB.PREVIEW_EL.addEventListener('click', function (e) {
      var a = e.target.closest('a');
      if (!a || !a.href) return;
      var href = a.getAttribute('href');
      if (!href) return;
      var lower = href.toLowerCase();
      if (lower.indexOf('://') !== -1 || href.charAt(0) === '#') return;
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
    NB.PLACEHOLDER_EL.style.display = 'none';
    clearPreview();

    if (content !== undefined && content !== null) {
      setActiveFile(path);
      if (typeof marked !== 'undefined') {
        NB.PREVIEW_EL.innerHTML = marked.parse(content);
      } else {
        NB.PREVIEW_EL.textContent = content;
      }
      highlightCodeBlocks();
      return;
    }

    setActiveFile(path);
    var url = './' + path.split('/').map(encodeURIComponent).join('/');
    NB.PREVIEW_EL.innerHTML = '<p style="color:#999">加载中...</p>';
    fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error('加载失败');
        return res.text();
      })
      .then(function (text) {
        if (typeof marked !== 'undefined') {
          NB.PREVIEW_EL.innerHTML = marked.parse(text);
        } else {
          NB.PREVIEW_EL.textContent = text;
        }
        highlightCodeBlocks();
      })
      .catch(function () {
        NB.PREVIEW_EL.innerHTML = '<p style="color:#c00">无法加载文件</p>';
      });
  }

  function loadHtml(path, content) {
    NB.PLACEHOLDER_EL.style.display = 'none';
    clearPreview();

    if (content !== undefined && content !== null) {
      setActiveFile(path);
      var iframe = document.createElement('iframe');
      iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts');
      iframe.style.cssText = 'width:100%;height:80vh;min-height:400px;border:none;border-radius:6px;';
      iframe.srcdoc = content;
      NB.PREVIEW_EL.appendChild(iframe);
      return;
    }

    setActiveFile(path);
    var url2 = './' + path.split('/').map(encodeURIComponent).join('/');
    NB.PREVIEW_EL.innerHTML = '<p style="color:#999">加载中...</p>';
    fetch(url2)
      .then(function (res) {
        if (!res.ok) throw new Error('加载失败');
        return res.text();
      })
      .then(function (text) {
        clearPreview();
        var iframe2 = document.createElement('iframe');
        iframe2.setAttribute('sandbox', 'allow-same-origin allow-scripts');
        iframe2.style.cssText = 'width:100%;height:80vh;min-height:400px;border:none;border-radius:6px;';
        iframe2.srcdoc = text;
        NB.PREVIEW_EL.appendChild(iframe2);
      })
      .catch(function () {
        NB.PREVIEW_EL.innerHTML = '<p style="color:#c00">无法加载文件</p>';
      });
  }

  function loadFileByPath(path) {
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

  NB.highlightCodeBlocks = highlightCodeBlocks;
  NB.syncHljsTheme = syncHljsTheme;
  NB.getFileFromHash = getFileFromHash;
  NB.initPreviewLinkInterceptor = initPreviewLinkInterceptor;
  NB.loadFileByPath = loadFileByPath;
  NB.setActiveFile = setActiveFile;
})();
