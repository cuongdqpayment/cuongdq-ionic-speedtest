import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { ApiService } from '../../services/apiService';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public myFromGroup: FormGroup;
  public isImageViewer: boolean = false;
  public resourceImages: {imageViewer: any,file:any, name: string }[] = [];
  public serverKey:any;
  
  constructor(public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getServerKey()
    .then(pk=>{
        this.serverKey= pk;
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
        this.navCtrl.setRoot(HomePage);
      }
    })
    .catch(err=>console.log(err));
    
  }

  callRegister(){
    //console.log("goi dang ky")
    this.navCtrl.push(RegisterPage);
  }
}
