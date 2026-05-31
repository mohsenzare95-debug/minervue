const KEY = "settings";

export const settingsStorage = {
  get() {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  },

  set(value: any) {
    localStorage.setItem(KEY, JSON.stringify(value));
  },
};