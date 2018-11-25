let jwt = require('jsonwebtoken');
const config = require('./config.js');

let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

  if (token) {
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        console.log(decoded);
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};


class HandlerGenerator {
  login (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    
    //Đọc cơ sở dữ liệu, kiểm tra user phù hợp
    //trả kết quả người dùng
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
          { expiresIn: '24h' // expires in 24 hours
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
  }
  index (req, res) {
    res.json({
      success: true,
      message: 'Đây là trang index json nhé'
    });
  }
}

module.exports = {
  checkToken: checkToken,
  HandlerGenerator: new HandlerGenerator()
};
