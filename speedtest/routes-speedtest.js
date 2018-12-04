const router = require('express').Router();
const request = require('request');

//su dung ping
router.get('/empty',(req,res,next)=>{
    res.writeHead(200, { 
        'Cache-Control' : 'no-store, no-cache, must-revalidate, max-age=0',
        'Cache-Control' : 'post-check=0, pre-check=0', //false
        'Pragma'        : 'no-cache',
        'Connection'    : 'keep-alive'
    });
    res.end();
})

//lay dia chi ip va tra ve vi tri ip o dau 
router.get('/get-ip',(req,res,next)=>{
    res.writeHead(200, { 
        'Content-Type'  : 'application/json; charset=utf-8'
    });


    console.log('req:');
    console.log(req);

    var ip;
    if (req.headers["client_ip"]){
        ip=req.headers["client_ip"];
    }else if (req.headers["x-real-ip"]){
        ip=req.headers["x-real-ip"];
    }else if (req.headers["x-forwarded-for"]){
        ip=req.headers["x-forwarded-for"];
    }else if (req.headers["remote_add"]){
        ip=req.headers["remote_add"];
    }else{
        ip=req.ip;
    }

    console.log('ip raw:');
    console.log(ip);

    ip = ip.replace(/f+/, '').replace(/:+/, '');

    if (ip.indexOf('::1')>=0){
        res.end(JSON.stringify({
            status:false,
            message:"localhost ipv6 access"
        }));
    }else if (ip.indexOf('127.0.0')>=0){
        res.end(JSON.stringify({
            status:false,
            message:"localhost ipv4 access"
        }));
    }

    console.log('ip:');
    console.log(ip);

    //lay thong tin cua dia chi ip
    var ispObj = getIsp(ip);
    if (ispObj){
        res.end(JSON.stringify({
            processedString:ip,
            rawIspInfo:ispObj
        }));
    }else{
        res.end(JSON.stringify({
            status:false,
            message:"Error to get ISP ip!"
        }));
    }

})

//tra ve mot goi tin danh gia toc do dowload
router.get('/dowload',(req,res,next)=>{
    //lay dia chi ip va tra ve vi tri ip o dau 
    res.writeHead(200, { 
        'Content-Description'           : 'File Transfer',
        'Content-Type'                  : 'application/octet-stream',
        'ontent-Disposition'            : 'attachment; filename=random.dat',
        'Cache-Control'                 : 'no-store, no-cache, must-revalidate, max-age=0',
        'Content-Transfer-Encoding'     : 'post-check=0, pre-check=0', //false
        'Pragma'                        : 'no-cache'
    });
    var buff = Buffer.alloc(1048576,'x');
    //tra theo block cho user
    var chunks=1000;
    //bien chunk duoc nhan tu client yeu cau nhan so luong goi tin
    //ckSize min = 4, max = 100
    
    if (!chunks) chunks = 4;
    if (chunks>100) chunks = 100;
    for (let i=0;i<chunks;i++){
        res.write(buff);
    }
    res.end();
})


//lay toa do cua client
function getIsp(ip){
    request('https://ipinfo.io/'+ip+'/json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // Print the google web page.
            //doc body lay mot anh dai dien?? icon??
            /**
             * {
                "ip": "210.245.119.136",
                "city": "Ho Chi Minh City",
                "region": "Ho Chi Minh",
                "country": "VN",
                "loc": "10.8142,106.6440",
                "org": "AS18403 The Corporation for Financing & Promoting Technology"
                }
            */  
           if (body&&body.loc&&body.loc[0]&&body.loc[1]){
                body.distance = getServerDistance(body);
            }   
            return body;
        } else {
            console.log(error);
            return;
        }
    });
}

//lay toa do, cua may chu 
function getServerDistance(client){
    request('https://ipinfo.io/json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body) // Print the google web page.
            //doc body lay mot anh dai dien?? icon??
            /**
             * {
                "ip": "14.167.2.166",
                "hostname": "static.vnpt.vn",
                "city": "",
                "region": "",
                "country": "VN",
                "loc": "16.0000,106.0000",
                "org": "AS45899 VNPT Corp"
                }
            */        
           if (body&&body.loc&&body.loc[0]&&body.loc[1]){
               return getDistance(body.loc[0]&&body.loc[1],client.loc[0],client.loc(1));
           }else{
               return;
           }
        } else {
            console.log(error);
            return;
        }
    });
}

function getDistance(lat1,lon1,lat2,lon2){
    let rad = Math.PI / 180;
    let deltaLon = lon1 - lon2;
    distance = Math.sin(lat1 * rad) * Math.sin(lat2 * rad) 
              + Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.cos(deltaLon * rad);
    return Math.acos(distance) / rad * 60 * 1.853;
}

module.exports = router;