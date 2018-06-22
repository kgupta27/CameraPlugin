import { Http, Headers } from '@angular/http';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import {
  NavController,
  NavParams,
  Platform,
  ActionSheetController,
  LoadingController,
  ModalController,
  ViewController
} from 'ionic-angular';
import { CameraProvider } from '../../../providers/camera/camera';
import { ToastServiceProvider } from '../../../providers/toast-service/toast-service';
import { AlertServiceProvider } from '../../../providers/alert-service/alert-service';
import { UserCommonServices } from '../../../providers/usercommon-services';
import { ConfigProvider } from '../../../providers/config/config';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { SearchBeaconPage } from '../../settings/search-beacon/search-beacon';
// import { HomePage } from '../../lifestory/home/home';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';


@Component({
  selector: 'page-profile-picture',
  templateUrl: 'profile-picture.html',
})
export class ProfilePicturePage {

  chosenPicture: string = "assets/img/icPlusAdd.png";
  accessToken: any;
  userId: any;
  userName: any;
  userNickName: any;
  public _baseUrl: any;
  public headers: any;
  public isBlutoothEnable: boolean = false;
  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastServiceProvider,
    public navParams: NavParams,
    public actionsheetCtrl: ActionSheetController,
    public cameraProvider: CameraProvider,
    private storage: Storage,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public alertService: AlertServiceProvider,
    private bluetoothSerial: BluetoothSerial,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public commonServices: UserCommonServices,
    private transfer: FileTransfer,
    private file: File,
    public configService: ConfigProvider
  ) {
    debugger;
    console.log(this.navParams.data);
    console.log(this.navParams.data.userBasicInfo);
    this._baseUrl = configService.getApiURI();
    this.headers = configService.getHeaders();

    // this.userName = this.navParams.data.userBasicInfo.fullname;
    // this.userName = this.navParams.data.userBasicInfo.nicename;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupScreen2Page');
  }

  addPicture() {

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
    const loading = this.loadingCtrl.create();

    loading.present();
    return this.cameraProvider.getPictureFromCamera().then(picture => {
      if (picture) {
        this.chosenPicture = picture;
      }
      loading.dismiss();
    }, error => {
      alert(error);
    });
  }

  getPicture() {

    return this.cameraProvider.getPictureFromPhotoLibrary().then(picture => {
      if (picture) {
        this.chosenPicture = picture;
      }
      // loading.dismiss();
    }, error => {
      alert(error);
    });
  }


  saveUserInfo(userData, authToken) {
 debugger;
    this.storage.get("userData").then((result) => {
      if (result) {
        debugger;
        console.log(result.userInfoModel);

        let updateUserData = {
          "token": result.token,
          "userInfoModel": {

            "userId": result.userInfoModel.userId,
            "profileCompleted": true,
            "userName": userData.name,
            "nickName": userData.nickName,
            "email": result.userInfoModel.email,
            "profileImg": result.userInfoModel.profileImg,
            "profileImg200": result.userInfoModel.profileImg200,
            "profileImg500": result.userInfoModel.profileImg500
          }
        }
        console.log("===== updateUserData ====\n\n");
        console.log(updateUserData);
        this.storage.set("userData", updateUserData);

        this.commonServices.submitPictureData(userData, "api/v1/profile/saveUserProfile", authToken).subscribe(data => {
          console.log(data);
          this.storage.set("loginStatus", true);
          // this.navCtrl.setRoot(HomePage);
          this.navCtrl.setRoot(SearchBeaconPage);
        }, error => {
          console.log(error);
          this.toastCtrl.create(error);
        });

      }
    });

  }

  saveUserBasicInfo(skip?) {
    // this.appearBluetoothSettings();

    // Showing loader
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();

    if (this.chosenPicture != "assets/img/icPlusAdd.png" && skip) {

      const fileTransfer: FileTransferObject = this.transfer.create();
      this.storage.get("userData").then((result) => {
        if (result) {
          this.accessToken = result.token;
          this.userId = result.userInfoModel.userId;

          let options: FileUploadOptions = {
            fileKey: 'profileImg',
            fileName: 'profile.jpg',
            chunkedMode: false,
            headers: {
              'Content-Type': undefined,
              'Authorization': this.accessToken
            }
          }

          var params = {
            userId: this.userId,
            name: this.navParams.data.userBasicInfo.fullname,
            nickName: this.navParams.data.userBasicInfo.nicename,
            deviceType: localStorage.getItem('deviceInfo'),
            deviceToken: window.localStorage.getItem('deviceReg')

          };
          options.params = params;

          console.log(options);
          debugger;

          // console.log(JSON.stringify(options));
          fileTransfer.upload(this.chosenPicture, this._baseUrl + 'api/v1/profile/saveUserProfile', options)
            .then((data) => {
              // success
              console.log("Image update data: \n\n");
              console.log(data.response);
              loader.dismiss();
              // this.toastCtrl.create(data);
              // this.toastCtrl.create('Your picture uploaded successfully');
              let picResponse = JSON.parse(data.response);
              if (picResponse.responseCode == '200') {
                this.storage.set("loginStatus", true);
                
                this.storage.set("userData", picResponse.data);
                // this.navCtrl.setRoot(HomePage);
                this.navCtrl.setRoot(SearchBeaconPage);
              }
            }, (err) => {
              // error
              console.log(err);
              loader.dismiss();
              // this.toastCtrl.create(err);
            });
        } else {
          this.toastCtrl.create('Something went wrong!');
        }

      });
    } else {
      console.log("Not pic");

      this.storage.get("userData").then((result) => {
        if (result) {
          this.accessToken = result.token;
          this.userId = result.userInfoModel.userId;

          // var headers = {
          //   'Content-Type': undefined,
          //   'Authorization': this.accessToken
          // }
          var params = {
            userId: this.userId,
            name: this.navParams.data.userBasicInfo.fullname,
            nickName: this.navParams.data.userBasicInfo.nicename,
            deviceType: localStorage.getItem('deviceInfo'),
            deviceToken: window.localStorage.getItem('deviceReg')
          };

          this.saveUserInfo(params, this.accessToken);

        } else {
          this.toastCtrl.create('Something went wrong!');
        }
      });
      loader.dismiss();
    }
  }

}