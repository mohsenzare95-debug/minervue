// app/fundus-simulator/page.tsx

"use client";

import {
  useState,
} from "react";

import FundusSimulator from "@/features/FundusSimulator";


export default function FundusSimulatorPage() {


  const [selectedDisease, setSelectedDisease] =
    useState("Normal");


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


        {/* =================================================
            DISEASE NAVIGATION
        ================================================== */}


        <div
          style={styles.carousel}
        >


          {[
            "Normal",
            "RRD",
            "Melanoma",
          ].map((item) => {


            const isActive =
              selectedDisease === item;


            return (

              <div

                key={item}

                onClick={() =>
                  setSelectedDisease(item)
                }

                style={styles.link}

              >


                <div
                  style={styles.item}
                >


                  {/* LABEL */}


                  <div

                    style={{

                      ...styles.label,

                      color:
                        isActive
                          ? "#000"
                          : "#999",

                    }}

                  >

                    {item}

                  </div>


                  {/* ACTIVE INDICATOR */}


                  <div

                    style={{

                      ...styles.indicator,

                      opacity:
                        isActive
                          ? 1
                          : 0,

                      transform:

                        "translateX(-50%) scale(" +

                        (
                          isActive
                            ? 1
                            : 0.7
                        ) +

                        ")",

                    }}

                  />


                </div>


              </div>

            );

          })}


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


  // ==========================================================
  // DISEASE NAVIGATION
  // ==========================================================


  carousel: {

    display:
      "flex",

    alignItems:
      "center",

    justifyContent:
      "center",

    marginTop:
      12,

    padding:
      "0 12px",

    height:
      52,

    background:
      "rgba(255,255,255,0.75)",

    backdropFilter:
      "blur(20px) saturate(180%)",

    WebkitBackdropFilter:
      "blur(20px) saturate(180%)",

    border:
      "1px solid rgba(255,255,255,0.4)",

    borderRadius:
      24,

    boxShadow:

      "0 8px 30px rgba(0,0,0,0.08), " +

      "inset 0 1px 0 rgba(255,255,255,0.6)",

  },


  // ==========================================================
  // NAVIGATION LINK
  // ==========================================================


  link: {

    flex:
      1,

    textDecoration:
      "none",

    cursor:
      "pointer",

  },


  // ==========================================================
  // NAVIGATION ITEM
  // ==========================================================


  item: {

    height:
      "100%",

    minWidth:
      82,

    display:
      "flex",

    alignItems:
      "center",

    justifyContent:
      "center",

    position:
      "relative",

    flexShrink:
      0,

    /*
      کمی متن را بالاتر می‌بریم
      تا indicator کاملاً زیر آن قرار بگیرد.
    */

    paddingBottom:
      6,

  },


  // ==========================================================
  // LABEL
  // ==========================================================


  label: {

    fontSize:
      13,

    fontWeight:
      500,

    height:
      16,

    lineHeight:
      "16px",

    transition:
      "color 0.2s ease",

  },


  // ==========================================================
  // ACTIVE INDICATOR
  // ==========================================================


  indicator: {

    position:
      "absolute",

    bottom:
      4,

    left:
      "50%",

    width:
      16,

    height:
      2,

    borderRadius:
      2,

    background:
      "#000",

    transition:
      "all 0.2s ease",

  },

};