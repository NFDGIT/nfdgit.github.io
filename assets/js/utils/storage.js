function safeGet(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch { /* quota exceeded or disabled */ }
}

export function getThemePref() {
  return safeGet('theme');
}

export function setThemePref(theme) {
  safeSet('theme', theme);
}

export function getLargeTextPref() {
  return safeGet('largeText') === 'on';
}

export function setLargeTextPref(on) {
  safeSet('largeText', on ? 'on' : 'off');
}
