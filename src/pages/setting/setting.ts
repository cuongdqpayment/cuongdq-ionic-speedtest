import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../../services/apiService';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {

  public myFromGroup: FormGroup;
  public isImageViewer: boolean = false;
  public resourceImages: { imageViewer: any, file: any, name: string }[] = [];
  public serverKey: any;
  public userInfo: any;

  constructor(public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getServerKey()
      .then(pk => this.serverKey = pk)
      .catch(err => console.log(err));

    this.myFromGroup = this.formBuilder.group({
        DISPLAY_NAME: '',
        FULL_NAME: '',
        PHONE: '',
        EMAIL: '',
        FULL_ADDRESS: '',
        fileload: ''
      });

    this.apiService.getUserSettings()
    .then(user=>{
      this.userInfo = user;
      console.log(this.userInfo);
      this.myFromGroup = this.formBuilder.group({
        DISPLAY_NAME: this.userInfo.DISPLAY_NAME,
        FULL_NAME: this.userInfo.FULL_NAME,
        PHONE: this.userInfo.PHONE,
        EMAIL: this.userInfo.EMAIL,
        FULL_ADDRESS: this.userInfo.FULL_ADDRESS,
        fileload: ''
      });
    })
    .catch(err=>console.log(err));
  }

  onSubmit() {
    //ma hoa du lieu truoc khi truyen di
    var passEncrypted = '';
    try {
      passEncrypted = this.serverKey.encrypt(this.myFromGroup.get('pass').value, 'base64', 'utf8');
    } catch (err) {
      console.log(err);
    }

    var formData: FormData = new FormData();
    formData.append("username", this.myFromGroup.get('user').value);
    formData.append("password", passEncrypted);

    //gui lenh login 
    this.apiService.postRegister(formData)
      .then(data => console.log(data))
      .catch(err => console.log(err));

  }


  fileChange(event) {

    if (event.target && event.target.files) {
      const files: { [key: string]: File } = event.target.files;
      for (let key in files) { //index, length, item
        if (!isNaN(parseInt(key))) {
          let reader = new FileReader();
          reader.readAsDataURL(files[key]);
          reader.onload = (kq: any) => {
            this.resourceImages.push(
              {
                imageViewer: kq.target.result, //ket qua doc file ra binary
                file: files[key], //doi tuong file goc
                name: files[key].name //ten file upload len
              }
            );
            this.isImageViewer = true;
          }
        }
      }//
    }
  }


  deleteImage(evt) {
    this.resourceImages = this.resourceImages.filter((value, index, arr) => {
      return value != evt;
    });
  }
}
