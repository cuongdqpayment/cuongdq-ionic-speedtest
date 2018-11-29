import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular/platform/platform';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ApiService } from '../../services/apiService'

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {

  users = [];
  page = 0;// Observable<any>;
  userInfo:any;

  constructor(
    public navCtrl: NavController,
    private apiService: ApiService,
    private plt: Platform,
    private alertCtrl: AlertController) {

  }

  ngOnInit() {
    this.userInfo = this.apiService.getUserInfo()
    this.apiService.getRandomUser(20)
      .subscribe(
        userArray => {
          this.page++;
          this.users = this.users.concat(userArray)
        }
      );
  }

  checkPlatform() {
    let alert = this.alertCtrl.create({
      title: 'Platform',
      message: 'You are running on: ' + this.plt.platforms(),
      buttons: ['OK']
    });
    alert.present();

    if (this.plt.is('cordova')) {
      // Do Cordova stuff
    } else {
      // Do stuff inside the regular browser
    }
  }

  forwardWeb(){
    //thuc hien gui len server lay thong tin ve du lieu
    this.apiService.getUserAPI()
    .then(data=>{
      console.log(data);
    })
    .catch(err=>{});
  }
}
