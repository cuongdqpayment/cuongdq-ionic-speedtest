import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { SettingPage } from '../pages/setting/setting';
import { ApiService } from '../services/apiService';
import { RegisterPage } from '../pages/register/register';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
  
  userInfo:any;
  rootPage:any = HomePage;
  pages: any =
    [ {title:"Trang chủ",
      page_id:1
      },
      {title:"Tin tức",
      page_id:2
      },
      {title:"Upload",
      page_id:3
      },
      {title:"trang 4",
      page_id:4
      },
      {title:"trang 5",
      page_id:5
      },
      {title:"trang 6",
      page_id:6
      },
      {title:"Tìm kiếm",
      page_id:99
      }];

  serverKey:any;

  constructor(private platform: Platform, 
              private statusBar: StatusBar, 
              private alertCtrl: AlertController,
              private apiService: ApiService,
              private splashScreen: SplashScreen
            ) {
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.apiService.getServerKey()
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
        this.navCtrl.setRoot(HomePage);
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
    this.apiService.postLogin(formData)
    .then(token=>{
      if (token){
        //console.log(this.apiService.getUserInfo());
        this.userInfo = this.apiService.getUserInfo();
        if (!this.userInfo.nickname){
          this.userInfo.nickname=this.userInfo.username;
        }
      }
    })
    .catch(err=>console.log(err));
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
    this.apiService.postUserSettings()
    .then(user=>{
      //console.log(this.apiService.getUserInfoSetting());
      this.navCtrl.push(SettingPage);
      //dong lai menu neu no dang mo
    })
    .catch(err=>{
      console.log('err Loi goi API');
      console.log(err);
    }); 
  }
  
}

