import React,{useEffect,useRef} from 'react';
import Matter from "matter-js";
import mountain from "../assets/images/mountain.png";
import Header from "../components/Header";
import cartoon2 from "../assets/images/cartoon2.png";
import cartoon from "../assets/images/cartoon1.png";
import bird from "../assets/images/bird.png";
import svgimg1 from"../assets/images/supermanOutline.svg";
import svgimg2 from"../assets/images/bird.svg";
import svgimg3 from"../assets/images/hills.png";
import mountainPath from"../assets/images/hills.svg";
import {makeBodyFromSVG} from '../utilities/utility'
import supermanImage from"../assets/images/man.png";

// import man from "../assets/images/birdsvg.svg";

const GamePlay = () => {
  let engine;
  let superman,helicopter,initialPos,mountains , initialPosOfMountain;
  let World;
  const scene = useRef();
  useEffect(()=>{
    window.addEventListener('keydown', (e) => {
      var key_code=e.keyCode
      e.preventDefault();
      console.log("key_codekey_code=",key_code)
             switch(key_code){
               case 38: //Up arrow key
                 moveUp();
                 break;
               case 40: //down arrow key
                 moveDown();
                 break;
             }
     });
    // egine variables
    var Engine = Matter.Engine,
    Render = Matter.Render;
    
    
    /// create engine and make gravity off
     engine = Engine.create({
      // positionIterations: 20
    });

    engine.world.gravity.y = 0
   
    // render canvas 
    var render = Render.create({
      element: scene.current,
      engine: engine,
      options: {
        width:scene.current.clientWidth,
        height: scene.current.clientHeight,
        wireframes: false,
        background:"rgba(#fff, 0.8)",
        // border : 10px solid red
      }
    });

   /// make bodies 
   makeBodies()
   /// hurdles 
   makeHurdles()

// updates physics
let direction = 1;
Matter.Events.on(engine, 'beforeUpdate', function (ev) {
  const val = Math.floor(Math.random()*8) +2; 
  var v = {
    x: direction*-val,
    y: 0
  }
  console.log("helicopter",  v)
  if(mountains){
    Matter.Body.setVelocity(mountains, v)
    var p = mountains.position
    if(p.x < 0){
      direction = 0
      const y = Math.floor(Math.random()*200) +100
       Matter.Body.setPosition(mountains,{x :initialPos.x, y:scene.current.clientHeight-180})
    }else {
      direction = 1
    }
    // 
  }
  if(helicopter){
    Matter.Body.setVelocity(helicopter, v)
    var p = helicopter.position
    if(p.x < 0){
      direction = 0
      const y = Math.floor(Math.random()*200) +100
       Matter.Body.setPosition(helicopter,{x :initialPos.x, y:y})
    }else {
      direction = 1
    }
    // var collision = Matter.SAT.collides(superman, helicopter); if (collision.collided) { 
    //   alert("collide")
    //   }
  }
})


    Engine.run(engine);
    Render.run(render);
  },[])

  const moveUp =()=>{
    const body = Matter.Body
    body.translate(superman,{ x :0, y:-20 })
    
  }
  
  const  moveDown =()=> {
    const body = Matter.Body
    body.translate(superman,{ x :0, y:+20 })
  }

  const makeHurdles = async ()=>{
    console.log("wimdow.height ===",window.screen)
    let world = engine.world;
    initialPos = {x : scene.current.clientWidth , y : 100}
     initialPosOfMountain = {x : scene.current.clientWidth -500 , y : scene.current.clientHeight-180}
    // initialPos = {x : 400 , y : 100}
    helicopter = await makeBodyFromSVG(svgimg2, initialPos ,bird)
    World.add(world, helicopter);
   console.log("svgimg1svgimg1svgimg1=")
    mountains = await makeBodyFromSVG(mountainPath, initialPosOfMountain ,svgimg3  )
    World.add(world, mountains);
  }

  const makeBodies = async ()=>{
  World = Matter.World;
   let world = engine.world;
   const pos = {x:100, y:200}
   console.log("supermanImage===",supermanImage)
    superman= await makeBodyFromSVG(svgimg1, pos ,supermanImage )
   console.log("bodybody=",superman)
   World.add(world, superman);


  }

  return (
    <div className="GameScreen"  >
    <div className="slide-view layer0" >
        <span />
      </div>
      <div className="slide-view layer1" >
        <span />
      </div>
      <div className="slide-view layer2" >
        <span />
      </div>
      <div className="slide-view layer3">
        <span />
      </div>
      <div className="slide-view layer4">
        <span />
      </div>
      <div className="slide-view layer5">
        <span />
      </div>
      <div className="slide-view layer6">
        <span />
      </div>      
    <div className="GameScreen-bg" ref={scene}>
    <Header />
    <div className="score">
      <h3>
        HI <span>001256</span> <span>00047</span>
      </h3>
    </div>
    {/* <div className="games-objecs">
      <div>
        <img className="superman"
          style={{ left: "200px", position: "absolute", bottom: "300px" }}
          src={cartoon}
        />
      </div>
      <div>
        <img className="aeroplane obstacle-move"
          style={{
            right: "40%",
            top: "40%",
            bottom: "10%",
          }}
          src={cartoon2}
        />
      </div>
      <div>
        <img className="bird obstacle-move"
          style={{ right: "10%", bottom: "25%" }}
          src={bird}
        />
      </div>
      <img className="obstacle-move mountain"
        style={{
          right: "24%",
       
          bottom: "0",
          width: "20%",
        }}
        src={mountain}
      />
    </div> */}
  </div>
  </div>
  );
};

export default GamePlay;