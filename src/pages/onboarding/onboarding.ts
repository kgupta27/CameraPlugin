import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams,Events } from 'ionic-angular';
import { AuthenticationPage } from '../auth/authentication/authentication';
import { Storage } from '@ionic/storage';
import * as Constant from '../../Utility/Constant';


@IonicPage()
@Component({
  selector: 'page-onboarding',
  templateUrl: 'onboarding.html',
})
export class OnboardingPage {

  slides: any[];
  tabBarElement: any;
  splash:boolean = true;

  isFromSetting:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    public event: Events
  ) {
    this.isFromSetting = navParams.data.isSettings;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnboardingPage');

    setTimeout(() => {
      this.splash = false;
    }, 7000);

    this.slides = [
      {
        title: "Share Your Legacy",
        description: "Every life has a story to tell, wisdom to share and journey to record for loved one’s and future generations to explore.",
        image: "assets/img/onboarding1.png",
      },
      {
        title: "Sample Life Stories",
        description: "Connect with family and friends to help build a rich tapestry of your life.",
        image: "assets/img/onboarding4.png",
      },
      {
        title: "Preserve Your Memories",
        description: "Save experiences, interests and passions, photographs and media from a life story.",
        image: "assets/img/onboarding2.png",
      },
      {
        title: "Contribute",
        description: "Create, share and collaborate with family and friends to help build a rich tapestry and life record.",
        image: "assets/img/onboarding3.png",
      },
      {
        title: "A Pet's Life",
        description: "A place to capture and record your family pet’s life journey.  ",
        image: "assets/img/onboarding5.png",
      }
    ];
  }

  getStarted() {
    this.storage.set("onboardingStatus", true);

    if(this.isFromSetting){
      this.navCtrl.popToRoot();
      this.event.publish(Constant.KEY_NOTIFF.DismissSetting);
      
    }else{
      this.navCtrl.setRoot(AuthenticationPage);
    }
    
  }
}