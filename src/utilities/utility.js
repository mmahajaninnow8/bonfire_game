import Matter from "matter-js";
var Vertices = Matter.Vertices,
Svg = Matter.Svg,
Bodies = Matter.Bodies;
export const makeBodyFromSVG  = async (svg,pos,img,scale ,category , mask)=>{
  console.log("img",img)
  let svgs = [svg],body;
  if (typeof fetch !== 'undefined') {
    var select = function (root, selector) {
      return Array.prototype.slice.call(root.querySelectorAll(selector));
    };

    var loadSvg = function (url) {
      return fetch(url)
        .then(function (response) { return response.text(); })
        .then(function (raw) { return (new window.DOMParser()).parseFromString(raw, 'image/svg+xml'); });
    };
      await asyncForEach(svgs,async function (path, i){
       const root =  await loadSvg(path)
       const vertexSets = select(root, 'path').map(function (path) {
       const scaleFactor = scale ? scale :{x:0.07,y:0.07}
              return Vertices.scale(Svg.pathToVertices(path, 100),scaleFactor.x,scaleFactor.y);
            });
       body =  Bodies.fromVertices(pos.x,pos.y, vertexSets,{ collisionFilter: {
        category: category,
        mask: mask 
    }, render: {
                // fillStyle: "none",
                // lineWidth: 1,
              //   sprite: {
              //     texture: img
              // }
              }})
    });
    const circle = Matter.Bodies.circle(pos.x,pos.y,5)
    body.render = circle.render
   const compoundBody = Matter.Body.create({
    parts: [body, circle]  });
    compoundBody.parts.forEach((element , i) => {
      if( element.label ==="Circle Body" ){
      element.render.sprite.texture = img;
      }
    });
    // compoundBody.collisionFilter.mask = collisionFilter
    return compoundBody
  }

}

/**
 * Async For Each loop
 *
 * @param {Array} array
 * @param {Function} callback
 */
 export async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}


/// add sprite on body 

