import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, AlertController, LoadingController, NavController, NavParams, Platform, ModalController } from 'ionic-angular';
import { NewLifeStorie5Module } from '../new-life-storie5/new-life-storie5.module';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastServiceProvider } from '../../../../providers/toast-service/toast-service';
import { RelationshipModule } from '../../../addstory/relationship/relationship.module';
import { WITHOUT_FIRST_REGES_SPECIAL } from '../../../../Utility/Constant';

@IonicPage()
@Component({
  selector: 'page-new-pet-storie1',
  templateUrl: 'new-pet-storie1.html',
})
export class NewPetStorie1Page {

  progress: any;
  rel: string = "y";
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
    private fb: FormBuilder
  ) {
    debugger
    this.storyData = navParams.data.petStoryData;
    this.rel = "y";

    if (typeof navParams.data.data != 'undefined') {
      this.LifeStoryData = navParams.data.data.LifestoryData;
      console.log("    " + this.LifeStoryData);
      this.isEdit = navParams.data.data.isEdit;
      console.log("   " + this.isEdit);
    }

    // console.log(this.storyData);

    let SPACE_REGEXP = "/^[^-\s][a-zA-Z0-9_\s-]+$/";

    this.lifeStoryForm = fb.group({
      'relationship': [null, [Validators.required]],
      // 'wdob': [null, Validators.compose([Validators.required])],
      'wdob': [null],
      // 'wpob': [null, Validators.compose([Validators.required])],
      'wpob': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'rel': [null, [Validators.required]],
      'currentLocation': [null, [Validators.required, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)]],
      'resting': [null, [Validators.required, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)]],
      // 'dop': [null, Validators.compose([Validators.required])]
      'dop': [null]

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPetStorie1Page');
    var today = new Date();
    var dd = ('0' + (today.getDate() - 1)).slice(-2);
    var mm = ('0' + (today.getMonth() + 1)).slice(-2); //January is 0!
    var yyyy = today.getFullYear();
    // console.log(mm);
    this.maxDate = yyyy + '-' + mm + '-' + dd;

    if (this.isEdit) {
      this.relationship = this.LifeStoryData.relationShip;
      this.lifeStoryForm.controls['relationship'].setValue(this.LifeStoryData.relationShip);
      this.lifeStoryForm.controls['wdob'].setValue(this.LifeStoryData.dobISO);
      this.lifeStoryForm.controls['wpob'].setValue(this.LifeStoryData.placeOfBirth);
      // this.lifeStoryForm.controls['rel'].setValue(this.LifeStoryData.alive);
      console.log(this.LifeStoryData.alive);
      if (this.LifeStoryData.alive) {
        this.rel = 'y';
        this.lifeStoryForm.controls['currentLocation'].setValue(this.LifeStoryData.currentLocation);

      }
      else {
        this.rel == 'n';
        this.lifeStoryForm.controls['rel'].setValue(this.LifeStoryData.alive ? 'y' : 'n');
        this.lifeStoryForm.controls['resting'].setValue(this.LifeStoryData.currentLocation);
        this.lifeStoryForm.controls['dop'].setValue(this.LifeStoryData.dodISO);
      }
      // this.lifeStoryForm.controls['currentLocation'].setValue(this.LifeStoryData.currentLocation);
      // this.lifeStoryForm.controls['resting'].setValue(this.LifeStoryData.currentLocation);



    } else {
      console.log("No data");
    }
  }

  openStoryPage5(lifeStoryData) {
    console.log("Heloo page5");
    this.isSubmit = true;
    console.log("++++++++++++++++++++++++++++");
    console.log(lifeStoryData.wdob);


    // for date of birth validation
    if (lifeStoryData.wdob != null) {
      let date2 = new Date(lifeStoryData.wdob);
      lifeStoryData.wdob = date2.getFullYear() + '-' + ('0' + (date2.getMonth() + 1)).slice(-2) + '-' + ('0' + (date2.getDate())).slice(-2);
    }
    if (lifeStoryData.wdob > this.maxDate) {
      this.isValidDate = true;
      console.log("isValidDate: ", this.isValidDate);
      // this.toastCtrl.create('Date of birth is not valid');
      return;
    } else {
      console.log("else");
      this.isValidDate = false;
    }
    if (lifeStoryData.dop != null) {
      let date = new Date(lifeStoryData.dop);
      lifeStoryData.dop = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + (date.getDate())).slice(-2);
      // for date of passing validation
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

    // if (lifeStoryData.relationship != null && lifeStoryData.wpob != null && lifeStoryData.relationship != "" && lifeStoryData.wpob != ""  ) {
    if (lifeStoryData.relationship != null && lifeStoryData.relationship != "") {

      console.log("Selected: :" + this.rel);
      if (this.rel == 'y') {
        console.log("Yes");
        if (lifeStoryData.currentLocation != null && lifeStoryData.currentLocation != "") {
          this.submitLifeStory(lifeStoryData);
        }
      } else {
        console.log("No");
        this.isWdobValidDate = false;

        if (lifeStoryData.dop != null && lifeStoryData.wdob != null) {
          if (lifeStoryData.dop > lifeStoryData.wdob && lifeStoryData.resting != null && lifeStoryData.dop != "" && lifeStoryData.resting != "") {
            this.submitLifeStory(lifeStoryData);
          }
          else {
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
    if (this.lifeStoryForm.controls['wpob'].valid && (this.lifeStoryForm.controls['currentLocation'].valid || this.lifeStoryForm.controls['resting'].valid)) {

      this.isSubmit = false;
      this.storage.get("userData").then((result) => {
        if (result) {
          // console.log(result.userInfoModel);
          this.userid = result.userInfoModel.userId;
          if (this.isEdit) {
            let data = {
              dateofBirth: lifeStoryData.wdob,
              placeofBirth: lifeStoryData.wpob,
              currentLocation: lifeStoryData.currentLocation,
              relationShip: typeof (this.relationship) == 'string' ? this.LifeStoryData.relationShipId : this.relationship,
              ownerId: this.LifeStoryData.ownerId,
              ownerName: this.LifeStoryData.ownerName,
              isAlive: this.isPersionAlive,
              restingPlace: lifeStoryData.resting,
              dateOfPassing: lifeStoryData.dop,
              breed: this.LifeStoryData.breed,
              pedigree: this.LifeStoryData.pedigree,
              typeOfPet: this.LifeStoryData.typeOfPet,
              userType: this.LifeStoryData.urnType,
              urnType: this.LifeStoryData.urnType,
              defaultImage: this.LifeStoryData.defaultImage,
              defaultThumbImage200: this.LifeStoryData.defaultThumbImage200
            }
            this.navCtrl.push("NewLifeStorie5Page", { lifeStoryData: data, isEdit: this.isEdit });
          } else {
            let data = {
              dateofBirth: lifeStoryData.wdob,
              placeofBirth: lifeStoryData.wpob,
              currentLocation: lifeStoryData.currentLocation,
              relationShip: this.relationship,

              ownerId: result.userInfoModel.userId,
              ownerName: this.storyData.petName,
              isAlive: this.isPersionAlive,
              restingPlace: lifeStoryData.resting,
              dateOfPassing: lifeStoryData.dop,
              breed: this.storyData.breed,
              pedigree: this.storyData.pedigree,
              typeOfPet: this.storyData.typeOfPet,
              userType: this.storyData.userType
            }

            console.log(data);
            this.navCtrl.push("NewLifeStorie5Page", { lifeStoryData: data });
          }
        }

      });
    } else {
      console.log("Form is invalid!");
    }
  }


  openRelationship() {
    console.log("Hi openRelationship");
    //RelationshipPage

    let modal = this.modalCtrl.create("RelationshipPage", { relationType: '2' });
    modal.onDidDismiss(data => {
      console.log(data);
      this.relationship = data.relationId;
      this.lifeStoryForm.controls['relationship'].setValue(data.relationshipType);
      this.lifeStoryForm.controls['relationship'].markAsTouched();

    });
    modal.present();
  }
}
