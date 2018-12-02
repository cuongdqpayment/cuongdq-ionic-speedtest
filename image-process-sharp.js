const sharp = require('sharp');
const fs = require('fs');

sharp('./upload_files/origin.jpeg')
    .rotate(180)
    .resize(200)
    .toBuffer()
    .then( data => {
        fs.writeFileSync('./upload_files/resize200.jpeg', data);
    })
    .catch( err => {
        console.log(err);
    });							



 var Jimp = require('jimp');
 