const router = require('express').Router();

//su dung ping
router.get('/empty',(req,res,next)=>{
    res.writeHead(200, { 
        'Cache-Control' : 'no-store, no-cache, must-revalidate, max-age=0',
        'Cache-Control' : 'post-check=0, pre-check=0',
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
    res.end();
})

//tra ve mot goi tin danh gia toc do dowload
router.get('/garbage',(req,res,next)=>{
    //lay dia chi ip va tra ve vi tri ip o dau 
    res.writeHead(200, { 
        'Content-Type'  : 'application/json; charset=utf-8'
    });
    res.end();
})

module.exports = router;