import React, { useEffect, useRef, useState } from 'react';
import Matter from "matter-js";
import mountain from "../assets/images/mountain.png";
import Header from "../components/Header";
import cartoon2 from "../assets/images/cartoon2.png";
import cartoon from "../assets/images/cartoon1.png";
import birdImg from "../assets/images/bird.png";
import supermanPath from "../assets/images/supermanOutline.svg";
import birdPath from "../assets/images/bird6.svg";
import { makeBodyFromSVG, addSpriteBody } from '../utilities/utility'
import supermanImage from "../assets/images/man.png";
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
  let superman;
  let World;
  const scene = useRef();
  const [score, setScore] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const prevHighscore = localStorage.getItem('highScore')
  const [highScore, setHighScore] = useState(parseInt(prevHighscore))
  const speedval = useRef(5)
  const scoreRef = useRef(0)

  const updateScore = () => {
    inteval = setInterval(() => {
      setScore(prev => { scoreRef.current = prev + 1; return prev + 1 })

    }, 1000);
  }


  useEffect(async () => {

    ///calculate score 
    updateScore()

    window.addEventListener('keydown', (e) => {
      var key_code = e.keyCode
      e.preventDefault();
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
        background: "rgba(#fff, 0.8)",
        // border : 10px solid red
      }
    });

    /// make bodies 
    await makeBodies()
    /// hurdles 
    makeHurdles()

    // updates physics
    let direction = 1;
    Matter.Events.on(engine, 'collisionStart', function (ev) {
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
        wall = bodyA.label === "wall" ? bodyA : bodyB;
      }

      if (hurdlesLabel.includes(bodyA.label) || hurdlesLabel.includes(bodyB.label)) {
        hurdle = hurdlesLabel.includes(bodyA.label) ? bodyA : bodyB;
      }

      if (bodyA.label === "superman" || bodyB.label === "superman") {
        superman = bodyA.label === "superman" ? bodyA : bodyB;
      }


      if (wall && hurdle) {
        hurdle.startBody({ ...hurdle.configValue, body: hurdle })
        return;
      }

      if (!superman) {
        return
      }


      const prevHighScore = localStorage.getItem('highScore') || 0;
      if (prevHighScore < scoreRef.current) {
        localStorage.setItem('highScore', scoreRef.current)
      }
      setIsOpen(true)
      clearInterval(inteval);
      World.clear(engine.world);
      Engine.clear(engine);
      Render.stop(render);
    })

    Engine.run(engine);
    Render.run(render);
  }, [])



  const addMovementToHurdles = (body, v, initialPos, isRandomY) => {
    Matter.Body.setVelocity(body, v)
    const p = body.position
    const endPoint = body.bounds.max.x - body.bounds.min.x
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
    let direction = 0
    const body = Matter.Body
    if (superman.position.y >= 60) {
      body.setVelocity(superman, { x: 0, y: -2 });
    }
  }
  const moveDown = () => {
    const body = Matter.Body
    if (superman.position.y <= 460) {
      body.setVelocity(superman, { x: 0, y: 2 })
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
    await handleMountains()
    // World.add(world, [mountains]);

    // setInterval(async () => {
    //   await handleBird()
    // }, 1000)


  }


  const handlePlane = async () => {
    const world = engine.world;
    const initialPosBird = { x: scene.current.clientWidth * 1.1, y: scene.current.clientHeight * 0.2 }
    const speed = {
      x: (-5),
      y: 0
    }
    const plane = await Plane({ speed, initialPosBird, world, supermanPosition: superman.position, scene })
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

    return mountain
  }

  const makeBodies = async () => {
    const wall = Matter.Bodies.rectangle(-200, 0, 10, scene.current.clientHeight * 2)
    wall.label = "wall";
    wall.isStatic = true;
    wall.collisionFilter.mask = 0x0002;
    wall.collisionFilter.category = 0x0008;
    World = Matter.World;
    let world = engine.world;
    const pos = { x: 100, y: 200 }
    superman = await makeBodyFromSVG(supermanPath, pos, supermanImage, null)
    superman.collisionFilter.mask = 0x0002;
    superman.collisionFilter.category = 0x0004;

    superman.label = "superman";
    World.add(world, [superman, wall]);
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
        <Header score={score} highScore={highScore} />
        <EndGame isOpen={isOpen} score={score} />

      </div>
    </div>
  );
};

export default GamePlay;