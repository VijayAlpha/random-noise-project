var simplex = new SimplexNoise(),
  canvas = document.getElementById("c"),
  ctx = canvas.getContext("2d"),
  imgdata = ctx.getImageData(0, 0, canvas.width, canvas.height),
  data = imgdata.data,
  t = 0;

// var number = localStorage.getItem("number");
// console.log(localStorage.getItem("number"));
// if (number === 0) {
//   number = 1;
// } else {
//   number = parseInt(localStorage.getItem("number")) + 1;
// }

// document.querySelector(".number").innerHTML = number;

// localStorage.setItem("number", parseInt(number));

var size = 720;
const change_1 = Math.round(Math.random() * 256);
const change_2 = Math.round(Math.random() * 256);
const change_3 = Math.round(Math.random() * 256);
console.log(change_1);
console.log(change_2);

// window.setInterval(function () {
for (var x = 0; x < size; x++) {
  for (var y = 0; y < size; y++) {
    // this is for shape
    var r = simplex.noise3D(x / 216, y / 20, t / 52) * 0.9 + 0.5;
    var g = simplex.noise3D(x / 219, y / 78, t / 52) * 0.9 + 0.5;
    // this is for color
    data[(x + y * size) * 4 + 0] = r * change_1;
    data[(x + y * size) * 4 + 1] = g * r * change_2;
    data[(x + y * size) * 4 + 2] = change_3;
    data[(x + y * size) * 4 + 3] = (change_2 * change_1) / 2;
  }
}
t++;
ctx.putImageData(imgdata, 0, 0);

// image = canvas
//   .toDataURL("image/png", 1.0)
//   .replace("image/png", "image/octet-stream");
// var link = document.createElement("a");
// link.download = "my-image.png";
// link.href = image;
// link.click();

// }, 1000 / 60);
