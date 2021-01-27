import React, { useEffect, useState, useRef } from "react"
import Matter from "matter-js";
import svgimg1 from"../assets/images/down-arrow-svgrepo-com.svg";
import svgimg2 from"../assets/images/svg1.svg";
import cartoon2 from "../assets/images/cartoon2.png";
import cartoon from "../assets/images/cartoon1.png";

// import Snap from 'snapsvg-cjs'
// import intersect from "path-intersection";
// import styled from 'styled-components'
export default function PhysicsDemo() {
  let bird;
  const scene = useRef();
  const [gameEngine,setEngine] = useState();
useEffect(()=>{

var Engine = Matter.Engine,
Render = Matter.Render,
Bodies = Matter.Bodies,
Mouse = Matter.Mouse,
Common = Matter.Common,
Vertices = Matter.Vertices,
Svg = Matter.Svg,
World = Matter.World,

 MouseConstraint = Matter.MouseConstraint;
var engine = Engine.create({
  // positionIterations: 20
});
  let world = engine.world;

engine.world.gravity.y = 0
setEngine(engine)

var render = Render.create({
  element: scene.current,
  engine: engine,
  options: {
    width: 600,
    height: 600,
    wireframes: false
  }
});
const Options  ={isStatic : true, render: {
  fillStyle: 'red',
  strokeStyle: 'blue',
  lineWidth: 3
}}
const bodyProps = [{posX:400,posY:10, width : 800, height:30},{posX:0,posY:10, width : 600, height:30}]
const staticBodies = bodyProps.map(el=>{
  return Bodies.rectangle(el.posX, el.posY, el.width, el.height, Options)
})
 bird = Bodies.rectangle(300, 400,110,45, { isStatic : false,restitution: 0.5, render: {
  sprite: {
      texture: cartoon
  }
}})
const initialPos = {x:800, y:100}
let  plane = Bodies.rectangle(initialPos.x,initialPos.y,110,45, { isStatic : false,restitution: 0.5, render: {
  sprite: {
      texture: cartoon2
  }
}})
var direction = 1;
Matter.Events.on(engine, 'beforeUpdate', function (ev) {
  const val = Math.floor(Math.random()*8) +2; 
  var v = {
    x: direction*-val,
    y: 0
  }
  Matter.Body.setVelocity(plane, v)
  var p = plane.position
  if(p.x < 0){
    direction = 0
    const y = Math.floor(Math.random()*200) +100
    Matter.Body.setPosition(plane,{x :initialPos.x, y:y})
  }else {
    direction = 1
  }

  var collision = Matter.SAT.collides(bird, plane); if (collision.collided) { 
    alert("collide")
    }

})


let svgs = [svgimg1 ];
  if (typeof fetch !== 'undefined') {
    var select = function (root, selector) {
      return Array.prototype.slice.call(root.querySelectorAll(selector));
    };

    var loadSvg = function (url) {
      return fetch(url)
        .then(function (response) { return response.text(); })
        .then(function (raw) { return (new window.DOMParser()).parseFromString(raw, 'image/svg+xml'); });
    };
    svgs.forEach(function (path, i) {
      loadSvg(path).then(function (root) {
        console.log("root", root)
        var color = Common.choose(['#f19648', '#f5d259', '#f55a3c', '#063e7b', '#ececd1']);
        const vertexSets = select(root, 'path')
          .map(function (path) {

            return Vertices.scale(Svg.pathToVertices(path, 30), 0.4, 0.4);;
          });
        World.add(world, Bodies.fromVertices(100 + i * 150, 200 + i * 50, vertexSets, {
          render: {
            fillStyle: color,
            strokeStyle: color,
            lineWidth: 1
          }
        }, true));
      });
    });
  }

   World.add(engine.world, staticBodies);
   World.add(engine.world, [bird,plane,]);
       Engine.run(engine);
       Render.run(render);

},[]);


const moveUp =()=>{
  const body = Matter.Body
  body.translate(bird,{ x :0, y:-20 })
  
}

const  moveDown =()=> {
  const body = Matter.Body
  body.translate(bird,{ x :0, y:+20 })
}
useEffect(() => {
const image = document.getElementById("img")
const img2 = document.getElementById("img2")

window.addEventListener('keydown', (e) => {
 var key_code=e.keyCode
 console.log("key_codekey_code=",key_code)
        switch(key_code){
          case 38: //Up arrow key
            moveUp(image);
            break;
          case 40: //down arrow key
            moveDown(image);
            break;
        }
});

}, [])
  return (
    <div >
          <div ref={scene} />
    
    </div>
  )
}