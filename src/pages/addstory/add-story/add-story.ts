import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController,Events } from 'ionic-angular';
import { AddCareerAcademicModule } from '../add-career-academic/add-career-academic.module';
import { AddDocumentPageModule } from '../add-document/add-document.module';
import { ExperienceCreatorModule } from '../experience-creator/experience-creator.module';
import { PetExperienceCreatorModule } from '../petexperience-creator/petexperience-creator.module';
import { AddFavoriteCharityModule } from '../add-favorite-charity/add-favorite-charity.module';
import { AddFriendsFamilyModule } from '../add-friends-family/add-friends-family.module';
import { AddHealthJourneyModule } from '../add-health-journey/add-health-journey.module';
import { AddImageModule } from '../add-image/add-image.module';
import { AddInterestPassionModule } from '../add-interest-passion/add-interest-passion.module';
import { AddLinkModule } from '../add-link/add-link.module';
import { Storage } from '@ionic/storage';
import { AddExperienceModule } from '../add-experience/add-experience.module';
import { AddCompetitionsTrainingModule } from '../add-competitions-training/add-competitions-training.module';
import { LifeStoryService } from '../../../providers/WebServices/LifeStory/LifeStoryService';
import { InterestnPassionService } from '../../../providers/WebServices/LifeStory/InterestnPassionService';
import * as Constant from '../../../Utility/Constant';


@IonicPage()
@Component({
  selector: 'page-add-story',
  templateUrl: 'add-story.html',
})
export class AddStoryPage {

  ownerID: any = 0;
  urnType: any = 0;
  roleId: any = 0;
  trainingData: any = {};
  interestData: any = {};
  beaconPaired:any = false;
  careerData: any = {};
  ownerName:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public storage: Storage,
    public interestnPassion: InterestnPassionService,
    public lifeStoryService: LifeStoryService,
    public event: Events
  ) {
    this.beaconPaired = navParams.data.beaconPaired;
    this.ownerID = navParams.data.ownerId;
    this.urnType = navParams.data.urnType;
    this.roleId = navParams.data.roleId;
    console.log("Role:: ",this.roleId);
    this.ownerName = navParams.data.ownerName;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddStoryPage');
    console.log("Urn type: ", this.urnType);
  }

  closeAddStory() {
    this.viewCtrl.dismiss();
    
    this.event.publish(Constant.KEY_NOTIFF.LifeStoryUpdate);
  }

  addExp() {
    // this.storage.get("experience").then((resulst) => {
    //   if (resulst) {
    //     let modal = this.modalCtrl.create("AddExperiencePage", { ownerId: this.ownerID, urnType: this.urnType });
    //     modal.present();
    //   } else {
    //         if(this.urnType == 1)
    //         {
    //         this.navCtrl.push("ExperienceCreatorPage", { ownerId: this.ownerID, urnType: this.urnType });
    //         }
    //         else{
    //           this.navCtrl.push("PetExperienceCreatorPage", { ownerId: this.ownerID, urnType: this.urnType });
    //         }

    //   }
    // });

    // Human
    if(this.urnType == 1){
      this.storage.get("experience").then((resulst) => {

        if (resulst) {
              let modal = this.modalCtrl.create("AddExperiencePage", { ownerId: this.ownerID, urnType: this.urnType });
              modal.present();
            } else{
              this.navCtrl.push("ExperienceCreatorPage", { ownerId: this.ownerID, urnType: this.urnType });
            }

      });
    }

    // Pet
    if(this.urnType == 2){
      this.storage.get("petexperience").then((resulst) => {

        if (resulst) {
              let modal = this.modalCtrl.create("AddExperiencePage", { ownerId: this.ownerID, urnType: this.urnType });
              modal.present();
            } else{
              this.navCtrl.push("PetExperienceCreatorPage", { ownerId: this.ownerID, urnType: this.urnType });
            }

      });
    }
  }
  addCareerAcademics() {
    
    this.storage.get("userData").then((result) => {
      var params = {
        'userId': result.userInfoModel.userId,
        'ownerId': this.ownerID,
        'page': '1',
        'size': '1'
      };
      this.interestnPassion.fetchcareernAcademics(params)
        .then(data => {
          this.careerData = data;
          if (Object.keys(this.careerData.contentList).length > 0) {
            this.careerData = this.careerData.contentList[0];
          } else {
            this.careerData = {};
          }

          let modal = this.modalCtrl.create("AddCareerAcademicPage", { ownerId: this.ownerID, careerData: this.careerData, urnType: this.urnType });
          modal.present();
          
        }, error => {
          console.log(error);
        });
    });

  }
  addInterestPassion(urnType) {
    // this.navCtrl.push(AddInterestPassionPage);

    this.storage.get("userData").then((result) => {
      // this.userId = result.userInfoModel.userId;
      
      var params = {
        'userId': result.userInfoModel.userId,
        'ownerId': this.ownerID,
        'page': '1',
        'size': '1'
      };
      this.interestnPassion.fetchinterestsPassion(params)
        .then(data => {

          // console.log(data);
          this.interestData = data;

          // console.log("ContentList length: ");
          // console.log(Object.keys(this.trainingData.contentList).length);
          if(Object.keys(this.interestData.contentList).length > 0){
            this.interestData = this.interestData.contentList[0];
            console.log(this.interestData);
            let modal = this.modalCtrl.create("AddInterestPassionPage", { ownerId: this.ownerID,interestData: this.interestData, urnType: urnType });
            modal.present();
          
            debugger;
          } else {
            this.interestData = {};
            let modal = this.modalCtrl.create("AddInterestPassionPage", { ownerId: this.ownerID,interestData: this.interestData, urnType: urnType});
            modal.present();
          
            //this.sharedTaskProvider.showToastMessage("No data found.");
          }
          
        }, error => {
          console.log(error);
        });
    });


    // let modal = this.modalCtrl.create("AddInterestPassionPage",  { ownerId: this.ownerID, urnType: urnType });
    // modal.present();
  }
  addHealthJourney() {
    // this.navCtrl.push(AddHealthJourneyPage);
    let modal = this.modalCtrl.create("AddHealthJourneyPage", { ownerId: this.ownerID, urnType: this.urnType, ownerName:  this.ownerName });
    modal.present();
  }
  addFavCharityURL() {
    // this.navCtrl.push(AddFavoriteCharityPage);
    let modal = this.modalCtrl.create("AddFavoriteCharityPage",{ownerId: this.ownerID, urnType: this.urnType});
    modal.present();
  }
 addImages() {
    // this.navCtrl.push(AddImagePage);
    let modal = this.modalCtrl.create("AddImagePage",{ownerId: this.ownerID, urnType: this.urnType});
    modal.present();
  }
  addLink() {
    // this.navCtrl.push(AddLinkPage);
    let modal = this.modalCtrl.create("AddLinkPage",{data:{ownerId: this.ownerID, urnType: this.urnType}});
    modal.present();
  }
  addFriendFamily() {
    // this.navCtrl.push(AddFriendsFamilyPage);
    let modal = this.modalCtrl.create("AddFriendsFamilyPage",{data:{ownerId: this.ownerID, urnType: this.urnType}});
    modal.present();
  }
  addDocument(){
    let modal = this.modalCtrl.create("AddDocumentPage",{ownerId: this.ownerID, urnType: this.urnType});
    modal.present();
  }
  addCompetitionTraining(){

    this.storage.get("userData").then((result) => {
      // this.userId = result.userInfoModel.userId;
      
      var params = {
        'userId': result.userInfoModel.userId,
        'ownerId': this.ownerID,
        'page': '1',
        'size': '1'
      };
      this.interestnPassion.fetchCompetitionTraining(params)
        .then(data => {

          // console.log(data);
          this.trainingData = data;

          // console.log("ContentList length: ");
          // console.log(Object.keys(this.trainingData.contentList).length);
          if(Object.keys(this.trainingData.contentList).length > 0){
            this.trainingData = this.trainingData.contentList[0];
            console.log(this.trainingData);
            let modal = this.modalCtrl.create("AddCompetitionsTrainingPage", { ownerId: this.ownerID,trainingdata: this.trainingData});
            modal.present();
          
            debugger;
          } else {
            this.trainingData = {};
            let modal = this.modalCtrl.create("AddCompetitionsTrainingPage", { ownerId: this.ownerID,trainingdata: this.trainingData});
            modal.present();
          
            //this.sharedTaskProvider.showToastMessage("No data found.");
          }
          
        }, error => {
          console.log(error);
        });
    });

    // let modal = this.modalCtrl.create("AddCompetitionsTrainingPage", { ownerId: this.ownerID,trainingdata: this.trainingData});
  
    
   //modal.present();
  }
}
