const sqliteService = require('./db/sqlite3/sqlite-jwt-service');

setTimeout(()=>{
    //da 1 giay troi qua, thuc thi lenh khoi tao
    sqliteService.HandleDatabase.init(); //tao bang
    //lay kieu oracledb.OBJECT
    sqliteService.db.getRst("select count(1) count_table, 1000 my_var from LOCAL_USERS")
    .then(data=>{
        console.log(data);
    })
    .catch(err=>{
        console.log(err);
    });

    //cau lenh doi xu ly be hom
    sqliteService.db.getRsts("select count(1) count_table, 100 my_var from LOCAL_USERS")
    .then(data=>{
        console.log(data);
    })
    .catch(err=>{
        console.log(err);
    });


    sqliteService.db.getRst("select * from LOCAL_USERS where 1=2")
    .then(data=>{
        console.log(data);
    })
    .catch(err=>{
        console.log(err);
    });


},1000);
