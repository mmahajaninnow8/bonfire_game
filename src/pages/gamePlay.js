import React,{useEffect,useRef} from 'react';
import Matter from "matter-js";
import mountain from "../assets/images/mountain.png";
import Header from "../components/Header";
import cartoon2 from "../assets/images/cartoon2.png";
import cartoon from "../assets/images/cartoon1.png";
import bird from "../assets/images/bird.png";
import svgimg1 from"../assets/images/down-arrow-svgrepo-com.svg";
import svgimg2 from"../assets/images/svg1.svg";

// import man from "../assets/images/birdsvg.svg";

const GamePlay = () => {
  let engine;
  const scene = useRef();
  useEffect(()=>{
    window.addEventListener('keydown', (e) => {
      var key_code=e.keyCode
      console.log("key_codekey_code=",key_code)
             switch(key_code){
               case 38: //Up arrow key
                 moveUp();
                 break;
               case 40: //down arrow key
                 moveDown();
                 break;
             }
     });
    // egine variables
    var Engine = Matter.Engine,
    Render = Matter.Render;
    
    
    /// create engine and make gravity off
     engine = Engine.create({
      // positionIterations: 20
    });

    engine.world.gravity.y = 0
   
    // render canvas 
    var render = Render.create({
      element: scene.current,
      engine: engine,
      options: {
        width:scene.current.clientWidth,
        height: scene.current.clientHeight,
        wireframes: false,
        // background:"rgba(#fff, 0.8)",
        // border : 10px solid red
      }
    });

   /// make bodies 

   makeBodies()

    Engine.run(engine);
    Render.run(render);
  },[])

  const moveUp =()=>{
    const body = Matter.Body
    // body.translate(svgimg1,{ x :0, y:-20 })
    
  }
  
  const  moveDown =()=> {
    const body = Matter.Body
    // body.translate(svgimg1,{ x :0, y:+20 })
  }

  const makeBodies = ()=>{
   var Bodies = Matter.Bodies,
    Vertices = Matter.Vertices,
    Svg = Matter.Svg,
    World = Matter.World,
    Common = Matter.Common;
    let world = engine.world;
    let svgs = [svgimg1];
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

  }

  return (
    <div className="GameScreen"  >
    <div className="slide-view layer0" >
        <span />
      </div>
      <div className="slide-view layer1" >
        <span />
      </div>
      <div className="slide-view layer2" >
        <span />
      </div>
      <div className="slide-view layer3">
        <span />
      </div>
      <div className="slide-view layer4">
        <span />
      </div>
      <div className="slide-view layer5">
        <span />
      </div>
      <div className="slide-view layer6">
        <span />
      </div>      
    <div className="GameScreen-bg" ref={scene}>
    <Header />
    <div className="score">
      <h3>
        HI <span>001256</span> <span>00047</span>
      </h3>
    </div>
    {/* <div className="games-objecs">
      <div>
        <img className="superman"
          style={{ left: "200px", position: "absolute", bottom: "300px" }}
          src={cartoon}
        />
      </div>
      <div>
        <img className="aeroplane obstacle-move"
          style={{
            right: "40%",
            top: "40%",
            bottom: "10%",
          }}
          src={cartoon2}
        />
      </div>
      <div>
        <img className="bird obstacle-move"
          style={{ right: "10%", bottom: "25%" }}
          src={bird}
        />
      </div>
      <img className="obstacle-move mountain"
        style={{
          right: "24%",
       
          bottom: "0",
          width: "20%",
        }}
        src={mountain}
      />
    </div> */}
  </div>
  </div>
  );
};

export default GamePlay;