"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

// ============================================================
// TYPES
// ============================================================

type Pathology =
  | "Severe NPDR"
  | "ERM"
  | "Choroidal Rupture"
  | "CNV"
  | "Retinitis Pigmentosa"
  | "Best Disease"
  | "CACD";

// ============================================================
// PATHOLOGIES
// ============================================================

const PATHOLOGIES: Pathology[] = [
  "Severe NPDR",
  "ERM",
  "Choroidal Rupture",
  "CNV",
  "Retinitis Pigmentosa",
  "Best Disease",
  "CACD",
];

// ============================================================
// Sources
// ============================================================

const PATHOLOGY_IMAGES: Record<Pathology, string> = {
  "Choroidal Rupture": "/Choroidal_Rupture.png",
  "Retinitis Pigmentosa": "/Retinitis_Pigmentosa2.png",
  "Best Disease": "/Best_Disease.png",
  "CACD": "/CACD.png",
  "Severe NPDR": "/NPDR2.png",
  "ERM": "/ERM.png",
  "CNV": "/AMD.png",
};

// ============================================================
// COMPONENT
// ============================================================

export default function FundusSimulator() {
  // ==========================================================
  // PATHOLOGY
  // ==========================================================

  const [selectedPathology, setSelectedPathology] =
    useState<Pathology>(PATHOLOGIES[0]);

  const pathologyIndex =
    PATHOLOGIES.indexOf(selectedPathology);

  // ==========================================================
  // PATHOLOGY CAROUSEL DRAG / SWIPE
  // ==========================================================

  const pathologyDragStart =
    useRef<number | null>(null);

  const pathologyDragEnd =
    useRef<number | null>(null);

  const pathologyDragging =
    useRef(false);

  const previousPathology = () => {
    const currentIndex =
      PATHOLOGIES.indexOf(selectedPathology);

    const newIndex =
      currentIndex <= 0
        ? PATHOLOGIES.length - 1
        : currentIndex - 1;

    setSelectedPathology(
      PATHOLOGIES[newIndex]
    );
  };

  const nextPathology = () => {
    const currentIndex =
      PATHOLOGIES.indexOf(selectedPathology);

    const newIndex =
      currentIndex >= PATHOLOGIES.length - 1
        ? 0
        : currentIndex + 1;

    setSelectedPathology(
      PATHOLOGIES[newIndex]
    );
  };

  const handlePathologyPointerDown = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    if (e.pointerType === "mouse" && e.button !== 0) {
      return;
    }

    pathologyDragStart.current =
      e.clientX;

    pathologyDragEnd.current =
      e.clientX;

    pathologyDragging.current =
      true;

    e.currentTarget.setPointerCapture(
      e.pointerId
    );
  };

  const handlePathologyPointerMove = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!pathologyDragging.current) {
      return;
    }

    pathologyDragEnd.current =
      e.clientX;
  };

  const handlePathologyPointerUp = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!pathologyDragging.current) {
      return;
    }

    pathologyDragging.current =
      false;

    pathologyDragEnd.current =
      e.clientX;

    const start =
      pathologyDragStart.current;

    const end =
      pathologyDragEnd.current;

    if (
      start === null ||
      end === null
    ) {
      pathologyDragStart.current = null;
      pathologyDragEnd.current = null;
      return;
    }

    const distance =
      end - start;

    if (Math.abs(distance) >= 40) {
      if (distance > 0) {
        previousPathology();
      } else {
        nextPathology();
      }
    }

    pathologyDragStart.current = null;
    pathologyDragEnd.current = null;

    try {
      e.currentTarget.releasePointerCapture(
        e.pointerId
      );
    } catch {
      // Pointer capture may already be released.
    }
  };

  const handlePathologyPointerCancel = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    pathologyDragging.current =
      false;

    pathologyDragStart.current =
      null;

    pathologyDragEnd.current =
      null;

    try {
      e.currentTarget.releasePointerCapture(
        e.pointerId
      );
    } catch {
      // Pointer capture may already be released.
    }
  };

  // ==========================================================
  // IMAGE OFFSET
  // ==========================================================

  const [offset, setOffset] = useState({
    x: 0,
    y: 0,
  });

  // ==========================================================
  // GAZE OFFSET
  // ==========================================================

  const [gazeOffset, setGazeOffset] =
    useState({
      x: 0,
      y: 0,
    });

    // ==========================================================
  // handleGazePointerDown
  // ==========================================================
const handleGazePointerDown = (
  e: React.PointerEvent<HTMLDivElement>
) => {
  const rect =
    e.currentTarget.getBoundingClientRect();

  const centerX =
    rect.left +
    rect.width / 2;

  const centerY =
    rect.top +
    rect.height / 2;

  const dx =
    e.clientX -
    centerX;

  const dy =
    e.clientY -
    centerY;

  const distance =
    Math.sqrt(
      dx * dx +
      dy * dy
    );

  // اگر نزدیک مرکز لمس شد، ریست
  if (distance < 30) {
    resetGaze();
    return;
  }

  // زاویه نسبت به محور بالا
  const angle =
    Math.atan2(
      dx,
      -dy
    ) *
    (180 / Math.PI);

  let normalizedAngle =
    angle;

  if (normalizedAngle < 0) {
    normalizedAngle += 360;
  }

  const directionIndex =
    Math.round(
      normalizedAngle / 45
    ) % 8;

  const direction =
    gazeDirections[
      directionIndex
    ];

  setGaze(
    direction.x,
    direction.y
  );
};
  // ==========================================================
  // ZOOM
  // ==========================================================

  const zoom = 6;

  const imageSize = 2560;

  const viewerSize = 280;

  const maxMovement =
    (
      imageSize * zoom -
      viewerSize
    ) / 2;

  // ==========================================================
  // BEAM
  // ==========================================================

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

  // ==========================================================
  // JOYSTICK
  // ==========================================================

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

  // ==========================================================
  // IMAGE MOVEMENT
  // ==========================================================

  const moveImage = (
    dx: number,
    dy: number
  ) => {
    setOffset(previous => ({
      x: Math.max(
        -maxMovement,
        Math.min(
          maxMovement,
          previous.x + dx
        )
      ),

      y: Math.max(
        -maxMovement,
        Math.min(
          maxMovement,
          previous.y + dy
        )
      ),
    }));
  };

  // ==========================================================
  // JOYSTICK MOVE
  // ==========================================================

  const moveJoystick = (
    e: PointerEvent
  ) => {
    if (!joystickActive.current) {
      return;
    }

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

    if (distance > maxDistance) {
      x =
        (dx /
          distance) *
        maxDistance;

      y =
        (dy /
          distance) *
        maxDistance;
    }

    setStickPosition({
      x,
      y,
    });

    velocity.current = {
      x:
        -x /
        (4 * zoom),

      y:
        -y /
        (4 * zoom),
    };
  };

  // ==========================================================
  // JOYSTICK ANIMATION
  // ==========================================================

  const animateMovement = () => {
    if (!joystickActive.current) {
      return;
    }

    moveImage(
      velocity.current.x,
      velocity.current.y
    );

    animationFrame.current =
      requestAnimationFrame(
        animateMovement
      );
  };

  // ==========================================================
  // START JOYSTICK
  // ==========================================================

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

  // ==========================================================
  // STOP JOYSTICK
  // ==========================================================

  const stopJoystick = () => {
    joystickActive.current =
      false;

    velocity.current = {
      x: 0,
      y: 0,
    };

    setStickPosition({
      x: 0,
      y: 0,
    });

    if (
      animationFrame.current !== null
    ) {
      cancelAnimationFrame(
        animationFrame.current
      );

      animationFrame.current =
        null;
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

  // ==========================================================
  // BEAM
  // ==========================================================

  const moveBeam = (
    e: PointerEvent
  ) => {
    if (!beamActive.current) {
      return;
    }

    const dy =
      (
        beamStartY.current -
        e.clientY
      ) * 0.25;

    let value =
      beamStartValue.current +
      dy;

    value =
      Math.max(
        20,
        Math.min(
          100,
          value
        )
      );

    setBeamWidth(
      value
    );

    setKnobGroove(
      previous =>
        previous -
        dy *
        0.15
    );
  };

  const stopBeam = () => {
    beamActive.current =
      false;

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

    beamActive.current =
      true;

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

  // ==========================================================
  // GAZE
  // ==========================================================

  const gazeAmount = 135;

  const setGaze = (
  x: number,
  y: number
) => {
  setOffset({
    x: 0,
    y: 0,
  });

  setGazeOffset({
    x: -x,
    y: -y,
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

  // ==========================================================
  // GAZE DIRECTIONS
  // ==========================================================

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

  // ==========================================================
  // CLEANUP
  // ==========================================================

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

      if (
        animationFrame.current !== null
      ) {
        cancelAnimationFrame(
          animationFrame.current
        );

        animationFrame.current =
          null;
      }
    };
  }, []);

  // ==========================================================
  // TOTAL IMAGE OFFSET
  // ==========================================================

  const totalX =
    offset.x +
    gazeOffset.x;

  const totalY =
    offset.y +
    gazeOffset.y;

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div
      style={styles.page}
      onContextMenu={
        e =>
          e.preventDefault()
      }
    >
      {/* ====================================================
          PATHOLOGY CAROUSEL
      ===================================================== */}

      <div
  style={
    styles.pathologyCarousel
  }
>
  <button
    type="button"
    onClick={
      previousPathology
    }
    aria-label="Previous pathology"
    style={
      styles.pathologyArrow
    }
  >
    ‹
  </button>

  <div
    style={
      styles.pathologyViewport
    }
    onPointerDown={
      handlePathologyPointerDown
    }
    onPointerMove={
      handlePathologyPointerMove
    }
    onPointerUp={
      handlePathologyPointerUp
    }
    onPointerCancel={
      handlePathologyPointerCancel
    }
  >
    <div
      style={
        styles.pathologyTrack
      }
    >
      <div
        style={
          styles.pathologySideLabel
        }
      >
        {
          PATHOLOGIES[
            pathologyIndex === 0
              ? PATHOLOGIES.length - 1
              : pathologyIndex - 1
          ]
        }
      </div>

      <div
        style={
          styles.pathologySelected
        }
      >
        {
          selectedPathology
        }
      </div>

      <div
        style={
          styles.pathologySideLabel
        }
      >
        {
          PATHOLOGIES[
            pathologyIndex ===
            PATHOLOGIES.length - 1
              ? 0
              : pathologyIndex + 1
          ]
        }
      </div>
    </div>
  </div>

  <button
    type="button"
    onClick={
      nextPathology
    }
    aria-label="Next pathology"
    style={
      styles.pathologyArrow
    }
  >
    ›
  </button>
</div>

      {/* ====================================================
          LENS
      ===================================================== */}

      <div
        style={
          styles.lensWrapper
        }
      >
        {/* ==================================================
            GAZE RING
        =================================================== */}

        <div
  style={
    styles.gazeRing
  }
  onPointerDown={
    handleGazePointerDown
  }
>
          {
            gazeDirections.map(
              (
                direction,
                index
              ) => (
               <button
  key={index}
  type="button"
  aria-label={
    "Set gaze direction " +
    String(index + 1)
  }
  style={{
    ...styles.gazeSegment,

    transform:
      "rotate(" +
      String(index * 45) +
      "deg)",
  }}
/>
              )
            )
          }

          {/* =================================================
              CENTER RESET
          ================================================== */}

          <button
            type="button"
            onClick={
              resetGaze
            }
            aria-label="Reset gaze"
            style={
              styles.resetGaze
            }
          >
            <span
              style={
                styles.resetDot
              }
            />
          </button>
        </div>

        {/* ==================================================
            FUNDUS VIEWER
        =================================================== */}

        <div
          style={
            styles.lensOuterRing
          }
        >
          <div
            style={
              styles.viewer
            }
          >
            <img
              src={PATHOLOGY_IMAGES[selectedPathology]}
              draggable={
                false
              }
              alt="Fundus"
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
                  "translate(" +
                  "calc(-50% + " +
                  String(totalX) +
                  "px), " +
                  "calc(-50% + " +
                  String(totalY) +
                  "px)) " +
                  "rotate(180deg) " +
                  "scale(" +
                  String(zoom) +
                  ")",
              }}
            />

            {/* ==============================================
                BEAM
            =============================================== */}

            <div
              style={{
                position:
                  "absolute",

                inset:
                  0,

                pointerEvents:
                  "none",

                background:
                  "linear-gradient(" +
                  "90deg, " +
                  "black 0%, " +
                  "black " +
                  String(
                    50 -
                    beamWidth /
                    2 -
                    1
                  ) +
                  "%, " +
                  "rgba(0,0,0,.72) " +
                  String(
                    50 -
                    beamWidth /
                    2
                  ) +
                  "%, " +
                  "transparent " +
                  String(
                    50 -
                    beamWidth /
                    2 +
                    1
                  ) +
                  "%, " +
                  "transparent " +
                  String(
                    50 +
                    beamWidth /
                    2 -
                    1
                  ) +
                  "%, " +
                  "rgba(0,0,0,.72) " +
                  String(
                    50 +
                    beamWidth /
                    2
                  ) +
                  "%, " +
                  "black " +
                  String(
                    50 +
                    beamWidth /
                    2 +
                    1
                  ) +
                  "%, " +
                  "black 100%)",
              }}
            />

            <div
              style={
                styles.innerLensEdge
              }
            />
          </div>
        </div>
      </div>

      {/* ====================================================
          CONTROLS
      ===================================================== */}

      <div
        style={
          styles.controls
        }
      >
        {/* ==================================================
            JOYSTICK
        =================================================== */}

        <div
          onPointerDown={
            startJoystick
          }
          style={
            styles.joystick
          }
        >
          <div
            style={{
              ...styles.stick,

              transform:
                "translate(" +
                String(
                  stickPosition.x
                ) +
                "px, " +
                String(
                  stickPosition.y
                ) +
                "px)",
            }}
          />
        </div>

        {/* ==================================================
            BEAM KNOB
        =================================================== */}

        <div
          style={
            styles.beamControl
          }
        >
          <div
            onPointerDown={
              startBeam
            }
            style={{
              ...styles.beamKnob,

              backgroundPosition:
                "0px " +
                String(
                  knobGroove
                ) +
                "px",
            }}
          />
        </div>

        {/* ==================================================
            TARGET BUTTON
        =================================================== */}

        <button
          type="button"
          aria-label="Reset gaze"
          onClick={
            resetGaze
          }
          style={
            styles.targetControl
          }
        >
          <svg
            width="42"
            height="42"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="8"
              stroke="currentColor"
              strokeWidth="1.5"
            />

            <circle
              cx="12"
              cy="12"
              r="3"
              stroke="currentColor"
              strokeWidth="1.5"
            />

            <path
              d="M12 1.5V5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            <path
              d="M12 19V22.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            <path
              d="M1.5 12H5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            <path
              d="M19 12H22.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
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

const styles: Record<
  string,
  React.CSSProperties
> = {
  // ==========================================================
  // PAGE
  // ==========================================================

  page: {
    width: "100%",
    maxWidth: 480,

    minHeight: "calc(100vh - 80px)",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    gap: 10,
    paddingTop: 10,

    fontFamily: "sans-serif",

    userSelect: "none",
    WebkitUserSelect: "none",

    touchAction: "none",

    overflow: "hidden",
  },

  // ==========================================================
  // PATHOLOGY
  // ==========================================================

  pathologyCarousel: {
  width: "100%",
  maxWidth: 420,

  height: 52,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  gap: 4,

  touchAction: "pan-y",
},

pathologyViewport: {
  width: "calc(100% - 60px)",
  maxWidth: 340,

  height: 46,

  overflow: "hidden",

  borderRadius: 12,

  background: "rgba(255,255,255,.95)",

  border: "1px solid rgba(18,68,75,.14)",

  boxShadow: "0 3px 12px rgba(0,0,0,.07)",

  cursor: "grab",

  touchAction: "pan-y",
},

  pathologyTrack: {
    width:
      "100%",

    height:
      "100%",

    display:
      "flex",

    alignItems:
      "center",

    justifyContent:
      "space-between",

    padding:
      "0 10px",

    boxSizing:
      "border-box",
  },

  pathologySideLabel: {
    width:
      90,

    overflow:
      "hidden",

    whiteSpace:
      "nowrap",

    textOverflow:
      "ellipsis",

    textAlign:
      "center",

    fontSize:
      9,

    color:
      "rgba(18,68,75,.4)",
  },

  pathologySelected: {
    flex:
      1,

    textAlign:
      "center",

    fontSize:
      13,

    fontWeight:
      600,

    color:
      "#12444b",

    whiteSpace:
      "nowrap",
  },

  pathologyArrow: {
    width:
      30,

    height:
      40,

    border:
      "none",

    background:
      "transparent",

    color:
      "#12444b",

    fontSize:
      28,

    lineHeight:
      1,

    cursor:
      "pointer",

    padding:
      0,
  },

  // ==========================================================
  // LENS WRAPPER
  // ==========================================================

  lensWrapper: {
    position: "relative",

    width: "100%",
    maxWidth: 400,

    aspectRatio: "1 / 1",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  // ==========================================================
  // LENS OUTER RING
  // ==========================================================

  lensOuterRing: {
    position: "relative",

    width: "80%",
    height: "80%",

    maxWidth: 320,
    maxHeight: 320,

    aspectRatio: "1 / 1",

    borderRadius: "50%",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    background:
      "repeating-conic-gradient(" +
      "from 0deg, " +
      "#555 0deg, " +
      "#777 1deg, " +
      "#444 2deg, " +
      "#777 3deg, " +
      "#555 4deg" +
      ")",

    boxShadow:
      "0 0 0 7px #111, " +
      "0 5px 20px rgba(0,0,0,.3)",

    zIndex: 5,
  },

  // ==========================================================
  // GAZE RING
  // ==========================================================

  gazeRing: {
    position: "absolute",

    width: "97.5%",
    height: "97.5%",

    borderRadius: "50%",

    background:
      "repeating-conic-gradient(" +
      "from -22.5deg, " +
      "rgba(18,68,75,.07) 0deg, " +
      "rgba(18,68,75,.07) 44.2deg, " +
      "rgba(255,255,255,.95) 44.2deg, " +
      "rgba(255,255,255,.95) 45deg" +
      ")",

    border: "1px solid rgba(18,68,75,.18)",

    boxShadow:
      "0 0 0 1px rgba(255,255,255,.8), " +
      "0 6px 18px rgba(0,0,0,.08), " +
      "inset 0 1px 0 rgba(255,255,255,.9)",

    zIndex: 2,

    touchAction: "none",
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
      "polygon(50% 50%, 32% 0%, 68% 0%)",

    transformOrigin:
      "50% 50%",

    transition:
      "background .15s ease",

      pointerEvents: "none",
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
      "0 2px 8px rgba(0,0,0,.08), " +
      "inset 0 1px 0 rgba(255,255,255,.9)",
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
      0.75,
  },

  // ==========================================================
  // VIEWER
  // ==========================================================

  viewer: {
    width: "100%",
    height: "100%",

    borderRadius: "50%",

    overflow: "hidden",

    position: "relative",

    background: "#000",

    boxShadow:
      "inset 0 0 0 6px #050505, " +
      "inset 0 0 15px rgba(0,0,0,.9)",
  },

  // ==========================================================
  // INNER EDGE
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
      "inset 0 0 5px rgba(255,255,255,.15)",
  },

  // ==========================================================
  // CONTROLS
  // ==========================================================

  controls: {
    position: "relative",

    width: "100%",
    maxWidth: 280,

    height: 120,

    display: "flex",

    justifyContent: "center",
    alignItems: "center",
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
    position: "absolute",

    left: "-20px",
    top: "-60px",

    width: 80,
    height: 100,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  // ==========================================================
  // BEAM KNOB
  // ==========================================================

  beamKnob: {
    width:
      26,

    height:
      60,

    borderRadius:
      6,

    background:
      "repeating-linear-gradient(" +
      "0deg, " +
      "#8a8a8a 0px, " +
      "#8a8a8a 3px, " +
      "#d8d8d8 3px, " +
      "#d8d8d8 5px, " +
      "#8a8a8a 5px, " +
      "#8a8a8a 8px" +
      "), " +
      "linear-gradient(" +
      "90deg, " +
      "#666, " +
      "#ddd, " +
      "#666" +
      ")",

    backgroundSize:
      "100% 100%, 100% 100%",

    border:
      "2px solid #555",

    cursor:
      "ns-resize",

    boxShadow:
      "0 2px 5px rgba(0,0,0,.35)",
  },

  // ==========================================================
  // TARGET
  // ==========================================================

  targetControl: {
    position: "absolute",

    right: "-20px",
    top: "-60px",

    width: 80,
    height: 100,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    border: "none",
    background: "transparent",

    color: "#12444b",

    cursor: "pointer",
    padding: 0,
  },
};