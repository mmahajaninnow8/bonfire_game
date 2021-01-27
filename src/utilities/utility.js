import Matter from "matter-js";
var Vertices = Matter.Vertices,
Svg = Matter.Svg,
Bodies = Matter.Bodies;
export const makeBodyFromSVG  = async (svg,pos ,img)=>{
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
              return Vertices.scale(Svg.pathToVertices(path, 100), 0.1, 0.1);
            });
      body =  Bodies.fromVertices(pos.x,pos.y, vertexSets,{render: {
                // fillStyle: "yellow",
                // lineWidth: 1,
                sprite: {
                  texture: img
              }
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