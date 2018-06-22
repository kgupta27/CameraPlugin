import { Component, ViewChild, ElementRef } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams, Platform, ModalController, IonicPage } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NewLifeStorie5Module } from '../new-life-storie5/new-life-storie5.module';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastServiceProvider } from '../../../../providers/toast-service/toast-service';
import { RelationshipModule } from '../../../addstory/relationship/relationship.module';
import { WITHOUT_FIRST_REGES_SPECIAL } from '../../../../Utility/Constant';

declare var google: any;
@IonicPage()
@Component({
  selector: 'page-new-life-storie4',
  templateUrl: 'new-life-storie4.html',
})
export class NewLifeStorie4Page {
  progress: any;
  rel: string = "y";
  loading: any;
  isSubmit: boolean = false;
  storyData: any;
  userid: any = 0;
  lifeStoryForm: FormGroup;
  userType: any;
  isPersionAlive: boolean = false;
  isValidDate: boolean = false;
  isWdobValidDate: boolean = false;
  error: any;
  relationship: any;
  maxDate: any;
  dob: any;
  LifeStoryData: any;
  isEdit: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastServiceProvider,
    public loadingCtrl: LoadingController,
    public nav: NavController,
    public platform: Platform,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public storage: Storage,
    public geolocation: Geolocation,
    private fb: FormBuilder
  ) {
    this.storyData = navParams.data.userType;
    this.progress = 75;
    this.rel = "y";
    debugger
    if (typeof navParams.data.data != 'undefined') {
      this.LifeStoryData = navParams.data.data.LifestoryData;
      console.log("    " + this.LifeStoryData);
      this.isEdit = navParams.data.data.isEdit;
      console.log("   " + this.isEdit);
    }

    this.lifeStoryForm = fb.group({
      'owner': [null, [Validators.required, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)]],
      'relationship': [null, Validators.compose([Validators.required])],
      // 'wdob': [null, Validators.compose([Validators.required])],
      'wdob': [null],
      'wpob': [null, [Validators.required, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)]],
      'rel': [null, Validators.required],
      'currentLocation': [null, [Validators.required, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)]],
      'resting': [null, [Validators.required]],
      // 'dop': [null, Validators.compose([Validators.required])],
      'dop': [null],

      'causeofdeath': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewLifeStorie4Page');
    var today = new Date();
    var dd = ('0' + (today.getDate() - 1)).slice(-2);
    var mm = ('0' + (today.getMonth() + 1)).slice(-2); //January is 0!
    var yyyy = today.getFullYear();
    console.log(mm);
    this.maxDate = yyyy + '-' + mm + '-' + dd;

    if (this.isEdit) {
      this.relationship = this.LifeStoryData.relationShip;
      this.lifeStoryForm.controls['owner'].setValue(this.LifeStoryData.ownerName);
      this.lifeStoryForm.controls['relationship'].setValue(this.LifeStoryData.relationShip);
      this.lifeStoryForm.controls['wdob'].setValue(this.LifeStoryData.dobISO);
      this.lifeStoryForm.controls['wpob'].setValue(this.LifeStoryData.placeOfBirth);
      // this.lifeStoryForm.controls['rel'].setValue(this.LifeStoryData.alive);
      if (this.LifeStoryData.alive) {
        this.rel = 'y';
        this.lifeStoryForm.controls['currentLocation'].setValue(this.LifeStoryData.currentLocation);

      }
      else {
        this.rel == 'n';
        this.lifeStoryForm.controls['rel'].setValue(this.LifeStoryData.alive ? 'y' : 'n');
        this.lifeStoryForm.controls['resting'].setValue(this.LifeStoryData.currentLocation);
        this.lifeStoryForm.controls['dop'].setValue(this.LifeStoryData.dodISO);
        this.lifeStoryForm.controls['causeofdeath'].setValue(this.LifeStoryData.causeOfDeath);
      }
    } else {
      console.log("No data");
    }
  }

  openStoryPage5(lifeStoryData) {
    debugger
    console.log("Heloo page5");
    this.isSubmit = true;

    if (this.checkFirstSpace(lifeStoryData.currentLocation)) {
      // console.log('vikas is true');
    } else {
      // console.log('vikas is false');
    }
    if (this.isEdit || this.rel != lifeStoryData.rel) {
      if (lifeStoryData.wdob != null) {
        let date = new Date(lifeStoryData.wdob);
        lifeStoryData.wdob = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + (date.getDate())).slice(-2);
      }
    }
    // for date of birth validation
    if (lifeStoryData.wdob > this.maxDate) {
      this.isValidDate = true;
      console.log("isValidDate: ", this.isValidDate);
      // this.toastCtrl.create('Date of birth is not valid');
      return;
    } else {
      console.log("else");
      this.isValidDate = false;
    }
    if (this.rel == 'y' && lifeStoryData.dop != null) {
      lifeStoryData.dop = null;
    }
    if (this.isEdit && this.rel == 'n' && lifeStoryData.dop != null) {
      // for date of passing validation
      let date2 = new Date(lifeStoryData.dop);
      lifeStoryData.dop = date2.getFullYear() + '-' + ('0' + (date2.getMonth() + 1)).slice(-2) + '-' + ('0' + (date2.getDate())).slice(-2);
    }
    if (lifeStoryData.dop > this.maxDate) {
      this.isWdobValidDate = true;
      console.log("isValidDate: ", this.isValidDate);
      // this.toastCtrl.create('Date of birth is not valid');
      return;
    } else {
      console.log("else");
      this.isWdobValidDate = false;
    }

    console.log("this.rel == 'y'+++++++++++++++++++++++ " + this.rel);
    console.log("+++++++++++++++++++++++++++++ " + this.isWdobValidDate)
    console.log(lifeStoryData);
    if (lifeStoryData.owner != null && lifeStoryData.relationship != null && lifeStoryData.wpob != null && lifeStoryData.owner != "" && lifeStoryData.relationship != "" && lifeStoryData.wpob != "") {

      console.log("Selected: :" + this.rel);
      if (this.rel == 'y') {
        console.log("Yes");
        if (lifeStoryData.currentLocation != null && lifeStoryData.currentLocation != "") {
          this.submitLifeStory(lifeStoryData);
        }
      } else {
        // console.log("No");
        // console.log("checking::::"+this.isValidDate)
        // if (lifeStoryData.dop != null && lifeStoryData.resting != null && lifeStoryData.dop != "" && lifeStoryData.resting != "") {
        //             this.submitLifeStory(lifeStoryData);
        // }
        this.isWdobValidDate = false;
        if (lifeStoryData.dop != null && lifeStoryData.wdob != null) {
          if (lifeStoryData.dop != null && lifeStoryData.resting != null && lifeStoryData.dop > lifeStoryData.wdob && lifeStoryData.resting != "" && this.isWdobValidDate == false) {
            this.submitLifeStory(lifeStoryData);
          } else {
            console.log("dop is not valid");
            this.isWdobValidDate = true;
          }
        }
        if (lifeStoryData.dop == null && lifeStoryData.wdob == null) {
          this.submitLifeStory(lifeStoryData);
        } else if (lifeStoryData.dop != null && lifeStoryData.wdob == null) {
          this.submitLifeStory(lifeStoryData);
        } else if (lifeStoryData.dop == null && lifeStoryData.wdob != null) {
          this.submitLifeStory(lifeStoryData);
        }
      }



    } else {
      console.log("Not valid");
    }

    if (lifeStoryData.rel == 'n') {
      this.isPersionAlive = false;
    } else {
      this.isPersionAlive = true;
    }
  }

  submitLifeStory(lifeStoryData) {
    debugger
    if (this.lifeStoryForm.controls['owner'].valid && this.lifeStoryForm.controls['wpob'].valid && (this.lifeStoryForm.controls['currentLocation'].valid || this.lifeStoryForm.controls['resting'].valid) && this.lifeStoryForm.controls['causeofdeath'].valid ) {
      this.isSubmit = false;

      this.storage.get("userData").then((result) => {
        if (result) {
          console.log(result.userInfoModel);
          this.userid = result.userInfoModel.userId;

          // relationShipId
          var data = {};
          if (this.isEdit) {
            data = {
              userType: this.storyData,
              urnType: this.LifeStoryData.urnType,
              dateofBirth: lifeStoryData.wdob,
              placeofBirth: lifeStoryData.wpob,
              currentLocation: lifeStoryData.currentLocation,
              relationShip: typeof (this.relationship) == 'string' ? this.LifeStoryData.relationShipId : this.relationship,
              ownerId: this.LifeStoryData.ownerId,
              ownerName: lifeStoryData.owner,
              causeOfDeath: lifeStoryData.causeofdeath,
              // relationShip: lifeStoryData.relationship,
              isAlive: this.isPersionAlive,
              restingPlace: lifeStoryData.resting,
              dateOfPassing: lifeStoryData.dop,
              defaultImage: this.LifeStoryData.defaultImage,
              defaultThumbImage200: this.LifeStoryData.defaultThumbImage200,

            }
          } else {
            data = {
              userType: this.storyData,
              urnType: this.storyData,
              dateofBirth: lifeStoryData.wdob,
              placeofBirth: lifeStoryData.wpob,
              currentLocation: lifeStoryData.currentLocation,
              relationShip: this.relationship,
              causeOfDeath: lifeStoryData.causeofdeath,

              ownerId: '',
              ownerName: lifeStoryData.owner,
              // relationShip: lifeStoryData.relationship,
              isAlive: this.isPersionAlive,
              restingPlace: lifeStoryData.resting,
              dateOfPassing: lifeStoryData.dop
            }
          }
          console.log(data);
          if (this.isEdit) {
            this.navCtrl.push('NewLifeStorie5Page', { lifeStoryData: data, isEdit: true });
          } else {
            this.navCtrl.push('NewLifeStorie5Page', { lifeStoryData: data });
          }

        }

      });
    } else {
      console.log("Invalid Form");
    }
  }

  checkFirstSpace(str?) {
    if (str) {
      str = str.trimLeft();
      if (str.length == 0) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }



  openRelationship() {
    console.log("Hi openRelationship");
    //RelationshipPage

    let modal = this.modalCtrl.create("RelationshipPage", { relationType: '1' });
    modal.onDidDismiss(data => {
      console.log(data);
      this.relationship = data.relationId;
      this.lifeStoryForm.controls['relationship'].setValue(data.relationshipType);
      this.lifeStoryForm.controls['relationship'].markAsTouched();

    });
    modal.present();
  }
}
