import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular/platform/platform';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ApiService } from '../../services/apiService';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users = [];
  page = 0;// Observable<any>;

  constructor(
    public navCtrl: NavController,
    private apiService: ApiService,
    private plt: Platform,
    private alertCtrl: AlertController) {

  }

  ngOnInit() {
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

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.apiService.getRandomUser(20)
      .subscribe(
        userArray => {
          this.users = this.users.concat(userArray)
          this.page++;
          }
        );
      infiniteScroll.complete();
    }, 1000);
  }

  forwardWeb(){
    this.apiService.postUserSettings()
    .then(data=>{
      console.log(data);
    })
    .catch(err=>console.log(err));
  }

}
