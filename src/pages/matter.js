import React, { useEffect, useState, useRef } from "react"
import Matter from "matter-js";
import svgimg1 from"../assets/images/down-arrow-svgrepo-com.svg";
import svgimg2 from"../assets/images/svg1.svg";
import cartoon2 from "../assets/images/cartoon2.png";

// import Snap from 'snapsvg-cjs'
// import intersect from "path-intersection";
// import styled from 'styled-components'
export default function PhysicsDemo() {
  const scene = useRef();
  const [gameEngine,setEngine] = useState();
useEffect(()=>{
console.log("djkhgdfjkfgh",Matter)
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
console.log("scene.currentscene.current=",scene.current)
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
var bird = Bodies.rectangle(300, 400,110,45, { isStatic : false,restitution: 0.5, render: {
  sprite: {
      texture: cartoon2
  }
}})
var bird2 = Bodies.rectangle(300, 100,110,45, { isStatic : false,restitution: 0.5, render: {
  sprite: {
      texture: cartoon2
  }
}})
let svgs = [svgimg1 , svgimg2];
if (typeof fetch !== 'undefined') {
  var select = function(root, selector) {
      return Array.prototype.slice.call(root.querySelectorAll(selector));
  };

  var loadSvg = function(url) {
      return fetch(url)
          .then(function(response) { return response.text(); })
          .then(function(raw) { return (new window.DOMParser()).parseFromString(raw, 'image/svg+xml'); });
  };

  svgs.forEach(function(path, i) { 
      loadSvg(path).then(function(root) {
          var color = Common.choose(['#f19648', '#f5d259', '#f55a3c', '#063e7b', '#ececd1']);

          // var vertexSets = select(root, 'path')
          //     .map(function(path) { 
          //       console.log("path",path)
          //       return Vertices.scale(Svg.pathToVertices(path, 10), 0.4, 0.4); 
          //     });

          // World.add(world, Bodies.fromVertices(100 + i * 150, 200 + i * 50, vertexSets, {
          //     render: {
          //         fillStyle: color,
          //         strokeStyle: color,
          //         lineWidth: 1
          //     }
          // }, true));
      });
  });

  // loadSvg('./svg/svg.svg').then(function(root) {
  //     var color = Common.choose(['#f19648', '#f5d259', '#f55a3c', '#063e7b', '#ececd1']);
      
  //     var vertexSets = select(root, 'path')
  //         .map(function(path) { return Svg.pathToVertices(path, 30); });

  //     World.add(world, Bodies.fromVertices(400, 80, vertexSets, {
  //         render: {
  //             fillStyle: color,
  //             strokeStyle: color,
  //             lineWidth: 1
  //         }
  //     }, true));
  // });
}
World.add(engine.world, staticBodies);
World.add(engine.world, [bird ,bird2]);
    Engine.run(engine);
    Render.run(render);
/// mouse events
var mouse = Mouse.create(render.canvas)
var mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.2,
    render: {
      visible: false
    }
  }
});
World.add(engine.world, mouseConstraint);
Matter.Events.on(mouseConstraint, "mousedown", function(event) {
  console.log("mouseConstraintmouseConstraintmouseConstraint=",mouseConstraint)
engine.world.gravity.y = 1
Matter.Body.applyForce( bird, bird.position, {x: 0.00, y: -0.009});
  // World.add(engine.world, Bodies.circle(150, 50, 30, { restitution: 0.7 }));
});
},[]);
// function allowDrop(ev) {
//   ev.preventDefault();
// }
// function drag(ev) {
//   ev.dataTransfer.setData("text", ev.target.id);
// }
// function drop(ev) {
//   ev.preventDefault();
//   var data = ev.dataTransfer.getData("text");
//   ev.target.appendChild(document.getElementById(data));
// }
// // const handleClick = ()=>{
// //   // const {gameEngine,setEngine} = useState()
// // console.log("gameEnginegameEngine=",gameEngine)
// }
const moveLeft =(objImage)=>{
  const oldvalue = objImage.style.left
  objImage.style.left=parseInt(oldvalue) -10 +'px';
}
const moveUp =(objImage)=>{
  const oldvalue = objImage.style.left
  objImage.style.top=parseInt(objImage.style.top)-1 +'px';
}
const moveRight =(objImage)=>{
  objImage.style.left=parseInt(objImage.style.left)+2 +'px';
}
const  moveDown =(objImage)=> {
  objImage.style.top=parseInt(objImage.style.top)+1 +'px';
}
useEffect(() => {
const image = document.getElementById("img")
const img2 = document.getElementById("img2")
let svg1 , svg2, svgRect, pathsvg222, pathsvg5555 ;
window.addEventListener('keydown', (e) => {
 console.log("addEventListeneraddEventListeneraddEventListener",pathsvg222, pathsvg5555)
//  const svg1Path = doc.querySelector("#monika").attributes.d.nodeValue
//  const svg2Path = svg2.attributes.d.nodeValue
//  var intersection = intersect(pathsvg222, pathsvg222)
// console.log("intersectionintersectionintersectionintersection=",intersection)
//  Snap.path.isBBoxIntersect(svg1Path, svg2Path)
//  const hits = svg1.getIntersectionList(svgRect, null);
//  console.log("hitshits=",hits)
 var key_code=e.keyCode
 console.log("key_codekey_code=",key_code)
        switch(key_code){
          case 37: //left arrow key
            moveLeft(image);
            break;
          case 38: //Up arrow key
            moveUp(image);
            break;
          case 39: //right arrow key
            moveRight(image);
            break;
          case 40: //down arrow key
            moveDown(image);
            break;
        }
});
// image.addEventListener("load", function() {
//   var doc = this.getSVGDocument();
//   // myLine.attr("d")
//   console.log('docdocdocdocdocdoc=',doc.querySelectorAll("svg"))
//   svg1 = doc.querySelector("svg")
//   pathsvg5555= doc.querySelector("#monika").attributes.d.nodeValue
//  const vector = pathsvg5555.toString().split(/(?=[LMC])/)
//  console.log("vectorvector=",vector)
// });
// img2.addEventListener("load", function() {
//   var doc = this.getSVGDocument();
//   // myLine.attr("d")
//   console.log('docdocdocdocdocdoc=',doc.querySelectorAll("#monika2")[0].attributes.d.nodeValue)
//   // svg2 =
//   svg2 = doc.querySelector("svg")
//   svgRect = doc.querySelector("#monika2").getBBox()
//   pathsvg222 = doc.querySelector("#monika2").attributes.d.nodeValue
//  const vector = pathsvg222.toString().split(/(?=[LMC])/)
//  console.log("vectorvector=",vector)
// });
}, [])
  return (
    <div >
          <div ref={scene} />
      {/* <img src= {svg1} id="img" style={{position:"absolute", left:0 ,top:0}}/>
      <img src= {svg2} id="img" style={{position:"absolute", left:500 ,top:0}}/> */}
      {/* <object id="img" data={svgimg1} style={{position:"absolute", left:0 ,top:0}} ></object>
      <object data={svgimg2} id= "img2" style={{position:"absolute", left:500 ,top:0}} ></object> */}
      {/* <img src= {svg2}/> */}
    </div>
  )
}