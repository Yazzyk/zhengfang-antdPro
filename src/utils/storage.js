export const storage = {
  save: (key, value) => {
    localStorage.setItem(key, value);
  },
  find: (key) => {
    return localStorage.getItem(key);
  },
  remove: (key) => {
    localStorage.remove(key);
  },
};
