class HandlesExpress{
    constructor() {}
    cors(req, res, next) {
        //console.log(req.url) //phan no request la gi PUT, OPTIONS, DELETE,
        res.header("Access-Control-Allow-Methods", "POST, GET");
        res.header('Access-Control-Allow-Origin', '*'); //cho phep truy cap
         //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        //res.header("Access-Control-Allow-Credentials", true);
        next();
      }
}
module.exports = HandlesExpress; 
