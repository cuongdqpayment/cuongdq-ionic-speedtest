import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'

import NodeRSA from 'node-rsa';
import jwt from 'jsonwebtoken';

@Injectable()
export class ApiAuthService {

    public authenticationServer = '';//'https://cuongdq-oauth.herokuapp.com';
    public clientKey = new NodeRSA({ b: 512 }, { signingScheme: 'pkcs1-sha256' }); //for decrypte
    public midleKey = new NodeRSA(null, { signingScheme: 'pkcs1-sha256' }); //for test
    public serverKey = new NodeRSA(null, { signingScheme: 'pkcs1-sha256' }); //for crypte
    public publicKey: any;
    public userToken: any;
    public userSetting: any;
    public userInfo: any;


    constructor(public httpClient: HttpClient, public sanitizer: DomSanitizer) {
        //key nay de test thu noi bo
        this.midleKey.importKey(this.clientKey.exportKey('public'));
    }

    getServerPublicRSAKey() {
        if (this.publicKey && this.publicKey.PUBLIC_KEY) {
            return (new Promise((resolve, reject) => {
                try {
                    this.serverKey.importKey(this.publicKey.PUBLIC_KEY);
                } catch (err) {
                    reject(err); //bao loi khong import key duoc
                }
                resolve(this.serverKey);
            }));

        } else {
            return this.httpClient.get(this.authenticationServer + '/key-json')
                .toPromise()
                .then(jsonData => {
                    this.publicKey = jsonData;
                    if (this.publicKey && this.publicKey.PUBLIC_KEY) {
                        try {
                            this.serverKey.importKey(this.publicKey.PUBLIC_KEY);
                        } catch (err) {
                            throw err;
                        }
                        return this.serverKey;
                    } else {
                        throw new Error('No PUBLIC_KEY exists!');
                    }
                });
        }
    }

    login(formData) {
        return this.httpClient.post(this.authenticationServer + '/login', formData)
            .toPromise()
            .then(data => {
                this.userToken = data;
                return this.userToken.token;
            });
    }

    logout() {
        //truong hop user co luu tren session thi xoa session di
        let req = {Authorization: 'Bearer '+ this.userToken.token};
        return this.httpClient.post(this.authenticationServer+'/logout',JSON.stringify(req))
            .toPromise()
            .then(data => {
                console.log(data);
                this.userToken = null; //reset token nay
                return data; //tra ve nguyen mau data cho noi goi logout xu ly
            })
            .catch(err=>{
                //xem nhu da logout khong cap luu tru
                console.log(err);
                this.userToken = null; //reset token nay
                return err; //tra ve nguyen mau data cho noi goi logout xu ly
            });
    }

    //tren cung site thi khong dung den
    //khong dung header de control

    //cac thong tin lay tu client memory
    //get token for post or get with authentication
  getUserToken(){
    return this.userToken.token;
  }

  //get userInfo from token
  getUserInfo(){
    //this.userInfo=null;
    try{
      this.userInfo= jwt.decode(this.userToken.token);
      //console.log(this.userInfo);
      //chuyen doi duong dan image de truy cap anh dai dien
      if (this.userInfo.image
          &&
          this.userInfo.image.toLowerCase()
          &&
          this.userInfo.image.toLowerCase().indexOf('http://')<0
          &&
          this.userInfo.image.toLowerCase().indexOf('https://')<0){
          //chuyen doi duong dan lay tai nguyen tai he thong
          this.userInfo.image = this.authenticationServer 
                                  + '/resources/user-image/'
                                  + this.userInfo.image
                                  + '?token='+this.userToken.token;
          //console.log(this.userInfo.image);
      }
    }catch(err){
    }
    return this.userInfo;
  }
}