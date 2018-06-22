import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ModalController } from 'ionic-angular';
//import { InterestsPassionsPage } from './../../../../interests-passions/interests-passions.ts';
// '../pages/addstory/interests-passions/interests-passions';
import { InterestsPassionsModule } from '../../../../addstory/interests-passions/interests-passions.module';
import { CompetitionsTrainingPageModule } from '../../../../addstory/competitions-training/competitions-training.module';
import { CareerAcademicModule } from '../../../../addstory/career-academic/career-academic.module';
import { HealthJourneyModule } from '../../../../addstory/health-journey/health-journey.module';
import { FavoriteCharityPageModule } from '../../../../addstory/favorite-charity/favorite-charity.module';
import { DocumentsPageModule } from '../../../../addstory/documents/documents.module';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  ownerID: any = 0;
  urnType: any;
  lifeStoryData: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    public modalCtrl: ModalController
  ) {
    // debugger;
    this.ownerID = navParams.data.ownerId;
    this.urnType = navParams.data.urnType;

    this.lifeStoryData = navParams.data;
    console.log('lifestorydata =', this.lifeStoryData);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThirdPage');
  }

  interestspassion() {
    let modal = this.modalCtrl.create("InterestsPassionsPage", { ownerId: this.ownerID, urnType: this.urnType, isProfile: true });
    modal.present();
  }

  careeracademics() {

    let modal = this.modalCtrl.create("CareerAcademicPage", { ownerId: this.ownerID, isProfile: true });
    modal.present();
  }

  healthJourney() {
    let modal = this.modalCtrl.create("HealthJourneyPage", { ownerId: this.ownerID, isProfile: true, urnType: this.urnType, ownerName: this.lifeStoryData.ownerName });
    modal.present();
    //this.app.getRootNav().push(HealthJourneyPage);
  }

  charityUrl() {
    let modal = this.modalCtrl.create("FavoriteCharityPage", { ownerId: this.ownerID });
    modal.present();
    //this.app.getRootNav().push(AddFavoriteCharityPage);
  }

  petInterests() {
    let modal = this.modalCtrl.create("HealthJourneyPage", { ownerId: this.ownerID, isProfile: true, urnType: this.urnType, ownerName: this.lifeStoryData.ownerName });
    modal.present();
  }


  petTraining() {
    let modal = this.modalCtrl.create("CompetitionsTrainingPage", { storyData: this.lifeStoryData, isProfile: true });
    modal.present();
  }

  document(){
    let modal = this.modalCtrl.create("DocumentsPage", { ownerId: this.ownerID, urnType: this.urnType, isProfile: true });
    modal.present(); 
  }

}



