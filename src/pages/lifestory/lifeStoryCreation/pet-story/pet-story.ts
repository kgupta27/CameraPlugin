import { Component, ViewChild, ElementRef } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams, Platform, IonicPage } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NewPetStorie1Module } from '../new-pet-storie1/new-pet-storie1.module';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastServiceProvider } from '../../../../providers/toast-service/toast-service';
import { WITHOUT_FIRST_REGES_SPECIAL } from '../../../../Utility/Constant';

@IonicPage()
@Component({
  selector: 'page-pet-story',
  templateUrl: 'pet-story.html',
})
export class PetStoryPage {

  lifeStoryForm: FormGroup;
  userType: any;
  error: any;
  userName: string = '';
  userid: any = 0;
  isValid: boolean = false;
  LifeStoryData:any;
  isEdit:boolean=false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastServiceProvider,
    public nav: NavController,
    public platform: Platform,
    public storage: Storage,
    private fb: FormBuilder
  ) {
    this.userType = navParams.data.userType;

    this.lifeStoryForm = fb.group({
      'petName': [null, [Validators.required, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)]],
      'top': [null, [Validators.required, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)]],
      'pedigree': [null, [Validators.required, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)]],
      'breed': [null, [Validators.required, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)]]
    });

    if(typeof navParams.data.data != 'undefined'){
      this.LifeStoryData=navParams.data.data.LifestoryData;
      console.log("    "+this.LifeStoryData);
      this.isEdit=navParams.data.data.isEdit;
      console.log("   "+this.isEdit);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PetStoryPage');

    if(this.isEdit)
    {
     
      this.lifeStoryForm.controls['petName'].setValue(this.LifeStoryData.ownerName);
      this.lifeStoryForm.controls['top'].setValue(this.LifeStoryData.typeOfPet);
      this.lifeStoryForm.controls['pedigree'].setValue(this.LifeStoryData.pedigree);
      this.lifeStoryForm.controls['breed'].setValue(this.LifeStoryData.breed);
    }
    else {
      console.log("No data");
    }
    

  }

  openStoryPage4(storyData) {
    console.log("Heloo pet user type: ", this.userType);
    console.log(storyData);
    this.isValid = true;
    debugger
    if(this.lifeStoryForm.valid)
    {
      this.isValid =false;
      // if (storyData.petName != null && storyData.top != null && storyData.pedigree != null && storyData.breed != null && storyData.petName !== undefined && storyData.top !== undefined && storyData.pedigree !== undefined && storyData.breed !== undefined && storyData.petName != "" && storyData.top != "" && storyData.pedigree != "" && storyData.breed != "") {

      let data = {
        userType: this.userType,
        petName: storyData.petName,
        typeOfPet: storyData.top,
        breed: storyData.breed,
        pedigree: storyData.pedigree
      }
      console.log(this.isEdit);
      if (this.isEdit)
      {
       this.LifeStoryData.ownerName=storyData.petName;
       this.LifeStoryData.typeOfPet=storyData.top;
       this.LifeStoryData.breed=storyData.breed;
       this.LifeStoryData.pedigree = storyData.pedigree;
       this.LifeStoryData.userType = this.userType;

        this.navCtrl.push('NewPetStorie1Page', { data: { LifestoryData: this.LifeStoryData, isEdit: true } });
      }
      else {
        this.navCtrl.push('NewPetStorie1Page', { petStoryData: data });

      }
    // } else {
    //   this.isValid = true;
    //   console.log("False");
    // }
  }
  else{
    console.log("Invalid Form");
  }
}
}
