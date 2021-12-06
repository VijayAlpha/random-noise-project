const fs = require("fs");
const ffmpeg = require("ffmpeg");
const videoshow = require("videoshow");
const data = require("./data");

const main = () => {
  //   data.forEach((el, i) => {
  //     var matches = el.match(/^data:.+\/(.+);base64,(.*)$/);

  //     var ext = matches[1];
  //     var fileData = matches[2];
  //     var buffer = Buffer.from(fileData, "base64");

  //     fs.writeFileSync(`images/image-${i}.` + ext, buffer);
  //     console.log("done");
  //   });

  //   var secondsToShowEachImage = 1;
  //   var finalVideoPath = "/video";

  // array of images to make the 'videoshow' from
  //   var images = [
  //     { path: "./images/image-0.png", loop: secondsToShowEachImage },
  //     { path: "./images/image-1.png", loop: secondsToShowEachImage },
  //     { path: "./images/image-2.png", loop: secondsToShowEachImage },
  //     { path: "./images/image-3.png", loop: secondsToShowEachImage },
  //     { path: "./images/image-4.png", loop: secondsToShowEachImage },
  //     { path: "./images/image-5.png", loop: secondsToShowEachImage },
  //     { path: "./images/image-6.png", loop: secondsToShowEachImage },
  //     { path: "./images/image-7.png", loop: secondsToShowEachImage },
  //     { path: "./images/image-8.png", loop: secondsToShowEachImage },
  //   ];
  var images = [];

  for (i = 0; i < 35; i++) {
    images.push(`./images/image-${i}.png`);
  }

  console.log("Array : ", images);

  var videoOptions = {
    fps: 35,
    loop: 0.1,
    transition: false,
    videoBitrate: 1024,
    videoCodec: "libx264",
    size: "640x?",
    format: "mp4",
    pixelFormat: "yuv420p",
  };

  videoshow(images, videoOptions)
    .save("video.mp4")
    .on("start", function (command) {
      console.log("ffmpeg process started:", command);
    })
    .on("error", function (err, stdout, stderr) {
      console.error("Error:", err);
      console.error("ffmpeg stderr:", stderr);
    })
    .on("end", function (output) {
      console.error("Video created in:", output);
    });
};

main();
