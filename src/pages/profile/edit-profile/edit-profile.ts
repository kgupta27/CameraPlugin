import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  Platform,
  ActionSheetController,
  LoadingController,
  AlertController,
  IonicPage,
} from 'ionic-angular';
import { CameraProvider } from '../../../providers/camera/camera';
import { ToastServiceProvider } from '../../../providers/toast-service/toast-service';
// import { AlertServiceProvider } from '../../../providers/alert-service/alert-service';
// import { MyProfilePage } from '../my-profile/my-profile';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WITHOUT_FIRST_REGES_SPECIAL } from '../../../Utility/Constant';
import { Storage } from '@ionic/storage';
import { UserManager } from '../../../providers/WebServices/User/UserManager';
import { SharedTaskProvider } from '../../../providers/SharedTask/sharedtask';
import { SharedServices } from '../../../providers/WebServices/Common/SharedServices';
import { ConfigProvider } from '../../../providers/config/config'
import * as Constant from '../../../Utility/Constant';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  updateUserData: any = {};
  isSubmit: boolean = false;
  chosenPicture: any;
  editProfileForm: FormGroup;
  name: any;
  nickName: any;
  email: any;
  profileImg: any;
  storeProfileData: any = {};
  isImageChanged: Boolean = false;
  constructor(
    public navCtrl: NavController,
    private fb: FormBuilder,
    public toastCtrl: ToastServiceProvider,
    public navParams: NavParams,
    public actionsheetCtrl: ActionSheetController,
    public cameraProvider: CameraProvider,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public userManager: UserManager,
    public storage: Storage,
    public alertCtrl: AlertController,
    public sharedTaskProvider: SharedTaskProvider,
    public sharedServices: SharedServices,
    public config: ConfigProvider
    // public alertService: AlertServiceProvider
  ) {


    this.storage.get("userData").then((result) => {
      console.log(result);

      this.profileImg = result.userInfoModel.profileImg;

      console.log(result.userInfoModel.userName);
      this.name = result.userInfoModel.userName;
      this.editProfileForm.controls['name'].setValue(this.name);

      console.log(result.userInfoModel.nickName);
      this.nickName = result.userInfoModel.nickName;
      this.editProfileForm.controls['nickName'].setValue(this.nickName);

      console.log(result.userInfoModel.email);
      this.email = result.userInfoModel.email;
      this.editProfileForm.controls['email'].setValue(this.email);


    });
    this.createForm();
  }


  createForm() {
    let EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.editProfileForm = this.fb.group({
      'name': [null, [Validators.required, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL), Validators.maxLength(30)]],
      'nickName': [null, [Validators.required, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL), Validators.maxLength(30)]],
      'email': [null, [Validators.required, , Validators.pattern(EMAIL_REGEXP)]]

    })

    // this.editProfileForm.controls['fullname'].setValue(this.fullName);

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }
  

  changePicture() {

    const actionsheet = this.actionsheetCtrl.create({
      title: 'Upload Picture',
      buttons: [
        {
          text: 'Take Photo',
          icon: !this.platform.is('ios') ? null : null,
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: !this.platform.is('ios') ? 'Choose Existing' : 'Choose Existing',
          icon: !this.platform.is('ios') ? null : null,
          handler: () => {
            this.getPicture();
          }
        },
        {
          text: 'Cancel',
          icon: !this.platform.is('ios') ? null : null,
          role: 'destructive',
          handler: () => {
            console.log('the user has cancelled the interaction.');
          }
        }
      ]
    });
    return actionsheet.present();
  }



  takePicture() {
    
    return this.cameraProvider.getPictureFromCamera().then(picture => {
      if (picture) {
        this.profileImg = picture;
        this.isImageChanged = true;
      }
      
    }, error => {
      // alert(error);
    });
  }

  getPicture() {
    
    return this.cameraProvider.getPictureFromPhotoLibrary().then(picture => {
      if (picture) {
        this.profileImg = picture;
        this.isImageChanged = true;
      }
    }, error => {
      // alert(error);
    });
  }

  saveProfile() {

    let alert = this.alertCtrl.create({
      title: 'Confirm Password',
      message: 'Please confirm your password to save your new email.',
      inputs: [
        {
          name: 'currpassword',
          placeholder: 'Current password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'SAVE',
          handler: data => {
            console.log(data.currpassword);
            // this.navCtrl.push(MyProfilePage);
            // this.navCtrl.popToRoot();
            // this.confirmPassword(data.currpassword);

            // if(data.currpassword)
            let validateObj = this.validatepswrd(data.currpassword);
            console.log(validateObj.isValid);
            if (!validateObj.isValid) {
              //null case
              console.log("False => Now hide", validateObj.message);
              //alert(validateObj.message);
              return false;
            } else {
              //not null case
              console.log("True => Now save", validateObj.message);

              //make HTTP call

              this.confirmPassword(data.currpassword);
            }
          }
        }
      ],
      cssClass: 'confirm-alert'
    });
    alert.present();
  }


  validatepswrd(data) {
    debugger;
    if (data) {
      return {
        isValid: true,
        message: ''
      };
    } else {
      return {
        isValid: false,
        message: 'Password Mismatch'
      }
    }
  }



  submitForm(formData) {

    this.isSubmit = true;
    // console.log(this.email);
    // console.log(formData.email);

    if (this.editProfileForm.valid) {
      this.storeProfileData = formData;
      // this.storage.get("userData").then((result) => {
      if (this.email != formData.email) {
        // console.log(this.email);
        // console.log(result.userInfoModel.email);
        this.saveProfile();

      } else {
        this.editProfile(formData);
      }
      // this.editProfile(formData);
    }

  }



  confirmPassword(formData) {

    // var formDataObj = new FormData();
    // formDataObj.append("password", formData);

    var formDataObj = {
      "currentPassword": formData,
      "userId": window.localStorage.getItem('userId')
    }

    this.userManager.confirmpswrd(formDataObj)
      .then(data => {
        // debugger;
        let message = data;
        console.log('life story data =', data);
        this.editProfile(this.storeProfileData);
        // this.sharedTaskProvider.showToastMessage(message);
        // this.sharedTaskProvider.showToastMessage("Successfully Updated");

      }, error => {
        //debugger;
        console.log(error);
      });

  }

  editProfile(formData) {

    
    var formDataObj = new FormData();

    //formDataObj.append("userId", formData.userId);
    formDataObj.append("name", formData.name);
    formDataObj.append("nickName", formData.nickName);
    formDataObj.append("Email", formData.email);

    debugger;
    console.log(formDataObj);
    debugger;
    console.log(formData);
    if (this.isImageChanged) {
      this.saveDataWithImage(this.profileImg, formData);
      return;
    }


    this.userManager.editProfile(formDataObj)
      .then(data => {
        console.log('life story data =', data);
        debugger;
        let profileObject: any;
        profileObject = data;
        if (profileObject.responseCode == '200') {
          let message = profileObject.message;
          this.sharedTaskProvider.showToastMessage(message);
          // alert('edit');
          // debugger;

          console.log(profileObject.data);
          this.storage.set("userData", profileObject.data);
          window.localStorage.setItem('token', profileObject.data.token);

          this.closeEditForm();
        }

        // this.sharedTaskProvider.showToastMessage(message);
        // this.storage.set("userData", userData.data);
        
      }, error => {
        //debugger;
        console.log(error);
      });
  }

  closeEditForm() {
    //this.viewCtrl.dismiss();
    console.log("Now close form");
    // this.storage.set("userData", userData.data);
    console.log(this.storeProfileData);
    this.navCtrl.popToRoot();
  }



  saveDataWithImage(choosenPicture, formData) {
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();

    var param = {
      fileKey: 'profileImg',
      fileName: 'profile.jpg',
      name: formData.name,
      nickName: formData.nickName,
      email: formData.email
      
    };
    
    let urlString = this.config.apiMethod(Constant.APIService.UpdateProfilePic);

    //this.sharedServices.uploadImage(chosenPicture,index,ownerId).
    this.sharedServices.uploadImageTask(choosenPicture, param, urlString)
      .then(data => {
        debugger;
        console.log('life story data =', data);

       let profileObject: any;
        profileObject = data;
        loader.dismiss();
        profileObject = JSON.parse(profileObject.response);
        if (profileObject.responseCode == '200') {
          let message = profileObject.message;
          this.sharedTaskProvider.showToastMessage(message);

          this.storage.set("userData", profileObject.data);
          this.closeEditForm();
        } else {
          console.log("Not reachable");
        }


      }, error => {
        loader.dismiss();
      });


  }







  /*const fileTransfer: FileTransferObject = this.transfer.create();
  this.storage.get("userData").then((result) => {
    if (result) {
      ;

     

      var params = {
        name: this.navParams.data.userBasicInfo.fullname,
        nickName: this.navParams.data.userBasicInfo.nicename
      };
      

      // console.log(options);
      // console.log(JSON.stringify(options));
      fileTransfer.upload(this.chosenPicture, this._baseUrl + 'api/v1/profile/saveUserProfile', options)
        .then((data) => {
          // success
          console.log("Image update data: \n\n");
          console.log(data.response);
          // this.toastCtrl.create(data);
          // this.toastCtrl.create('Your picture uploaded successfully');
          let picResponse = JSON.parse(data.response);
          if (picResponse.success) {
            this.storage.set("loginStatus", true);

            this.storage.get("userData").then((result) => {
              if (result) {
                console.log(result.userInfoModel);



                // let updateUserData = {
                //   "token": result.token,
                //   "userInfoModel": {
                //     "userId": result.userInfoModel.userId,
                //     "userName": this.navParams.data.userBasicInfo.fullname,
                //     "profileCompleted": true
                //   }
                // }
                // this.storage.set("userData", updateUserData);

                let updateUserData = {
                  "token": result.token,
                  "userInfoModel": {
                    
                    "userId": result.userInfoModel.userId,
                    "profileCompleted": true,
                    "userName": this.navParams.data.userBasicInfo.fullname,
                    "nickName" : this.navParams.data.userBasicInfo.nicename,
                    "email": result.userInfoModel.email,
                    "profileImg": result.userInfoModel.profileImg,
                    "profileImg200": result.userInfoModel.profileImg200,
                    "profileImg500": result.userInfoModel.profileImg500
                  }
                }
                // console.log("===== updateUserData ====\n\n");
                console.log(updateUserData);
                this.storage.set("userData", updateUserData);

              }
            });

            // this.navCtrl.setRoot(HomePage);
            this.navCtrl.setRoot(SearchBeaconPage);
          }
        }, (err) => {
          // error
          console.log(err);
          loader.dismiss();
          // this.toastCtrl.create(err);
        });
*/
}



