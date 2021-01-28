import React, { useEffect, useRef, useState } from 'react';
import Matter from "matter-js";
import mountain from "../assets/images/mountain.png";
import Header from "../components/Header";
import cartoon2 from "../assets/images/cartoon2.png";
import cartoon from "../assets/images/cartoon1.png";
import birdImg from "../assets/images/bird.png";
import supermanPath from"../assets/images/supermanOutline.svg";
import birdPath from"../assets/images/bird6.svg";
import svgimg3 from"../assets/images/hills.png";
import mountainPath from"../assets/images/hills.svg";
import palnepath from"../assets/images/planePath.svg";
import {makeBodyFromSVG,addSpriteBody} from '../utilities/utility'
import supermanImage from"../assets/images/man.png";
import planeImage from"../assets/images/plane.png";

// import man from "../assets/images/birdsvg.svg";
let inteval = null;
const GamePlay = () => {
  let engine;
  let superman, bird, initialPosBird, mountains, initialPosOfMountain, plane, initialPosPlane;
  let World;
  const scene = useRef();
  const [score, setScore] = useState(0)
  const prevHighscore = localStorage.getItem('highScore')
  const [highScore, setHighScore] = useState(parseInt(prevHighscore))

  const updateScore = () => {
    inteval = setInterval(() => {
      setScore(prev => prev + 1)
    }, 100);
  }
  useEffect(()=>{
    if(score>prevHighscore){
      setHighScore(highScore+1)
    }
  },[score])
  useEffect(() => {

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
    makeBodies()
    /// hurdles 
    makeHurdles()

    // updates physics
    let direction = 1;
    Matter.Events.on(engine, 'beforeUpdate', function (ev) {
      const val = Math.floor(Math.random() * 5) + 2;
      var v = {
        x: direction * (-val),
        y: 0
      }

      if (mountains) {
        const dir = addMovementToHurdles(mountains, v, initialPosOfMountain)
        direction = dir
        let collision = Matter.SAT.collides(superman, mountains);
        if (collision && collision.collided) {
          // localStorage.setItem('highScore',highScore)
          console.log("highScorehighScore=",highScore)
          localStorage.setItem('highScore',highScore)
          clearInterval(inteval)
          alert("collide")
        }
      }
      if (plane) {
        const height = scene.current.clientHeight
        const width = scene.current.clientWidth
        const randomY = Math.floor(Math.random() * height * 0.2) + height * 0.1
        const dir = addMovementToHurdles(plane, v, initialPosPlane, randomY)
        direction = dir
        let collision = Matter.SAT.collides(superman, plane);
        if (collision && collision.collided) {
          localStorage.setItem('highScore',highScore)
          clearInterval(inteval)
          alert("collide")
        }
      }
      if (bird) {
        const height = scene.current.clientHeight
        const width = scene.current.clientWidth
        const randomY = Math.floor(Math.random() * height * 0.3) + height * 0.2
        const dir = addMovementToHurdles(bird, v, initialPosBird, randomY)
        direction = dir
        let collision = Matter.SAT.collides(superman, bird);
        if (collision && collision.collided) {
          localStorage.setItem('highScore',highScore)
          clearInterval(inteval)
          alert("collide")
        }
      }
    })
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
    body.translate(superman, { x: 0, y: -20 })
  }
  const moveDown = () => {
    const body = Matter.Body
    body.translate(superman, { x: 0, y: +20 })
  }

  const makeHurdles = async () => {
    let world = engine.world;
    /// bird
    bird = await handleBird()
    //// plane
    plane = await handlePlane()
    /// mountains
    mountains = await handleMountains()
    World.add(world, [bird, plane, mountains]);
  }
  const handlePlane = async () => {
    initialPosPlane = { x: scene.current.clientWidth + scene.current.clientWidth * 0.2, y: scene.current.clientHeight * 0.1 }
    let palne = await makeBodyFromSVG(palnepath, initialPosPlane , planeImage)
    return palne
  }

  const handleBird = async () => {
    initialPosBird = { x: scene.current.clientWidth, y: scene.current.clientHeight * 0.2 }
    let bird = await makeBodyFromSVG(birdPath, initialPosBird ,birdImg)
    return bird
  }
  const handleMountains = async () => {
    initialPosOfMountain = { x: scene.current.clientWidth + scene.current.clientWidth * 0.3, y: scene.current.clientHeight - scene.current.clientHeight * 0.25 }
    // svgimg3
  const  mountains = await makeBodyFromSVG(mountainPath, initialPosOfMountain ,svgimg3, {x:0.25,y:0.25})
  return mountains
  }

  const makeBodies = async () => {
    World = Matter.World;
    let world = engine.world;
    const pos = { x: 100, y: 200 }
    superman = await makeBodyFromSVG(supermanPath, pos, supermanImage)
    World.add(world, [superman]);
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