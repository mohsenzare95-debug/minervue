"use client";

import { useState } from "react";

type Props = {
  walletAddress: string;
  network?: string;
  label?: string;
};

export function DonationWalletCard({
  walletAddress,
  network = "USDT / ETH / TRC20",
  label = "Support / Donation",
}: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div style={styles.card}>
      <div style={styles.title}>{label}</div>

      <div style={styles.network}>{network}</div>

     

{/* ِDescription */}
<div style={styles.description}>
  VisoSage is currently developed and maintained entirely through community support. If you find it valuable and would like to see it continue to grow, consider becoming part of its journey.

</div>
 {/* ADDRESS ROW */}

      <div style={styles.addressRow}>
        <div style={styles.addressBox}>
          <code style={styles.address}>{walletAddress}</code>
        </div>

        <button onClick={copy} style={styles.button}>
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <div style={styles.note}>
        Send crypto manually via any wallet (Trust Wallet / MetaMask)
      </div>
    </div>
  );
}

/* ================= */

const styles: Record<string, React.CSSProperties> = {
  card: {
    marginTop: 12,
    padding: 14,
    border: "1px solid #eee",
    borderRadius: 12,
    background: "#fff",
  },

  title: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 6,
  },

  network: {
    fontSize: 12,
    color: "#777",
    marginBottom: 10,
  },

  description: {
  fontSize: 13,
  color: "#555",
  lineHeight: 1.2,
  textAlign: "left",
  whiteSpace: "pre-line",
  marginBottom: 10,
},


  /* NEW LAYOUT */
  addressRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    width: "100%",
  },

  addressBox: {
    flex: 1,
    padding: 10,
    background: "#f7f7f7",
    borderRadius: 10,
    overflowX: "auto",
  },

  address: {
    fontSize: 12,
    wordBreak: "break-all",
  },

  button: {
    flexShrink: 0,
    background: "#111",
    color: "#fff",
    border: "none",
    padding: "8px 10px",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 12,
    whiteSpace: "nowrap",
  },

  note: {
    marginTop: 8,
    fontSize: 11,
    color: "#888",
  },
};