import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ProfilePicturePage } from '../../profile/profile-picture/profile-picture';
import { WITHOUT_FIRST_REGES_SPECIAL,NUMBER_REGES } from '../../../Utility/Constant';

@Component({
  selector: 'basicinfo',
  templateUrl: 'basicinfo.html',
})
export class BasicinfoPage {
  
  signupForm: FormGroup;
  isSubmit: boolean = false;
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, private fb: FormBuilder) {
    let NAME_REGEXP = /^[a-zA-Z0-9._ -]+$/;
    this.signupForm = fb.group({
      'fullname': [null, [Validators.required, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL), Validators.maxLength(30)]],
      'nicename': [null, [Validators.required, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL), Validators.maxLength(30)]]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad');
  }
 

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }
  
  submitForm(value: any): void {
    console.log('Form submited!')
    console.log(value);

    debugger;
    this.isSubmit = true;
    if(value.fullname != null && this.signupForm.valid){
      this.navCtrl.push(ProfilePicturePage, { userBasicInfo: value });
    }
    
    // this.navCtrl.push(ProfilePicturePage, { userBasicInfo: value });
  }

  checkKeyup(key){
    // console.log(key);
  }
}