webpackJsonp([0],{

/***/ 161:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 161;

/***/ }),

/***/ 201:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 201;

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_apiService__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(76);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SettingPage = /** @class */ (function () {
    function SettingPage(navCtrl, formBuilder, apiService) {
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.apiService = apiService;
        this.isImageViewer = false;
        this.resourceImages = [];
    }
    SettingPage.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.getServerKey()
            .then(function (pk) { return _this.serverKey = pk; })
            .catch(function (err) { return console.log(err); });
        this.userInfo = this.apiService.getUserInfoSetting();
        this.myFromGroup = this.formBuilder.group({
            DISPLAY_NAME: (this.userInfo) ? this.userInfo.DISPLAY_NAME : '',
            FULL_NAME: (this.userInfo) ? this.userInfo.FULL_NAME : '',
            PHONE: (this.userInfo) ? this.userInfo.PHONE : '',
            EMAIL: (this.userInfo) ? this.userInfo.EMAIL : '',
            FULL_ADDRESS: (this.userInfo) ? this.userInfo.FULL_ADDRESS : '',
            fileload: '',
        });
    };
    SettingPage.prototype.onSubmit = function () {
        var _this = this;
        var formData = new FormData();
        formData.append("Authorization", 'Bearer ' + this.apiService.getUserToken());
        formData.append("DISPLAY_NAME", this.myFromGroup.get("DISPLAY_NAME").value);
        formData.append("FULL_NAME", this.myFromGroup.get("FULL_NAME").value);
        formData.append("PHONE", this.myFromGroup.get("PHONE").value);
        formData.append("EMAIL", this.myFromGroup.get("EMAIL").value);
        formData.append("FULL_ADDRESS", this.myFromGroup.get("FULL_ADDRESS").value);
        var i = 0;
        this.resourceImages.forEach(function (fileObj) {
            //console.log(fileObj.name);
            formData.append('file2Upload' + i++, fileObj.file, fileObj.name);
            //gui tung file hoac tat ca cac file
        });
        //gui lenh login 
        this.apiService.postUserSave(formData)
            .then(function (data) {
            //let result = data;
            console.log(data);
            //quay tro lai trang chu roi nhe
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
        })
            .catch(function (err) { return console.log(err); });
    };
    SettingPage.prototype.fileChange = function (event) {
        var _this = this;
        if (event.target && event.target.files) {
            var files_1 = event.target.files;
            var _loop_1 = function (key) {
                if (!isNaN(parseInt(key))) {
                    var reader = new FileReader();
                    reader.readAsDataURL(files_1[key]);
                    reader.onload = function (kq) {
                        _this.resourceImages.push({
                            imageViewer: kq.target.result,
                            file: files_1[key],
                            name: files_1[key].name //ten file upload len
                        });
                        _this.isImageViewer = true;
                    };
                }
            };
            for (var key in files_1) {
                _loop_1(key);
            } //
        }
    };
    SettingPage.prototype.deleteImage = function (evt) {
        this.resourceImages = this.resourceImages.filter(function (value, index, arr) {
            return value != evt;
        });
    };
    SettingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-setting',template:/*ion-inline-start:"/Users/cuongdq/IONIC/cuongdq-jwt-oauth/src/pages/setting/setting.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Thay đổi thông tin cá nhân\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding class="card-background-page">\n  <form (ngSubmit)="onSubmit()" [formGroup]="myFromGroup">\n    <ion-card col-12 col-xl-4 col-lg-6 col-sm-12>\n      <ion-item>\n        <ion-label floating>Nick Name - Tên hiển thị</ion-label>\n        <ion-input type="text" formControlName="DISPLAY_NAME"></ion-input>\n      </ion-item>\n      <ion-item>\n          <ion-label floating>Full Name - Tên Đầy đủ</ion-label>\n          <ion-input type="text" formControlName="FULL_NAME"></ion-input>\n      </ion-item>\n      <ion-item>\n          <ion-label floating>Phone - Điện thoại</ion-label>\n          <ion-input type="text" formControlName="PHONE"></ion-input>\n      </ion-item>\n      <ion-item>\n          <ion-label floating>Email - Hộp thư điện tử</ion-label>\n          <ion-input type="text" formControlName="EMAIL"></ion-input>\n      </ion-item>\n      <ion-item>\n          <ion-label floating>Address - Địa chỉ đầy đủ</ion-label>\n          <ion-input type="text" formControlName="FULL_ADDRESS"></ion-input>\n      </ion-item>\n\n      <ion-item >\n          <ion-grid>\n              <ion-row>\n                  <ion-col col-12>\n                      <ion-card>\n                          <img [src]="userInfo?.URL_IMAGE"/>\n                      </ion-card>\n                  </ion-col>\n              </ion-row>\n          </ion-grid>\n      </ion-item>\n\n      <ion-item *ngIf="isImageViewer">\n          <ion-grid>\n              <ion-row>\n                  <ion-col *ngFor="let obj of resourceImages" col-12>\n                      <ion-card>\n                          <img [src]="obj?.imageViewer" style="width: 100%; height: 100%;" />\n                          <ion-row>\n                              <ion-col>\n                                  <button ion-button type="button" clear small color="secondary" icon-start (click)="deleteImage(obj)">\n                                      <ion-icon name=\'backspace\' ios="ios-backspace" md="md-backspace"></ion-icon>\n                                      Xóa bỏ\n                                  </button>\n                              </ion-col>\n                          </ion-row>\n                      </ion-card>\n                  </ion-col>\n              </ion-row>\n          </ion-grid>\n      </ion-item>\n      \n    <ion-item>  \n      <ion-buttons start>\n          <button ion-button type="button" icon-end round>\n              <input type="file" expandable accept="image/*" formControlName="fileload" (change)="fileChange($event)">\n              Avantar - Chọn ảnh đại diện\n              <ion-icon name="images"></ion-icon>\n          </button>\n      </ion-buttons>\n    </ion-item>\n\n      <ion-row no-padding>\n        <ion-col text-right>\n          <ion-buttons start>\n            <button ion-button type="submit" icon-end round>\n              Cập nhập\n              <ion-icon name="share-alt"></ion-icon>\n            </button>\n          </ion-buttons>\n        </ion-col>\n      </ion-row>\n\n    </ion-card>\n  </form>\n\n</ion-content>'/*ion-inline-end:"/Users/cuongdq/IONIC/cuongdq-jwt-oauth/src/pages/setting/setting.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_apiService__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_apiService__["a" /* ApiService */]) === "function" && _c || Object])
    ], SettingPage);
    return SettingPage;
    var _a, _b, _c;
}());

//# sourceMappingURL=setting.js.map

/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_apiService__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RegisterPage = /** @class */ (function () {
    function RegisterPage(navCtrl, formBuilder, apiService) {
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.apiService = apiService;
        this.isImageViewer = false;
        this.resourceImages = [];
    }
    RegisterPage.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.getServerKey()
            .then(function (pk) { return _this.serverKey = pk; })
            .catch(function (err) { return console.log(err); });
        this.myFromGroup = this.formBuilder.group({
            user: 'admin',
            pass: 'password'
        });
    };
    RegisterPage.prototype.onSubmit = function () {
        //ma hoa du lieu truoc khi truyen di
        var passEncrypted = '';
        try {
            passEncrypted = this.serverKey.encrypt(this.myFromGroup.get('pass').value, 'base64', 'utf8');
        }
        catch (err) {
            console.log(err);
        }
        var formData = new FormData();
        formData.append("username", this.myFromGroup.get('user').value);
        formData.append("password", passEncrypted);
        //gui lenh login 
        this.apiService.postRegister(formData)
            .then(function (data) { return console.log(data); })
            .catch(function (err) { return console.log(err); });
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"/Users/cuongdq/IONIC/cuongdq-jwt-oauth/src/pages/register/register.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Register form\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding class="card-background-page">\n  <form (ngSubmit)="onSubmit()" [formGroup]="myFromGroup">\n    <ion-card col-12 col-xl-4 col-lg-6 col-sm-12>\n      <ion-item>\n        <ion-label floating>Username</ion-label>\n        <ion-input type="text" formControlName="user"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Password</ion-label>\n        <ion-input type="password" formControlName="pass"></ion-input>\n      </ion-item>\n      <ion-row no-padding>\n\n        <ion-col text-right>\n          <ion-buttons start>\n            <button ion-button type="submit" icon-end round>\n              Đăng ký nào\n              <ion-icon name="share-alt"></ion-icon>\n            </button>\n          </ion-buttons>\n        </ion-col>\n        \n      </ion-row>\n\n    </ion-card>\n  </form>\n\n</ion-content>'/*ion-inline-end:"/Users/cuongdq/IONIC/cuongdq-jwt-oauth/src/pages/register/register.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__services_apiService__["a" /* ApiService */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(314);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 314:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_login_login__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_register_register__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_setting_setting__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_apiService__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_setting_setting__["a" /* SettingPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_setting_setting__["a" /* SettingPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_12__services_apiService__["a" /* ApiService */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_setting_setting__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_apiService__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, alertCtrl, apiService, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.alertCtrl = alertCtrl;
        this.apiService = apiService;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.pages = [{ title: "Trang chủ",
                page_id: 1
            },
            { title: "Tin tức",
                page_id: 2
            },
            { title: "Upload",
                page_id: 3
            },
            { title: "trang 4",
                page_id: 4
            },
            { title: "trang 5",
                page_id: 5
            },
            { title: "trang 6",
                page_id: 6
            },
            { title: "Tìm kiếm",
                page_id: 99
            }];
    }
    MyApp.prototype.ngOnInit = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
        this.apiService.getServerKey()
            .then(function (pk) {
            _this.serverKey = pk;
        })
            .catch(function (err) { return console.log(err); });
    };
    MyApp.prototype.goSearch = function () {
    };
    MyApp.prototype.openPage = function (page) {
        var page_id = page.page_id;
        switch (page_id) {
            case 1:
                this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */]);
                break;
            default:
                break;
        }
    };
    MyApp.prototype.presentLoginPrompt = function () {
        //kiem tra co token roi thi tu dong login luon nhe
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Đăng nhập hệ thống',
            inputs: [
                {
                    name: 'username',
                    placeholder: 'Username - Tên Đăng nhập',
                    value: 'cuongdq'
                },
                {
                    name: 'password',
                    placeholder: 'Password - Mật khẩu đăng nhập',
                    type: 'password',
                    value: '123'
                }
            ],
            buttons: [
                {
                    text: 'Register',
                    role: 'cancel',
                    handler: function (data) {
                        _this.onRegister();
                    }
                },
                {
                    text: 'Login',
                    handler: function (data) {
                        if (data.username && data.password) {
                            // logged in!
                            _this.onLogin(data.username, data.password);
                        }
                        else {
                            // invalid login
                            return false;
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    MyApp.prototype.onLogin = function (username, password) {
        var _this = this;
        var passEncrypted = '';
        try {
            passEncrypted = this.serverKey.encrypt(password, 'base64', 'utf8');
        }
        catch (err) {
            console.log(err);
        }
        var formData = new FormData();
        formData.append("username", username);
        formData.append("password", passEncrypted);
        //gui lenh login 
        this.apiService.postLogin(formData)
            .then(function (token) {
            if (token) {
                //console.log(this.apiService.getUserInfo());
                _this.userInfo = _this.apiService.getUserInfo();
            }
        })
            .catch(function (err) { return console.log(err); });
    };
    MyApp.prototype.logout = function () {
        this.userInfo = null;
    };
    MyApp.prototype.onRegister = function () {
        //chuyen den trang dang ky
    };
    MyApp.prototype.setting = function () {
        var _this = this;
        //neu cung site thi su dung Header de truyen token
        //neu khac site thi phai su dung param hoac post json token
        this.apiService.postUserSettings()
            .then(function (user) {
            //console.log(this.apiService.getUserInfoSetting());
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_setting_setting__["a" /* SettingPage */]);
            //dong lai menu neu no dang mo
        })
            .catch(function (err) {
            console.log('err Loi goi API');
            console.log(err);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */])
    ], MyApp.prototype, "navCtrl", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/cuongdq/IONIC/cuongdq-jwt-oauth/src/app/app.html"*/'<!-- \nxs	auto	Don’t set the grid width for xs screens\nsm	540px	Set grid width to 540px when (min-width: 576px)\nmd	720px	Set grid width to 720px when (min-width: 768px)\nlg	960px	Set grid width to 960px when (min-width: 992px)\nxl	1140px	Set grid width to 1140px when (min-width: 1200px)\n-->\n<ion-split-pane when="md">\n    <ion-menu [content]="content" *ngIf="true">\n        <ion-header>\n            <ion-toolbar color="primary">\n                <ion-buttons start>\n                    <button ion-button icon-only color="royal" (click)="goSearch()">\n                        <ion-icon name="search"></ion-icon>\n                    </button>\n                </ion-buttons>\n                <ion-title *ngIf="(userInfo!=null)">\n                    <ion-item class=\'background-transparent\'>\n                        <ion-avatar item-start>\n                            <img [src]="userInfo?.image">\n                        </ion-avatar>\n                        <h1>{{userInfo?.nickname}}</h1>\n                    </ion-item>\n                </ion-title>\n                <ion-title *ngIf="(userInfo==null)">\n                   Login...\n                </ion-title>\n                <ion-buttons end *ngIf="(userInfo==null)">\n                    <button ion-button icon-only (click)="presentLoginPrompt()">\n                        <ion-icon name="log-in" ios="ios-log-in" md="md-log-in"></ion-icon>\n                    </button>\n                </ion-buttons>\n                <ion-buttons end *ngIf="(userInfo!=null)">\n                        <button ion-button icon-only (click)="logout()">\n                            <ion-icon name="log-out" ios="ios-log-out" md="md-log-out"></ion-icon>\n                        </button>\n                </ion-buttons>\n                <ion-buttons right *ngIf="(userInfo!=null)">\n                    <button ion-button icon-only (click)="setting()">\n                        <ion-icon name="cog" ios="ios-cog" md="md-cog"></ion-icon>\n                    </button>\n                </ion-buttons>\n            </ion-toolbar>\n        </ion-header>\n\n        <ion-content class="menu-container">\n            <ion-list no-lines>\n                <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)" class="transparent list-item">\n                    {{p.title}}\n                </button>\n            </ion-list>\n        </ion-content>\n    </ion-menu>\n    <!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n    <ion-nav [root]="rootPage" #content main swipeBackEnabled="false"></ion-nav>\n</ion-split-pane>'/*ion-inline-end:"/Users/cuongdq/IONIC/cuongdq-jwt-oauth/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_6__services_apiService__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 374:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 376:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 411:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 412:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_node_rsa__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_node_rsa___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_node_rsa__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jsonwebtoken__ = __webpack_require__(472);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jsonwebtoken___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_jsonwebtoken__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ApiService = /** @class */ (function () {
    function ApiService(httpClient, sanitizer) {
        this.httpClient = httpClient;
        this.sanitizer = sanitizer;
        this.authenticationServer = 'http://localhost:9235';
        this.clientKey = new __WEBPACK_IMPORTED_MODULE_4_node_rsa___default.a({ b: 512 }, { signingScheme: 'pkcs1-sha256' }); //for decrypte
        this.midleKey = new __WEBPACK_IMPORTED_MODULE_4_node_rsa___default.a(null, { signingScheme: 'pkcs1-sha256' }); //for test
        this.serverKey = new __WEBPACK_IMPORTED_MODULE_4_node_rsa___default.a(null, { signingScheme: 'pkcs1-sha256' }); //for crypte
        //key nay de test thu noi bo
        this.midleKey.importKey(this.clientKey.exportKey('public'));
    }
    ApiService.prototype.testEncryptDecrypt = function () {
        //ma hoa va giai ma du lieu
        var objClient = {
            info: 'Bảng tin cần mã hóa'
        };
        //lay thong tin object dung public key ma hoa
        var encryptedPublicKey = this.midleKey.encrypt(JSON.stringify(objClient), 'base64', 'utf8');
        //console.log('encryptedPublicKey: ', encryptedPublicKey);
        var decryptedPrivateKey = this.clientKey.decrypt(encryptedPublicKey, 'utf8');
        console.log('decryptedPrivateKey: ', decryptedPrivateKey);
        //lay thong tin object dung public key ma hoa
        var encryptedPrivateKey = this.clientKey.encryptPrivate(JSON.stringify(objClient), 'base64', 'utf8');
        //console.log('encryptedPrivateKey: ', encryptedPrivateKey);
        var decryptedPPublicKey = this.midleKey.decryptPublic(encryptedPrivateKey, 'utf8');
        console.log('decryptedPrivateKey: ', decryptedPPublicKey);
    };
    ApiService.prototype.testSignVerify = function () {
        //Ký và chứng thực
        var objClient = {
            info: 'Bảng tin cần chứng thực'
        };
        //Dùng private key để ký nhận
        var signedPrivateKey = this.clientKey.sign(JSON.stringify(objClient), 'base64');
        console.log('signedPrivateKey: ' + signedPrivateKey);
        var verifyPublicKey = this.midleKey.verify(JSON.stringify(objClient), signedPrivateKey, 'utf8', 'base64');
        console.log('verifyPublicKey: ' + verifyPublicKey);
        var verifyPrivateKey = this.clientKey.verify(JSON.stringify(objClient), signedPrivateKey, 'utf8', 'base64');
        console.log('verifyPrivateKey: ' + verifyPrivateKey);
    };
    //get User API the same site
    ApiService.prototype.getUserAPI = function () {
        if (this.userToken && this.userToken.token) {
            var httpOptions = {
                headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                    'Authorization': 'Bearer ' + this.userToken.token
                })
            };
            //su dung httpOption khi cung site, 
            //neu khac site thi phai su dung Post kem theo key hoac get theo pramamterter
            return this.httpClient.get('/api', httpOptions)
                .toPromise()
                .then(function (jsonData) {
                return jsonData;
            });
        }
        else {
            return (new Promise(function (resolve, reject) {
                reject({ error: 'No token, please login first' }); //bao loi khong import key duoc
            }));
        }
    };
    //post from other site JsonString
    ApiService.prototype.postUserAPI = function () {
        if (this.userToken && this.userToken.token) {
            var jsonRequest = { Authorization: 'Bearer ' + this.userToken.token };
            return this.httpClient.post(this.authenticationServer + '/api', JSON.stringify(jsonRequest))
                .toPromise()
                .then(function (jsonData) {
                return jsonData;
            });
        }
        else {
            return (new Promise(function (resolve, reject) {
                reject({ error: 'No token, please login first' }); //bao loi khong import key duoc
            }));
        }
    };
    //get UserInfo for setting/edit the same site with headers
    ApiService.prototype.getUserSettings = function () {
        var _this = this;
        if (this.userToken && this.userToken.token) {
            var userOptions = {
                headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                    'Authorization': 'Bearer ' + this.userToken.token
                })
            };
            return this.httpClient.get('/api/user-settings', userOptions)
                .toPromise()
                .then(function (jsonData) {
                _this.userSetting = jsonData;
                return jsonData;
            });
        }
        else {
            return (new Promise(function (resolve, reject) {
                reject({ error: 'No token, please login first' }); //bao loi khong import key duoc
            }));
        }
    };
    //post UserSettings other site with Token JsonString
    ApiService.prototype.postUserSettings = function () {
        var _this = this;
        if (this.userToken && this.userToken.token) {
            var jsonRequest = { Authorization: 'Bearer ' + this.userToken.token };
            return this.httpClient.post(this.authenticationServer + '/api/user-settings', JSON.stringify(jsonRequest))
                .toPromise()
                .then(function (jsonData) {
                _this.userSetting = jsonData;
                return jsonData;
            });
        }
        else {
            return (new Promise(function (resolve, reject) {
                reject({ error: 'No token, please login first' }); //bao loi khong import key duoc
            }));
        }
    };
    //get RSA Public Key for decrypt, encryte any site
    ApiService.prototype.getServerKey = function () {
        var _this = this;
        if (this.publicKey && this.publicKey.PUBLIC_KEY) {
            return (new Promise(function (resolve, reject) {
                try {
                    _this.serverKey.importKey(_this.publicKey.PUBLIC_KEY);
                }
                catch (err) {
                    reject(err); //bao loi khong import key duoc
                }
                resolve(_this.serverKey);
            }));
        }
        else {
            return this.httpClient.get(this.authenticationServer + '/key-json')
                .toPromise()
                .then(function (jsonData) {
                _this.publicKey = jsonData;
                if (_this.publicKey && _this.publicKey.PUBLIC_KEY) {
                    try {
                        _this.serverKey.importKey(_this.publicKey.PUBLIC_KEY);
                    }
                    catch (err) {
                        throw err;
                    }
                    return _this.serverKey;
                }
                else {
                    throw new Error('No PUBLIC_KEY exists!');
                }
            });
        }
    };
    //post formdata to any site for login
    ApiService.prototype.postLogin = function (formData) {
        var _this = this;
        return this.httpClient.post(this.authenticationServer + '/login', formData)
            .toPromise()
            .then(function (data) {
            _this.userToken = data;
            return _this.userToken.token;
        });
    };
    //get token for post or get with authentication
    ApiService.prototype.getUserToken = function () {
        return this.userToken.token;
    };
    //get userInfo from token
    ApiService.prototype.getUserInfo = function () {
        try {
            this.userInfo = __WEBPACK_IMPORTED_MODULE_5_jsonwebtoken___default.a.decode(this.userToken.token);
            //console.log(this.userInfo);
            //chuyen doi duong dan image de truy cap anh dai dien
            if (this.userInfo.image
                &&
                    this.userInfo.image.toLowerCase()
                &&
                    this.userInfo.image.toLowerCase().indexOf('http://') < 0
                &&
                    this.userInfo.image.toLowerCase().indexOf('https://') < 0) {
                //chuyen doi duong dan lay tai nguyen tai he thong
                this.userInfo.image = this.authenticationServer
                    + '/resources/user-image/'
                    + this.userInfo.image
                    + '?token=' + this.userToken.token;
                //console.log(this.userInfo.image);
            }
        }
        catch (err) {
        }
        return this.userInfo;
    };
    //lay thong tin user lay ra truoc do de edit
    ApiService.prototype.getUserInfoSetting = function () {
        if (this.userSetting.URL_IMAGE
            &&
                this.userSetting.URL_IMAGE.toLowerCase()
            &&
                this.userSetting.URL_IMAGE.toLowerCase().indexOf('http://') < 0
            &&
                this.userSetting.URL_IMAGE.toLowerCase().indexOf('https://') < 0) {
            //chuyen doi duong dan lay tai nguyen tai he thong
            this.userSetting.URL_IMAGE = this.authenticationServer
                + '/resources/user-image/'
                + this.userSetting.URL_IMAGE
                + '?token=' + this.userToken.token;
            //console.log(this.userSetting.URL_IMAGE);
        }
        return this.userSetting;
    };
    //gui dang ky user tu any site
    ApiService.prototype.postRegister = function (formData) {
        return this.httpClient.post(this.authenticationServer + '/register', formData)
            .toPromise()
            .then(function (data) {
            return data;
        });
    };
    //luu lai du lieu da sua chua
    ApiService.prototype.postUserSave = function (formData) {
        return this.httpClient.post(this.authenticationServer + '/user/save', formData)
            .toPromise()
            .then(function (data) {
            return data;
        });
    };
    //lay user mau json any site
    ApiService.prototype.getRandomUser = function (nRecord) {
        return this.httpClient.get('https://randomuser.me/api/?results=' + nRecord)
            .map(function (res) { return res['results']; });
    };
    //lay url any site 
    ApiService.prototype.getHtmlWeb = function (url) {
        //ket qua tra ve la text hay json, neu la text thi phai xu ly chuyen doi html
        //this.sanitizer.bypassSecurityTrustHtml(webhtml)
        return this.httpClient.get(url, { responseType: 'text' })
            .map(function (webhtml) { return webhtml; });
    };
    //post the same site CORS 
    ApiService.prototype.postHtmlWeb = function (url, jsonRequest) {
        var _this = this;
        var httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                //'Authorization': 'my-auth-token',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/html; text/html'
            })
        };
        return this.httpClient.post(url, jsonRequest, httpOptions)
            .subscribe(function (webhtml) { return _this.sanitizer.bypassSecurityTrustHtml(webhtml['_body']); });
    };
    ApiService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]])
    ], ApiService);
    return ApiService;
}());

//# sourceMappingURL=apiService.js.map

/***/ }),

/***/ 488:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__register_register__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_apiService__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, formBuilder, apiService) {
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.apiService = apiService;
        this.isImageViewer = false;
        this.resourceImages = [];
    }
    LoginPage.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.getServerKey()
            .then(function (pk) {
            _this.serverKey = pk;
        })
            .catch(function (err) { return console.log(err); });
        this.myFromGroup = this.formBuilder.group({
            user: 'cuongdq',
            pass: '123'
        });
    };
    LoginPage.prototype.onSubmit = function () {
        var _this = this;
        var passEncrypted = '';
        try {
            passEncrypted = this.serverKey.encrypt(this.myFromGroup.get('pass').value, 'base64', 'utf8');
        }
        catch (err) {
            console.log(err);
        }
        var formData = new FormData();
        formData.append("username", this.myFromGroup.get('user').value);
        formData.append("password", passEncrypted);
        //gui lenh login 
        this.apiService.postLogin(formData)
            .then(function (token) {
            if (token) {
                console.log(_this.apiService.getUserInfo());
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
            }
        })
            .catch(function (err) { return console.log(err); });
    };
    LoginPage.prototype.callRegister = function () {
        //console.log("goi dang ky")
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__register_register__["a" /* RegisterPage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/cuongdq/IONIC/cuongdq-jwt-oauth/src/pages/login/login.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Login form\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding class="card-background-page">\n  <form (ngSubmit)="onSubmit()" [formGroup]="myFromGroup">\n    <ion-card col-12 col-xl-4 col-lg-6 col-sm-12>\n      <ion-item>\n        <ion-label floating>Username</ion-label>\n        <ion-input type="text" formControlName="user"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Password</ion-label>\n        <ion-input type="password" formControlName="pass"></ion-input>\n      </ion-item>\n      <ion-row no-padding>\n\n          <ion-col>\n              <ion-buttons start>\n                  <button ion-button type="button" icon-end round (click)="callRegister()">\n                      Đăng ký nào\n                      <ion-icon name="images"></ion-icon>\n                  </button>\n              </ion-buttons>\n          </ion-col>\n\n        <ion-col text-right>\n          <ion-buttons start>\n            <button ion-button type="submit" icon-end round>\n              Đăng nhập nào\n              <ion-icon name="share-alt"></ion-icon>\n            </button>\n          </ion-buttons>\n        </ion-col>\n\n      </ion-row>\n\n    </ion-card>\n  </form>\n\n</ion-content>'/*ion-inline-end:"/Users/cuongdq/IONIC/cuongdq-jwt-oauth/src/pages/login/login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_5__services_apiService__["a" /* ApiService */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 76:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_platform_platform__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_alert_alert_controller__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_apiService__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, apiService, plt, alertCtrl) {
        this.navCtrl = navCtrl;
        this.apiService = apiService;
        this.plt = plt;
        this.alertCtrl = alertCtrl;
        this.users = [];
        this.page = 0; // Observable<any>;
    }
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.getRandomUser(20)
            .subscribe(function (userArray) {
            _this.page++;
            _this.users = _this.users.concat(userArray);
        });
    };
    HomePage.prototype.checkPlatform = function () {
        var alert = this.alertCtrl.create({
            title: 'Platform',
            message: 'You are running on: ' + this.plt.platforms(),
            buttons: ['OK']
        });
        alert.present();
        if (this.plt.is('cordova')) {
            // Do Cordova stuff
        }
        else {
            // Do stuff inside the regular browser
        }
    };
    HomePage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        setTimeout(function () {
            _this.apiService.getRandomUser(20)
                .subscribe(function (userArray) {
                _this.users = _this.users.concat(userArray);
                _this.page++;
            });
            infiniteScroll.complete();
        }, 1000);
    };
    HomePage.prototype.forwardWeb = function () {
        this.apiService.postUserSettings()
            .then(function (data) {
            console.log(data);
        })
            .catch(function (err) { return console.log(err); });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/cuongdq/IONIC/cuongdq-jwt-oauth/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n          <button ion-button menuToggle color="primary">\n            <ion-icon name="menu"></ion-icon>\n          </button>\n          <ion-buttons start>\n              <img src="assets/imgs/logo.png">\n          </ion-buttons>\n          <ion-buttons end>\n              <button ion-button icon-only color="royal" (click)="forwardWeb()">\n                <ion-icon name="notifications" ios="ios-notifications" md="md-notifications"></ion-icon>\n                <ion-badge color="danger" *ngIf="page > 0">{{ page }}</ion-badge>\n              </button>\n          </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-grid>\n    <ion-row>\n      <ion-col *ngFor="let user of users" col-12 col-xl-4 col-lg-4 col-md-6 col-sm-6>\n        <ion-card>\n          <ion-item>\n            <ion-avatar item-start>\n              <img [src]="user.picture?.medium">\n            </ion-avatar>\n            <h2 text-capitalize>{{ user.name?.first }} {{ user.name?.last }}</h2>\n          </ion-item>\n          <ion-card-content>\n            Đây là nội dung BIẾT làm sao đây nè\n          </ion-card-content>\n        </ion-card>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n    <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Loading more data..."></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>\n<ion-footer>\n    <ion-toolbar color="primary">\n        <ion-buttons start>\n          <button ion-button icon-only color="royal">\n            <ion-icon name="logo-googleplus"></ion-icon>\n          </button>\n        </ion-buttons>\n        <ion-buttons left>\n            <button ion-button icon-only color="royal">\n              <ion-icon name="thumbs-up" ios="ios-thumbs-up" md="md-thumbs-up"></ion-icon>\n            </button>\n          </ion-buttons>\n        <ion-buttons right>\n            <button ion-button icon-only color="royal">\n              <ion-icon name="chatbubbles" ios="ios-chatbubbles" md="md-chatbubbles"></ion-icon>\n            </button>\n          </ion-buttons>\n        <ion-title>cuongdq.payment@gmail.com</ion-title>\n        <ion-buttons end>\n          <button ion-button icon-only color="royal">\n            <ion-icon name="logo-facebook"></ion-icon>\n          </button>\n        </ion-buttons>\n      </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"/Users/cuongdq/IONIC/cuongdq-jwt-oauth/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4__services_apiService__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular_platform_platform__["a" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_alert_alert_controller__["a" /* AlertController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ })

},[293]);
//# sourceMappingURL=main.js.map