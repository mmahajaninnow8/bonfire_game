import Matter from "matter-js";
let Vertices = Matter.Vertices,
Svg = Matter.Svg,
Bodies = Matter.Bodies,
Body = Matter.Body;
export const makeBodyFromSVG  = async (svg,pos ,img,scale)=>{
  console.log("img",img)
  let svgs = [svg],body;
  if (typeof fetch !== 'undefined') {
    let select = function (root, selector) {
      return Array.prototype.slice.call(root.querySelectorAll(selector));
    };

    let loadSvg = function (url) {
      return fetch(url)
        .then(function (response) { return response.text(); })
        .then(function (raw) { return (new window.DOMParser()).parseFromString(raw, 'image/svg+xml'); });
    };
      await asyncForEach(svgs,async function (path, i){
     const root =  await loadSvg(path)
     const vertexSets = select(root, 'path').map(function (path) {
       const scaleFactor = scale ? scale :{x:0.1,y:0.1}
       console.log("pathpath: ", path)
              return Vertices.scale(Svg.pathToVertices(path, 100),scaleFactor.x,scaleFactor.y);
            });
          console.log("vertexSetsvertexSets: ", Vertices.centre(vertexSets) ,vertexSets)
          const redCategory = 0x0001;
          body =  Bodies.fromVertices(pos.x,pos.y, vertexSets,{collisionFilter: {
            mask: redCategory
    } ,render: {
                // fillStyle: "none",
                // lineWidth: 1,
              //   sprite: {
              //     texture: img
              // }
              }})
    });
    return body
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