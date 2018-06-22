import { Component } from '@angular/core';
import { InterestnPassionService } from '../../../providers/WebServices/LifeStory/InterestnPassionService';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SharedTaskProvider } from '../../../providers/SharedTask/sharedtask';

@IonicPage()
@Component({
  selector: 'page-competitions-training',
  templateUrl: 'competitions-training.html',
})
export class CompetitionsTrainingPage {

  ownerId: any;
  isProfile: boolean = true;
  //addTraining:boolean =true;
  isDataFound: boolean = false;
  trainingData: any = {};
  userId: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public storage: Storage,
    public interestnPassion: InterestnPassionService,
    public modalCtrl: ModalController,
    public sharedTaskProvider: SharedTaskProvider
  ) {
    this.ownerId = navParams.data.storyData.ownerId;
    console.log("this.ownerId :", this.ownerId);

    this.isProfile = navParams.data.isProfile;
    console.log("this.isProfile :", this.isProfile);

    console.log("\n\n\nCompetitionsTraining navParams : ");
    console.log(navParams);
    // this.isProfile = navParams.data.isProfile;
    //storyData

    // this.addTraining = navParams.data.addTraining;
    // console.log("this.addTraining :", this.addTraining);

     this.trainingData=navParams.data.storyData;
     console.log(this.trainingData);

    // this.AddCompetitionData=navParams.data.addData;
    // console.log(this.AddCompetitionData);

    if( typeof this.trainingData === 'undefined'){
      this.trainingData = {};
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompetitionsTrainingPage');
    if (this.isProfile) {
      this.CompetitionsTraining();
    }
  }

  closeCompetitionsTraining() {
    if (this.isProfile) 
    {
      this.viewCtrl.dismiss();
    }
    else
        this.navCtrl.popToRoot();
  }

  CompetitionsTraining() {

    this.storage.get("userData").then((result) => {
      // this.userId = result.userInfoModel.userId;
      
      var params = {
        'userId': result.userInfoModel.userId,
        'ownerId': this.ownerId,
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
          } else {
            this.trainingData = {};
            this.isDataFound = true;
            this.sharedTaskProvider.showToastMessage("No data found.");
          }
          
        }, error => {
          console.log(error);
        });
    });
  }

}
