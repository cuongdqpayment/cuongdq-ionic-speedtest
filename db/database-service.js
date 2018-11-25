const fs = require('fs');
const url = require('url');
//chen 2 doi tuong su dung cho sqlite - cuongdq
const AppDAO = require('./lib/sqlite-dao');
const dataType = require('./lib/sqlite-datatype');
const isSilence = require('./lib/config').keep_silence;



const dirDB = 'db';
if (!fs.existsSync(dirDB)) {
    fs.mkdirSync(dirDB);
}
var db = new AppDAO('./' + dirDB + '/jwt_database.db');

var admin ={
    name: 'SOCIAL_USERS',
    cols: [
        {
            name: 'ID', //id duy nhat cua he thong de quan ly 
            type: dataType.integer,
            option_key: 'PRIMARY KEY AUTOINCREMENT NOT NULL',
            description: 'Mã ID của User là duy nhất của hệ thống này không quản lý rowid'
        },
        {
            name: 'PROVIDER_ID',
            type: dataType.text,
            option_key: 'NOT NULL',
            description: 'Mã ID của User là duy nhất theo từng hệ thống'
        },
        {
            name: 'PROVIDER',
            type: dataType.text,
            option_key: 'NOT NULL',
            description: 'Nhà cung cấp dịch vụ xác thực như facebook, google, local'
        },
        {
            name: 'DISPLAY_NAME',
            type: dataType.text,
            option_key: '',
            description: 'displayName Tên hiển thị của người dùng trên mạng xã hội'
        },
        {
            name: 'URL_IMAGE',
            type: dataType.text,
            option_key: '',
            description: 'Đường dẫn url ảnh đại diện'
        },
        {
            name: 'FULL_NAME',
            type: dataType.text,
            option_key: '',
            description: 'Họ và tên quản lý đầy đủ của hệ thống riêng'
        },
        {
            name: 'PHONE',
            type: dataType.text,
            option_key: '',
            description: 'Số điện thoại được cung cấp bởi người dùng hoặc lấy từ mạng xã hội'
        },
        {
            name: 'EMAIL',
            type: dataType.text,
            option_key: '',
            description: 'Địa chỉ email của người dùng hệ thống hoặc mạng xã hội'
        },
        {
            name: 'FULL_ADDRESS',
            type: dataType.text,
            option_key: '',
            description: 'Địa chỉ quản lý đầy đủ của hệ thống riêng'
        },
        {
            name: 'ROLES',
            type: dataType.text,
            option_key: '',
            description: 'Vai trò của người dùng trong hệ thống này'
        },
        {
            name: 'COUNT_IP',
            type: dataType.integer,
            option_key: 'default 0',
            description: 'Số lượng IP mà user này sử dụng danh sách được quản lý bằng bản chi tiết'
        },
        {
            name: 'LAST_IP',
            type: dataType.text,
            option_key: '',
            description: 'Địa chỉ ip cuối truy cập hệ thống'
        },
        {
            name: 'LAST_ACCESS_TIME',
            type: dataType.text,
            option_key: '',
            description: 'Thời gian truy cập cuối hệ thống'
        },
        {
            name: 'LAST_ACCESS_URL',
            type: dataType.text,
            option_key: '',
            description: 'Link truy cập cuối cùng dùng để trỏ về kết quả gần nhất cho họ'
        },
        {
            name: 'LAST_STATUS',
            type: dataType.numeric,
            option_key: 'default 0',
            description: 'Trạng thái truy cập lần gần nhất 0, 1, 2, 3'
        },
        {
            name: 'COUNT_ACCESS',
            type: dataType.numeric,
            option_key: 'default 0',
            description: 'Số lượt truy cập hệ thống này'
        },
        {
            name: 'TOKEN_ID',
            type: dataType.text,
            option_key: '',
            description: 'Mã Token truy cập hệ thống duy trì'
        },
        {
            name: 'IS_ACTIVE',
            type: dataType.numeric,
            option_key: 'default 1, unique(PROVIDER_ID, PROVIDER)',
            description: 'Quyền truy cập hệ thống, =0 là bị block không cho truy cập'
        }
    ]
};

db.createTable(admin).then(data=>{ if (!isSilence) console.log(data)
                                 });

var admin ={
    name: 'LOCAL_USERS',
    cols: [
        {
            name: 'ID', //id duy nhat cua he thong de quan ly 
            type: dataType.integer,
            option_key: 'PRIMARY KEY AUTOINCREMENT NOT NULL',
            description: 'Mã ID của User là duy nhất của hệ thống này không quản lý rowid'
        },
        {
            name: 'USERNAME',
            type: dataType.text,
            option_key: 'NOT NULL',
            description: 'Username của hệ thống cung cấp duy nhất sử dụng điện thoại hoặc email'
        },
        {
            name: 'PASSWORD',
            type: dataType.text,
            option_key: 'NOT NULL',
            description: 'Mật khẩu người dùng local được mã hóa'
        },
        {
            name: 'SOCIAL_USER_ID',
            type: dataType.integer,
            option_key: '',
            description: 'Mã ID của User Nếu liên kết từ mạng xã hội'
        },
        {
            name: 'DISPLAY_NAME',
            type: dataType.text,
            option_key: '',
            description: 'displayName Tên hiển thị của người dùng trên mạng xã hội'
        },
        {
            name: 'URL_IMAGE',
            type: dataType.text,
            option_key: '',
            description: 'Đường dẫn url ảnh đại diện'
        },
        {
            name: 'FULL_NAME',
            type: dataType.text,
            option_key: '',
            description: 'Họ và tên quản lý đầy đủ của hệ thống riêng'
        },
        {
            name: 'PHONE',
            type: dataType.text,
            option_key: '',
            description: 'Số điện thoại được cung cấp bởi người dùng hoặc lấy từ mạng xã hội'
        },
        {
            name: 'EMAIL',
            type: dataType.text,
            option_key: '',
            description: 'Địa chỉ email của người dùng hệ thống hoặc mạng xã hội'
        },
        {
            name: 'FULL_ADDRESS',
            type: dataType.text,
            option_key: '',
            description: 'Địa chỉ quản lý đầy đủ của hệ thống riêng'
        },
        {
            name: 'ROLES',
            type: dataType.text,
            option_key: '',
            description: 'Vai trò của người dùng trong hệ thống này'
        },
        {
            name: 'COUNT_IP',
            type: dataType.integer,
            option_key: 'default 0',
            description: 'Số lượng IP mà user này sử dụng danh sách được quản lý bằng bản chi tiết'
        },
        {
            name: 'LAST_IP',
            type: dataType.text,
            option_key: '',
            description: 'Địa chỉ ip cuối truy cập hệ thống'
        },
        {
            name: 'LAST_ACCESS_TIME',
            type: dataType.text,
            option_key: '',
            description: 'Thời gian truy cập cuối hệ thống'
        },
        {
            name: 'LAST_ACCESS_URL',
            type: dataType.text,
            option_key: '',
            description: 'Link truy cập cuối cùng dùng để trỏ về kết quả gần nhất cho họ'
        },
        {
            name: 'LAST_STATUS',
            type: dataType.numeric,
            option_key: 'default 0',
            description: 'Trạng thái truy cập lần gần nhất 0, 1, 2, 3'
        },
        {
            name: 'COUNT_ACCESS',
            type: dataType.numeric,
            option_key: 'default 0',
            description: 'Số lượt truy cập hệ thống này'
        },
        {
            name: 'TOKEN_ID',
            type: dataType.text,
            option_key: '',
            description: 'Mã Token truy cập hệ thống duy trì'
        },
        {
            name: 'IS_ACTIVE',
            type: dataType.numeric,
            option_key: 'default 1, unique(USERNAME)',
            description: 'Quyền truy cập hệ thống, =0 là bị block không cho truy cập'
        }
    ]
};

db.createTable(admin).then(data=>{if (!isSilence) console.log(data)
});

var logs ={
    name: 'LOG_ACCESS',
    cols: [
        {
            name: 'IP',
            type: dataType.text,
            option_key: 'NOT NULL UNIQUE',
            description: 'Key duy nhat quan ly'
        },
        {
            name: 'LOG_COUNT',
            type: dataType.integer,
            option_key: 'DEFAULT 1',
            description: 'So lan truy cap'
        },
        {
            name: 'LAST_ACCESS',
            type: dataType.text,
            option_key: '',
            description: 'Thoi gian truy cap gan nhat'
        },
        {
            name: 'ACCESS_INFO',
            type: dataType.text,
            option_key: '',
            description: 'Thong tin truy cap'
        },
        {
            name: 'DEVICE_INFO',
            type: dataType.text,
            option_key: '',
            description: 'Thong tin may'
        },
        {
            name: 'LOCATION',
            type: dataType.text,
            option_key: '',
            description: 'VI TRI'
        }
    ]
};

db.createTable(logs).then(data=>{if (!isSilence) console.log(data)
});



var log_details ={
    name: 'LOG_ACCESS_DETAILS',
    cols: [
        {
            name: 'IP',
            type: dataType.text,
            option_key: 'NOT NULL',
            description: 'Key duy nhat quan ly'
        },
        {
            name: 'ACCESS_INFO',
            type: dataType.text,
            option_key: 'NOT NULL',
            description: 'Thong tin truy cap'
        },
        {
            name: 'LOG_COUNT',
            type: dataType.integer,
            option_key: 'DEFAULT 1',
            description: 'So lan truy cap'
        },
        {
            name: 'LAST_ACCESS',
            type: dataType.text,
            option_key: '',
            description: 'Thoi gian truy cap gan nhat'
        },
        {
            name: 'DEVICE_INFO',
            type: dataType.text,
            option_key: '',
            description: 'Thong tin may'
        },
        {
            name: 'LOCATION',
            type: dataType.text,
            option_key: ', unique(IP, ACCESS_INFO)',
            description: 'VI TRI, va cau lenh unique'
        }
    ]
};

db.createTable(log_details).then(data=>{if (!isSilence) console.log(data)
});


class HandleDatabase {
    logAccess(req, res, next){
       //doan lay thong tin cac bien su dung sau nay
    var reqUrlString = req.url;
    var method = req.method;
    var pathName = decodeURIComponent(url.parse(reqUrlString, true, false).pathname);
    var reqFullHost = req.protocol + '://' + req.get('host');
    
    var log = {
        name: 'LOG_ACCESS',
        cols: [{
            name: 'IP',
            value: req.ip
        },
        {
            name: 'ACCESS_INFO',
            value: method + " " + reqFullHost + '/' + pathName
        },
        {
            name: 'DEVICE_INFO',
            value: req.headers["user-agent"]
        }
        ],
        wheres: [{
            name: 'IP',
            value: req.ip
        }]
    };
    db.insert(log)
      .then(data => {
        if (!isSilence) console.log(data)
        }
      )
      .catch(err=>{
          db.runSql("update LOG_ACCESS set LOG_COUNT=LOG_COUNT+1 where IP='"+req.ip+"'")
          .then(data=>{
            if (!isSilence) console.log(data)
          })
      });
    //-----------------------------------------
    //tra den phien tiep theo
    next(); 
    }
}


module.exports = {
    db:db,
    //dieu khien luu tru csdl
    HandleDatabase: new HandleDatabase()
};