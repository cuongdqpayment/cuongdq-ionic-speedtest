import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  myFromGroup: FormGroup;
  isImageViewer: boolean = false;

  public resourceImages: {imageViewer: any,file:any, name: string }[] = [];
  
  constructor(public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient) { }

  ngOnInit() {
    this.myFromGroup = this.formBuilder.group({
      user: 'admin',
      pass: 'password'
    });
  }

  onSubmit() {
    
    var formData: FormData = new FormData();
    formData.append("username",this.myFromGroup.get('user').value);
    formData.append("password",this.myFromGroup.get('pass').value);
    
    this.httpClient.post('/login', formData)
      .toPromise()
      .then(data => console.log(data))
      .catch(err => console.log(err));
    ;

  }
}
