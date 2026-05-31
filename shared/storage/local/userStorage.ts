const KEY = "user";

const AVATARS = [
  "👨‍⚕️", "👩‍⚕️", "🧑‍⚕️", "👨🏻‍⚕️", "👩🏻‍⚕️",
  "🧬", "🔬", "🦠", "👁️", "🧠"
];

export const userStorage = {
  get() {
    if (typeof window === "undefined")
      return { username: "You", email: "", joined: "", avatar: "🧑‍⚕️" };

    const raw = localStorage.getItem(KEY);
    return raw
      ? JSON.parse(raw)
      : {
          username: "You",
          email: "",
          joined: new Date().toISOString(),
          avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)],
        };
  },

  set(userData: any) {
    if (typeof window === "undefined") return;

    const existing = this.get();
    const avatar = existing.avatar || AVATARS[Math.floor(Math.random() * AVATARS.length)];

    localStorage.setItem(
      KEY,
      JSON.stringify({
        ...existing,
        ...userData,
        avatar,
      })
    );
  },
};