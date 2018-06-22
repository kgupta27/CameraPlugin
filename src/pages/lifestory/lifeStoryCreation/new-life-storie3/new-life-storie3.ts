import { Component, ViewChild, ElementRef } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams, Platform, IonicPage } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NewLifeStorie5Module } from '../new-life-storie5/new-life-storie5.module';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastServiceProvider } from '../../../../providers/toast-service/toast-service';
import { WITHOUT_FIRST_REGES_SPECIAL } from '../../../../Utility/Constant';

declare var google: any;
@IonicPage()
@Component({
  selector: 'page-new-life-storie3',
  templateUrl: 'new-life-storie3.html',
})
export class NewLifeStorie3Page {
  lifeStoryForm: FormGroup;
  loading: any;
  userType: any;
  maxDate: any;
  search: boolean = false;
  error: any;
  isValid: boolean = false;
  isValidDate: boolean = false;
  userName: string = '';
  userid: any = 0;
  LifeStoryData: any;
  isEdit: boolean = false;

  progress: any;
  dob: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastServiceProvider,
    public nav: NavController,
    public platform: Platform,
    public alertCtrl: AlertController,
    public storage: Storage,
    public geolocation: Geolocation,
    private fb: FormBuilder
  ) {
    this.progress = 75;
    this.userType = navParams.data.userType;
    console.log(navParams.data);
    debugger;
    if (typeof navParams.data.data != 'undefined') {
      this.LifeStoryData = navParams.data.data.LifestoryData;
      console.log("    " + this.LifeStoryData);
      this.isEdit = navParams.data.data.isEdit;
      console.log("   " + this.isEdit);
    }



    this.lifeStoryForm = fb.group({
      // 'dob': [null, Validators.compose([Validators.required])], 
      'dob': [null],
      // 'pob': [null, Validators.compose([Validators.required])],
      'pob': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'currLoc': [null, [Validators.required, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)]],
    });
    debugger;
    // if (typeof this.LifeStoryData === 'undefined'){
    //   this.LifeStoryData = {};
    // }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyMapPage');
    // this.searchbar.nativeElement.placeholder = '';
    var today = new Date();
    var dd = ('0' + (today.getDate() - 1)).slice(-2);
    var mm = ('0' + (today.getMonth() + 1)).slice(-2); //January is 0!
    var yyyy = today.getFullYear();
    console.log(mm);
    this.maxDate = yyyy + '-' + mm + '-' + dd;


    if (this.isEdit) {
      console.log(this.LifeStoryData.dob);
      this.lifeStoryForm.controls['dob'].setValue(this.LifeStoryData.dobISO);
      this.lifeStoryForm.controls['pob'].setValue(this.LifeStoryData.placeOfBirth);
      this.lifeStoryForm.controls['currLoc'].setValue(this.LifeStoryData.currentLocation);
    } else {
      console.log("No data");
    }

  }


  openStoryPage5(storyData) {
    debugger
    console.log("Heloo page4");
    // console.log(storyData);
    this.isValid = true;
    if (storyData.dob) {
      let date = new Date(storyData.dob);
      storyData.dob = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + (date.getDate())).slice(-2);
    }

    if (storyData.dob > this.maxDate) {
      this.isValidDate = true;
      console.log("isValidDate: ", this.isValidDate);
      // this.toastCtrl.create('Date of birth is not valid');
      return;
    } else {
      this.isValidDate = false;
    }

    // if (storyData.dob != null && storyData.pob != null && storyData.currLoc != null && storyData.dob != "" && storyData.pob != "" && storyData.currLoc != "") {

    // if ( storyData.currLoc != null && storyData.currLoc != "") {
    if (this.lifeStoryForm.controls['currLoc'].valid && this.lifeStoryForm.controls['pob'].valid) {
      console.log("this.lifeStoryForm.valid::", this.lifeStoryForm);
      this.isValid = false;
      console.log("True dateofBirth:" + storyData.dob +
        " placeofBirth:" + storyData.pob +
        " currentLocation:" + storyData.currLoc);

      this.storage.get("userData").then((result) => {
        if (result) {
          console.log(result.userInfoModel);
          this.userid = result.userInfoModel.userId;
          this.userName = result.userInfoModel.userName;
          var data = {};
          if (this.isEdit) {
            data = {
              isAlive: true,
              userType: this.userType,
              urnType: this.LifeStoryData.urnType,
              ownerName: this.userName,
              ownerId: this.LifeStoryData.ownerId,
              relationShip: 1,
              dateofBirth: storyData.dob,
              placeofBirth: storyData.pob,
              currentLocation: storyData.currLoc,
              defaultImage: this.LifeStoryData.defaultImage,
              defaultThumbImage200: this.LifeStoryData.defaultThumbImage200
            }
          } else {
            data = {
              isAlive: true,
              userType: this.userType,
              // urnType:this.LifeStoryData.urnType,
              ownerName: this.userName,
              ownerId: '',
              relationShip: 1,
              dateofBirth: storyData.dob,
              placeofBirth: storyData.pob,
              currentLocation: storyData.currLoc,
              // defaultThumbImage200:this.LifeStoryData.defaultThumbImage200
            }
          }
          // console.log(data);
          this.navCtrl.push('NewLifeStorie5Page', { lifeStoryData: data, isEdit: this.isEdit });
        } else {
          console.log("Not logged in");
        }
      });
    } else {
      console.log("False");
    }
  }
}
