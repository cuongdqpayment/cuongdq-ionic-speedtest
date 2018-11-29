const jwt = require('jsonwebtoken');
const config = require('./config.js');
//xu ly form data post len
const formidable = require('formidable');

//khai bao csdl
const databaseService = require('../db/database-service');
//tao bang du lieu luu tru
databaseService.HandleDatabase.init();


//khoa RSA su dung cho MidleWare:
//su dung de import key chinh vao verify, sign, decrypted va encrytped
const NodeRSA = require('node-rsa');
const MidlewareRSA = new NodeRSA(null,{ signingScheme: 'pkcs1-sha256' });


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

var RSAKeyObj; //bien public de su dung
class HandlerGenerator {
  //login post
  login(req, res, next) {

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
      let decryptedPass ='';
      try{
        //console.log(password);
        decryptedPass = MidlewareRSA.decrypt(password,'utf8');
        //console.log(decryptedPass);
      }catch(err){
        //console.log(err);
      }

      

      let mockedUsername = 'admin';
      let mockedPassword = 'password';

      if (username && decryptedPass) {
        if (username === mockedUsername && decryptedPass === mockedPassword) {

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


  // khoi tao lay bien public 
  init(){
    databaseService.HandleDatabase.
    createServiceKey(databaseService.service_id)
    .then(serverkey=>{
      //gan vao de su dung lay lai lan sau nhe
      RSAKeyObj = serverkey;
      MidlewareRSA.importKey(serverkey.PRIVATE_KEY);
    }).catch(err=>console.log(err))
   }

   checkRoles(req, res, next){
     //thay các quyền kiểm tra tại điều kiện kiểm tra nhé
     //*********/
    if (RSAKeyObj){
      //doi tuong su dung de encrypte, sign, decrypt, verify dung privatekey
      console.log(MidlewareRSA);
      next();
    }else{
      res.writeHead(403, { 'Content-Type': 'application/json'});
      res.end(JSON.stringify({status:'NOK',message:'Bạn không có quyền vào hệ thống'}));
    }
   }

   getRSAKeyObj(req, res, next){
      res.writeHead(200, { 'Content-Type': 'application/json'});
      res.end(JSON.stringify(RSAKeyObj));
   }
   
   getPublickeyJson(req, res, next) {
    databaseService.HandleDatabase.
    createServiceKey(databaseService.service_id)
    .then(serverkey=>{
      //gan vao de su dung lay lai lan sau nhe
      RSAKeyObj = serverkey;
      MidlewareRSA.importKey(serverkey.PRIVATE_KEY);
      //console.log(RSAKeyObj); 
      res.writeHead(200, { 'Content-Type': 'application/json'});
      res.end(JSON.stringify({
        SERVICE_ID: serverkey.SERVICE_ID,
        PUBLIC_KEY: serverkey.PUBLIC_KEY,
        SERVICE_NAME: serverkey.SERVICE_NAME,
        IS_ACTIVE: serverkey.IS_ACTIVE
      }));
    })
  }

  cors(req, res, next){
    res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header('Access-Control-Allow-Origin', 'http://localhost:9235');
    res.header('Access-Control-Allow-Origin', 'http://localhost:8100');
    //muon cho phep truy cap tu server nao thi reply cac website tuong ung
    //res.header("Access-Control-Allow-Origin", "*"); //khai bao chap nhan tat ca de test
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
  }
  
}

module.exports = {
  db: databaseService, //chuyen db cho server 
  checkToken: checkToken, //kiem tra token
  HandlerGenerator: new HandlerGenerator() //dieu khien 
};
