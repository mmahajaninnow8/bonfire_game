import React from 'react';
import {makeBodyFromSVG,addSpriteBody} from '../../utilities/utility'
import mountainPath from"../../assets/images/hills.svg";
import planeImage from"../../assets/images/plane.png";
import Matter from "matter-js";
import svgimg3 from"../../assets/images/hills.png";


const World = Matter.World;

const startBody = ({ body, initialPos, initialSpeed , world}) => {
  let speedX = initialSpeed.x - 0.2
    speedX = speedX < -10 ? -10 : speedX
  Matter.Body.setPosition(body, { x: initialPos.x, y: initialPos.y})
  const velocity = {x: speedX, y: 0}
  Matter.Body.setVelocity(body, {x: 0, y: 0})
  setTimeout(() => {
    Matter.Body.setVelocity(body, velocity)
  }, (100))
}


const Mountain = async ({ speed, initialPosBird, world, supermanPosition }) => {
  let mountain = await makeBodyFromSVG(mountainPath, initialPosBird ,svgimg3)
  mountain.friction = 0;
  mountain.frictionAir = 0;
  mountain.label = 'mountain';
  mountain.collisionFilter.mask = 0x0004 | 0x0008;
  mountain.collisionFilter.category = 0x0002;
  const input = { body: mountain , initialPos:initialPosBird, initialSpeed: speed , world: world}
  startBody(input);
  mountain.configValue = { initialPos: initialPosBird, initialSpeed: speed, world}
  mountain.startBody = startBody;
  World.add(world, [mountain]);
  return mountain
}

export default Mountain;