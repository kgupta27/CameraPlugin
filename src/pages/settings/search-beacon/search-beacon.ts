import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, ViewController, Platform, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BeaconProvider } from '../../../providers/beaconprovider';
import { Events } from 'ionic-angular';
import { BeaconModel } from '../../models/beacon-module';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { AlertServiceProvider } from '../../../providers/alert-service/alert-service';
import { LocalNotifications } from '@ionic-native/local-notifications';
// import { HomePage } from '../../lifestory/home/home';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { ToastServiceProvider } from '../../../providers/toast-service/toast-service';
import { UserCommonServices } from '../../../providers/usercommon-services';
import { SharedServices } from '../../../providers/WebServices/Common/SharedServices';
import { BeaconService } from '../../../providers/WebServices/Beacon/beaconService';


@Component({
  selector: 'page-search-beacon',
  templateUrl: 'search-beacon.html',
})
export class SearchBeaconPage {

  didRange: any;
  didStart: any;
  beconData: any;

  beacons: BeaconModel[] = [];
  scannedBeacons: BeaconModel[] = [];

  beaconsName: string[];
  beaconsImg: number[];
  zone: any;
  flag: boolean = false;
  notificationId: 0;
  refreshIntervalId: any;
  isAppInForeground: boolean = false;
  // myBeacons = [0,1,2,3,4,5,6,7,8];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public viewCtrl: ViewController,
    public toastCtrl: ToastServiceProvider,
    public beaconProvider: BeaconProvider,
    public events: Events,
    private bluetoothSerial: BluetoothSerial,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    private androidPermissions: AndroidPermissions,
    public alertService: AlertServiceProvider,
    public commonServices: UserCommonServices,
    private localNotifications: LocalNotifications,
    public sharedServices: SharedServices,
    public beaconService: BeaconService
  ) {

    this.beaconsName = ['Jane Feldman', 'Charlie Watson', 'Billy', 'Brett Feldman', 'Pamela Feldman', 'Pammy', 'Janey', 'Chas', 'Feldman'];
    this.beaconsImg = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // required for UI update
    this.zone = new NgZone({ enableLongStackTrace: false });
    this.findBeacons();
    // this.enableBlutooth();

    this.platform.ready().then(() => {

      console.log("---------------in view did load------------------");
      this.localNotifications.hasPermission().then(function (granted) {
        if (!granted) {
          console.log("not granted!");
          this.localNotifications.registerPermission();
        } else {
          console.log("Already granted!");
        }
      });

      // this.localNotifications.on("click", (notification) => {
      //   console.log("clicked on notification");
      // });


      // console.log("Current component: ", JSON.stringify(this.navCtrl.getActive()));
      // console.log(this.navCtrl.getActive().component);

      // if (this.navCtrl.getActive().component === SearchBeaconPage) {
      //   console.log("SearchPage");
      // } else {
      //   console.log("OtherPage");
      // }

      /*document.addEventListener("pause", () => {
        this.isAppInForeground = false;
        console.log("Pause");
      }, false);

      document.addEventListener("resume", () => {
        this.isAppInForeground = true;
        console.log("Resume");
      }, false);*/

    });
  }

  enableBlutooth() {
    this.bluetoothSerial.isEnabled().then((success) => {
      console.log("Bluetooth is enabled");
    }, (failure) => {
      console.log("Bluetooth is *not* enabled");
      this.appearBluetoothSettings();
    });
  }

  appearBluetoothSettings() {
    this.alertService.presentBluetoothWithCallback('',
      '<b>Turn Bluetooth on to allow “modUrn” to find Urns near you.<b>').then((yes) => {
        if (yes) {
          this.bluetoothSerial.enable();
        } else {
          // this.toastCtrl.create('Deny by user');
        }
      });
  }

  closeSearching() {
    this.beaconProvider.stopRanging();

    this.beaconProvider.initialise(2).then((isInitialised) => {
      if (isInitialised) {
        this.listenToBeaconEvents();
      }
    });


    this.navCtrl.setRoot('HomePage');
  }

  findBeacons() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      success => { console.log('Permission granted') },
      err => this.androidPermissions.requestPermissions(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
    );
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION, this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION]);

    this.platform.ready().then(() => {
      debugger;
      this.beaconProvider.initialise(1).then((isInitialised) => {
        if (isInitialised) {
          this.listenToBeaconEvents();
        }
      });
    });
  }

  listenToBeaconEvents() {

    this.refreshIntervalId = setInterval(() => {
      this.beacons = []; // do this after 1 minute
      console.log("do this after 60000 mili sec");

      //check blutooth enable or not.
      // this.enableBlutooth();
    }, 60000);

    this.events.subscribe('didRangeBeaconsInRegion', (data) => {
      debugger;
      console.log("subscribe event");
      // update the UI with the beacon list
      this.zone.run(() => {

        // this.beacons = [];
        let beaconList = data.beacons;
        if (beaconList.length == 0) {
          return;
        }

        beaconList.forEach((beacon) => {
          let beaconObject = new BeaconModel(beacon);
          this.addBeaconIfNotExist(beaconObject);
          console.log('beaconst count ====== ' + this.beacons);

        });
        this.checkBeaconExistance();

      });
    });


    this.events.subscribe('didEnterRegion', (data) => {
      console.log("subscribe event");
      // fire entry notification
      this.localNotifications.schedule({
        id: 1,
        title: "modUrn",
        text: "A new life story found!"
      });

    });
  }


  checkBeaconExistance() {
    debugger;
    if (this.scannedBeacons.length == 0) {
      return;
    }


    var beaconList = [];
    this.scannedBeacons.forEach((beacon) => {
      let obj = {
        major: beacon.major,
        minor: beacon.minor,
        uuid: beacon.uuid
      }
      beaconList.push(obj);
    });

    var userDataInfo = {
      beaconExistenceList: beaconList

    };


    this.beaconService.checkBeconExistance(userDataInfo)
      .then(result => {
        debugger;
        // console.log(typeof(result));
        var arr = Object.keys(result).map(function (k) { return result[k] });
        this.beacons = arr;
        this.scannedBeacons = [];

        if (this.beacons.length > 0) {
          /*this.localNotifications.schedule({
            id: 1,
            title: "modUrn",
            text: "A new URN found!"
          });*/
        }
        console.log('beacons array length =' + this.beacons.length);

      }, error => {

        console.log(error);
      });

  }

  addBeaconIfNotExist(beaconObject) {

    // console.log("isAppInForeground: ", this.isAppInForeground);
    // console.log("beaconObject " + beaconObject);
    // console.log("this.beacons.length " + this.beacons.length)
    if (this.scannedBeacons.length == 0) {
      beaconObject.name = this.beaconsName[this.beacons.length];
      beaconObject.img = this.beaconsImg[this.beacons.length];

      this.scannedBeacons.push(beaconObject);

    }
    var flag = false;
    this.scannedBeacons.forEach((beaconObj) => {

      if (beaconObj.minor == beaconObject.minor) {
        flag = true;
        // console.log('foreach if flag = true;');
      } else {
        // console.log('else foreach flag = true;');
      }
    });
    if (!flag) {
      beaconObject.name = this.beaconsName[this.beacons.length];
      beaconObject.img = this.beaconsImg[this.beacons.length];
      this.scannedBeacons.push(beaconObject);

      console.log("Beacon pushed ", beaconObject.minor);
      /*this.localNotifications.schedule({
        id: 1,
        title: "modUrn",
        text: "New beacon found!"
      });*/
    }
  }


  ionViewWillLeave() {
    console.log("onPageWillLeave");
    this.beaconProvider.stopRanging();
    clearInterval(this.refreshIntervalId);
    // this.events.subscribe('stopMonitoringForRegion', (data) => {
    //   console.log('::::::stopMonitoringForRegion:::::::');
    // });
  }

  ionViewDidLoad() {
    this.enableBlutooth();
    this.storage.get("userData").then((result) => {
      if (result) {

        // Showing loader
        let loader = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        loader.present();

        try {

          this.commonServices.getData("api/v1/profile/relationDetail", result.token).subscribe(data => {
            //debugger;
            var relType = JSON.parse(data);
            if (relType.success) {
              console.log(relType.success);
            };
            this.storage.set("relationData", relType.data);
            // console.log(relType.data);

            loader.dismiss();
            // this.navCtrl.push(NewLifeStorie2Page, { userType: userType });
          }, error => {
            console.log(error);
            loader.dismiss();
            this.toastCtrl.create(error);
          });
        } catch (e) {
          setTimeout(() => {
            loader.dismiss();
          }, 1000);
        }
      } else {
        console.log("else result");
      }
    });

    // this.fetchRelationship()
  }

  fetchRelationship() {
    //  debugger;
    var params = new FormData();
    this.sharedServices.fetchRelationship(params)
      .then(data => {
        // debugger;
        console.log('life story data =', data);
        this.storage.set("relationData", data);
      }, error => {
        // debugger;
        console.log(error);
      });
  }



  beaconSelected(beacon) {
    this.beaconProvider.stopMonitoring();
    this.navCtrl.setRoot('HomePage', { navData: beacon });

  }

}