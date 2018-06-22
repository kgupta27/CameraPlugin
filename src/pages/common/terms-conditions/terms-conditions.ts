import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ToastServiceProvider } from '../../../providers/toast-service/toast-service';
import { AlertServiceProvider } from '../../../providers/alert-service/alert-service';
import { AuthProvider } from '../../../providers/auth/auth';

@Component({
  selector: 'page-terms-conditions',
  templateUrl: 'terms-conditions.html',
})

export class TermsConditionsPage {
  @ViewChild('dataContainer') dataContainer: ElementRef;
  temData:any;
  constructor(
    public authService: AuthProvider,
    public alertService: AlertServiceProvider,
    public toastCtrl: ToastServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsConditionsPage');
    this.temData = this.authService.getApiReqeust("api/v1/auth/terms").subscribe(data => {
          
      // console.log(data._body);
      this.dataContainer.nativeElement.innerHTML  = data._body;
      // this.storage.set("loginStatus", true);
      // this.navCtrl.setRoot(HomePage);
    }, error => {
      this.dataContainer.nativeElement.innerHTML  ="Something went wrong"
      console.log(error);
    });
  }

  closeTermsConditions() {
    this.viewCtrl.dismiss();
    this.temData.unsubscribe();
  }
}