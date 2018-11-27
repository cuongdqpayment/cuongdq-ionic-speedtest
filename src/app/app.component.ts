import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { HomePage } from '../pages/home/home';

/* cac kieu lenh import trong angular
import './polyfills.ts';
import { Component } from '@angular/core';
import HomeComponent from './pages/home/home-page.component';
import * as _ from 'lodash';
import assert = require('assert');
 */

 import NodeRSA from 'node-rsa';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      var client_key = new NodeRSA({ b: 512 }, { signingScheme: 'pkcs1-sha256' });
      
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

    });
  }

  //tao RSA su dung lien lac voi server


}

