import { Injectable } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { IBeacon } from '@ionic-native/ibeacon';


@Injectable()
export class BeaconProvider {

  delegate: any;
  region: any;

  constructor(public platform: Platform, public events: Events, private ibecon: IBeacon) {
  }


  stopMonitoring(){

    this.ibecon.stopMonitoringForRegion(this.region);
    }
  stopRanging(){
    this.ibecon.stopRangingBeaconsInRegion(this.region);
    
  }

  initialise(mode:any): any {
    let promise = new Promise((resolve, reject) => {
      // we need to be running on a device
      if (this.platform.is('cordova')) {

        // Request permission to use location on iOS
        this.ibecon.requestAlwaysAuthorization();

        // create a new delegate and register it with the native layer
        this.delegate = this.ibecon.Delegate();

        // Subscribe to some of the delegate’s event handlers
        this.delegate.didRangeBeaconsInRegion()
          .subscribe(
          data => {
            // console.log(data);
            // console.log(JSON.stringify(data.beacons));
            this.events.publish('didRangeBeaconsInRegion', data);
          },
          error => console.error()
          );

        this.delegate.didStartMonitoringForRegion()
          .subscribe(
          data => {
            // console.log(data);
            this.events.publish('didStartMonitoringForRegion', data);
          },
          error => console.error()
          );

        // this.delegate.stopMonitoringForRegion()
        //   .subscribe(
        //   data => {
        //     // console.log(data);
        //     // console.log(JSON.stringify(data.beacons));
        //     this.events.publish('stopMonitoringForRegion', data);
        //   },
        //   error => console.error()
        //   );

        this.delegate.didEnterRegion()
          .subscribe(
          data => {
            console.log("*******didEnterRegion********");
            console.log(JSON.stringify(data.beacons));
            this.events.publish('didEnterRegion', data);
          },
          error => console.error()
          );

        // setup a beacon region – CHANGE THIS TO YOUR OWN UUID
        // this.region = this.ibecon.BeaconRegion('deskBeacon', '2F234454-CF6D-4A0F-ADF2-F4911BA9FFA6');
        this.region = this.ibecon.BeaconRegion('deskBeacon', '2f234454-cf6d-4a0f-adf2-f4911ba9ffa6');


        if(mode == 1){
          // start ranging
        this.ibecon.startRangingBeaconsInRegion(this.region)
        .then(
        () => {
          resolve(true);
        },
        error => {
          console.error('Failed to begin monitoring: ', error);
          resolve(false);
        }
        );
        }else{
          //monitoring
        this.ibecon.startMonitoringForRegion(this.region)
        .then(
        () => {
          resolve(true);
        },
        error => {
          console.error('Failed to begin monitoring: ', error);
          resolve(false);
        }
      );

        }

        

        /*
        */

      } else {
        console.error('This application needs to be running on a device');
        resolve(false);
      }





    });

    return promise;
  }


}