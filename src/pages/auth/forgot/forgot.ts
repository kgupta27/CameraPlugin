import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthProvider } from '../../../providers/auth/auth';
import { ToastServiceProvider } from '../../../providers/toast-service/toast-service';
// import { AlertServiceProvider } from '../../../providers/alert-service/alert-service';


@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html',
})
export class ForgotPage {

  forgotForm : FormGroup;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private fb: FormBuilder,
    public authService: AuthProvider,
    public toastCtrl: ToastServiceProvider,
    // public alertService: AlertServiceProvider,
    public loadingCtrl: LoadingController
  ) {
    
    let EMAIL_REGEXP = /^[^@]+@([^@\.]+\.)+[^@\.]+$/i;
    this.forgotForm = fb.group({
		  'email' :[null, Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])]
		});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad');
  }

  submitForm(formData: any):void{
		console.log('Form submited!')
		console.log(formData);

    var data={
      email: formData.email,
      fromApp: true
    }
    // Showing loader
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();
    
    this.authService.getAuthenticate(data, "/api/v1/auth/forgotPassword").subscribe(data => {
      var forgotData = JSON.parse(data);
      console.log(forgotData);
      loader.dismiss();
      if(forgotData.responseCode == '200'){
        this.toastCtrl.create(forgotData.message);
      }
    }, error => {
      console.log(error);
      loader.dismiss();
      
      this.toastCtrl.create(error);
    });
	}	
}
