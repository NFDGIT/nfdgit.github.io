/**
 * 笔记浏览器：目录树渲染（依赖 preview 中的 loadFileByPath）
 */
(function () {
  var NB = window.NoteBrowser;

  function toggleFolder(dirNode, arrow, childrenEl) {
    var expanded = dirNode.dataset.expanded === 'true';
    dirNode.dataset.expanded = expanded ? 'false' : 'true';
    arrow.classList.toggle('expanded', !expanded);
    childrenEl.classList.toggle('collapsed', expanded);
  }

  function getVisibleTreeNodes() {
    var all = document.querySelectorAll('.note-tree-node');
    var visible = [];
    for (var i = 0; i < all.length; i++) {
      var node = all[i];
      var li = node.closest('.note-tree-item');
      if (li && li.hidden) continue;
      var parent = li.parentElement;
      if (parent && parent.classList.contains('note-tree-children') && parent.classList.contains('collapsed')) continue;
      var hidden = false;
      var el = parent;
      while (el) {
        if (el.classList && el.classList.contains('collapsed')) { hidden = true; break; }
        el = el.parentElement;
      }
      if (!hidden) visible.push(node);
    }
    return visible;
  }

  function focusTreeNode(node) {
    if (node) node.focus();
  }

  function handleTreeKeydown(e) {
    var current = document.activeElement;
    if (!current || !current.classList.contains('note-tree-node')) return;

    var visible = getVisibleTreeNodes();
    var idx = visible.indexOf(current);
    if (idx === -1) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (idx < visible.length - 1) focusTreeNode(visible[idx + 1]);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (idx > 0) focusTreeNode(visible[idx - 1]);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      current.click();
    } else if (e.key === 'ArrowRight' && current.classList.contains('dir')) {
      e.preventDefault();
      if (current.dataset.expanded !== 'true') current.click();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (current.classList.contains('dir') && current.dataset.expanded === 'true') {
        current.click();
      } else {
        var parentChildren = current.closest('.note-tree-children');
        if (parentChildren) {
          var parentDir = parentChildren.previousElementSibling;
          if (parentDir && parentDir.classList.contains('dir')) focusTreeNode(parentDir);
        }
      }
    }
  }

  function initTreeKeyboard() {
    var treeContainer = document.getElementById('note-tree');
    if (treeContainer) {
      treeContainer.addEventListener('keydown', handleTreeKeydown);
    }
  }

  function renderTree(children, container, basePath) {
    basePath = basePath || '';
    if (!children || children.length === 0) return;

    var ul = document.createElement('ul');
    ul.className = 'note-tree';

    children.forEach(function (node) {
      var li = document.createElement('li');
      li.className = 'note-tree-item';

      if (node.type === 'dir') {
        var dirPath = basePath ? basePath + '/' + node.name : node.name;
        var div = document.createElement('div');
        div.className = 'note-tree-node dir';
        div.dataset.path = dirPath;
        div.dataset.expanded = 'true';
        div.setAttribute('tabindex', '-1');
        div.setAttribute('role', 'treeitem');

        var arrow = document.createElement('span');
        arrow.className = 'note-tree-arrow expanded';
        arrow.textContent = '▶';

        var name = document.createElement('span');
        name.textContent = node.name;

        div.appendChild(arrow);
        div.appendChild(name);

        var childrenEl = document.createElement('ul');
        childrenEl.className = 'note-tree-children';
        childrenEl.setAttribute('role', 'group');

        div.addEventListener('click', function () {
          toggleFolder(div, arrow, childrenEl);
        });

        li.appendChild(div);
        renderTree(node.children, childrenEl, dirPath);
        li.appendChild(childrenEl);
      } else {
        var div2 = document.createElement('div');
        var isMd = node.name.toLowerCase().endsWith('.md');
        div2.className = 'note-tree-node file ' + (isMd ? 'md' : 'html');
        div2.dataset.path = node.path;
        div2.dataset.ext = isMd ? 'md' : 'html';
        div2.setAttribute('tabindex', '-1');
        div2.setAttribute('role', 'treeitem');

        var arrow2 = document.createElement('span');
        arrow2.className = 'note-tree-arrow empty';
        arrow2.textContent = ' ';

        var name2 = document.createElement('span');
        name2.textContent = node.name;

        div2.appendChild(arrow2);
        div2.appendChild(name2);

        div2.addEventListener('click', function (e) {
          e.preventDefault();
          location.hash = node.path;
          NB.loadFileByPath(node.path);
          if (NB.isMobile()) NB.closeSidebar();
        });

        li.appendChild(div2);
      }

      ul.appendChild(li);
    });
    container.appendChild(ul);
  }

  NB.renderTree = renderTree;
  NB.initTreeKeyboard = initTreeKeyboard;
  NB.getVisibleTreeNodes = getVisibleTreeNodes;
})();
