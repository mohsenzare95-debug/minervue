"use client";

import {
  useState,
} from "react";

import FundusSimulator from "@/features/FundusSimulator";


export default function FundusSimulatorPage() {


  const [selectedDisease, setSelectedDisease] =
    useState("Normal");



  return (
    <div style={styles.page}>


      <div style={styles.titleBlock}>


        <div style={styles.title}>
          Fundus Simulator
        </div>



        <div style={styles.carousel}>

          {["Normal", "RRD", "Melanoma"].map((item)=>(

            <div

              key={item}

              onClick={()=>
                setSelectedDisease(item)
              }

              style={{

                ...styles.option,

                background:
                  selectedDisease === item
                  ? "#12444b"
                  : "#eee",

                color:
                  selectedDisease === item
                  ? "#fff"
                  : "#333",

              }}

            >

              {item}

            </div>

          ))}

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

    alignItems:"center",

    gap:0,


    fontFamily:"sans-serif",


    overflow:"hidden",

    height:"100vh",


    touchAction:"none",


    userSelect:"none",

    WebkitUserSelect:"none",

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


  },





  carousel:{


    display:"flex",

    justifyContent:"center",

    gap:10,

    marginTop:12,


  },





  option:{


    padding:"6px 16px",

    borderRadius:20,

    cursor:"pointer",

    fontSize:14,

    userSelect:"none",


  },


};