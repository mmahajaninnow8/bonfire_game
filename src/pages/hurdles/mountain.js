import React from 'react';
import {makeBodyFromSVG,addSpriteBody} from '../../utilities/utility'
import mountainPath from"../../assets/images/hills.svg";
import planeImage from"../../assets/images/plane.png";
import Matter from "matter-js";
import svgimg3 from"../../assets/images/hills.png";


const World = Matter.World;

const startBody = ({ body, initialPos, initialSpeed , world}) => {
  // const superman = world.bodies.find(b => b.label === "superman");
  // console.log("superman.position.y: ", superman.position.y);
  // let y = superman.position.y - 80
  // y = y < 80 ? 80 : y
  Matter.Body.setPosition(body, { x: initialPos.x, y: initialPos.y})
  const velocity = {x: initialSpeed.x, y: 0}
  Matter.Body.setVelocity(body, {x: 0, y: 0})
  setTimeout(() => {
    Matter.Body.setVelocity(body, velocity)
  }, (100))
}


const Mountain = async ({ speed, initialPosBird, world, supermanPosition }) => {
  let mountain = await makeBodyFromSVG(mountainPath, initialPosBird ,svgimg3)
  mountain.friction = 0;
  mountain.frictionAir = 0;
  mountain.label = 'mountain'
  const input = { body: mountain , initialPos:initialPosBird, initialSpeed: speed , world: world}
  // Matter.Body.setVelocity(bird, speed)
  startBody(input);
  mountain.configValue = { initialPos: initialPosBird, initialSpeed: speed, world}
  mountain.startBody = startBody;
  World.add(world, [mountain]);
  return mountain
}

export default Mountain;