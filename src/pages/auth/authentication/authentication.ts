import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';
// import { HomePage } from '../../lifestory/home/home';
import { SearchBeaconPage } from '../../settings/search-beacon/search-beacon';
import { ForgotPage } from '../../auth/forgot/forgot';
import { TermsConditionsPage } from '../../common/terms-conditions/terms-conditions';
import { AuthProvider } from '../../../providers/auth/auth';
import { BasicinfoPage } from '../../profile/basicinfo/basicinfo';
import { ToastServiceProvider } from '../../../providers/toast-service/toast-service';
import { AlertServiceProvider } from '../../../providers/alert-service/alert-service';
import { HardwareBackButtonService } from '../../../providers/back-button/back-button';


@Component({
  selector: 'page-authentication',
  templateUrl: 'authentication.html',
})
export class AuthenticationPage {

  public type = 'password';
  public showPass = false;

  isLoginError: boolean = false;
  authForm: FormGroup;
  isTrue: boolean = true;
  erroMsg: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    public authService: AuthProvider,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    private cdRef: ChangeDetectorRef,
    public modalCtrl: ModalController,
    public toastCtrl: ToastServiceProvider,
    public alertService: AlertServiceProvider,
    private localNotifications: LocalNotifications,
    private _backBtn: HardwareBackButtonService
  ) {
    this.createForm();

  }

  createForm() {
    let EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let PASS_REGEXP = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,25}$";

    this.authForm = this.fb.group({
      'email': [null, [Validators.required, Validators.pattern(EMAIL_REGEXP)]],
      'password': [null, [Validators.required, Validators.minLength(1), Validators.maxLength(25), this.isTrue ? Validators.pattern(PASS_REGEXP) : Validators.minLength(1)]]
    })

  }
  ionViewDidEnter() {
    this._backBtn.registerAction(() => {
      this._backBtn.doubleBackToExit();
    }, 101);
  }

  ionViewWillLeave() {
    this._backBtn.deregisterAction();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthenticationPage');
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  submitForm(formData, isTrue) {
    if (isTrue) {
      //sign up code 
      console.log('Sign UP');

      // Showing loader
      let loader = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loader.present();
      try {
        this.authService.getAuthenticate(formData, "api/v1/auth/signup").subscribe(data => {
          // console.log(data);

          loader.dismiss();
          var userData = JSON.parse(data);
          this.storage.set("userData", userData.data);
          window.localStorage.setItem('token', userData.data.token);
          window.localStorage.setItem('userId', userData.data.userInfoModel.userId);

          console.log(this.storage.get("userData"));

          this.navCtrl.push(BasicinfoPage).then(() => {
            const index = this.navCtrl.getActive().index;
            this.navCtrl.remove(0, index);
          });

        }, error => {
          console.log(error);
          loader.dismiss();

          console.log(error);
          this.erroMsg = error;
          this.isLoginError = true;

          setTimeout(() => {
            this.isLoginError = false;
          }, 5000);

          // this.toastCtrl.create(error);
        });
      } catch (e) {
        setTimeout(() => {
          loader.dismiss();
        }, 1000);
      }
    } else {
      //sign In code 
      console.log('Sign In');

      // Showing loader
      let loader = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loader.present();
      try {
        this.authService.getAuthenticate(formData, "api/v1/auth/signin").subscribe(data => {

          var userData = JSON.parse(data);
          loader.dismiss();
          this.storage.set("loginStatus", true);
          this.storage.set("userData", userData.data);
          // debugger
          window.localStorage.setItem('token', userData.data.token);
          window.localStorage.setItem('userId', userData.data.userInfoModel.userId);


          if (!userData.data.userInfoModel.profileCompleted) {
            this.navCtrl.setRoot(BasicinfoPage);
          } else {
            this.navCtrl.setRoot(SearchBeaconPage);
          }

        }, error => {
          console.log(error);
          loader.dismiss();

          // this.toastCtrl.create(error);
          this.erroMsg = error;
          this.isLoginError = true;

          setTimeout(() => {
            this.isLoginError = false;
          }, 5000);
        });
      } catch (e) {
        setTimeout(() => {
          loader.dismiss();
        }, 1000);
      }
    }
  }

  reset() {
    console.log("from reset");
    this.createForm();
  }

  forgotPass() {
    this.navCtrl.push(ForgotPage);
  }

  showPassword() {
    this.showPass = !this.showPass;

    if (this.showPass) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  termsConditions() {
    let modal = this.modalCtrl.create(TermsConditionsPage);
    modal.present();
  }
  signupLogin(isTrue) {
    if (isTrue) {
      this.isTrue = isTrue;
      setTimeout(() => { this.reset(); }, 100);
    } else {
      this.isTrue = isTrue;
      setTimeout(() => { this.reset(); }, 100);
    }

  }

  showNotifications(x, y) {

    // Schedule a single notification
    this.localNotifications.schedule({
      id: 1,
      text: 'Single ILocalNotification'
    });
  }
}
