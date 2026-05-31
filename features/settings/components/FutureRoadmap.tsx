"use client";

type Props = {
  imageUrl: string;
};

export function FutureRoadmap({ imageUrl }: Props) {
  return (
    <div style={styles.card}>
      <div style={styles.title}>Future Roadmap</div>

      <div style={styles.imageBox}>
        <img src={imageUrl} style={styles.image} />
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    border: "1px solid #eee",
    borderRadius: 12,
    padding: 12,
    background: "#fff",
  },

  title: {
    fontSize: 15,
    fontWeight: 600,
    marginBottom: 10,
    textAlign: "center",
  },

  imageBox: {
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    display: "block",
  },
};