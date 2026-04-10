const SITE_MAP = {
  '': { label: '首页' },
  'note': { label: '笔记' },
  'games': { label: '小游戏' },
  'games/racing': { label: '赛车游戏' },
  'games/snake': { label: '贪吃蛇' },
  'games/billiards': { label: '台球' },
  'album': { label: '相册' },
  'tools': { label: '小工具' },
  'insurance': { label: '保险' },
  'showcase': { label: '组件库' },
  'guide': { label: '教程' },
  'guide/agent': { label: 'AI Agent 教程' },
  'guide/glossary': { label: '术语表' },
};

export function getCurrentSection() {
  const path = location.pathname.replace(/\/index\.html$/, '').replace(/^\//, '').replace(/\/$/, '');
  return path;
}

export function getBreadcrumbs(customLabel) {
  const section = getCurrentSection();
  if (!section) return [];

  const parts = section.split('/');
  const crumbs = [{ label: '首页', href: getRelativeRoot() }];

  let accumulated = '';
  for (let i = 0; i < parts.length; i++) {
    accumulated += (i > 0 ? '/' : '') + parts[i];
    const info = SITE_MAP[accumulated];
    const label = (i === parts.length - 1 && customLabel) ? customLabel : (info?.label || parts[i]);
    const isLast = i === parts.length - 1;
    crumbs.push({
      label,
      href: isLast ? null : getRelativeRoot() + accumulated + '/index.html',
      isCurrent: isLast,
    });
  }

  return crumbs;
}

export function getRelativeRoot() {
  const depth = getCurrentSection().split('/').filter(Boolean).length;
  if (depth === 0) return './';
  return '../'.repeat(depth);
}

export function getActiveNavSection() {
  const section = getCurrentSection();
  const topLevel = section.split('/')[0];
  return topLevel || null;
}
