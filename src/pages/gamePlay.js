import React,{useEffect,useRef} from 'react';
import Matter from "matter-js";
import mountain from "../assets/images/mountain.png";
import Header from "../components/Header";
import cartoon2 from "../assets/images/cartoon2.png";
import cartoon from "../assets/images/cartoon1.png";
import birdImg from "../assets/images/bird.png";
import supermanPath from"../assets/images/supermanOutline.svg";
import birdPath from"../assets/images/bird(3).svg";
import svgimg3 from"../assets/images/hills.png";
import mountainPath from"../assets/images/hills.svg";
import {makeBodyFromSVG,addSpriteBody} from '../utilities/utility'
import supermanImage from"../assets/images/man.png";

// import man from "../assets/images/birdsvg.svg";

const GamePlay = () => {
  let engine;
  let superman,bird,initialPosBird,mountains , initialPosOfMountain,compoundBodyA;
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
        // background:"rgba(#fff, 0.8)",
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
  const val = Math.floor(Math.random()*5) +2; 
  var v = {
    x: direction * (-val),
    y: 0
  }

  if(mountains){
    const dir = addMovementToHurdles(mountains,v,initialPosOfMountain,true)
    direction = dir
    let collision = Matter.SAT.collides(superman, mountains);
     if (collision && collision.collided) { 
      alert("collide")
      }
  }
  if(bird){
    const dir = addMovementToHurdles(bird,v,initialPosBird)
     direction = dir
     let collision = Matter.SAT.collides(superman, bird);
     if (collision && collision.collided) { 
      alert("collide")
      }
  }
})
    Engine.run(engine);
    Render.run(render);
  },[])

  

const addMovementToHurdles = (body,v,initialPos,isRandomY)=>{
  Matter.Body.setVelocity(body, v)
  var p = body.position
  if(p.x < 0){
   const direction = 0
    const y = !isRandomY ? Math.floor(Math.random()*200) +100 :initialPos.y
     Matter.Body.setPosition(body,{x :initialPos.x, y:y})
     return direction
  }else {
   const direction = 1
   return direction
  }
}

  const moveUp =()=>{
    const body = Matter.Body
    body.translate(superman,{ x :0, y:-20 })
    
  }
  
  const  moveDown =()=> {
    const body = Matter.Body
    body.translate(superman,{ x :0, y:+20 })
  }

  const makeHurdles = async ()=>{
    let world = engine.world;
    /// bird
   bird = await handleBird()
  

   /// mountains
  //  mountains = await handleMountains()
  //  mountains.parts.forEach((element , i) => {
  //   if( i !==1 ){
  //   element.render.sprite.texture = null;
  //   }
  // });
    
    // console.log("mountains=",mountains.position)
    // const width = mountains && (mountains.bounds.max.x - mountains.bounds.min.x)
    // const height = mountains && (mountains.bounds.max.y - mountains.bounds.min.y)
    // console.log("widthwidthwidth=",width,height)
    // Matter.Body.setPosition(mountains,{x :mountains.position.x, y:mountains.position-height*0.5})
    World.add(world, [bird]);
  }

  const handleBird =async ()=>{
    initialPosBird = {x : scene.current.clientWidth , y :scene.current.clientHeight * 0.2 }
    let bird = await makeBodyFromSVG(birdPath, initialPosBird)
    return bird
  }
  const handleMountains = async()=>{
    initialPosOfMountain = {x : scene.current.clientWidth +  scene.current.clientWidth * 0.3, y : scene.current.clientHeight - scene.current.clientHeight*0.18}
  const  mountains = await makeBodyFromSVG(mountainPath, initialPosOfMountain ,svgimg3, {x:0.4,y:0.4})
  return mountains
  }

  const makeBodies = async ()=>{
   World = Matter.World;
   let world = engine.world;
   const pos = {x:100, y:200}
   superman= await makeBodyFromSVG(supermanPath, pos)
   World.add(world, [superman]);
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