import React, { useEffect, useRef, useState } from 'react';
import Matter from "matter-js";
import mountain from "../assets/images/mountain.png";
import Header from "../components/Header";
import cartoon2 from "../assets/images/cartoon2.png";
import cartoon from "../assets/images/cartoon1.png";
import birdImg from "../assets/images/bird.png";
import supermanPath from"../assets/images/supermanOutline.svg";
import birdPath from"../assets/images/bird6.svg";
import {makeBodyFromSVG,addSpriteBody} from '../utilities/utility'
import supermanImage from"../assets/images/man.png";
import Bird from './hurdles/bird';
import Plane from './hurdles/plane';
import Mountain from './hurdles/mountain';
import EndGame from "./modal/endGame"

// import man from "../assets/images/birdsvg.svg";

const hurdlesLabel = ["bird", "plane", "mountain"]

let inteval = null;
let SpeedInteval = null;
const GamePlay = () => {
  let engine;
  let superman, bird, initialPosBird, mountains, initialPosOfMountain, plane, initialPosPlane , speed;
  let World;
  const scene = useRef();
  const [score, setScore] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const prevHighscore = localStorage.getItem('highScore')
  const [highScore, setHighScore] = useState(parseInt(prevHighscore))
  const speedval = useRef(5)
  const scoreRef = useRef(0)

console.log("speedval",speedval)
  const updateScore = () => {
    inteval = setInterval(() => {
      setScore(prev => { scoreRef.current = prev + 1; return prev + 1})
      
    }, 1000);
  }
  
    
  useEffect( async() => {

    ///calculate score 
    updateScore()

    window.addEventListener('keydown', (e) => {
      var key_code = e.keyCode
      e.preventDefault();
      console.log("key_codekey_code=", key_code)
      switch (key_code) {
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
    engine.world.gravity.x = 0

    // render canvas 
    var render = Render.create({
      element: scene.current,
      engine: engine,
      options: {
        width: scene.current.clientWidth,
        height: scene.current.clientHeight,
        wireframes: false,
        background:"rgba(#fff, 0.8)",
        // border : 10px solid red
      }
    });

    /// make bodies 
    await makeBodies()
    /// hurdles 
    makeHurdles()

    // updates physics
    let direction = 1;
    Matter.Events.on(engine, 'collisionStart',   function (ev) {
      console.log("ev: ", [...ev.pairs], scoreRef.current)
      const arr = [...ev.pairs]
      if (arr.length === 0) {
        return;
      }
      const bodyA = arr[0].bodyA.label === "Body" ? arr[0].bodyA.parent : arr[0].bodyA;
      const bodyB = arr[0].bodyB.label === "Body" ? arr[0].bodyB.parent : arr[0].bodyB;
      let wall;
      let hurdle;
      let superman;
      if (bodyA.label === "wall" || bodyB.label === "wall") {
        wall = bodyA.label === "wall"? bodyA : bodyB;
      }

      if (hurdlesLabel.includes(bodyA.label) || hurdlesLabel.includes(bodyB.label)) {
        hurdle = hurdlesLabel.includes(bodyA.label) ? bodyA : bodyB;
      }

      if (bodyA.label === "superman" || bodyB.label === "superman") {
        superman = bodyA.label === "superman"? bodyA : bodyB;
      }

      console.log("wallwallwall=",wall)
      console.log("hurdleshurdleshurdles=",hurdle)
      if(wall && hurdle){
        hurdle.startBody({...hurdle.configValue, body: hurdle})
        return;
      }

      if (!superman) {
        return
      }

// return
      // if (bodyB.label === "wall") {
      //   wall = bodyB;
      // }

      // if (bodyA.label === "bird") {
      //   bird = bodyA;
      // }
      // if (bodyB.label === "bird") {
      //   bird = bodyB;
      // }

      // if (!!wall && !!bird) {
      //   bird.startBody({...bird.configValue, body: bird})
      //   return;
      // }



      const prevHighScore = localStorage.getItem('highScore') || 0;
      if (prevHighScore < scoreRef.current) {
        localStorage.setItem('highScore',scoreRef.current)
      }
      setIsOpen(true)
      clearInterval(inteval);
      World.clear(engine.world);
      Engine.clear(engine);
      Render.stop(render);
    })
    //   const val = Math.floor(Math.random() * 5) + 2;
    //   console.log("velocity speedval",speedval)
    //    speed = {
    //     x: direction * (-speedval.current),
    //     y: 0
    //   }

    //   if (mountains) {
    //     const dir = addMovementToHurdles(mountains, speed, initialPosOfMountain)
    //     direction = dir
    //     let collision = Matter.SAT.collides(superman, mountains);
    //     if (collision && collision.collided) {
    //       // localStorage.setItem('highScore',highScore)
    //       localStorage.setItem('highScore',score)
    //       setHighScore(score)
    //       clearInterval(inteval)
    //       clearInterval(SpeedInteval)
    //       direction = 0
    //       alert("collide")
    //     }
    //   }
    //   if (plane) {
    //     const height = scene.current.clientHeight
    //     const width = scene.current.clientWidth
    //     const randomY = Math.floor(Math.random() * height * 0.2) + height * 0.1
    //     const dir = addMovementToHurdles(plane, speed, initialPosPlane, randomY)
    //     direction = dir
    //     let collision = Matter.SAT.collides(superman, plane);
    //     if (collision && collision.collided) {
    //       localStorage.setItem('highScore',highScore)
    //       clearInterval(inteval)
    //       clearInterval(SpeedInteval)
    //       direction = 0
    //       alert("collide")
    //     }
    //   }
    //   if (bird) {
    //     const height = scene.current.clientHeight
    //     const width = scene.current.clientWidth
    //     const randomY = Math.floor(Math.random() * height * 0.3) + height * 0.2
    //     const dir = addMovementToHurdles(bird, speed, initialPosBird, superman.position.y)
    //     direction = dir
    //     let collision = Matter.SAT.collides(superman, bird);
    //     if (collision && collision.collided) {
    //       localStorage.setItem('highScore',highScore)
    //       clearInterval(inteval)
    //       clearInterval(SpeedInteval)
    //       direction = 0
    //       alert("collide")
    //     }
    //   }
    // })
    Engine.run(engine);
    Render.run(render);
  }, [])



  const addMovementToHurdles = (body, v, initialPos, isRandomY) => {
    Matter.Body.setVelocity(body, v)
    const p = body.position
    const endPoint = body.bounds.max.x - body.bounds.min.x
    // console.log("endPointendPoint=",endPoint)
    if (p.x < -endPoint) {
      const direction = 0
      const y = isRandomY ? isRandomY : initialPos.y
      Matter.Body.setPosition(body, { x: initialPos.x, y: y })
      return direction
    } else {
      const direction = 1
      return direction
    }
  }
  const moveUp = () => {
    const body = Matter.Body
    if(superman.position.y >= 60){
      body.translate(superman, { x: 0, y: -20 })
    }
  }
  const moveDown = () => {
    const body = Matter.Body
    if(superman.position.y <= 460){
      body.translate(superman, { x: 0, y: +20 })
    }
  }

  const makeHurdles = async () => {
    let world = engine.world;
    /// bird

    

    await handleBird()

    // setTimeout(async () => {
    //   await handleBird()
    // }, 25000)

    // setTimeout(async () => {
    //   await handleBird()
    // }, 72000)


    //// plane

    setTimeout(async () => {
      await handlePlane()
    }, 2500)

    // setTimeout(async () => {
    //   await handlePlane()
    // }, 6000)

    // setTimeout(async () => {
    //   await handlePlane()
    // }, 38000)


    // /// mountains
    mountains = await handleMountains()
    // World.add(world, [mountains]);

    // setInterval(async () => {
    //   await handleBird()
    // }, 1000)


  }
  // const handlePlane = async () => {
  //   initialPosPlane = { x: scene.current.clientWidth + scene.current.clientWidth * 0.2, y: scene.current.clientHeight * 0.1 }
  //   let palne = await makeBodyFromSVG(palnepath, initialPosPlane , planeImage)
  //   return palne
  // }


  const handlePlane = async () => {
    const world = engine.world;
    const initialPosBird = { x: scene.current.clientWidth * 1.1, y: scene.current.clientHeight * 0.2 }
    const speed = {
      x: (-5),
      y: 0
    }
    console.log("initialPosBird",initialPosBird)
    const plane = await Plane({ speed, initialPosBird, world, supermanPosition: superman.position, scene })
    // let collision = Matter.SAT.collides(superman, plane);
    // if (collision && collision.collided) {
    //   // localStorage.setItem('highScore',highScore)
    //   alert("collide")
    // }
    return plane
  }

  const handleBird = async () => {
    const world = engine.world;
    const initialPosBird = { x: scene.current.clientWidth * 1.1, y: scene.current.clientHeight * 0.2 }
    const speed = {
      x: (-5),
      y: 0
    }
    const bird = await Bird({ speed, initialPosBird, world, supermanPosition: superman.position, scene })
console.log("superman",superman ,bird)
    // let collision = Matter.SAT.collides(superman, bird);
        // if (collision && collision.collided) {
        //   localStorage.setItem('highScore',highScore)
        //   alert("collide")
        // }

    return bird
  }

  const handleMountains = async () => {

    const world = engine.world;
    const initialPosOfMountain = { x: scene.current.clientWidth + scene.current.clientWidth * 0.3, y: scene.current.clientHeight - scene.current.clientHeight * 0.245 }
    const speed = {
      x: (-5),
      y: 0
    }
    const mountain = await Mountain({ speed, initialPosBird: initialPosOfMountain, world, supermanPosition: superman.position, scene })
    // let collision = Matter.SAT.collides(superman, mountain);
    // if (collision && collision.collided) {
    //   localStorage.setItem('highScore',highScore)
    //   alert("collide")
    // }
    return mountain
  }

  const makeBodies = async () => {
      const wall = Matter.Bodies.rectangle(10, 0, 10 , scene.current.clientHeight * 2)
      wall.label = "wall";
      wall.isStatic = true;
    World = Matter.World;
    let world = engine.world;
    const pos = { x: 100, y: 200 }
    superman = await makeBodyFromSVG(supermanPath, pos, supermanImage , null  )
    superman.label = "superman";
    World.add(world, [superman ,wall]);
  }
  console.log("scorescore=", score)
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
        <Header score={score} highScore= {highScore}/>
<EndGame isOpen ={isOpen} score ={score}/>
       
      </div>
    </div>
  );
};

export default GamePlay;