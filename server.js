const express = require('express'), server = express();
const fs = require('fs');
const formidable = require('formidable');
const systempath = require('path');
const os = require('os');
const mime = require('mime-types');
const request = require('request');
const HTMLParser = require('node-html-parser');
const cheerio = require('cheerio');
const bodyParser = require('body-parser');
let middleware = require('./jwt/middleware');
let databaseService = require('./db/database-service');

const DDDoS = require('dddos');

//
class HandlerGenerator {

  parseForm(req, res, next) {

    console.log(req.body);

    var jsonReturn = {
      your_params: [],
      your_files: [],
      your_error: []
    };

    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      if (err) {
        //jsonReturn.your_error.push(err);
        next();
      } else {
        for (let key in fields) {
          jsonReturn.your_params.push({
            name: key,
            value: fields[key]
          });
        }
      }

      let username = jsonReturn.your_params.username;
      let password = jsonReturn.your_params.password;

      let mockedUsername = 'admin';
      let mockedPassword = 'password';

      if (username && password) {
        if (username === mockedUsername && password === mockedPassword) {
          let token = jwt.sign({
            username: username,
            req_url: req.url,
            req_method: req.method,
            req_link: req.protocol + '://' + req.get('host'),
            req_device: req.headers["user-agent"],
            req_time: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
          },
            config.secret,
            {
              expiresIn: '24h' // expires in 24 hours
            }
          );
          // return the JWT token for the future API calls
          res.json({
            success: true,
            message: 'Authentication successful!',
            token: token
          });
        } else {
          res.send(403).json({
            success: false,
            message: 'Incorrect username or password'
          });
        }
      } else {
        res.send(400).json({
          success: false,
          message: 'Authentication failed! Please check the request'
        });
      }
    })
  }

  index(req, res) {
    res.json({
      success: true,
      message: 'Đây là trang index json nhé'
    });
  }
}

// Starting point of the server
function main() {
  let app = express(); // Export app for other routes to use
  let handlers = new HandlerGenerator();

  app.use(bodyParser.urlencoded({
    // Middleware
    extended: true
  }));
  app.use(bodyParser.json());

  //luu log truy cap
  app.use(databaseService.HandleDatabase.logAccess);
  //1.dang ky duong dan tuyet doi co dinh cho ionic
  app.use(express.static(__dirname + '/www'));

  // Routes & Handlers
  app.post('/login', handlers.parseForm);
  app.get('/', middleware.checkToken, handlers.index);

  const PORT = process.env.PORT || 9235;
  app.listen(PORT, function () {
    console.log("Server (" + os.platform() + "; " + os.arch() + ") is started with PORT: "
      + PORT
      + "\n tempdir: " + os.tmpdir()
      + "\n " + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    );
  });
}

main();



