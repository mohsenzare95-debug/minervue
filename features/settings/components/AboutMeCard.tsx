"use client";

import Image from "next/image";

type Props = {
  name?: string;
  bio?: string;
  imageUrl: string;
};

export function AboutMeCard({
  name = "About VisoSage",
  bio,
  imageUrl,
}: Props) {
  return (
    <div style={styles.card}>
      <div style={styles.wrapper}>
        <div style={styles.imageBox}>
          <Image
            src={imageUrl}
            alt="profile"
            width={72}
            height={72}
            style={styles.image}
          />
        </div>

        <div style={styles.content}>
          <div style={styles.title}>{name}</div>
          {bio && <div style={styles.bio}>{bio}</div>}
        </div>
      </div>
    </div>
  );
}

/* ================= */

const styles: Record<string, React.CSSProperties> = {
  card: {
    marginTop: 16,
    padding: 14,
    border: "1px solid #eee",
    borderRadius: 8,
    background: "#fff",
  },

  wrapper: {
    display: "block",
    position: "relative",
  },

  imageBox: {
    float: "left",
    marginRight: 12,
    marginBottom: 6,
  },

  image: {
    borderRadius: 8,
    objectFit: "cover",
  },

  content: {
    fontSize: 14,
  },

  title: {
    fontSize: 15,
    fontWeight: 600,
    marginBottom: 6,
  },

  bio: {
  fontSize: 13,
  color: "#555",
  lineHeight: 1.2,
  textAlign: "left",
  whiteSpace: "pre-line",
},
};