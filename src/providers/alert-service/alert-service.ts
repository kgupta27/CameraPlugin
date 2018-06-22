import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class AlertServiceProvider {

  isPetFlow: any = "";
  constructor(public alertCtrl: AlertController) { }

  //change

  presentReLinkAlert(): Promise<boolean>
  {
    return new Promise((resolve, reject) => {
    const alert = this.alertCtrl.create(
      {
        subTitle: 'Sorry. It looks like you are linking a human life story with a pet life story',
        buttons: [
          {
            text: 'RE-LINK',
            handler: () => {
              console.log("Clicked Re-link");
              alert.dismiss().then(() => resolve(true));
              return false;
            }
          }
        ],
        enableBackdropDismiss: false ,
        
        cssClass: 'relink-alert'
      });
    
    return alert.present();
    });
  }
  
  newLifeStoryAlert(message: string): Promise<boolean>
  {
    return new Promise((resolve, reject) => {
    const alert = this.alertCtrl.create(
      {
        title: 'A new life story has been found!',
        subTitle: 'The app has detected a life story near you',
        buttons: [
          {
            text: message,
            handler: () => {
              console.log("Clicked");
              alert.dismiss().then(() => resolve(true));
              return false;
            }
          }
          // {
          //   text: 'ADD TO THIS Life story',
          //   handler: () => {
          //     console.log("Clicked ADD TO THIS Life story");
          //   }
          // }
        ],
        enableBackdropDismiss: false ,
        cssClass: 'newlifestory-alert'
      });

    return alert.present();
    });
  }

  newViewerAlert( message: string,name:String): Promise<any>
  {
    return new Promise((resolve, reject) => {
    const alert =this.alertCtrl.create(
      {
        subTitle: '<p class="cong-msg"><h1> '+ name +' Life Story</h1>'+message+'</p>',
        buttons: [
          { 
            text: 'VIEW LIFE STORY',
            handler: () => {
              console.log("Clicked VIEW LIFE STORY");
              alert.dismiss().then(() => resolve(1));
              
            }
          },
          { 
            text: 'Skip',
            role: 'cancel',
            cssClass:'cancelbtn',
            handler: () => {
              console.log("Cancel Clicked");
              alert.dismiss().then(() => resolve(2));
            }
          }
        ],
        enableBackdropDismiss: false ,
        
        cssClass: 'newViewer-alert'
      });

      return alert.present();
    });

  }

  presentAlert(title: string, message: string) {
    const alert = this.alertCtrl.create(
      {
        title,
        subTitle: message,
        buttons: [
          {
            text: 'OK'
          }
        ]
      });

    return alert.present();
  }

  presentErrorAlert(message: string) {
    return this.presentAlert('An error has occurred.', message);
  }

  // presentCongratsAlert(message: string) {
  //   return this.presentAlert('Congratulations!', message);
  // }
  presentCongratsAlert(message: string) {
    debugger;
    return new Promise((resolve, reject) => {
    if (localStorage.getItem("createStoryType") == "1") {
      this.isPetFlow = 'no';
    } else {
      this.isPetFlow = 'pet-follow';
    }
    const alert = this.alertCtrl.create(
      {
        subTitle: '<p class="cong-msg ' + this.isPetFlow + ' "></p><h1>Congratulations!</h1>' + message,
        buttons: [
          {
            text: 'O.K.',
            handler: () => {
              alert.dismiss().then(() => resolve(true));
              return true;
            }
          }
        ],
        cssClass: 'my-alert'
      });
    return alert.present();
    });
  }

  presentAlertWithCallback(title: string, message: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const confirm = this.alertCtrl.create({
        title,
        message,
        buttons: [{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            confirm.dismiss().then(() => resolve(false));
            return false;
          }
        }, {
          text: 'Yes',
          handler: () => {
            confirm.dismiss().then(() => resolve(true));
            return false;
          }
        }]
      });

      return confirm.present();
    });
  }



  //logout
  presentLogOutAlert(message: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const confirm = this.alertCtrl.create({
        message,
        buttons: [{
          text: 'Yes',
          handler: () => {
            confirm.dismiss().then(() => resolve(true));
            return false;
          }
        },
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            confirm.dismiss().then(() => resolve(false));
            return false;
          }
        }],
        cssClass: 'LogOut-Alert'
      });

      return confirm.present();
    });
  }


  confirmPasswordCallback(): Promise<string> {
    return new Promise((resolve, reject) => {
      let alert = this.alertCtrl.create({
        title: 'Confirm Password',
        message: 'Please confirm your password to save your new email.',
        inputs: [
          {
            type: 'password',
            name: 'currpassword',
            placeholder: 'Current password'
          }
        ],
        buttons: [
          {
            text: 'SAVE',
            handler: data => {
              console.log(data.currpassword);
              return data.currpassword;
            }
          }
        ]
      });
      return alert.present();
    });
  }


  presentBluetoothWithCallback(title: string, message: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const confirm = this.alertCtrl.create({
        title,
        message,
        buttons: [{
          text: 'Don\'t Allow',
          role: 'cancel',
          handler: () => {
            confirm.dismiss().then(() => resolve(false));
            return false;
          }
        }, {
          text: 'OK',
          handler: () => {
            confirm.dismiss().then(() => resolve(true));
            return false;
          }
        }]
      });
      return confirm.present();
    });
  }

  
  beaconConfirmationAlertMsg(msg): Promise<any>
  {
    return new Promise((resolve, reject) => {
    const alert = this.alertCtrl.create(
      {
        title: msg,
        buttons: [{
          text: 'Yes',
          handler: () => {
            alert.dismiss().then(() => resolve(1));
            return false;
          }
        }, {
          text: 'Cancel',
          handler: () => {
            alert.dismiss().then(() => resolve(2));
            return false;
          }
        }],

        enableBackdropDismiss: false ,
        cssClass: 'beaconConfirmation-Alert'
      });

    return alert.present();
    });
  }

  beaconConfirmationAlert(): Promise<any>
  {
    return new Promise((resolve, reject) => {
    const alert = this.alertCtrl.create(
      {
        title: 'Are you sure you want to connect life story to this URN',
        buttons: [{
          text: 'Yes',
          handler: () => {
            alert.dismiss().then(() => resolve(1));
            return false;
          }
        }, {
          text: 'Cancel',
          handler: () => {
            alert.dismiss().then(() => resolve(2));
            return false;
          }
        }],

        enableBackdropDismiss: false ,
        cssClass: 'beaconConfirmation-Alert'
      });

    return alert.present();
    });
  }

  lifestoryViewerConfirmationAlert(): Promise<any>
  {
    return new Promise((resolve, reject) => {
    const alert = this.alertCtrl.create(
      {
        title: 'Are you sure , You want to be the viewer of this life story?',
        buttons: [{
          text: 'Yes',
          handler: () => {
            alert.dismiss().then(() => resolve(1));
            return false;
          }
        }, {
          text: 'No',
          handler: () => {
            alert.dismiss().then(() => resolve(2));
            return false;
          }
        }],
        enableBackdropDismiss: false ,
      });

    return alert.present();
    });
  }

  experienceCoachmark(message : string){
    const alert = this.alertCtrl.create(
      {
        subTitle: '<div class="arrow-up"></div><p class="cong-msg ' + this.isPetFlow + ' "></p>' + message,
        buttons: [
          {
            text: 'GOT IT'
          }
        ],
        cssClass: 'my-coachmark'
      });
    return alert.present();
  }

}
