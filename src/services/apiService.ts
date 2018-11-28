import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'

import NodeRSA from 'node-rsa';

@Injectable()
export class ApiService {
  
  public clientKey = new NodeRSA({ b: 512 }, { signingScheme: 'pkcs1-sha256' }); //for decrypte
  public midleKey =  new NodeRSA(null, { signingScheme: 'pkcs1-sha256' }); //for test
  public serverKey = new NodeRSA(null, { signingScheme: 'pkcs1-sha256' }); //for crypte
  
  constructor(public httpClient: HttpClient, public sanitizer: DomSanitizer) {
    //key nay de test thu noi bo
    this.midleKey.importKey(this.clientKey.exportKey('public'));
  }

  testEncryptDecrypt(){
    //ma hoa va giai ma du lieu
    const objClient = {
      info: 'Bảng tin cần mã hóa'
    };

    //lay thong tin object dung public key ma hoa
    const encryptedPublicKey = this.midleKey.encrypt(JSON.stringify(objClient), 'base64', 'utf8');
    //console.log('encryptedPublicKey: ', encryptedPublicKey);
    const decryptedPrivateKey = this.clientKey.decrypt(encryptedPublicKey, 'utf8');
    console.log('decryptedPrivateKey: ', decryptedPrivateKey);

    //lay thong tin object dung public key ma hoa
    const encryptedPrivateKey = this.clientKey.encryptPrivate(JSON.stringify(objClient), 'base64', 'utf8');
    //console.log('encryptedPrivateKey: ', encryptedPrivateKey);
    const decryptedPPublicKey = this.midleKey.decryptPublic(encryptedPrivateKey, 'utf8');
    console.log('decryptedPrivateKey: ', decryptedPPublicKey);

  }


  testSignVerify(){
    //Ký và chứng thực
    const objClient = {
      info: 'Bảng tin cần chứng thực'
    };

    //Dùng private key để ký nhận
    const signedPrivateKey = this.clientKey.sign(JSON.stringify(objClient), 'base64');
    console.log('signedPrivateKey: '+ signedPrivateKey);

    const verifyPublicKey = this.midleKey.verify(JSON.stringify(objClient), signedPrivateKey, 'utf8', 'base64');
    console.log('verifyPublicKey: ' + verifyPublicKey);

    const verifyPrivateKey = this.clientKey.verify(JSON.stringify(objClient), signedPrivateKey, 'utf8', 'base64');
    console.log('verifyPrivateKey: ' + verifyPrivateKey);

  }

  getServerKey(){
      return this.httpClient.get('http://localhost:9235/key-json')
             .toPromise()
             .then(jsonData => jsonData.PUBLIC_KEY);
  }

  postLogin(formData){
    return this.httpClient.post('http://localhost:9235/login', formData)
                .toPromise()
                .then(data => {
                    //console.log(data);
                    return data;
                });
            
  }

  //lay user mau json
  getRandomUser(nRecord: number) {
    return this.httpClient.get('https://randomuser.me/api/?results=' + nRecord)
      .map(res => res['results'])
  }

  //lay 


  getHtmlWeb(url: string) {
    //ket qua tra ve la text hay json, neu la text thi phai xu ly chuyen doi html
    //this.sanitizer.bypassSecurityTrustHtml(webhtml)
    return this.httpClient.get(url,{ responseType: 'text'})
       .map(webhtml => webhtml);
  }

  postHtmlWeb(url: string, jsonRequest: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        //'Authorization': 'my-auth-token',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/html; text/html'
      })
    };

    return this.httpClient.post(url, jsonRequest, httpOptions)
      .subscribe(webhtml => this.sanitizer.bypassSecurityTrustHtml(webhtml['_body'])
      );
  }

}
