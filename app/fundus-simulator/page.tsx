// app/fundus-simulator/page.tsx

"use client";

import FundusSimulator from "@/features/FundusSimulator";


export default function FundusSimulatorPage() {


  return (

    <div
      style={styles.page}
    >


      {/* =====================================================
          HEADER
      ====================================================== */}


      <div
        style={styles.titleBlock}
      >


        {/* =================================================
            TITLE
        ================================================== */}


        <div
          style={styles.title}
        >

          Fundus Simulator

        </div>


      </div>


      {/* =====================================================
          FUNDUS SIMULATOR
      ====================================================== */}


      <FundusSimulator />


    </div>

  );

}


// ============================================================
// STYLES
// ============================================================


const styles:
  Record<
    string,
    React.CSSProperties
  >
= {


  // ==========================================================
  // PAGE
  // ==========================================================


  page: {

    display:
      "flex",

    flexDirection:
      "column",

    alignItems:
      "center",

    gap:
      0,

    fontFamily:
      "sans-serif",

    overflow:
      "hidden",

    height:
      "100vh",

    touchAction:
      "none",

    userSelect:
      "none",

    WebkitUserSelect:
      "none",

  },


  // ==========================================================
  // TITLE BLOCK
  // ==========================================================


  titleBlock: {

    textAlign:
      "center",

    marginBottom:
      8,

  },


  // ==========================================================
  // TITLE
  // ==========================================================


  title: {

    fontSize:
      38,

    fontWeight:
      400,

    letterSpacing:
      "-1px",

    color:
      "#111",

    lineHeight:
      1.1,

  },


};