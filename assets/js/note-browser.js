/**
 * 笔记浏览页：加载 manifest，渲染目录树，预览 Markdown
 */

(function () {
  const PREVIEW_EL = document.getElementById('note-preview-content');
  const PLACEHOLDER_EL = document.getElementById('note-preview-placeholder');
  const MOBILE_BREAKPOINT = 768;

  function isMobile() {
    return window.matchMedia('(max-width: ' + MOBILE_BREAKPOINT + 'px)').matches;
  }

  function openSidebar() {
    document.body.classList.add('note-sidebar-open');
    var btn = document.getElementById('note-sidebar-toggle');
    if (btn) btn.setAttribute('aria-expanded', 'true');
    var overlay = document.getElementById('note-sidebar-overlay');
    if (overlay) overlay.setAttribute('aria-hidden', 'false');
  }

  function closeSidebar() {
    document.body.classList.remove('note-sidebar-open');
    var btn = document.getElementById('note-sidebar-toggle');
    if (btn) btn.setAttribute('aria-expanded', 'false');
    var overlay = document.getElementById('note-sidebar-overlay');
    if (overlay) overlay.setAttribute('aria-hidden', 'true');
    var sidebar = document.getElementById('note-sidebar');
    if (sidebar && isMobile()) sidebar.setAttribute('aria-hidden', 'true');
  }

  function initSidebarToggle() {
    var toggle = document.getElementById('note-sidebar-toggle');
    var closeBtn = document.getElementById('note-sidebar-close');
    var overlay = document.getElementById('note-sidebar-overlay');
    var sidebar = document.getElementById('note-sidebar');
    if (sidebar && isMobile()) {
      sidebar.setAttribute('aria-hidden', 'true');
    }
    if (toggle) {
      toggle.addEventListener('click', function () {
        if (isMobile()) {
          document.body.classList.toggle('note-sidebar-open');
          var open = document.body.classList.contains('note-sidebar-open');
          toggle.setAttribute('aria-expanded', open);
          if (overlay) overlay.setAttribute('aria-hidden', !open);
          var sidebar = document.getElementById('note-sidebar');
          if (sidebar) sidebar.setAttribute('aria-hidden', !open);
        }
      });
    }
    if (closeBtn) {
      closeBtn.addEventListener('click', closeSidebar);
    }
    if (overlay) {
      overlay.addEventListener('click', closeSidebar);
    }
  }

  function renderTree(children, container, basePath) {
    basePath = basePath || '';
    if (!children || children.length === 0) return;

    const ul = document.createElement('ul');
    ul.className = 'note-tree';

    children.forEach((node) => {
      const li = document.createElement('li');
      li.className = 'note-tree-item';

      if (node.type === 'dir') {
        const dirPath = basePath ? basePath + '/' + node.name : node.name;
        const div = document.createElement('div');
        div.className = 'note-tree-node dir';
        div.dataset.path = dirPath;
        div.dataset.expanded = 'true';

        const arrow = document.createElement('span');
        arrow.className = 'note-tree-arrow expanded';
        arrow.textContent = '▶';

        const name = document.createElement('span');
        name.textContent = node.name;

        div.appendChild(arrow);
        div.appendChild(name);

        div.addEventListener('click', () => {
          const expanded = div.dataset.expanded === 'true';
          div.dataset.expanded = expanded ? 'false' : 'true';
          arrow.classList.toggle('expanded', !expanded);
          childrenEl.classList.toggle('collapsed', expanded);
        });

        li.appendChild(div);

        const childrenEl = document.createElement('ul');
        childrenEl.className = 'note-tree-children';
        renderTree(node.children, childrenEl, dirPath);
        li.appendChild(childrenEl);
      } else {
        const div = document.createElement('div');
        const isMd = node.name.toLowerCase().endsWith('.md');
        div.className = 'note-tree-node file ' + (isMd ? 'md' : 'html');
        div.dataset.path = node.path;
        div.dataset.ext = isMd ? 'md' : 'html';

        const arrow = document.createElement('span');
        arrow.className = 'note-tree-arrow empty';
        arrow.textContent = ' ';

        const name = document.createElement('span');
        name.textContent = node.name;

        div.appendChild(arrow);
        div.appendChild(name);

        div.addEventListener('click', (e) => {
          e.preventDefault();
          location.hash = node.path;
          loadFileByPath(node.path);
          if (isMobile()) closeSidebar();
        });

        li.appendChild(div);
      }

      ul.appendChild(li);
    });
    container.appendChild(ul);
  }

  function clearPreview() {
    PREVIEW_EL.innerHTML = '';
    PREVIEW_EL.style.display = 'block';
  }

  function setActiveFile(path) {
    var nodes = document.querySelectorAll('.note-tree-node.file');
    nodes.forEach(function (node) {
      node.classList.toggle('active', node.dataset.path === path);
    });
  }

  function getFileFromHash() {
    var hash = location.hash.slice(1);
    return hash && hash.indexOf('#') === -1 ? hash : null;
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

  function loadFileByPath(path) {
    var data = window.NOTE_MANIFEST;
    if (!data || !data.children) return;
    var node = findNodeByPath(data.children, path);
    var isMd = path.toLowerCase().endsWith('.md');
    if (node && (node.content !== undefined && node.content !== null)) {
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
      return;
    }

    setActiveFile(path);
    const url = './' + path.split('/').map(encodeURIComponent).join('/');
    PREVIEW_EL.innerHTML = '<p style="color:#999">加载中...</p>';
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('加载失败');
        return res.text();
      })
      .then((text) => {
        if (typeof marked !== 'undefined') {
          PREVIEW_EL.innerHTML = marked.parse(text);
        } else {
          PREVIEW_EL.textContent = text;
        }
      })
      .catch(() => {
        PREVIEW_EL.innerHTML = '<p style="color:#c00">无法加载文件</p>';
      });
  }

  function loadHtml(path, content) {
    PLACEHOLDER_EL.style.display = 'none';
    clearPreview();

    if (content !== undefined && content !== null) {
      setActiveFile(path);
      const iframe = document.createElement('iframe');
      iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts');
      iframe.style.cssText = 'width:100%;height:80vh;min-height:400px;border:none;border-radius:6px;';
      iframe.srcdoc = content;
      PREVIEW_EL.appendChild(iframe);
      return;
    }

    setActiveFile(path);
    const url = './' + path.split('/').map(encodeURIComponent).join('/');
    PREVIEW_EL.innerHTML = '<p style="color:#999">加载中...</p>';
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('加载失败');
        return res.text();
      })
      .then((text) => {
        clearPreview();
        const iframe = document.createElement('iframe');
        iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts');
        iframe.style.cssText = 'width:100%;height:80vh;min-height:400px;border:none;border-radius:6px;';
        iframe.srcdoc = text;
        PREVIEW_EL.appendChild(iframe);
      })
      .catch(() => {
        PREVIEW_EL.innerHTML = '<p style="color:#c00">无法加载文件</p>';
      });
  }

  function init() {
    const container = document.getElementById('note-tree');
    const data = window.NOTE_MANIFEST;
    if (container && data && data.children) {
      renderTree(data.children, container);
    } else if (container) {
      container.innerHTML = '<p style="padding:1rem;color:#999">无法加载目录</p>';
    }
    initSidebarToggle();
    var path = getFileFromHash();
    if (path) {
      loadFileByPath(path);
    }
    window.addEventListener('hashchange', function () {
      var p = getFileFromHash();
      if (p) {
        loadFileByPath(p);
      } else {
        PLACEHOLDER_EL.style.display = 'block';
        PREVIEW_EL.style.display = 'none';
        PREVIEW_EL.innerHTML = '';
        setActiveFile('');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
