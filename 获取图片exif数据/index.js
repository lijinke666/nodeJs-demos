const { ExifImage } = require("exif");
const path = require('path')

const file = path.resolve(__dirname,"./test.JPG")
try {
  new ExifImage({ image: file }, (error, exifData) => {
    if (error) console.log("Error: " + error.message);
    else console.log(exifData); // Do something with your data!
  });
} catch (error) {
  console.log("Error: " + error.message);
}
