import { Component, ViewChild } from '@angular/core';
import { Platform, App, Events, Nav, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Device } from '@ionic-native/device';
// import { ExperienceDetailsPage } from '../pages/lifestory/experienceDetails/experienceDetails';
import { OnboardingPage } from '../pages/onboarding/onboarding';
import { AuthenticationPage } from '../pages/auth/authentication/authentication';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { SearchBeaconPage } from '../pages/settings/search-beacon/search-beacon';
import { LifeStoryPage } from '../pages/lifestory/life-story/life-story';
import { SplashPage } from '../pages/splash/splash';
//import { FabricService } from '../providers/fabricservice';
import { Deeplinks } from '@ionic-native/deeplinks';
// import { HomePage } from '../pages/lifestory/home/home';
import { LifeStoryService } from '../providers/WebServices/LifeStory/LifeStoryService';
import { AlertServiceProvider } from '../providers/alert-service/alert-service';
import { SharedTaskProvider } from '../providers/SharedTask/sharedtask';
// import { Keyboard } from '@ionic-native/keyboard';
import { OnboardingModule } from '../pages/onboarding/onboarding.module';
// import { FabricService } from '../providers/fabricservice';


@Component({
  templateUrl: 'app.html'
})
export class ModurnApp {
  rootPage: any;
  isAppInForeground: boolean = false;
  @ViewChild('nav') nav: Nav;

  constructor(
    public platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private storage: Storage,
    private push: Push,
    private device: Device,
    public app: App,
    public events: Events,
    //public fabricService: FabricService,
    public modalCtrl: ModalController,
    public deeplink: Deeplinks,
    public lifeStoryService: LifeStoryService,
    public alertService: AlertServiceProvider,
    public sharedTask: SharedTaskProvider,
    // public keyboard :Keyboard,
  ) {
    if (this.platform.is('cordova')) {
      // statusBar.overlaysWebView(true);
      platform.ready().then(() => {
        statusBar.styleDefault();
        if (this.platform.is('android')) {
          console.log("Android");
          statusBar.styleLightContent();
        }
        // statusBar.styleBlackTranslucent();
        splashScreen.hide();
        // keyboard.disableScroll(true);
        // keyboard.hideKeyboardAccessoryBar(false);
        this.initPushNotification();
        // this.storage.set("deviceInfo", JSON.stringify(this.device.platform));
        localStorage.setItem("deviceInfo", this.device.platform);
        localStorage.setItem("deviceReg", this.device.uuid);


        this.storage.get("onboardingStatus").then((resulst) => {
          if (resulst) {

            this.storage.get("loginStatus").then((resulst) => {
              if (resulst) {
                this.rootPage = SearchBeaconPage;
              } else {
                this.rootPage = AuthenticationPage;
              }
            });
          } else {
            this.rootPage = "OnboardingPage";
          }
        });

        document.addEventListener("pause", () => {
          this.isAppInForeground = false;
          console.log("Pause");
        }, false);

        document.addEventListener("resume", () => {
          this.isAppInForeground = true;
          console.log("Resume");
        }, false);
      });
    }
    // if (this.platform.is('android')) {
    //   console.log("Android");
    //   statusBar.styleLightContent();
    // } else {
    //   console.log("ios");
    //   statusBar.styleDefault();
    // }
  }

  listenLogout() {
    this.events.subscribe("Logout", () => {

      this.nav.setRoot(AuthenticationPage);
      //this.app.getRootNav().setRoot(AuthenticationPage);
      //this.rootPage = AuthenticationPage;


      this.nav.setRoot(AuthenticationPage);
    });

  }


  initPushNotification() {

    if (!this.platform.is('cordova')) {
      console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
      return;
    }

    // to check if we have permission
    this.push.hasPermission()
      .then((res: any) => {

        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
        } else {
          console.log('We do not have permission to send push notifications');
        }

      });

    // to initialize push notifications

    const options: PushOptions = {
      android: {
        senderID: '529111944854'
      },
      ios: {
        alert: 'true',
        badge: false,
        sound: 'true'
      },
      windows: {}
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => {
      console.log('Received a notification', notification);
      console.log('Experience id: ', notification.additionalData.experienceId);
      console.log('Owner id: ', notification.additionalData.ownerId);

      var userId = localStorage.getItem("userId");

      if (!userId) {
        this.sharedTask.showToastMessage('To this lifestory you must be logged in.');
        return;
      }

      let data = {
        'experienceId': notification.additionalData.experienceId, 'userId': userId, 'ownerId': notification.additionalData.ownerId
      }
      if (this.isAppInForeground) {
        console.log("App is open");
      } else {
        console.log("App is not open");

        debugger;
        let modal = this.modalCtrl.create('ExperienceDetailsPage', { expIdData: data });
        modal.present();
      }
    });

    pushObject.on('registration').subscribe((registration: any) => {
      console.log('Device registered', registration.registrationId);
      localStorage.setItem("deviceReg", registration.registrationId);

    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }


  ngAfterViewInit() {
    this.platform.ready().then(() => {
      debugger;

      this.deeplink.routeWithNavController(this.nav, {

        // '/lifestory/lifestoryId': LifeStoryPage

      }).subscribe((match) => {
        debugger;
        try {
          //  alert("success" + JSON.stringify(match));
           console.log("success" + JSON.stringify(match));
          if (!localStorage.getItem("userId")) {
            this.sharedTask.showToastMessage('To become viewer of this lifestory you must be logged in.');
            return;
          }
          debugger
          var lifeStoryId = (match.$link.path).split(':')[1];

          var requestedUserId;
          if ((match.$link.path).split(':').length >= 3) {
            requestedUserId = (match.$link.path).split(':')[2];

            if (requestedUserId != localStorage.getItem("userId")) {
              this.sharedTask.showToastMessage('You have been logged in with different user.');
              return;
            }
          }

          this.alertService.beaconConfirmationAlertMsg("Are you sure you'd like to be added to this lifestory as a viewer?").then((clicked) => {

            if (clicked == 1) {
              debugger;

              this.connectToLifeStoryAsViewer(lifeStoryId);
              // this.toastCtrl.create('Re-link');
            } else if (clicked == 2) {
              //this._app.getRootNav().setRoot(HomePage);

            }
          });
        } catch (e) {
          console.log(e);
        }
        //console.log('Successfully matched route', match);
      }, (nomatch) => {
        alert("failure" + JSON.stringify(nomatch));
        // nomatch.$link - the full link data
        console.error('Got a deeplink that didn\'t match', nomatch);
      });
    });
  }


  connectToLifeStoryAsViewer(ownerId) {
    var params = {
      "ownerId": ownerId,
    };
    this.lifeStoryService.connectLifeStoryAsViewer(params)
      .then(result => {
        debugger;
        if (result.responseCode == 200) {
          this.sharedTask.showToastMessage("User is successfully added as a viewer");
          console.log("Check for beacon paired:: ",result.data);
          console.log("inside connectToLifeStoryAsViewer");
          this.nav.push(LifeStoryPage, {
            lifeData: result.data,
          });
        }

      }, error => {
        console.log(error);
      });


  }

}

