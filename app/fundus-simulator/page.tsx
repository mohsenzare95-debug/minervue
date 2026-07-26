"use client";

import FundusSimulator from "@/features/FundusSimulator";

export default function FundusSimulatorPage() {
  return (
    <div style={styles.page}>
      <div style={styles.titleBlock}>
        <div style={styles.title}>
          Fundus Simulator
        </div>
      </div>

      <FundusSimulator />
    </div>
  );
}


const styles: Record<string, React.CSSProperties> = {

  page:{
    display:"flex",
    flexDirection:"column",
    gap:24,
    fontFamily:"sans-serif",
  },

  titleBlock:{
    textAlign:"center",
    marginBottom:8,
  },

  title:{
    fontSize:38,
    fontWeight:400,
    letterSpacing:"-1px",
    color:"#111",
    lineHeight:1.1,
  }

};