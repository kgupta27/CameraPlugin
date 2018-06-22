import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { Toast } from '@ionic-native/toast';
import { Network } from '@ionic-native/network';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { SocialSharing } from '@ionic-native/social-sharing';
import { HttpModule } from '@angular/http';
import { Device } from '@ionic-native/device';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { IBeacon } from '@ionic-native/ibeacon';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { NetworkServices} from '../providers/NetworkRequest/NetworkServices';
import { Keyboard } from '@ionic-native/keyboard';
import { SharedServices } from '../providers/WebServices/Common/SharedServices';
import { LifeStoryService} from '../providers/WebServices/LifeStory/LifeStoryService';
import { InterestnPassionService } from '../providers/WebServices/LifeStory/InterestnPassionService';
import { ModurnApp } from './app.component';
// import { HomePage } from '../pages/lifestory/home/home';
import { LifeStoryPage } from '../pages/lifestory/life-story/life-story';


import { AuthenticationPage } from '../pages/auth/authentication/authentication';
import { ForgotPage } from '../pages/auth/forgot/forgot';
import { TermsConditionsPage } from '../pages/common/terms-conditions/terms-conditions';
import { ProfilePicturePage } from '../pages/profile/profile-picture/profile-picture';
import { BasicinfoPage } from '../pages/profile/basicinfo/basicinfo';
import { SearchBeaconPage } from '../pages/settings/search-beacon/search-beacon';
import { SplashPage } from '../pages/splash/splash';
// import { ExperienceDetailsPage } from '../pages/lifestory/experienceDetails/experienceDetails';

import { CameraProvider } from '../providers/camera/camera';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { AuthProvider } from '../providers/auth/auth';
import { ConfigProvider } from '../providers/config/config';
import { Push } from '@ionic-native/push';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { HardwareBackButtonService } from '../providers/back-button/back-button';
import { ToastServiceProvider } from '../providers/toast-service/toast-service';
import { AlertServiceProvider } from '../providers/alert-service/alert-service';
import { UserCommonServices } from '../providers/usercommon-services';
import { BeaconProvider } from '../providers/beaconprovider';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { ProfilePopoverComponent } from '../components/profile-popover/profile-popover';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';

import { SharedTaskProvider } from '../providers/SharedTask/sharedtask';
import { UserManager } from '../providers/WebServices/User/UserManager';
//import { FabricService } from '../providers/fabricservice';
import { BeaconService } from '../providers/WebServices/Beacon/beaconService';
import { Deeplinks } from '@ionic-native/deeplinks';

//import * as Constant from '../Utility/Constant';


@NgModule({
  declarations: [
    SplashPage,
    ModurnApp,
    // HomePage,
    AuthenticationPage,
    TermsConditionsPage,
    ForgotPage,
    ProfilePicturePage,
    BasicinfoPage,
    SearchBeaconPage,
    LifeStoryPage,
    ProfilePopoverComponent,
    // ExperienceDetailsPage
    ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(ModurnApp, {
      backButtonText: '',
      backButtonIcon: 'ios-arrow-back',
      tabsPlacement: 'top',
      scrollPadding: false,
      scrollAssist: false,
      autoFocusAssist: false,
      platforms: {
        ios: {
          scrollAssist: false,
        }
      }
    }),
    
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    //OnboardingPage,
    ModurnApp,
    SplashPage,
    // HomePage,
    AuthenticationPage,
    TermsConditionsPage,
    ForgotPage,
    ProfilePicturePage,
    BasicinfoPage,
    SearchBeaconPage,
    LifeStoryPage,
    ProfilePopoverComponent,
    // ExperienceDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Toast,
    Network,
    SocialSharing,
    Camera,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CameraProvider,
    AuthProvider,
    ConfigProvider,
    FileChooser,
    FilePath,
    Push,
    FileTransfer,
    File,
    Device,
    Keyboard,
    BluetoothSerial,
    LocalNotifications,
    HardwareBackButtonService,
    ToastServiceProvider,
    AlertServiceProvider,
    UserCommonServices,
    BeaconProvider,
    IBeacon,
    AndroidPermissions,
    InAppBrowser,
    PhotoViewer,
    LifeStoryService,
    InterestnPassionService,
    NetworkServices,
    SharedServices,
    UserManager,
    SharedTaskProvider,
    BeaconService,
    Deeplinks,
    // Keyboard
  ]
})
export class AppModule {}
