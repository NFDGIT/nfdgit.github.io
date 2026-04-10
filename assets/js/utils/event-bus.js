const listeners = new Map();

export function on(event, callback) {
  if (!listeners.has(event)) listeners.set(event, new Set());
  listeners.get(event).add(callback);
  return () => off(event, callback);
}

export function off(event, callback) {
  const cbs = listeners.get(event);
  if (cbs) cbs.delete(callback);
}

export function emit(event, data) {
  const cbs = listeners.get(event);
  if (cbs) cbs.forEach(cb => cb(data));
}
