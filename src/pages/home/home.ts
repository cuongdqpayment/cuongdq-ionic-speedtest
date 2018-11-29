import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
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
    /* this.apiService.testEncryptDecrypt();
    this.apiService.testSignVerify(); */
    this.apiService.getServerKey()
    .then(pk=>{
      //console.log(pk);
      try{
        this.serverKey.importKey(pk);
        //console.log(this.serverKey);
      }catch(err){
        console.log(err);
      }
    })
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
    this.apiService.postLogin(formData)
    .then(data=>console.log(data))
    .catch(err=>console.log(err));
    
  }
}
