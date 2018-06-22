import { Component } from '@angular/core';

import {
  NavController,
  NavParams,
  ModalController,
  IonicPage
} from 'ionic-angular';
import { AddExperienceModule } from '../add-experience/add-experience.module';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'pet-page-experience-creator',
  templateUrl: 'petexperience-creator.html',
})
export class PetExperienceCreatorPage {

  user = {
    coverImage: 'assets/img/topBannerpet.jpg'
  };
  ownerId: any = 0;
  urnType: any = 0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public modalCtrl: ModalController
  ) {
    this.ownerId = navParams.data.ownerId;
    this.urnType = navParams.data.urnType;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProfilePage');
  }

  addExperience() {
    // this.navCtrl.pop();
    let modal = this.modalCtrl.create("AddExperiencePage",  { ownerId: this.ownerId, urnType:this.urnType });
    modal.present();
    //this.storage.set("experience", JSON.stringify(true));
  }
}