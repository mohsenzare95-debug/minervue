"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";


export default function FundusSimulator() {


  // =========================================================
  // BASIC IMAGE STATE
  // =========================================================

  const [offset, setOffset] = useState({
    x: 0,
    y: 0,
  });


  // Gaze offset
  const [gazeOffset, setGazeOffset] = useState({
    x: 0,
    y: 0,
  });


  // Bell's phenomenon offset
  const [bellOffset, setBellOffset] = useState({
    x: 0,
    y: 0,
  });


  // Eyelid blink amount
  const [blinkAmount, setBlinkAmount] =
    useState(0);


  // =========================================================
  // JOYSTICK
  // =========================================================

  const [stickPosition, setStickPosition] =
    useState({
      x: 0,
      y: 0,
    });


  const joystickActive =
    useRef(false);


  const joystickCenter =
    useRef({
      x: 0,
      y: 0,
    });


  const velocity =
    useRef({
      x: 0,
      y: 0,
    });


  const animationFrame =
    useRef<number | null>(null);


  // =========================================================
  // ZOOM
  // =========================================================

  const zoom = 6;

  const imageSize = 2560;

  const viewerSize = 280;


  const maxMovement =
    ((imageSize * zoom) - viewerSize) / 2;


  // =========================================================
  // BEAM CONTROL
  // =========================================================

  const [beamWidth, setBeamWidth] =
    useState(60);


  const [knobGroove, setKnobGroove] =
    useState(0);


  const beamActive =
    useRef(false);


  const beamStartY =
    useRef(0);


  const beamStartValue =
    useRef(60);


  const moveBeam = (
    e: PointerEvent
  ) => {


    if (!beamActive.current)
      return;


    const dy =
      (beamStartY.current - e.clientY) * 0.25;


    let value =
      beamStartValue.current + dy;


    value = Math.max(
      20,
      Math.min(
        100,
        value
      )
    );


    setBeamWidth(value);


    setKnobGroove(
      prev =>
        prev - dy * 0.15
    );

  };


  const stopBeam = () => {

    beamActive.current = false;


    window.removeEventListener(
      "pointermove",
      moveBeam
    );


    window.removeEventListener(
      "pointerup",
      stopBeam
    );

  };


  const startBeam = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {


    e.preventDefault();


    e.currentTarget.setPointerCapture(
      e.pointerId
    );


    beamActive.current = true;


    beamStartY.current =
      e.clientY;


    beamStartValue.current =
      beamWidth;


    window.addEventListener(
      "pointermove",
      moveBeam
    );


    window.addEventListener(
      "pointerup",
      stopBeam
    );

  };


  // =========================================================
  // IMAGE MOVEMENT
  // =========================================================

  const moveImage = (
    dx: number,
    dy: number
  ) => {


    setOffset(prev => ({


      x: Math.max(
        -maxMovement,
        Math.min(
          maxMovement,
          prev.x + dx
        )
      ),


      y: Math.max(
        -maxMovement,
        Math.min(
          maxMovement,
          prev.y + dy
        )
      ),


    }));

  };


  // =========================================================
  // JOYSTICK ANIMATION
  // =========================================================

  const animateMovement = () => {


    if (
      joystickActive.current
    ) {


      moveImage(
        velocity.current.x,
        velocity.current.y
      );


      animationFrame.current =
        requestAnimationFrame(
          animateMovement
        );

    }

  };


  const moveJoystick = (
    e: PointerEvent
  ) => {


    if (
      !joystickActive.current
    )
      return;


    const dx =
      e.clientX -
      joystickCenter.current.x;


    const dy =
      e.clientY -
      joystickCenter.current.y;


    const distance =
      Math.sqrt(
        dx * dx +
        dy * dy
      );


    const maxDistance = 45;


    let x = dx;

    let y = dy;


    if (
      distance > maxDistance
    ) {


      x =
        dx /
        distance *
        maxDistance;


      y =
        dy /
        distance *
        maxDistance;

    }


    setStickPosition({
      x,
      y,
    });


    velocity.current = {

      x: -x / (4 * zoom),

      y: -y / (4 * zoom),

    };

  };


  const stopJoystick = () => {


    joystickActive.current = false;


    velocity.current = {

      x: 0,

      y: 0,

    };


    setStickPosition({

      x: 0,

      y: 0,

    });


    if (
      animationFrame.current
    ) {


      cancelAnimationFrame(
        animationFrame.current
      );


      animationFrame.current = null;

    }


    window.removeEventListener(
      "pointermove",
      moveJoystick
    );


    window.removeEventListener(
      "pointerup",
      stopJoystick
    );

  };


  const startJoystick = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {


    e.preventDefault();


    const rect =
      e.currentTarget.getBoundingClientRect();


    joystickCenter.current = {

      x:
        rect.left +
        rect.width / 2,

      y:
        rect.top +
        rect.height / 2,

    };


    joystickActive.current =
      true;


    window.addEventListener(
      "pointermove",
      moveJoystick
    );


    window.addEventListener(
      "pointerup",
      stopJoystick
    );


    animateMovement();

  };


  // =========================================================
  // GAZE CONTROL
  // =========================================================

  const gazeAmount = 135;


  const setGaze = (
    x: number,
    y: number
  ) => {


    // Every gaze starts from central position

    setOffset({
      x: 0,
      y: 0,
    });


    // Set absolute gaze position

    setGazeOffset({
      x,
      y,
    });

  };


  const resetGaze = () => {


    setOffset({
      x: 0,
      y: 0,
    });


    setGazeOffset({
      x: 0,
      y: 0,
    });

  };


  // =========================================================
  // GAZE DIRECTIONS
  // =========================================================

  const gazeDirections = [

    {
      x: 0,
      y: gazeAmount,
    },

    {
      x: -gazeAmount,
      y: gazeAmount,
    },

    {
      x: -gazeAmount,
      y: 0,
    },

    {
      x: -gazeAmount,
      y: -gazeAmount,
    },

    {
      x: 0,
      y: -gazeAmount,
    },

    {
      x: gazeAmount,
      y: -gazeAmount,
    },

    {
      x: gazeAmount,
      y: 0,
    },

    {
      x: gazeAmount,
      y: gazeAmount,
    },

  ];


  // =========================================================
  // BELL'S PHENOMENON + BLINK
  // =========================================================

  const bellAnimation =
    useRef<number | null>(null);


  const bellTimeout =
    useRef<ReturnType<typeof setTimeout> | null>(null);


  const beamWidthRef =
    useRef(beamWidth);


  useEffect(() => {

    beamWidthRef.current =
      beamWidth;

  }, [beamWidth]);


  useEffect(() => {

    let cancelled = false;


    const runBell = () => {

      if (cancelled)
        return;


      const currentBeam =
        beamWidthRef.current;


      const normalizedBeam =
        (currentBeam - 20) / 80;


      const bellAmplitude =
        10 +
        normalizedBeam * 30;


      const duration =
        700 -
        normalizedBeam * 250;


      const blinkIntensity =
        0.12 +
        normalizedBeam * 0.35;


      const startTime =
        performance.now();


      const animateBell = (
        now: number
      ) => {


        if (cancelled)
          return;


        const elapsed =
          now - startTime;


        const progress =
          Math.min(
            elapsed / duration,
            1
          );


        const movementProgress =
          Math.sin(
            progress * Math.PI
          );


        const bellMovement =
          movementProgress *
          bellAmplitude;


        setBellOffset({

          x: 0,

          y: bellMovement,

        });


        const blinkMovement =
          movementProgress *
          blinkIntensity;


        setBlinkAmount(
          blinkMovement
        );


        if (
          progress < 1
        ) {


          bellAnimation.current =
            requestAnimationFrame(
              animateBell
            );


        } else {


          setBellOffset({

            x: 0,

            y: 0,

          });


          setBlinkAmount(0);


          const interval =
            3000 -
            normalizedBeam * 2000;


          bellTimeout.current =
            setTimeout(
              runBell,
              interval
            );

        }

      };


      bellAnimation.current =
        requestAnimationFrame(
          animateBell
        );

    };


    bellTimeout.current =
      setTimeout(
        runBell,
        3000
      );


    return () => {


      cancelled = true;


      if (
        bellAnimation.current !== null
      ) {


        cancelAnimationFrame(
          bellAnimation.current
        );


        bellAnimation.current =
          null;

      }


      if (
        bellTimeout.current !== null
      ) {


        clearTimeout(
          bellTimeout.current
        );


        bellTimeout.current =
          null;

      }


    };


  }, []);


  // =========================================================
  // CLEANUP
  // =========================================================

  useEffect(() => {


    return () => {


      window.removeEventListener(
        "pointermove",
        moveBeam
      );


      window.removeEventListener(
        "pointerup",
        stopBeam
      );


      window.removeEventListener(
        "pointermove",
        moveJoystick
      );


      window.removeEventListener(
        "pointerup",
        stopJoystick
      );


    };


  }, []);


  // =========================================================
  // TOTAL IMAGE OFFSET
  // =========================================================

  const totalX =
    offset.x +
    gazeOffset.x +
    bellOffset.x;


  const totalY =
    offset.y +
    gazeOffset.y +
    bellOffset.y;


  // =========================================================
  // EYELID POSITION
  // =========================================================

  const upperLidY =
    -88 +
    blinkAmount * 3;


  const lowerLidY =
    92 -
    blinkAmount * 32;


  // =========================================================
  // RENDER
  // =========================================================

  return (

    <div
      style={styles.page}
      onContextMenu={
        e =>
          e.preventDefault()
      }
    >


      {/* =====================================================
          FUNDUS LENS + GAZE RING
      ====================================================== */}


      <div style={styles.lensWrapper}>


        {/* ===================================================
            GAZE RING
        ==================================================== */}


        <div style={styles.gazeRing}>


          {gazeDirections.map(
            (direction, index) => (

              <button

                key={index}

                type="button"

                aria-label={
                  `Set gaze direction ${index + 1}`
                }

                onClick={() =>
                  setGaze(
                    direction.x,
                    direction.y
                  )
                }

                style={{
                  ...styles.gazeSegment,

                  transform:
                    `rotate(${index * 45}deg)`,

                }}

              />

            )
          )}


          {/* =================================================
              CENTER RESET
          ================================================== */}


          <button

            type="button"

            onClick={resetGaze}

            aria-label="Reset gaze"

            style={styles.resetGaze}

          >

            <span
              style={styles.resetDot}
            />

          </button>


        </div>


        {/* ===================================================
            ORIGINAL LENS
        ==================================================== */}


        <div style={styles.lensOuterRing}>


          <div style={styles.viewer}>


            <div
              style={{
                ...styles.upperEyelid,

                transform:
                  `translateY(${upperLidY}%)`,
              }}
            />


            <div
              style={{
                ...styles.lowerEyelid,

                transform:
                  `translateY(${lowerLidY}%)`,
              }}
            />


            <img

              src="/fundus.jpg"

              draggable={false}

              style={{

                position:
                  "absolute",

                width:
                  "100%",

                height:
                  "100%",

                left:
                  "50%",

                top:
                  "50%",

                objectFit:
                  "cover",

                transformOrigin:
                  "center center",

                transform:

                  `

                  translate(

                    calc(-50% + ${totalX}px),

                    calc(-50% + ${totalY}px)

                  )

                  rotate(180deg)

                  scale(${zoom})

                  `,

              }}

            />


            {/* =================================================
                ILLUMINATION BEAM
            ================================================== */}


            <div

              style={{

                position:
                  "absolute",

                inset: 0,

                pointerEvents:
                  "none",

                background:

                  `

                  linear-gradient(

                    90deg,

                    black 0%,

                    black ${50 - beamWidth / 2 - 1}%,

                    rgba(0,0,0,.72)
                      ${50 - beamWidth / 2}%,

                    transparent
                      ${50 - beamWidth / 2 + 1}%,

                    transparent
                      ${50 + beamWidth / 2 - 1}%,

                    rgba(0,0,0,.72)
                      ${50 + beamWidth / 2}%,

                    black
                      ${50 + beamWidth / 2 + 1}%,

                    black 100%

                  )

                  `,

              }}

            />


            <div
              style={styles.innerLensEdge}
            />


          </div>


        </div>


      </div>


      {/* =====================================================
          CONTROLS
      ====================================================== */}


      <div style={styles.controls}>


        {/* ===================================================
            JOYSTICK
        ==================================================== */}


        <div>

          <div

            onPointerDown={
              startJoystick
            }

            style={{

              ...styles.joystick,

              userSelect:
                "none",

              touchAction:
                "none",

            }}

          >


            <div

              style={{

                ...styles.stick,

                transform:

                  `

                  translate(

                    ${stickPosition.x}px,

                    ${stickPosition.y}px

                  )

                  `,

              }}

            />


          </div>


        </div>


        {/* ===================================================
            BEAM KNOB
        ==================================================== */}


        <div
          style={styles.beamControl}
        >


          <div

            onPointerDown={
              startBeam
            }

            style={{

              ...styles.beamKnob,

              backgroundPosition:

                `0px ${knobGroove}px`,

            }}

          />


        </div>


        {/* ===================================================
            EAR / RESET GAZE CONTROL
        ==================================================== */}


        <button

          type="button"

          aria-label="Reset gaze to primary position"

          onClick={resetGaze}

          style={styles.earControl}

        >

          <svg

            width="30"

            height="30"

            viewBox="0 0 24 24"

            fill="none"

            xmlns="http://www.w3.org/2000/svg"

            aria-hidden="true"

          >

            <path

              d="M19.5 10.5C19.5 6.36 16.14 3 12 3C7.86 3 4.5 6.36 4.5 10.5C4.5 13.2 5.94 15.05 7.3 16.5C8.25 17.51 8.7 18.45 8.7 19.5C8.7 20.33 9.37 21 10.2 21H12.2C13.19 21 14 20.19 14 19.2C14 18.45 14.3 17.82 14.85 17.25C15.45 16.63 16.2 16.02 16.85 15.3C18.35 13.65 19.5 12 19.5 10.5Z"

              stroke="currentColor"

              strokeWidth="1.5"

              strokeLinecap="round"

              strokeLinejoin="round"

            />

            <path

              d="M12.2 16.2C11.2 16.2 10.5 15.45 10.5 14.5C10.5 13.35 11.4 12.7 12.15 12.05C12.95 11.35 13.5 10.75 13.5 9.8C13.5 8.75 12.65 7.9 11.6 7.9C10.55 7.9 9.7 8.75 9.7 9.8"

              stroke="currentColor"

              strokeWidth="1.5"

              strokeLinecap="round"

              strokeLinejoin="round"

            />

          </svg>

        </button>


      </div>


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

    minHeight:
      "calc(100vh - 80px)",

    display:
      "flex",

    flexDirection:
      "column",

    alignItems:
      "center",

    gap:
      50,

    paddingTop:
      30,

    fontFamily:
      "sans-serif",

    userSelect:
      "none",

    WebkitUserSelect:
      "none",

    touchAction:
      "none",

  },


  // ==========================================================
  // LENS WRAPPER
  // ==========================================================


  lensWrapper: {

    position:
      "relative",

    width:
      400,

    height:
      400,

    display:
      "flex",

    justifyContent:
      "center",

    alignItems:
      "center",

  },


  // ==========================================================
  // ORIGINAL LENS OUTER RING
  // ==========================================================


  lensOuterRing: {

    position:
      "relative",

    width:
      320,

    height:
      320,

    borderRadius:
      "50%",

    display:
      "flex",

    justifyContent:
      "center",

    alignItems:
      "center",

    background:

      `

      repeating-conic-gradient(

        from 0deg,

        #555 0deg,

        #777 1deg,

        #444 2deg,

        #777 3deg,

        #555 4deg

      )

      `,

    boxShadow:

      `

      0 0 0 7px #111,

      0 5px 20px
      rgba(0,0,0,.3)

      `,

    zIndex:
      5,

  },


  // ==========================================================
  // GAZE RING
  // ==========================================================


  gazeRing: {

    position:
      "absolute",

    width:
      390,

    height:
      390,

    borderRadius:
      "50%",

    background:

      `

      repeating-conic-gradient(

        from -22.5deg,

        rgba(18,68,75,.07) 0deg,

        rgba(18,68,75,.07) 44.2deg,

        rgba(255,255,255,.95) 44.2deg,

        rgba(255,255,255,.95) 45deg

      )

      `,

    border:
      "1px solid rgba(18,68,75,.18)",

    boxShadow:

      `

      0 0 0 1px rgba(255,255,255,.8),

      0 6px 18px rgba(0,0,0,.08),

      inset 0 1px 0 rgba(255,255,255,.9)

      `,

    zIndex:
      2,

  },


  // ==========================================================
  // GAZE SEGMENT
  // ==========================================================


  gazeSegment: {

    position:
      "absolute",

    left:
      0,

    top:
      0,

    width:
      "100%",

    height:
      "100%",

    margin:
      0,

    padding:
      0,

    border:
      "none",

    borderRadius:
      "50%",

    background:
      "transparent",

    cursor:
      "pointer",

    zIndex:
      10,

    clipPath:
      "polygon(50% 50%, 46% 0%, 54% 0%)",

    transformOrigin:
      "50% 50%",

    transition:
      "background .15s ease",

  },


  // ==========================================================
  // RESET GAZE
  // ==========================================================


  resetGaze: {

    position:
      "absolute",

    left:
      "50%",

    top:
      "50%",

    width:
      38,

    height:
      38,

    transform:
      "translate(-50%, -50%)",

    borderRadius:
      "50%",

    border:
      "1px solid rgba(18,68,75,.25)",

    background:
      "rgba(255,255,255,.92)",

    display:
      "flex",

    alignItems:
      "center",

    justifyContent:
      "center",

    cursor:
      "pointer",

    padding:
      0,

    zIndex:
      30,

    boxShadow:

      `

      0 2px 8px rgba(0,0,0,.08),

      inset 0 1px 0 rgba(255,255,255,.9)

      `,

  },


  resetDot: {

    width:
      7,

    height:
      7,

    borderRadius:
      "50%",

    background:
      "#12444b",

    opacity:
      .75,

  },


  // ==========================================================
  // VIEWER
  // ==========================================================


  viewer: {

    width:
      280,

    height:
      280,

    borderRadius:
      "50%",

    overflow:
      "hidden",

    position:
      "relative",

    background:
      "#000",

    boxShadow:

      `

      inset 0 0 0 6px #050505,

      inset 0 0 15px
      rgba(0,0,0,.9)

      `,

  },


  // ==========================================================
  // EYELIDS
  // ==========================================================


  upperEyelid: {

    position:
      "absolute",

    left:
      0,

    top:
      0,

    width:
      "100%",

    height:
      "55%",

    background:
      "#111",

    borderBottomLeftRadius:
      "50% 18%",

    borderBottomRightRadius:
      "50% 18%",

    zIndex:
      10,

    pointerEvents:
      "none",

    boxShadow:
      "0 3px 5px rgba(80,50,25,.15)",

  },


  lowerEyelid: {

    position:
      "absolute",

    left:
      0,

    bottom:
      0,

    width:
      "100%",

    height:
      "55%",

    background:
      "#111",

    borderTopLeftRadius:
      "50% 28%",

    borderTopRightRadius:
      "50% 28%",

    zIndex:
      10,

    pointerEvents:
      "none",

    boxShadow:
      "0 -4px 6px rgba(80,50,25,.18)",

  },


  // ==========================================================
  // INNER LENS EDGE
  // ==========================================================


  innerLensEdge: {

    position:
      "absolute",

    inset:
      0,

    borderRadius:
      "50%",

    border:
      "5px solid #050505",

    pointerEvents:
      "none",

    zIndex:
      20,

    boxShadow:

      `

      inset 0 0 5px
      rgba(255,255,255,.15)

      `,

  },


  // ==========================================================
  // CONTROLS
  // ==========================================================


  controls: {

    position:
      "relative",

    width:
      "280px",

    height:
      "180px",

    display:
      "flex",

    justifyContent:
      "center",

    alignItems:
      "center",

  },


  // ==========================================================
  // JOYSTICK
  // ==========================================================


  joystick: {

    width:
      130,

    height:
      130,

    borderRadius:
      "50%",

    background:
      "#fff",

    border:
      "2px solid #ddd",

    display:
      "flex",

    justifyContent:
      "center",

    alignItems:
      "center",

    cursor:
      "grab",

    boxShadow:
      "0 5px 15px rgba(0,0,0,.1)",

  },


  stick: {

    width:
      45,

    height:
      45,

    borderRadius:
      "50%",

    background:
      "#12444b",

  },


  // ==========================================================
  // BEAM CONTROL
  // ==========================================================


  beamControl: {

    position:
      "absolute",

    left:
      "-45px",

    top:
      "-60px",

    width:
      80,

    height:
      100,

    display:
      "flex",

    justifyContent:
      "center",

    alignItems:
      "center",

  },


  beamKnob: {

    width:
      26,

    height:
      60,

    borderRadius:
      6,

    background:

      `

      repeating-linear-gradient(

        0deg,

        #8a8a8a 0px,

        #8a8a8a 3px,

        #d8d8d8 3px,

        #d8d8d8 5px,

        #8a8a8a 5px,

        #8a8a8a 8px

      ),

      linear-gradient(

        90deg,

        #666,

        #ddd,

        #666

      )

      `,

    border:
      "2px solid #555",

    cursor:
      "ns-resize",

    boxShadow:
      "0 2px 5px rgba(0,0,0,.35)",

  },


  // ==========================================================
  // EAR / GAZE RESET CONTROL
  // ==========================================================


  earControl: {

    position:
      "absolute",

    right:
      "-45px",

    top:
      "-60px",

    width:
      80,

    height:
      100,

    display:
      "flex",

    alignItems:
      "center",

    justifyContent:
      "center",

    padding:
      0,

    border:
      "none",

    background:
      "transparent",

    color:
      "#12444b",

    cursor:
      "pointer",

    touchAction:
      "none",

    opacity:
      0.65,

    transition:
      "opacity .18s ease, transform .18s ease",

  },

};