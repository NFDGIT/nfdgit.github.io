export function getCssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export function isMobile(breakpoint = 768) {
  return window.innerWidth <= breakpoint;
}

export function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

export function $(selector, parent = document) {
  return parent.querySelector(selector);
}

export function $$(selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}
