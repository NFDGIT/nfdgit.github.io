/**
 * 笔记浏览器：目录树渲染（依赖 preview 中的 loadFileByPath）
 */
(function () {
  var NB = window.NoteBrowser;

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

        var arrow = document.createElement('span');
        arrow.className = 'note-tree-arrow expanded';
        arrow.textContent = '▶';

        var name = document.createElement('span');
        name.textContent = node.name;

        div.appendChild(arrow);
        div.appendChild(name);

        var childrenEl = document.createElement('ul');
        childrenEl.className = 'note-tree-children';

        div.addEventListener('click', function () {
          var expanded = div.dataset.expanded === 'true';
          div.dataset.expanded = expanded ? 'false' : 'true';
          arrow.classList.toggle('expanded', !expanded);
          childrenEl.classList.toggle('collapsed', expanded);
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
})();
