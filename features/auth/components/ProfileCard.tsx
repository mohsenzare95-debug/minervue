import { useSignOut } from "../hooks/useSignOut";

export function ProfileCard({
  user,
  profile,
}: any) {
  const { signOut } = useSignOut();

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.avatar}>
          {profile?.avatar || "👨‍⚕️"}
        </div>

        <div style={styles.info}>
          <div style={styles.username}>
            {profile?.username || "User"}
          </div>

          <div style={styles.email}>
            {user?.email}
          </div>
        </div>
      </div>

      <button
        style={styles.logoutBtn}
        onClick={signOut}
      >
        Logout
      </button>
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

  header: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    marginBottom: 20,
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: "50%",
    background: "#f3f3f3",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 28,
  },

  info: {
    display: "flex",
    flexDirection: "column",
  },

  username: {
    fontWeight: 700,
    fontSize: 16,
  },

  email: {
    fontSize: 13,
    color: "#777",
    marginTop: 4,
  },

  logoutBtn: {
    border: "none",
    background: "#f3f3f3",
    padding: "10px 14px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
  },
};