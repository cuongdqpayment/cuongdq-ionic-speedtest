import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { SettingPage } from '../pages/setting/setting';
import { ApiAuthService } from '../services/apiAuthService';
import { RegisterPage } from '../pages/register/register';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
  
  userInfo:any;
  rootPage:any = LoginPage;
 

  serverKey:any;

  constructor(private platform: Platform, 
              private statusBar: StatusBar, 
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private apiService: ApiAuthService,
              private splashScreen: SplashScreen
            ) {
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.apiService.getServerPublicRSAKey()
    .then(pk=>{ 
      this.serverKey = pk;
    })
    .catch(err=>console.log(err));
  }


  goSearch(){
   
  }

  openPage(page){
    let page_id = page.page_id;
    
    switch (page_id) {
      case 1:
        this.navCtrl.setRoot(LoginPage);
        break;
      default:
        break;
    }
  }

  presentLoginPrompt() {
    //kiem tra co token roi thi tu dong login luon nhe
    
    let alert = this.alertCtrl.create({
      title: 'Đăng nhập hệ thống',
      inputs: [
        {
          name: 'username',
          placeholder: 'Username - Tên Đăng nhập',
          value:''
        },
        {
          name: 'password',
          placeholder: 'Password - Mật khẩu đăng nhập',
          type: 'password',
          value:''
        }
      ],
      buttons: [
        {
          text: 'Register',
          role: 'cancel',
          handler: data => {
            this.onRegister();
          }
        },
        {
          text: 'Login',
          handler: data => {
            if (data.username&&data.password) {
              // logged in!
              this.onLogin(data.username,data.password);
            } else {
              // invalid login
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }

  onLogin(username,password) {
    var passEncrypted='';
    try{
      passEncrypted = this.serverKey.encrypt(password, 'base64', 'utf8');
    }catch(err){
      console.log(err);
    }

    var formData: FormData = new FormData();
    formData.append("username",username);
    formData.append("password",passEncrypted);
    
    //gui lenh login 
    let loading = this.loadingCtrl.create({
      content: 'Saving user info...'
    });
    loading.present();

    this.apiService.login(formData)
    .then(token=>{
      if (token){
        loading.dismiss();
          this.toastCtrl.create({
            message:"result: " + JSON.stringify(token),
            duration: 5000,
            position: 'middle'
          }).present();
        
        this.userInfo = this.apiService.getUserInfo();
        if (!this.userInfo.nickname){
          this.userInfo.nickname=this.userInfo.username;
        }
      }else{
        throw {code:403,message:'No token'}
      }
    })
    .catch(err=>{
      loading.dismiss();
      this.toastCtrl.create({
        message:"result: " + JSON.stringify(err),
        duration: 5000,
        position: 'bottom'
      }).present();
    }
    );
  }

  logout(){
    this.userInfo=null;
  }

  onRegister(){
    //chuyen den trang dang ky
    this.navCtrl.push(RegisterPage);
  }

  setting(){
    //neu cung site thi su dung Header de truyen token
    //neu khac site thi phai su dung param hoac post json token
    this.apiService.getEdit()
    .then(user=>{
      //console.log(this.apiService.getUserInfoSetting());
      this.toastCtrl.create({
        message:"result: " + JSON.stringify(this.apiService.getUserInfoSetting()),
        duration: 5000,
        position: 'middle'
      }).present();

      this.navCtrl.push(SettingPage);
      //dong lai menu neu no dang mo
    })
    .catch(err=>{
      this.toastCtrl.create({
        message:"err get API: : " + JSON.stringify(err),
        duration: 5000,
        position: 'bottom'
      }).present();
    }); 
  }
  
}

