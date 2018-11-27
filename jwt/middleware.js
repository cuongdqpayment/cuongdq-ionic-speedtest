const jwt = require('jsonwebtoken');
const config = require('./config.js');
//xu ly form data post len
const formidable = require('formidable');
const DDDoS = require('dddos');
//khai bao csdl
const databaseService = require('../db/database-service');
//tao bang du lieu luu tru
databaseService.HandleDatabase.init();


let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

  if (token) {
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.end(JSON.stringify({
          success: false,
          message: 'Token is not valid'
        }));
      } else {
        //console.log(decoded);
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.end(JSON.stringify({
      success: false,
      message: 'Auth token is not supplied'
    }));
  }
};


class HandlerGenerator {

  parseForm(req, res, next) {

    var jsonReturn = {
      your_params: [],
      your_files: [],
      your_error: []
    };

    const form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
      let username = '';
      let password = '';

      if (err) {
        next();
      } else {
        for (let key in fields) {
          if (key = 'username') username = fields[key];
          if (key = 'password') password = fields[key];
          jsonReturn.your_params.push({
            name: key,
            value: fields[key]
          });
        }
      }

      let mockedUsername = 'admin';
      let mockedPassword = 'password';

      if (username && password) {
        if (username === mockedUsername && password === mockedPassword) {

          let token = jwt.sign({
            username: username,
            req_url: req.url,
            req_method: req.method,
            req_time: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
          },
            config.secret,
            {
              expiresIn: '24h' // expires in 24 hours
            }
          );

          res.end(JSON.stringify({
            success: true,
            message: 'Authentication successful!',
            token: token
          }));
        } else {
          res.end(JSON.stringify({
            success: false,
            message: 'Incorrect username or password'
          }));
        }
      } else {

        res.end(JSON.stringify({
          success: false,
          message: 'Authentication failed! Please check the request'
        }));
      }
    })
  }

  //log truy cap
  //su duong database luu lai
  logAccess(req, res, next) {
    databaseService.HandleDatabase.logAccess(req, res, next);
  }

  index(req, res) {
    res.end(JSON.stringify({
      success: true,
      message: 'Đây là trang index json nhé'
    }));
  }

  errorProcess(err, req, res, next) {
    res.end(JSON.stringify(err))
  }

  ddosPrevent() {
    return new DDDoS({
      errorData: "Hãy bình tĩnh, đợi tý đi!",
      //Data to be passes to the client on DDoS detection. Default: "Not so fast!".
      errorCode: 429,
      //HTTP error code to be set on DDoS detection. Default: 429 (Too Many Requests)
      weight: 1,
      maxWeight: 10,
      checkInterval: 1000,
      rules: [
      { //cho phep trang chu truy cap 16 yeu cau / 1 giay
          string: '/',
          maxWeight: 30
      },
      { // Allow 4 requests accessing the application API per checkInterval 
          regexp: "^/api.*",
          flags: "i",
          maxWeight: 4,
          queueSize: 4 // If request limit is exceeded, new requests are added to the queue 
      },
      { // Chi cho phep 1 request trong 1 giay thoi, neu qua se bao not so fast 
          string: "/test-upload",
          maxWeight: 1
      },
      { // Allow up to 16 other requests per check interval.
          regexp: ".*",
          maxWeight: 16
      }
      ]
      });
  }

}

module.exports = {
  db: databaseService, //chuyen db cho server 
  checkToken: checkToken, //kiem tra token
  HandlerGenerator: new HandlerGenerator() //dieu khien 
};
