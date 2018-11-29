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
  //register post
  register(req, res, next) {
    const form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
      let isOKAll = true;
      let username = '';
      let password = '';

      if (err) {
        next();
      } else {
        for (let key in fields) {
          if (key = 'username') username = fields[key];
          if (key = 'password') password = fields[key];
        }
      }
      let decryptedPassSign ='';
      if (username&&password){
        username = username.toUpperCase();
        try{
          decryptedPassSign = MidlewareRSA.decrypt(password,'utf8');
          decryptedPassSign = MidlewareRSA.sign(JSON.stringify({
            username:username,
            password: decryptedPassSign
          }), 'base64');
        }catch(err){
          isOKAll = fasle;
        }
      }else{
        isOKAll = false;
      }

      //chu ky user name va pass ghi vao csdl
      //user la uppercase + clearpass
      // console.log('decryptedPassSign:');
      // console.log(decryptedPassSign);
      //cuongdq,123
      //MB5poYdYTl1yH6AIVK+IwGH1Rg9iE80SBh6uEpqfVHMDfykBOo/WbwPLAn0HJkw455enNZPGUgHEFbgNN7Cxgg==
      
      //goi database ghi nhan user
      var userInfo={
        username: username,
        password: decryptedPassSign,
        nickname:'cuong.dq',
        fullname:'Đoàn Quốc Cường',
        urlImage:'http://abc.jsp/anhcanhan.jsp',
        name: 'PHONE',
        phone:'903500888',
        email:'cuongdq350088@gmail.com',
        address:'Admin đây mà',
        ip: '10.12',
        token:'xyz'
        }

      if (isOKAll){
        databaseService.HandleDatabase.createUser(userInfo)
        .then(data=>{
          //console.log(data);
          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8'});
          res.end(JSON.stringify({
            success: true,
            message: 'Đã đăng ký thành công!',
            username: username,
            token: decryptedPassSign
          }));
        })
        .catch(err=>{
          res.writeHead(403, { 'Content-Type': 'application/json; charset=utf-8'});
          res.end(JSON.stringify({
            success: false,
            message: 'Đăng ký không thành công đâu nhé',
            error:err
          }));
        });
      }else{
        res.writeHead(403, { 'Content-Type': 'application/json; charset=utf-8'});
          res.end(JSON.stringify({
            success: false,
            message: 'Lỗi truyền số liệu không đúng'
          }));
      }
    });
    
  }

  //login post
  login(req, res, next) {

    const form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {

      let isOKAll = true;
      let username = '';
      let password = '';
      if (err) {
        next();
      } else {
        for (let key in fields) {
          if (key = 'username') username = fields[key];
          if (key = 'password') password = fields[key];
        }
      }

      let decryptedPassSign ='';
      if (username&&password){
        username = username.toUpperCase();
        try{
          decryptedPassSign = MidlewareRSA.decrypt(password,'utf8');
          decryptedPassSign = MidlewareRSA.sign(JSON.stringify({
            username:username,
            password: decryptedPassSign
          }), 'base64');
        }catch(err){
          isOKAll = fasle;
        }
      }else{
        isOKAll = false;
      }

      var userInfo={
        username: username,
        password: decryptedPassSign
        }

      if (isOKAll){
          databaseService.HandleDatabase.checkUser(userInfo)
          .then(userInfo=>{
            if (userInfo){
              //thuc hien cac noi dung jwt
              let tokenLogin = jwt.sign({
                username: userInfo.USERNAME,
                nickname: userInfo.DISPLAY_NAME,
                image: userInfo.URL_IMAGE,//, //thong tin anh cua nguoi su dung
                req_ip: req.ip, //chi duoc cap cho ip nay
                //req_device: req.headers["user-agent"], //chi cap cho thiet bi nay */
                /* fullname: userInfo.FULL_NAME,
                phone: userInfo.PHONE,
                email: userInfo.EMAIL, */
                /* address: userInfo.FULL_ADDRESS,
                last_ip: userInfo.LAST_IP,
                req_url: req.url,
                req_method: req.method,
                //certificate: decryptedPassSign, //chuoi bao mat lop 2 //khi can verify 
                //req_time: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')*/
              },
                config.secret,
                {
                  expiresIn: '24h' // expires in 24 hours
                }
              );
    
              //su dung sha de certificate nua di?? thi client se khong lay duoc thong tin nay
              console.log(tokenLogin);


              res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8'});
              res.end(JSON.stringify({
                success: true,
                message: 'Chúc mừng bạn đã login thành công! Hãy sử dụng thẻ truy cập để yêu cầu dữ liệu của chúng tôi trong 24h tới!',
                token: tokenLogin
              }));
            }else{
              res.writeHead(403, { 'Content-Type': 'application/json; charset=utf-8'});
              res.end(JSON.stringify({
                success: false,
                message: 'Kiểm tra lại User/pass nhé!'
              }));
            }
          })
          .catch(err=>{
            res.writeHead(403, { 'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify({
              success: false,
              message: 'Login không thành công-do lỗi query!',
              error:err
            }));
          });

      }else{
        res.writeHead(403, { 'Content-Type': 'application/json; charset=utf-8'});
          res.end(JSON.stringify({
            success: false,
            message: 'Lỗi truyền số liệu không đúng!'
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
