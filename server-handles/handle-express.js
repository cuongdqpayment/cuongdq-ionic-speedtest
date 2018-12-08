class HandlesExpress{
    constructor() {}
    cors(req, res, next) {
        //console.log(req.url) //phan no request la gi PUT, OPTIONS, DELETE,
        res.header("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
        res.header('Access-Control-Allow-Origin', 'http://localhost:8080'); //cho phep truy cap
        res.header('Access-Control-Allow-Origin', 'http://localhost:9235'); //cho phep truy cap
        res.header('Access-Control-Allow-Origin', 'http://localhost:8*'); //cho phep truy cap
        res.header('Access-Control-Allow-Origin', '*.herokuapp.com'); //cho phep truy cap
        res.header('Access-Control-Allow-Origin', '*.mobifone.vn'); //cho phep truy cap
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        //res.header("Access-Control-Allow-Credentials", true);
        next();
      }
}
module.exports = HandlesExpress; 
