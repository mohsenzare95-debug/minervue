//features\notes\components\reader\NoteHeader.tsx
export default function NoteHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <header style={styles.header}>
      <div style={styles.title}>
        {title}
      </div>

      <div style={styles.subtitle}>
        {subtitle}
      </div>
    </header>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    textAlign: "center",
    padding: "20px 20px 18px",
  },

  title: {
    fontSize: 30,
    fontWeight: 400,
    letterSpacing: "-0.8px",
    color: "#111",
    lineHeight: 1.1,
  },

  subtitle: {
    marginTop: 6,
    fontSize: 13,
    color: "#666",
    fontWeight: 400,
  },
};