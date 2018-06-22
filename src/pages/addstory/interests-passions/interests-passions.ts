import { Component } from '@angular/core';
import { InterestnPassionService } from '../../../providers/WebServices/LifeStory/InterestnPassionService';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SharedTaskProvider } from '../../../providers/SharedTask/sharedtask';

@IonicPage()
@Component({
  selector: 'page-interests-passions',
  templateUrl: 'interests-passions.html',
})
export class InterestsPassionsPage {
  //change
  // ownerId: any = [];
  ownerId: any;
  urnType: any;
  isProfile: boolean = true;
  interestData: any = {};
  userId: any;
  isDataFound: boolean = false;
  // interestInfo:any={};
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public storage: Storage,
    public interestnPassion: InterestnPassionService,
    public modalCtrl: ModalController,
    public sharedTaskProvider: SharedTaskProvider
  ) {
    // console.log(this.interestData);
    // this.interestData = navParams.data.interestData;
    
    // this.profileData=navParams;
    // console.log("navParams :", navParams);
    this.ownerId = navParams.data.ownerId;
    this.urnType = navParams.data.urnType;
    this.isProfile = navParams.data.isProfile;
    this.interestData =navParams.data.storyData;
    
    if( typeof this.interestData === 'undefined'){
      this.interestData = {};
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InterestsPassionsPage');

    
    if (this.isProfile) {
      this.interestsPassion();
   }
  }

  closeInterestPassion() {
    if (this.isProfile) 
    {
      this.viewCtrl.dismiss();
    }
    else
        this.navCtrl.popToRoot();
  }

  interestsPassion() {

    this.storage.get("userData").then((result) => {

      var params = {
        'userId': result.userInfoModel.userId,
        'ownerId': this.ownerId,
        'page': '1',
        'size': '1'
      };
      
      this.interestnPassion.fetchinterestsPassion(params)
        .then(data => {
          this.interestData = data;

          if(Object.keys(this.interestData.contentList).length > 0){
            this.interestData = this.interestData.contentList[0];
            for(let key in this.interestData){
              if(this.interestData[key]==""){
                this.interestData[key]=null;
              }
            }
          } else {
            this.interestData = {};
            this.isDataFound = true;

            this.sharedTaskProvider.showToastMessage("No data found.");
          }
        }, error => {
          //debugger;
          console.log(error);
        });

    });
  }

}
