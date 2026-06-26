"use client";

import { useEffect, useState } from "react";

export default function SplashScreen({
  onFinish,
}: {
  onFinish: () => void;
}) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setStep(1);
    }, 2000);

    const t2 = setTimeout(() => {
      setStep(2);
    }, 2600);

    const t3 = setTimeout(() => {
      onFinish();
    }, 5000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onFinish]);

  return (
    <div style={styles.container}>
      {/* Upper eyelid */}
      <div
        style={{
          ...styles.upperLid,
          transform:
            step === 1 ? "translateY(0)" : "translateY(-75%)",
        }}
      />

      {/* Lower eyelid */}
      <div
        style={{
          ...styles.lowerLid,
          transform:
            step === 1 ? "translateY(0)" : "translateY(75%)",
        }}
      />

      <div style={styles.text}>
        {step === 0 && "Ophthalmology is difficult."}
        {step === 2 && "VisoSage makes it easier."}
      </div>
    </div>
  );
}

const styles: any = {
  container: {
    position: "fixed",
    inset: 0,

    background: "#fff",

    overflow: "hidden",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    zIndex: 999999,
  },

  text: {
    position: "relative",

    zIndex: 20,

    fontSize: 34,

    fontWeight: 650,

    letterSpacing: "-0.04em",

    lineHeight: 1.35,

    textAlign: "center",

    color: "#111",

    fontFamily:
      '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif',
  },

  upperLid: {
    position: "absolute",

    left: 0,
    top: 0,

    width: "100%",
    height: "55%",

    background: "#111",

    borderBottomLeftRadius: "100% 180px",
borderBottomRightRadius: "100% 180px",

    boxShadow: "0 10px 25px rgba(0,0,0,.08)",

    transition: "transform .45s ease-in-out",

    zIndex: 10,
  },

  lowerLid: {
    position: "absolute",

    left: 0,
    bottom: 0,

    width: "100%",
    height: "55%",

    background: "#111",

   borderTopLeftRadius: "100% 180px",
borderTopRightRadius: "100% 180px",

    boxShadow: "0 -10px 25px rgba(0,0,0,.08)",

    transition: "transform .45s ease-in-out",

    zIndex: 10,
  },
};