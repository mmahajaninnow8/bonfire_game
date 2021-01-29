import React from 'react';
import {makeBodyFromSVG,addSpriteBody} from '../../utilities/utility'
import palnepath from"../../assets/images/planePath.svg";
import planeImage from"../../assets/images/plane.png";
import Matter from "matter-js";
const World = Matter.World;

const startBody = ({ body, initialPos, initialSpeed , world}) => {
  const superman = world.bodies.find(b => b.label === "superman");
  if(superman){
    body.configValue = { initialPos, initialSpeed, world}
    let y = superman.position.y - 80
    y = y < 80 ? 80 : y
    Matter.Body.setPosition(body, { x: initialPos.x, y: y})
    const velocity = {x: initialSpeed.x - 0.2, y: 0}
    Matter.Body.setVelocity(body, {x: 0, y: 0})
    const randomNumber = Math.floor(Math.random() * 10) + 5;
    setTimeout(() => {
      Matter.Body.setVelocity(body, velocity)
    }, (500 * randomNumber))
  }
}


const Plane = async ({ speed, initialPosBird, world, supermanPosition }) => {
  let plane = await makeBodyFromSVG(palnepath, initialPosBird ,planeImage )
  plane.friction = 0;
  plane.frictionAir = 0;
  plane.label = 'plane'
  const input = { body: plane , initialPos:initialPosBird, initialSpeed: speed , world: world}
  // Matter.Body.setVelocity(bird, speed)
  startBody(input);
  plane.configValue = { initialPos: initialPosBird, initialSpeed: speed, world}
  plane.startBody = startBody;
  World.add(world, [plane]);
  return plane
}

export default Plane;