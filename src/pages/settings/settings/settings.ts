import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, App, IonicPage, Events, LoadingController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TermsConditionsPage } from '../../common/terms-conditions/terms-conditions';
//import { ChangePasswordPage } from '../../settings/change-password/change-password';
//import { TutorialsPage } from '../../settings/tutorials/tutorials';
import { SearchBeaconPage } from '../../settings/search-beacon/search-beacon';
import { MyProfileModule } from '../../profile/my-profile/my-profile.module';
import { AuthenticationPage } from '../../auth/authentication/authentication';
import { ToastServiceProvider } from '../../../providers/toast-service/toast-service';
import { AlertServiceProvider } from '../../../providers/alert-service/alert-service';
import { OnboardingModule } from '../../onboarding/onboarding.module';
import { ChangePasswordModule } from '../../settings/change-password/change-password.module';
import { SamplesPageModule } from '../../settings/samples/samples.module';
import * as Constant from '../../../Utility/Constant';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  isTrue: boolean = true;
  isSettings: boolean = true;
  userName: any;
  profileImg: any ='';
  nickName: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastServiceProvider,
    public alertService: AlertServiceProvider,
    public _app: App,
    public events: Events
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    
  }

  ionViewWillEnter() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();
    this.storage.get("userData").then((result) => {
      console.log(result);

      console.log(result.userInfoModel.userName);
      this.userName = result.userInfoModel.userName;

      //  console.log(result.userInfoModel.profileImg200);
      console.log(result.userInfoModel.profileImg200);
      this.profileImg = result.userInfoModel.profileImg;

      console.log(result.userInfoModel.nickName);
      this.nickName = result.userInfoModel.nickName;

    });
    loader.dismiss();
  }

  ionViewWillUnload() {
    this.events.unsubscribe(Constant.KEY_NOTIFF.LifeStoryUpdate);
  }


  listenSettingClose() {
    this.events.subscribe(Constant.KEY_NOTIFF.DismissSetting, () => {
      this.closeSettings();
      //this.app.getRootNav().setRoot(AuthenticationPage);
      //this.rootPage = AuthenticationPage;
    });
  }

  closeSettings() {
    this.viewCtrl.dismiss();
  }

  chnagePassword() {
    // this.navCtrl.push("ChangePasswordPage");
    let modal = this.modalCtrl.create("ChangePasswordPage");
    modal.present();
  }
  tutorials(isTrue) {
    if (isTrue)
      this.navCtrl.push("OnboardingPage", { isSettings: true });
    // let modal = this.modalCtrl.create(TutorialsPage);
    // modal.present();
  }
  termsConditions() {
    // this.navCtrl.push(TermsConditionsPage);
    let modal = this.modalCtrl.create(TermsConditionsPage);
    modal.present();
  }
  samples(){
    console.log("Samples Clicked");
    this.navCtrl.push("SamplesPage");
  }

  showMyProfile() {
    this.navCtrl.push("MyProfilePage");
  }
  scanUrn()
  {
    this.navCtrl.push(SearchBeaconPage);
  }

  signOut() {

    this.alertService.presentLogOutAlert('Are you sure you want to Logout?').then((yes) => {
      if (yes) {
        debugger
        this.navCtrl.push(AuthenticationPage);
        // this._app.getRootNav().setRoot(AuthenticationPage);
        // this._app.getRootNav().setRoot(AuthenticationPage);
        this.storage.set("loginStatus", false);
        this.storage.set("userData", '');
        localStorage.removeItem('lifeStoryData');
        // localStorage.removeItem("userId");
        this.toastCtrl.create('You have been logged out from modUrn.');
        
        
        // setTimeout(function() {
        //   // this.closeSettings();
          
        // }, 1000);

       
        // this._app.getRootNav().setRoot(AuthenticationPage);
        // this.toastCtrl.create('You have been logged out from modUrn.');
        // // this.storage.set("loginStatus", false);
        // this.storage.clear();
        // // localStorage.clear();
        // // localStorage.removeItem("userId");
        // this.closeSettings();
       
        // // this._app.getRootNav().setRoot(AuthenticationPage);

        // // let nav = this._app.getRootNav(); 
        // // nav.setRoot(AuthenticationPage);


        // // const root = this._app.getRootNav();
        // // root.popToRoot();
       
               
      }
    });
  }
}

