const express = require('express');
//const bodyParser = require('body-parser');
const fs = require('fs');
const http = require('http');
const https = require('https');
const privateKey = fs.readFileSync('cert/private_key.pem', 'utf8');
const certificate = fs.readFileSync('cert/certificate.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate };
const os = require('os');

// Starting point of the server
function main(isHttp, isHttps) {

  let app = express(); // Export app for other routes to use
  
  //thiet lap cac tham so header dieu khien chung
  //cho phep goi qua ajax ...
  //app.use(handlers.cors);
  
  //1.dang ky duong dan tuyet doi co dinh cho ionic
  app.use(express.static(__dirname + '/www'));
  
  //thu speedtest
  var speedtest = require('./speedtest/routes-speedtest');
  app.use('/speedtest', speedtest); 
  
  //ham tra loi cac dia chi khong co
  //The 404 Route (ALWAYS Keep this as the last route)
  app.all('*',(req, res) => {
    //gui trang thai bao noi dung tra ve
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>Đừng tìm kiếm vô ích. Đố mầy hack đấy!</h1>Are You Lazy???');
  });

  //ham xu ly loi cuoi cung
  //app.use(handlers.errorProcess);

  if (isHttp) {
    // your express configuration here
    // For http
    const httpServer = http.createServer(app);
    const portHttp = process.env.PORT || isHttp;
    httpServer.listen(portHttp, () => {
      console.log("Server HTTP (" + os.platform() + "; " + os.arch() + ") is started with PORT: "
        + portHttp
        + "\n tempdir: " + os.tmpdir()
        + "\n " + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      );
    });
  }

  if (isHttps) {
    // For https
    const portHttps = process.env.PORT || isHttps;
    const httpsServer = https.createServer(credentials, app);
    httpsServer.listen(portHttps, () => {
      console.log("Server HTTPS (" + os.platform() + "; " + os.arch() + ") is started with PORT: "
        + portHttps
        + "\n tempdir: " + os.tmpdir()
        + "\n " + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      );
    });
  }
}

//=false or port number >1000
const isHttp = 9236;
const isHttps = false //8443; 

main(isHttp, isHttps);