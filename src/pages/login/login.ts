import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { ApiAuthService } from '../../services/apiAuthService';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public myFromGroup: FormGroup;
  public isImageViewer: boolean = false;
  public resourceImages: {imageViewer: any,file:any, name: string }[] = [];
  public serverKeyPublic:any; //PUBLIC_KEY
  public serverTokenUserInfo:any;  //token for login ok
  
  constructor(public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private apiService: ApiAuthService) { }

  ngOnInit() {

    this.apiService.getServerPublicRSAKey()
    .then(pk=>{
        //lay public key 
        this.serverKeyPublic= pk;
        //va user info neu co
        this.serverTokenUserInfo = this.apiService.getUserInfo();
        //neu thong tin nguoi dung co thi hien thi user, va logout

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
      passEncrypted = this.serverKeyPublic.encrypt(this.myFromGroup.get('pass').value, 'base64', 'utf8');
    }catch(err){
      console.log(err);
    }

    var formData: FormData = new FormData();
    formData.append("username",this.myFromGroup.get('user').value);
    formData.append("password",passEncrypted);
    
    //gui lenh login 
    this.apiService.login(formData)
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

  callLogout(){
    this.apiService.logout();
    //refresh trang nay lai
  }
}
