const NodeRSA = require('node-rsa');

const client_key = new NodeRSA({ b: 512 }, { signingScheme: 'pkcs1-sha256' });

const client_public = client_key.exportKey('public');
const client_private = client_key.exportKey('private');

//ma hoa va giai ma du lieu
const objClient = {
    info: 'Đây là chuỗi thông tin khách hàng cần mã hóa truyền cho máy chủ + client_public_key',
    client_public: client_public
};

const encrypted = client_key.encrypt(JSON.stringify(objClient), 'base64');
console.log('client encrypted: ', encrypted);

//chi nguoi co public key moi giai ma cai nay ra duoc
//vi client co san public key nen no giai ma duoc thoi
const decrypted = client_key.decrypt(encrypted, 'utf8');
console.log('client private key decrypted: ', decrypted);


//thuc hien sign cua may client
const client_signed = client_key.sign(JSON.stringify(objClient), 'base64');
console.log('client signed: ', client_signed);


//may chu chua public key cua client nen no co thong tin de xac thuc chuoi chu ky dung cua khach hang hay khong
const server_verify = client_key.verify(JSON.stringify(objClient), client_signed, 'utf8', 'base64');

console.log('Server verify: ' + server_verify);


//tai may chu toi se tao ra mot cap key
const server_key = new NodeRSA({ b: 512 }, { signingScheme: 'pkcs1-sha256' });

const server_public = server_key.exportKey('public');
const server_private = server_key.exportKey('private');

//ma hoa va giai ma du lieu
const objserver = {
    info: 'Đây là chuỗi thông tin máy chủ gửi cho khách hàng cùng + server_public_key',
    server_public: server_public
};

const server_encrypted = server_key.encrypt(JSON.stringify(objserver), 'base64');
console.log('server encrypted: ', server_encrypted);

//chi nguoi co public key moi giai ma cai nay ra duoc
//vi server co san public key nen no giai ma duoc thoi
const server_decrypted = server_key.decrypt(server_encrypted, 'utf8');
console.log('server private key decrypted: ', server_decrypted);


//thuc hien sign cua may server
const server_signed = server_key.sign(JSON.stringify(objserver), 'base64');
console.log('server signed: ', server_signed);


//may chu chua public key cua server nen no co thong tin de xac thuc chuoi chu ky dung cua khach hang hay khong
const client_verify = server_key.verify(JSON.stringify(objserver), server_signed, 'utf8', 'base64');

console.log('Client verify: ' + client_verify);




//su dung public key de ma hoa thong tin gui cho may con
const midle_key = new NodeRSA(null, { signingScheme: 'pkcs1-sha256' });
//lay public key cua server de ma hoa
midle_key.importKey(server_public);
var send_server_byencrypt_server = midle_key.encrypt(objClient, 'base64', 'utf8');
console.log('Khách hàng có public key của server nên mã hóa thông tin gửi cho máy chủ encrypted: \n' + send_server_byencrypt_server
    + "\n isPrivate: " + midle_key.isPrivate()
    + "\n isPublic: " + midle_key.isPublic()
);


const midle_server_key = new NodeRSA(null, { signingScheme: 'pkcs1-sha256' });
//lay public key cua server de ma hoa
midle_server_key.importKey(server_private);

//server su dung private key de giai ma thong tin cua client gui len
const server_decrypted_from_client = midle_server_key.decrypt(send_server_byencrypt_server, 'utf8');
console.log('server private key decrypted from client: \n' + server_decrypted_from_client
    + "\n isPrivate: " + midle_server_key.isPrivate()
    + "\n isPublic: " + midle_server_key.isPublic()
);


try {
    //may con giai ma se khong duoc
    console.log('Client giai ma?? : \n' + client_key.decrypt(send_server_byencrypt_server, 'utf8'));
}
catch (err) {
    //in ra loi
    //console.error(err);
    console.log('Đây là xử lý lỗi không mong muốn ném ra Không giải mã được')
}


