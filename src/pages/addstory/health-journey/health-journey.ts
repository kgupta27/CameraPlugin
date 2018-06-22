import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { ActionSheetController, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Storage } from '@ionic/storage';
import { UserCommonServices } from '../../../providers/usercommon-services';
import { InterestnPassionService } from '../../../providers/WebServices/LifeStory/InterestnPassionService';
import { SharedTaskProvider } from '../../../providers/SharedTask/sharedtask';
import { AlertServiceProvider } from '../../../providers/alert-service/alert-service';


@IonicPage()
@Component({
  selector: 'page-health-journey',
  templateUrl: 'health-journey.html',
})
export class HealthJourneyPage {

  nextPage: any = 0;
  healthForm: FormGroup;
  helthJourney: any[];
  ownerId: any = 0;
  userName = '';
  isDataFound: boolean = false;
  lifeStoryData: any = {};

  //change
  isProfile: boolean;
  healthData: any;
  healthDataObj: any;
  urnType: any = 0;
  ownerName:string;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public actionSheetCtrl: ActionSheetController,
    public alertServiceProvider: AlertServiceProvider,
    public loadingCtrl: LoadingController,
    public commonServices: UserCommonServices,
    public interestnPassion: InterestnPassionService,
    public storage: Storage,
    public sharedTaskProvider: SharedTaskProvider

  ) {
    this.ownerId = navParams.data.ownerId;
    this.isProfile = navParams.data.isProfile;
    this.urnType = navParams.data.urnType;
    this.ownerName = navParams.data.ownerName;

    console.log("isProfile= ", this.isProfile);
    console.log("ownerId= ", this.ownerId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HealthJourneyPage');

    // if (this.isProfile) {
    this.healthJourney();
    // }

    this.lifeStoryData = JSON.parse(localStorage.getItem("lifeStoryData"));
  }



  dismiss() {
    if (this.isProfile) {
      this.viewCtrl.dismiss();
    } else {
      this.navCtrl.popToRoot();
    }
  }

  presentActionSheet(helthData, index) {
    // console.log(id);
    let actionSheet = this.actionSheetCtrl.create({

      buttons: [
        {
          text: 'Modify',
          handler: () => {
            console.log('Modify... ');

            let modal = this.modalCtrl.create("AddHealthJourneyPage", { ownerId: this.ownerId, helthData: helthData, urnType: this.urnType });
            modal.onDidDismiss(data => {
              console.log(data);
              console.log(index);

              if (data === undefined) {
                console.log("Undefinde and return");
                return;
              }

              let updatedHelth =
                {
                  "id": data.healths[0].healthId,
                  "title": data.healths[0].title,
                  "description": data.healths[0].description,
                  "age": data.healths[0].age,
                  "active": this.healthData[index].active
                }
              this.healthData[index] = updatedHelth;
            });
            modal.present();
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            console.log('Deleting... ');
            this.alertServiceProvider.presentLogOutAlert('Are you sure want to delete?').then((yes) => {
              if (yes) {
                console.log("Yes");
                this.deleteHelthJourney(helthData.id, index);
              } else {
                console.log("No");
              }
            });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }


  doInfinite(infiniteScroll) {

    if (this.nextPage > 0) {

      this.storage.get("userData").then((result) => {
        this.userName = result.userInfoModel.userName;
        var params =
          {
            userId: result.userInfoModel.userId,
            ownerId: this.ownerId,
            page: this.nextPage,
            size: '10'
          }
        this.interestnPassion.fetchHealthJourney(params)
          .then(data => {
            infiniteScroll.complete();
            this.healthDataObj = data;
            if (Object.keys(this.healthDataObj.contentList).length > 0) {

              for (let i = 0; i < this.healthDataObj.contentList.length; i++) {
                this.healthData.push(this.healthDataObj.contentList[i]);
              }
              this.nextPage = this.healthDataObj.nextPage;
            } else {
              this.healthData = {};
              this.isDataFound = true;
              this.sharedTaskProvider.showToastMessage("No data found.");
            }
          }, error => {
            infiniteScroll.complete();
            console.log(error);
          });
      });

    } else {
      infiniteScroll.complete();
    }
  }

  healthJourney() {
    this.storage.get("userData").then((result) => {
      this.userName = result.userInfoModel.userName;
      var params =
        {
          userId: result.userInfoModel.userId,
          ownerId: this.ownerId,
          page: '1',
          size: '10'
        }

      console.log("params====== ", params);
      //debugger;
      this.interestnPassion.fetchHealthJourney(params)
        .then(data => {

          this.healthDataObj = data;
          if (Object.keys(this.healthDataObj.contentList).length > 0) {
            this.healthData = this.healthDataObj.contentList;
            this.nextPage = this.healthDataObj.nextPage;


            console.log("\n\nthis.nextPage:");
            console.log(this.nextPage);
          } else {
            this.healthData = {};
            this.isDataFound = true;
            this.sharedTaskProvider.showToastMessage("No data found.");
          }
        }, error => {
          //debugger;
          console.log(error);
        });
    });

  }

  deleteHelthJourney(helthId, index) {
    console.log(helthId);
    this.storage.get("userData").then((result) => {
      this.userName = result.userInfoModel.userName;
      var params =
        {
          userId: result.userInfoModel.userId,
          ownerId: this.ownerId,
          healthId: helthId
        };

      this.interestnPassion.deleteHealthJourney(params)
        .then(data => {
          console.log(data);

          //Remove data from array
          this.healthData.splice(index, 1);
          if (Object.keys(this.healthDataObj.contentList).length > 0) {
          } else {
            this.isDataFound = true;
          }
        }, error => {
          console.log(error);
        });
    });

  }
}
