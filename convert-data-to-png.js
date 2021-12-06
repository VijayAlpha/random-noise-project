const fs = require("fs");
const path = require("path");
const data = require("./data");

const main = () => {
  // to remove the prev files in the folder
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
};

main();
