import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ToastServiceProvider } from '../../../providers/toast-service/toast-service';
import { AlertServiceProvider } from '../../../providers/alert-service/alert-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Http, Response, Headers } from '@angular/http';
// import {Observable} from 'rxjs/Rx'
import { Storage } from '@ionic/storage';
import { UserManager } from '../../../providers/WebServices/User/UserManager';
import { SharedTaskProvider } from '../../../providers/SharedTask/sharedtask'
import { AuthenticationPage } from '../../auth/authentication/authentication'
import { Keyboard } from '@ionic-native/keyboard';

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  public oldPass = 'password';
  public newPass = 'password';
  public repass = 'password';

  public showPass: boolean = false;
  public showPassNew: boolean = false;
  public showRePass: boolean = false;

  changePswdForm: FormGroup;
  isSubmit: boolean = false;
  // newPasword:any;
  currentPassword: any;
  confirmPassword: any;
  newPasword: any;
  cnfPassFalse: boolean = false;
  // public headers: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    // public http: Http,
    private fb: FormBuilder,
    // private headers:Headers,
    private storage: Storage,
    public viewCtrl: ViewController,
    public toastCtrl: ToastServiceProvider,
    public alertService: AlertServiceProvider,
    public userManager: UserManager,
    private keyboard: Keyboard,
    public sharedTaskProvider: SharedTaskProvider
  ) {

    this.createForm();
  }

  createForm() {
    let PASS_REGEXP = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,25}$";

    this.changePswdForm = this.fb.group({
      'currentPassword': [null, [Validators.required]],
      'newPasword': [null, [Validators.required, Validators.minLength(1), Validators.maxLength(25), Validators.pattern(PASS_REGEXP)]],
      'confirmPassword': [null, [Validators.required]]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }

  closeChangePassword() {
    this.keyboard.close();
    this.viewCtrl.dismiss();
  }

  showPassword() {
    this.showPass = !this.showPass;

    if (this.showPass) {
      this.oldPass = 'text';
    } else {
      this.oldPass = 'password';
    }
  }


  showPasswordNew() {
    this.showPassNew = !this.showPassNew;

    if (this.showPassNew) {
      this.newPass = 'text';
    } else {
      this.newPass = 'password';
    }
  }

  showRePassword() {
    this.showRePass = !this.showRePass;

    if (this.showRePass) {
      this.repass = 'text';
    } else {
      this.repass = 'password';
    }
  }

  confirmChangePassword() {

  }

  submitForm(formData) {

    let flag: boolean = false;

    console.log('Change Password');
    console.log(formData);

    this.isSubmit = true;

    // console.log(formData.newPasword +" == "+ formData.confirmPassword);
    if (formData.newPasword == formData.confirmPassword) {
      // alert("Matched")
      this.cnfPassFalse = false;
      flag = true;
    } else {
      // alert("Not Match");
      this.cnfPassFalse = true;
    }

    if (formData.currentPassword != null && flag == true && this.changePswdForm.valid) {
      this.changePassword(formData);
    }
  }

  changePassword(formData) {
    this.storage.get("userData").then((result) => {
      if (result) {
        formData.userId = result.userInfoModel.userId;
        // debugger;
        this.userManager.changePassword(formData)
          .then(data => {
            debugger;
            // let message = data;
            console.log('life story data =', data);

            let profileObject: any;
            profileObject = data;
            if (profileObject.responseCode == '200') {
              let message = profileObject.message;
              this.sharedTaskProvider.showToastMessage(message);
              // this.logoutTask();
              
              let updateUserData = {
                "token": profileObject.data.token,
                "userInfoModel":result.userInfoModel
              }
              console.log("===== updateUserData after change password ====\n\n", updateUserData);
              this.storage.set("userData", updateUserData);
              window.localStorage.setItem('token', profileObject.data.token);

              this.closeChangePassword();
            }

          }, error => {
            //debugger;
            console.log(error);
          });
      }
    });
  }


  logoutTask() {
    this.sharedTaskProvider.showToastMessage('You have been logged out of modUrn.')
    this.sharedTaskProvider.setValueForKey(false, 'loginStatus');
    this.sharedTaskProvider.setValueForKey('', 'userData');

    this.navCtrl.setRoot(AuthenticationPage);
  }


}
