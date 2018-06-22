import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  Platform,
  ModalController,
  ActionSheetController,
  LoadingController,
  IonicPage
} from 'ionic-angular';
import { CameraProvider } from '../../../providers/camera/camera';
import { ToastServiceProvider } from '../../../providers/toast-service/toast-service';
import { EditProfileModule } from "../edit-profile/edit-profile.module";
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})

export class MyProfilePage {

  userName: any = "";
  nickName: any = "";
  email: any = "";
  profilepic: any ='assets/img/human.png';

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastServiceProvider,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public actionsheetCtrl: ActionSheetController,
    public cameraProvider: CameraProvider,
    public platform: Platform,
    private storage: Storage,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProfilePage');

    this.storage.get("userData").then((result) => {
      console.log(result);

      this.profilepic = result.userInfoModel.profileImg;

      console.log(result.userInfoModel.userName);
      this.userName = result.userInfoModel.userName;

      console.log(result.userInfoModel.nickName);
      this.nickName = result.userInfoModel.nickName;

      console.log(result.userInfoModel.email);
      this.email = result.userInfoModel.email;
    });

  }


  editProfile() {
    console.log("editProfile called");
    this.navCtrl.push("EditProfilePage");
    // let modal = this.modalCtrl.create("EditProfilePage");
    // modal.present();
  }

}
