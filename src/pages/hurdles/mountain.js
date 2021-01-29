import React from 'react';
import {makeBodyFromSVG,addSpriteBody} from '../../utilities/utility'
import mountainPath from"../../assets/images/hills.svg";
import planeImage from"../../assets/images/plane.png";
import Matter from "matter-js";
import svgimg3 from"../../assets/images/hills.png";


const World = Matter.World;

const resetPosition = ({ body, initialPos, initialSpeed , world}) => {
  // const superman = world.bodies.find(b => b.label === "superman");
  // console.log("superman.position.y: ", superman.position.y);
  // let y = superman.position.y - 80
  // y = y < 80 ? 80 : y
  Matter.Body.setPosition(body, { x: initialPos.x, y: initialPos.y})
  const velocity = {x: initialSpeed.x, y: 0}
  Matter.Body.setVelocity(body, velocity)
  setTimeout(() => {
    resetPosition({ body, initialPos, initialSpeed: velocity, world})
  }, (10000))
}


const Mountain = async ({ speed, initialPosBird, world, supermanPosition }) => {
  let bird = await makeBodyFromSVG(mountainPath, initialPosBird ,svgimg3)
  bird.friction = 0;
  bird.frictionAir = 0;
  bird.label = 'mountain'
  const input = { body: bird , initialPos:initialPosBird, initialSpeed: speed , world: world}
  // Matter.Body.setVelocity(bird, speed)
  resetPosition(input);
  World.add(world, [bird]);
  return bird
}

export default Mountain;