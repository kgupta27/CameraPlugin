import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { InterestnPassionService } from '../../../providers/WebServices/LifeStory/InterestnPassionService';
import { SharedTaskProvider } from '../../../providers/SharedTask/sharedtask';


@IonicPage()
@Component({
  selector: 'page-career-academic',
  templateUrl: 'career-academic.html',
})
export class CareerAcademicPage {

  careerData: any = {};
  careerDataObj: any = {};
  isProfile: boolean;
  ownerId: any;
  isDataFound: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public storage: Storage,
    public interestnPassion: InterestnPassionService,
    public modalCtrl: ModalController,
    public sharedTaskProvider: SharedTaskProvider
  ) {
    
    this.isProfile = navParams.data.isProfile;
    this.ownerId = navParams.data.ownerId;
    this.careerData = navParams.data.careerData;

    if (typeof this.careerData === 'undefined'){
      console.log("Undefined catch");
      this.careerData = {};
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCareerAcademicPage');
    // console.log(this.careerData);

    if (this.isProfile) {
      this.careernPassion();
    }
  }

  closeCareerAcademic() {
    if (this.isProfile) {
      this.viewCtrl.dismiss();
    }else{
      this.navCtrl.popToRoot();
    }
  }

  careernPassion() {
    this.storage.get("userData").then((result) => {
      var params =
        {
          userId: result.userInfoModel.userId,
          ownerId: this.ownerId,
          page: '1',
          size: '1'
        }
        
      this.interestnPassion.fetchcareernAcademics(params)
        .then(data => {

          this.careerDataObj = data;
          
          if (Object.keys(this.careerDataObj.contentList).length > 0) {
            this.careerData = this.careerDataObj.contentList[0];
            for(let key in this.careerData){
                if(this.careerData[key]==""){
                  this.careerData[key]=null;
                }
              }
          } else {
            this.isDataFound = true;
            this.careerData = {};
            this.sharedTaskProvider.showToastMessage("No data found.");
          }

        }, error => {
          //debugger;
          console.log(error);
        });
    });
  }
}
