import { Injectable } from '@angular/core';
import { Toast, ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';


@Injectable()
export class ToastServiceProvider {

  toast: Toast;
  constructor(public toastCtrl: ToastController) { }

  create(message, ok = false, duration = 4000) {
    if (this.toast) {
      this.toast.dismiss();
    }

    this.toast = this.toastCtrl.create({
      message,
      duration: ok ? null : duration,
      position: 'bottom',
      showCloseButton: ok,
      closeButtonText: 'OK',
    });
    this.toast.present();
  }

}


//      cssClass: "message5-box",
