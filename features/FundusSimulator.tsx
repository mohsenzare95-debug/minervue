"use client";

import {
  useRef,
  useState,
} from "react";


export default function FundusSimulator() {

    const [knobGroove,setKnobGroove] = useState(0);


  const [offset,setOffset] = useState({
    x:0,
    y:0,
  });


  const [stickPosition,setStickPosition] =
    useState({
      x:0,
      y:0,
    });



  const joystickActive = useRef(false);


  const joystickCenter = useRef({
    x:0,
    y:0,
  });



  const velocity = useRef({
    x:0,
    y:0,
  });



  const animationFrame = useRef<number | null>(null);



// بزرگنمایی
const zoom = 6;


const imageSize = 2560;
const viewerSize = 280;

const maxMovement =
((imageSize * zoom) - viewerSize) /10;



// ---------------- BEAM CONTROL ----------------

const [beamWidth,setBeamWidth] = useState(60);

const beamActive = useRef(false);

const beamStartY = useRef(0);

const beamStartValue = useRef(60);



const moveBeam = (
  e:PointerEvent
)=>{

  if(!beamActive.current)
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

  setKnobGroove(prev=>prev - dy * 0.15);
  

};



const stopBeam = ()=>{

  beamActive.current=false;


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
  e:React.PointerEvent<HTMLDivElement>
)=>{

  e.preventDefault();
  e.currentTarget.setPointerCapture(e.pointerId);


  beamActive.current=true;


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



// ---------------- IMAGE MOVEMENT ----------------


const moveImage = (
  dx:number,
  dy:number
)=>{

  setOffset(prev=>({

    x:Math.max(
      -maxMovement,
      Math.min(
        maxMovement,
        prev.x + dx
      )
    ),


    y:Math.max(
      -maxMovement,
      Math.min(
        maxMovement,
        prev.y + dy
      )
    ),

  }));

};





const animateMovement = ()=>{


  if(
    joystickActive.current
  ){


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
  e:PointerEvent
)=>{


  if(
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
      dx*dx + dy*dy
    );



  const maxDistance = 45;



  let x = dx;

  let y = dy;




  if(
    distance > maxDistance
  ){

    x =
    dx / distance * maxDistance;


    y =
    dy / distance * maxDistance;

  }




  setStickPosition({
    x,
    y,
  });





  velocity.current={

    x:-x/(4 * zoom),

    y:-y/(4 * zoom),

  };


};





const stopJoystick = ()=>{


  joystickActive.current=false;


  velocity.current={

    x:0,

    y:0,

  };



  setStickPosition({

    x:0,

    y:0,

  });





  if(
    animationFrame.current
  ){

    cancelAnimationFrame(
      animationFrame.current
    );

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
    e:React.PointerEvent<HTMLDivElement>
  )=>{


    e.preventDefault();




    const rect =
      e.currentTarget.getBoundingClientRect();




    joystickCenter.current={

      x:
      rect.left + rect.width/2,


      y:
      rect.top + rect.height/2,

    };




    joystickActive.current=true;




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








  return (

<div
  style={styles.page}
  onContextMenu={(e)=>e.preventDefault()}
>
    


      {/* FUNDUS VIEW */}


      <div style={styles.viewer}>


        <img

          src="/fundus.jpg"

          style={{

            position:"absolute",

            width:"100%",

            height:"100%",

            left:"50%",

            top:"50%",

            objectFit:"cover",

            transformOrigin:"center center",


            transform:

            `
            translate(
              calc(-50% + ${offset.x}px),
              calc(-50% + ${offset.y}px)
            )
            scale(${zoom})
            `,

          }}

        />

        {/* illumination beam */}
  <div
    style={{
      position:"absolute",
      inset:0,
      pointerEvents:"none",

      background:
`
linear-gradient(
90deg,
black 0%,
black ${50-beamWidth/2-1}%,
rgba(0,0,0,.7) ${50-beamWidth/2}%,
transparent ${50-beamWidth/2+1}%,
transparent ${50+beamWidth/2-1}%,
rgba(0,0,0,.7) ${50+beamWidth/2}%,
black ${50+beamWidth/2+1}%,
black 100%
)
`
    }}
  />




        <div style={styles.border}/>



      </div>






      {/* CONTROLS */}


      <div style={styles.controls}>


        {/* JOYSTICK */}

        <div>


          <div

            onPointerDown={
              startJoystick
            }



            style={{

              ...styles.joystick,

              userSelect:"none",

              touchAction:"none",

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






        {/* BEAM KNOB */}


        <div style={styles.beamControl}>


          <div
  onPointerDown={startBeam}
  style={{
    ...styles.beamKnob,

    backgroundPosition:
    `0px ${knobGroove}px`
  }}
/>



         
        </div>



      </div>





    </div>

  );


}










const styles:

Record<string,React.CSSProperties>

={



page:{

  minHeight:"calc(100vh - 80px)",

  display:"flex",

  flexDirection:"column",

  alignItems:"center",

  gap:50,

  paddingTop:30,

  fontFamily:"sans-serif",

  userSelect:"none",

  WebkitUserSelect:"none",

  touchAction:"none",

},






viewer:{


  width:280,


  height:280,



  borderRadius:"50%",


  overflow:"hidden",



  position:"relative",



  background:"#000",



  boxShadow:

  "0 8px 25px rgba(0,0,0,.15)",


},






border:{


  position:"absolute",


  inset:0,



  borderRadius:"50%",



  border:

  "4px solid rgba(255,255,255,.7)",



  pointerEvents:"none",



},







controls:{
  position:"relative",
  width:"280px",
  height:"180px",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
},







joystick:{


  width:130,


  height:130,



  borderRadius:"50%",



  background:"#fff",



  border:

  "2px solid #ddd",



  display:"flex",



  justifyContent:"center",



  alignItems:"center",



  cursor:"grab",



  boxShadow:

  "0 5px 15px rgba(0,0,0,.1)",


},








stick:{


  width:45,


  height:45,



  borderRadius:"50%",



  background:"#12444b",


},








label:{


  marginTop:8,



  fontSize:14,



  color:"#555",



  textAlign:"center",


},







beamControl:{

  position:"absolute",

  left:"-45px",

  top:"-60px",

  width:80,

  height:100,

  display:"flex",

  justifyContent:"center",

  alignItems:"center",

},


beamKnob:{

  width:26,

  height:60,

  borderRadius:6,

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

  cursor:"ns-resize",

  boxShadow:
  "0 2px 5px rgba(0,0,0,.35)",

},


beamLabel:{


  marginTop:8,


  fontSize:12,


  color:"#555",


},



};