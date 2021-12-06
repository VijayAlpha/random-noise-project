const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");
//const pngData = require("./data");

const convertToPNG = (data) => {
  //to remove the prev files in the folder
  //data = data || pngData;
  const directory = "images";
  const filenames = fs.readdirSync(directory);

  filenames.forEach((file) => {
    fs.unlink(path.join(directory, file), (err) => {
      if (err) throw err;
    });
  });
  console.log("Images Deleted");

  data.forEach((el, i) => {
    var matches = el.match(/^data:.+\/(.+);base64,(.*)$/);

    var ext = matches[1];
    var fileData = matches[2];
    var buffer = Buffer.from(fileData, "base64");

    fs.writeFileSync(`images/image-${i}.` + ext, buffer);
  });
  console.log("Converting Data to PNG process is Done");

  const videofiles = fs.readdirSync("videos");

  const cmd = `ffmpeg -framerate 10 -i ./images/image-%d.png ./videos/waves-${
    videofiles.length + 1
  }.mp4`;

  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      return;
    }
    // the *entire* stdout and stderr (buffered)
    // console.log(`stdout: ${stdout}`);
    // console.log(`stderr: ${stderr}`);
    console.log("Video Created");
  });

  return true;
};

module.exports = convertToPNG;

//main();
