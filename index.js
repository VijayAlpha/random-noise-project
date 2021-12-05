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
console.log(change_3);

window.setInterval(function () {
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
}, 1000 / 60);

// var encoder = new Whammy.Video(15);

// encoder.add(canvas);
// var output = encoder.compile();
// var url = (window.webkitURL || window.URL).createObjectURL(output);
function PNGSequence(canvas) {
  this.canvas = canvas;
  this.sequence = [];
}
PNGSequence.prototype.capture = function (fps) {
  var cap = this;
  this.sequence.length = 0;
  this.timer = setInterval(function () {
    cap.sequence.push(cap.canvas.toDataURL());
  }, 1000 / fps);
};
PNGSequence.prototype.stop = function () {
  if (this.timer) clearInterval(this.timer);
  delete this.timer;
  return this.sequence;
};

//var myCanvas = document.getElementById('my-canvas-id');
var recorder = new PNGSequence(canvas);
recorder.capture(15);

var thePNGDataURLs;

// Record 5 seconds
setTimeout(function () {
  thePNGDataURLs = recorder.stop();
  console.log(thePNGDataURLs);
  // var link = document.createElement("a");
  // link.download = "video.png";
  // link.href = thePNGDataURLs[0];
  // link.click();
}, 5000);
