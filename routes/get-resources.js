//midleware for to get route select resource with token verify
//Sử dụng cung cấp tài nguyên lệnh get với token đã được cấp và xác thực
const router = require('express').Router();
const systempath = require('path');
const mime = require('mime-types');
const fs = require('fs');
/* 
//tai server khai 
var resources = require('./routes/get-resources');
app.use('/resources', resources); 
//tuc la sau duong dan /resources/... la duong dan nhan duoc trong route nay
*/
//khai bao cac router
router.get('/user-image/*',(req,res,next)=>{
    // console.log('File-image trong may:' + req.pathName);
    // console.log('user cho phep:' + req.user); //de danh dau luu lai user nay truy cap tai nguyen luc nao
    let absoluteFileName = req.pathName.substring('/user-image/'.length);
    //console.log(absoluteFileName);
    //doc file tu dia, mo file va tra duong dan
    //query co dang
    //url = http://xyz.com/resources/user-image/<dir*>/file.jsp
    //req.pathName = /user-image/<dir*>/file.jsp
    //trong do <dir*> la duong dan tuong ung tuyet doi sau imgDir
    let fileRead = absoluteFileName.replace('/',systempath.sep);
    //chuyen doi duong dan file trong he thong tuong ung
    //console.log(fileRead);
    var contentType = 'image/jpeg';
    if (mime.lookup(fileRead)) contentType = mime.lookup(fileRead);
    fs.readFile(fileRead, { flag: 'r' }, function (error, data) {
        if (!error) {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(JSON.stringify(error));
        }
    });
})


module.exports = router;