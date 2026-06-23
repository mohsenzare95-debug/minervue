export function GuestAuthCard({
  onLogin,
  onSignup,
}: {
  onLogin: () => void;
  onSignup: () => void;
}) {
  return (
    <div style={styles.card}>
      <p style={styles.title}>Guest Mode</p>

      <p style={styles.text}>
        Login to sync your decks and progress.
      </p>

      <div style={styles.actions}>
        <button
          style={styles.primaryBtn}
          onClick={onLogin}
        >
          Login
        </button>

        <button
          style={styles.secondaryBtn}
          onClick={onSignup}
        >
          Sign up
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    border: "1px solid #eee",
    borderRadius: 8,
    padding: 20,
    background: "#fff",
  },

  title: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 8,
  },

  text: {
    color: "#666",
    fontSize: 14,
    marginBottom: 18,
  },

  actions: {
    display: "flex",
    gap: 10,
  },

  primaryBtn: {
    background: "#111",
    color: "#fff",
    border: "none",
    padding: "10px 14px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
  },

  secondaryBtn: {
    background: "#f3f3f3",
    color: "#111",
    border: "none",
    padding: "10px 14px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
  },
};