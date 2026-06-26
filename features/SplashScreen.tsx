// features/SplashScreen.tsx
"use client";

import { useEffect, useState } from "react";

export default function SplashScreen({
  onFinish,
}: {
  onFinish: () => void;
}) {
  const [step, setStep] = useState(-1);
  const [message, setMessage] = useState("Ophthalmology is difficult.");

  useEffect(() => {
    // باز شدن چشم اولیه + نمایش پیام اول
    const t1 = setTimeout(() => {
      setStep(0);
    }, 500);

    // بستن چشم اول
    const t2 = setTimeout(() => {
      setStep(1);
      // تغییر پیام برای دور بعدی
      setTimeout(() => {
        setMessage("VisoSage makes it easier.");
      }, 450);
    }, 2500);

    // باز شدن چشم + پیام دوم
    const t3 = setTimeout(() => {
      setStep(2);
    }, 3000);

    // بستن چشم نهایی (قبل از آخرین باز شدن)
    const t4 = setTimeout(() => {
      setStep(3);
    }, 4700);

    // آخرین باز شدن پلک (خروج نهایی)
    const t5 = setTimeout(() => {
      setStep(4);
    }, 5300);

    // پایان اسپلش بعد از اتمام انیمیشن خروج
    const t6 = setTimeout(() => {
      onFinish();
    }, 6100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [onFinish]);

  return (
    <div
      style={{
        ...styles.container,
        background: step === 4 ? "transparent" : "#fff",
        transition: "background .15s linear",
      }}
    >
      {/* Upper eyelid */}
      <div
        style={{
          ...styles.upperLid,
          transform:
            step === -1 || step === 1 || step === 3
              ? "translateY(0)"
              : step === 4
              ? "translateY(-110%)"
              : "translateY(-75%)",
        }}
      />

      {/* Lower eyelid */}
      <div
        style={{
          ...styles.lowerLid,
          transform:
            step === -1 || step === 1 || step === 3
              ? "translateY(0)"
              : step === 4
              ? "translateY(110%)"
              : "translateY(75%)",
        }}
      />

      {/* متن فقط تا قبل از آخرین باز شدن نمایش داده شود */}
      {step !== 4 && (
        <div style={styles.text}>{message}</div>
      )}
    </div>
  );
}

const styles: any = {
  container: {
    position: "fixed",
    inset: 0,
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
    height: "65%",
    background: "#111",
borderBottomLeftRadius: "2500px 45px",
borderBottomRightRadius: "2500px 45px",    boxShadow: "0 10px 25px rgba(0,0,0,.08)",
    transition: "transform .6s cubic-bezier(.25,.8,.25,1)",
    zIndex: 1000,
  },

  lowerLid: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    height: "65%",
    background: "#111",
borderTopLeftRadius: "2500px 45px",
borderTopRightRadius: "2500px 45px",    boxShadow: "0 -10px 25px rgba(0,0,0,.08)",
    transition: "transform .6s cubic-bezier(.25,.8,.25,1)",
    zIndex: 1000,
  },
};