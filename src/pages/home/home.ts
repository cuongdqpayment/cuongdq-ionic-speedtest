import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RegisterPage } from '../register/register';
import { MainPage } from '../main/main';
import { ApiService } from '../../services/apiService';

import NodeRSA from 'node-rsa';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public myFromGroup: FormGroup;
  public isImageViewer: boolean = false;
  public resourceImages: {imageViewer: any,file:any, name: string }[] = [];
  public serverKey = new NodeRSA(null, { signingScheme: 'pkcs1-sha256' });
  
  constructor(public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getServerKey()
    .then(pk=>{
      try{
        this.serverKey.importKey(pk);
      }catch(err){
        console.log(err);
      }
    })
    .catch(err=>console.log(err));
    

    this.myFromGroup = this.formBuilder.group({
      user: 'cuongdq',
      pass: '123'
    });
  }

  onSubmit() {
    var passEncrypted='';
    try{
      passEncrypted = this.serverKey.encrypt(this.myFromGroup.get('pass').value, 'base64', 'utf8');
    }catch(err){
      console.log(err);
    }

    var formData: FormData = new FormData();
    formData.append("username",this.myFromGroup.get('user').value);
    formData.append("password",passEncrypted);
    
    //gui lenh login 
    this.apiService.postLogin(formData)
    .then(token=>{
      if (token){
        console.log(this.apiService.getUserInfo());
        this.navCtrl.push(MainPage);
      }
    })
    .catch(err=>console.log(err));
    
  }

  callRegister(){
    //console.log("goi dang ky")
    this.navCtrl.push(RegisterPage);
  }
}
