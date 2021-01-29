import React from 'react';
import {makeBodyFromSVG,addSpriteBody} from '../../utilities/utility'
import birdPath from"../../assets/images/bird6.svg";
import birdImg from "../../assets/images/bird.png";
import Matter from "matter-js";
const World = Matter.World;

export const startBody = ({ body, initialPos, initialSpeed , world}) => {
  const superman = world.bodies.find(b => b.label === "superman");
  if(superman){
    let speedX = initialSpeed.x - 0.5
    speedX = speedX < -10 ? -10 : speedX
    body.configValue = { initialPos, initialSpeed: {x: speedX, y: 0}, world}
  Matter.Body.setPosition(body, { x: initialPos.x, y: superman.position.y})
  const velocity = {x: speedX, y: 0}
  const randomNumber = Math.floor(Math.random() * 5) + 1;
  Matter.Body.setVelocity(body, {x:0, y: 0})
  setTimeout(() => {
    Matter.Body.setVelocity(body, velocity)
    console.log("velocity: ", velocity)
    // startBody({ body, initialPos, initialSpeed: velocity, world})
  }, (500 * randomNumber))
}
}


const Bird = async ({ speed, initialPosBird, world, supermanPosition, scene }) => {
  let bird = await makeBodyFromSVG(birdPath, initialPosBird ,birdImg  )
  bird.friction = 0;
  bird.frictionAir = 0;
  bird.label = 'bird'
  bird.collisionFilter.mask =  0x0004 | 0x0008 ;
  bird.collisionFilter.category = 0x0002;

  // bird.type = 'birdType'
  const input = { body: bird , initialPos:initialPosBird, initialSpeed: speed , world}
  startBody(input);
  World.add(world, [bird]);
  bird.configValue = { initialPos: initialPosBird, initialSpeed: speed, world}
  bird.startBody = startBody;
  return bird
}

export default Bird;