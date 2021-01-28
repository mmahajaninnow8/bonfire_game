import React from 'react';
import {makeBodyFromSVG,addSpriteBody} from '../../utilities/utility'
import palnepath from"../../assets/images/planePath.svg";
import planeImage from"../../assets/images/plane.png";
import Matter from "matter-js";
const World = Matter.World;

const resetPosition = ({ body, initialPos, initialSpeed , world}) => {
  const superman = world.bodies.find(b => b.label === "superman");
  if(superman){
    console.log("superman.position.y: ", superman.position.y);
    let y = superman.position.y - 80
    y = y < 80 ? 80 : y
    Matter.Body.setPosition(body, { x: initialPos.x, y: y})
    const velocity = {x: initialSpeed.x - 0.2, y: 0}
    Matter.Body.setVelocity(body, velocity)
    setTimeout(() => {
      resetPosition({ body, initialPos, initialSpeed: velocity, world})
    }, (10000))
  }
}


const Plane = async ({ speed, initialPosBird, world, supermanPosition }) => {
  let bird = await makeBodyFromSVG(palnepath, initialPosBird ,planeImage)
  bird.friction = 0;
  bird.frictionAir = 0;
  bird.label = 'plane'
  const input = { body: bird , initialPos:initialPosBird, initialSpeed: speed , world: world}
  // Matter.Body.setVelocity(bird, speed)
  resetPosition(input);
  World.add(world, [bird]);
  return bird
}

export default Plane;