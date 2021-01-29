import React, { useEffect, useState, useRef } from "react"
import Matter from "matter-js";
import svgimg1 from"../assets/images/down-arrow-svgrepo-com.svg";
import svgimg2 from"../assets/images/svg1.svg";
import cartoon2 from "../assets/images/cartoon2.png";
import cartoon from "../assets/images/cartoon1.png";
// import birdsvg from "../assets/images/birdsvg.svg";
import { Container, Row, Col } from "reactstrap";
import "./GameScreen";
import MountainLayer from "../assets/images/mountainLayer.png";
import Boy from "../assets/images/boy.png";
import ComingSoon1 from "../assets/images/comingSoon1.png";
import ComingSoon2 from "../assets/images/comingSoon2.png";
import ComingSoon3 from "../assets/images/comingSoon3.png";
import GamePlay from "./gamePlay"
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
          <>
        <GamePlay/>
        <div className=" character-list ">
          <div className="cartoon-list">
            <Container>
              <Row>
                <Col xs="6" md="3" xl>
                  <div className="cartoon-list-bx">
                    <div className="cartoon-list-img cartoon-active">
                      <img src={Boy} />
                    </div>
                    <h3 className="cartoon-txt">
                      The Amazing Seb{" "}
                      <a href="https://www.amazon.com/">Kindle eBook</a>{" "}
                    </h3>
                  </div>
                </Col>
                <Col xs="6" md="3" xl>
                  <div className="cartoon-list-bx">
                    <div className="cartoon-list-img">
                      <img src={ComingSoon1} />
                    </div>
                    <h3 className="cartoon-txt"> Coming Soon !</h3>
                  </div>
                </Col>
                <Col xs="6" md="3" xl>
                  <div className="cartoon-list-bx">
                    <div className="cartoon-list-img">
                      <img src={ComingSoon2} />
                    </div>
                    <h3 className="cartoon-txt">Coming Soon !</h3>
                  </div>
                </Col>
                <Col xs="6" md="3" xl>
                  <div className="cartoon-list-bx">
                    <div className="cartoon-list-img">
                      <img src={ComingSoon3} />
                    </div>
                    <h3 className="cartoon-txt">Coming Soon !</h3>
                  </div>
                </Col>
                <Col xs="6" md="3" xl>
                  <div className="cartoon-list-bx">
                    <div className="cartoon-list-img">
                      <img src={ComingSoon1} />
                    </div>
                    <h3 className="cartoon-txt">Coming Soon !</h3>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          <h4 className="contact-txt">
            Who do you think should be the next super her?{" "}
            <a href="">Contact us</a>
          </h4>
        </div>
      </>
    </div>
  )
}