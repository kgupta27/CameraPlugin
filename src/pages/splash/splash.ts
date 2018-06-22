import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { OnboardingModule } from '../../pages/onboarding/onboarding.module';
import { AuthenticationPage } from '../../pages/auth/authentication/authentication';
import { SearchBeaconPage } from '../../pages/settings/search-beacon/search-beacon';


@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {

  splash:boolean = true;
  constructor(
    public navCtrl: NavController, 
    private storage: Storage
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SplashPage');
    setTimeout(() => {
      //debugger;
      this.splash = false;

      this.storage.get("onboardingStatus").then((resulst) => {
        if (resulst) {

          this.storage.get("loginStatus").then((resulst) => {
            if (resulst) {
              this.navCtrl.setRoot(SearchBeaconPage);
            } else {
              // this.rootPage = AuthenticationPage;
              this.navCtrl.setRoot(AuthenticationPage);
            }
          });
        } else {
          // this.rootPage = OnboardingPage;
          this.navCtrl.setRoot("OnboardingPage");
        }
      });
    }, 1000);
  }

}