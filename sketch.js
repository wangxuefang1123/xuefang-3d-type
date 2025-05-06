/** @typedef {import("./p5/types").Graphics} Graphics */
/** @typedef {import("./p5/types").Image} Image */

/**
 * @typedef {object} cubo
 * @property {number} x
 * @property {number} y
 * @property {number} z
 * @property {number} size
 * @property {string} color
 * @property {Function} rotationFunction
 */

//设置多维数据集的变量

/**@type {cubo[]} */
let cubi = [];

let copie = 30;

/** @type {Graphics}*/
let g;

/** @type {Image}*/
let img;

//上传图片
function preload() {
  img = loadImage("assets/texture.jpg");
}

//设置画布；并且设置立方体数据集的坐标位置和范围；以及立方体尺寸颜色旋转
function setup() {
  createCanvas(windowWidth, windowHeight, "webgl");

  g = createGraphics(100, 100);

  for (let i = 0; i < copie; i++) {
    let cubo = {
      x: random(-1000, 1000),
      y: random(-1000, 1000),
      z: random(-1000, 1000),
      size: 200,
      color: random(["blue", "yellow", "black"]),
      rotationFunction: random([rotateX, rotateY, rotateZ]),
    };
    cubi.push(cubo);
  }
}

//在画布上绘制；并且定义立方体数据集中立方体的各种属性值
function draw() {
  background("white");
  orbitControl();
  rotateY(frameCount * 0.001);

  g.image(img, 0, 0, g.width, g.height);
  //g.textSize(200);
  //g.text("ciao", 0, 200);

  //g.background("blue");
  //g.fill("white");
  //g.textSize(32);
  //g.text("ciao", 0, 100);

  noStroke();
  for (let cubo of cubi) {
    push();
    translate(cubo.x, cubo.y, cubo.z);

    let velocita = frameCount * 0.005;
    cubo.rotationFunction(velocita);
    rotateZ(velocita);

    //fill(cubo.color);
    texture(g);
    cone(cubo.size);
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
