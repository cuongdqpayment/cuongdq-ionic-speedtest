import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../../services/apiService';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  public myFromGroup: FormGroup;
  public isImageViewer: boolean = false;
  public resourceImages: {imageViewer: any,file:any, name: string }[] = [];
  public serverKey:any;
  
  constructor(public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getServerKey()
    .then(pk=>this.serverKey=pk)
    .catch(err=>console.log(err));

    this.myFromGroup = this.formBuilder.group({
      user: 'admin',
      pass: 'password'
    });
  }

  onSubmit() {
    //ma hoa du lieu truoc khi truyen di
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
    this.apiService.postRegister(formData)
    .then(data=>{
        //let result = data;
        console.log(data)
        //quay tro lai trang chu roi nhe
        this.navCtrl.setRoot(HomePage);
      })
    .catch(err=>console.log(err));
    
  }
}
