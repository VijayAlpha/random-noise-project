var simplex = new SimplexNoise(),
  canvas = document.getElementById("c"),
  ctx = canvas.getContext("2d"),
  imgdata = ctx.getImageData(0, 0, canvas.width, canvas.height),
  data = imgdata.data,
  t = 0;

var size = canvas.width;
// const change_1 = Math.round(Math.random() * 600);
// const change_2 = Math.round(Math.random() * 785);
// const change_3 = Math.round(Math.random() * 100);

window.setInterval(function () {
  for (var x = 0; x < size; x++) {
    for (var y = 0; y < size; y++) {
      // this is for shape
      var r = simplex.noise3D(x / 172, y / 26, t / 16) * 0.5 + 0.5;
      var g = simplex.noise3D(x / 172, y / 28, t / 16) * 0.5 + 0.5;
      // this is for color
      data[(x + y * size) * 4 + 0] = g * 255;
      data[(x + y * size) * 4 + 1] =  0;
      data[(x + y * size) * 4 + 2] = g * 252;
      data[(x + y * size) * 4 + 3] = 255;
    }
  }
  t++;
  ctx.putImageData(imgdata, 0, 0);
}, 1000 / 60);

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

var recorder = new PNGSequence(canvas);
recorder.capture(30);

var thePNGDataURLs;

setTimeout(function () {
  thePNGDataURLs = recorder.stop();
  console.log(thePNGDataURLs);

  axios
    .post("/dataurl", {
      pngData: thePNGDataURLs,
    })
    .then(function (response) {
      location.assign("/white");
    });
}, 10000);
