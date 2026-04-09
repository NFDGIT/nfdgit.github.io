/**
 * 笔记浏览器：侧栏统计与文件名搜索
 */
(function () {
  var NB = window.NoteBrowser;

  function countManifest(children) {
    var dirs = 0;
    var files = 0;
    if (!children) return { dirs: dirs, files: files };
    children.forEach(function (node) {
      if (node.type === 'dir') {
        dirs++;
        var sub = countManifest(node.children);
        dirs += sub.dirs;
        files += sub.files;
      } else {
        files++;
      }
    });
    return { dirs: dirs, files: files };
  }

  function renderSidebarStats(children) {
    var sidebar = document.getElementById('note-sidebar');
    if (!sidebar) return;
    var existing = sidebar.querySelector('.note-sidebar-stats');
    if (existing) existing.remove();
    var stats = countManifest(children);
    var el = document.createElement('div');
    el.className = 'note-sidebar-stats';
    el.textContent = stats.dirs + ' 个目录 · ' + stats.files + ' 个文件';
    sidebar.appendChild(el);
  }

  function initSearch() {
    var searchInput = document.getElementById('note-search');
    var emptyEl = document.getElementById('note-search-empty');
    if (!searchInput) return;
    searchInput.addEventListener('input', function () {
      var query = searchInput.value.trim().toLowerCase();
      var treeNodes = document.querySelectorAll('.note-tree-node');
      if (!query) {
        treeNodes.forEach(function (node) {
          node.closest('.note-tree-item').hidden = false;
        });
        if (emptyEl) emptyEl.hidden = true;
        return;
      }
      var visibleCount = 0;
      treeNodes.forEach(function (node) {
        var li = node.closest('.note-tree-item');
        if (node.classList.contains('dir')) {
          li.hidden = false;
          return;
        }
        var name = (node.dataset.path || '').toLowerCase();
        var match = name.indexOf(query) !== -1;
        li.hidden = !match;
        if (match) visibleCount++;
      });
      treeNodes.forEach(function (node) {
        if (!node.classList.contains('dir')) return;
        var li = node.closest('.note-tree-item');
        var children = li.querySelector('.note-tree-children');
        if (!children) return;
        var hasVisible = children.querySelector('.note-tree-item:not([hidden])');
        li.hidden = !hasVisible;
        if (hasVisible) {
          node.dataset.expanded = 'true';
          var arrow = node.querySelector('.note-tree-arrow');
          if (arrow) arrow.classList.add('expanded');
          children.classList.remove('collapsed');
        }
      });
      if (emptyEl) emptyEl.hidden = visibleCount > 0;
    });
  }

  NB.renderSidebarStats = renderSidebarStats;
  NB.initSearch = initSearch;
})();
