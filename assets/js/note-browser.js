/**
 * 笔记浏览页：加载 manifest，渲染目录树，预览 Markdown
 */

(function () {
  const PREVIEW_EL = document.getElementById('note-preview-content');
  const PLACEHOLDER_EL = document.getElementById('note-preview-placeholder');

  function renderTree(children, container) {
    if (!children || children.length === 0) return;

    const ul = document.createElement('ul');
    ul.className = 'note-tree';

    children.forEach((node) => {
      const li = document.createElement('li');
      li.className = 'note-tree-item';

      if (node.type === 'dir') {
        const div = document.createElement('div');
        div.className = 'note-tree-node dir';
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
        renderTree(node.children, childrenEl);
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
          if (node.name.toLowerCase().endsWith('.md')) {
            loadMarkdown(node.path, node.content);
          } else {
            loadHtml(node.path, node.content);
          }
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

  function loadMarkdown(path, content) {
    PLACEHOLDER_EL.style.display = 'none';
    clearPreview();

    if (content !== undefined && content !== null) {
      if (typeof marked !== 'undefined') {
        PREVIEW_EL.innerHTML = marked.parse(content);
      } else {
        PREVIEW_EL.textContent = content;
      }
      return;
    }

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
      const iframe = document.createElement('iframe');
      iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts');
      iframe.style.cssText = 'width:100%;height:80vh;min-height:400px;border:none;border-radius:6px;';
      iframe.srcdoc = content;
      PREVIEW_EL.appendChild(iframe);
      return;
    }

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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
