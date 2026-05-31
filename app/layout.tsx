"use client";

import "./globals.css";
import Navbar from "@/shared/ui/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={styles.body}>
        <main className="app">
          <div style={styles.container}>
            {children}
          </div>
        </main>

        <Navbar />
      </body>
    </html>
  );
}

const styles: Record<string, React.CSSProperties> = {
  body: {
    margin: 0,
    backgroundColor: "#fff",
  },

  container: {
    width: "100%",
    maxWidth: 480,
    margin: "0 auto",
    padding: "16px",
    paddingBottom: 80, // space for navbar
    display: "flex",
    flexDirection: "column",
  },
};