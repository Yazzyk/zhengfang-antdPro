export const storage = {
  save: (key, value) => {
    localStorage.setItem(key, value);
  },
  find: (key) => {
    localStorage.getItem(key);
  },
  remove: (key) => {
    localStorage.remove(key);
  }
}