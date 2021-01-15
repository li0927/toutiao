export function setItem(key, val, isSession) {
  const storage = isSession ? window.sessionStorage : window.localStorage
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  storage.setItem(key, val)
}

export function getItem(key, isSession) {
  const storage = isSession ? window.sessionStorage : window.localStorage
  const val = storage.getItem(key)
  try {
    return JSON.parse(val)
  } catch (err) {
    return val
  }
}
