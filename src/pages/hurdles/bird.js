import React from 'react';
import {makeBodyFromSVG,addSpriteBody} from '../../utilities/utility'
import birdPath from"../../assets/images/bird6.svg";
import birdImg from "../../assets/images/bird.png";
import Matter from "matter-js";
const World = Matter.World;

export const startBody = ({ body, initialPos, initialSpeed , world}) => {
  const superman = world.bodies.find(b => b.label === "superman");
  if(superman){
    body.configValue = { initialPos, initialSpeed, world}
  Matter.Body.setPosition(body, { x: initialPos.x, y: superman.position.y})
  const velocity = {x: initialSpeed.x - 0.2, y: 0}

  const randomNumber = Math.floor(Math.random() * 5) + 1;

  setTimeout(() => {
    Matter.Body.setVelocity(body, velocity)
    // startBody({ body, initialPos, initialSpeed: velocity, world})
  }, (500 * randomNumber))
}
}


const Bird = async ({ speed, initialPosBird, world, supermanPosition, scene }) => {
  let bird = await makeBodyFromSVG(birdPath, initialPosBird ,birdImg  )
  bird.friction = 0;
  bird.frictionAir = 0;
  console.log("birdbirdbird",bird)
  bird.label = 'bird'
  // bird.type = 'birdType'
  const input = { body: bird , initialPos:initialPosBird, initialSpeed: speed , world}
  startBody(input);
  World.add(world, [bird]);
  bird.configValue = { initialPos: initialPosBird, initialSpeed: speed, world}
  bird.startBody = startBody;
  return bird
}

export default Bird;