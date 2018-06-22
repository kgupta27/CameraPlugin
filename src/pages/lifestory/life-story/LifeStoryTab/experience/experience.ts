import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, PopoverController, LoadingController, Events, Tabs, ModalController } from 'ionic-angular';
// import { ExperienceDetailsPage } from '../../../experienceDetails/experienceDetails';
import { Storage } from '@ionic/storage';
import { UserCommonServices } from '../../../../../providers/usercommon-services';
import { ActionSheetController } from 'ionic-angular';
import { LifeStoryService } from '../../../../../providers/WebServices/LifeStory/LifeStoryService';
import * as Constant from '../../../../../Utility/Constant';
import { GalleryModule } from '../gallery/gallery.module';
import { AddExperienceModule } from '../../../../addstory/add-experience/add-experience.module';
import { AlertServiceProvider } from '../../../../../providers/alert-service/alert-service';
// import { AddFavoriteCharityModule } from '../../../../addstory/add-favorite-charity/add-favorite-charity.module';

// import { AddExperienceModule } from 'src/pages/addstory/add-favorite-charity/add-favorite-charity.module'
import { ExperienceGallaryPageModule } from '../experience-gallary/experience-gallary.module';

@IonicPage()
@Component({
  selector: 'page-experience',
  templateUrl: 'experience.html',
})
export class ExperiencePage {
  nextPage: any;
  lifeStoryData: any;
  ownerId: any;
  items: any ;
  userId: any;
  token: any;
  isItems: boolean = false;
  accept: boolean = true;
  selectedTab: Tabs;
  isChangePermission: boolean = false;
  coachMark:boolean = false;
  
  expStatus: string = "livetabs";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    private storage: Storage,
    private popCtrl: PopoverController,
    public commonServices: UserCommonServices,
    public event: Events,
    public lifeStoryService: LifeStoryService,
    public modalCtrl: ModalController,
    public alertService: AlertServiceProvider
  ) {
    this.lifeStoryData = navParams.data;
    this.items = [];
    console.log('lifestorydata =', this.lifeStoryData);
    console.log('lifestorydata =', this.lifeStoryData.urnType);
    this.ownerId = this.lifeStoryData.ownerId;
    // this.storage.set('experienceViewed', false);  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FourthPage');
    this.initializeItems(this.accept);

    this.event.subscribe(Constant.KEY_NOTIFF.LifeStoryUpdate, () => {
      if (this.navCtrl.parent.getSelected().index == 0) {
        this.nextPage = 0;
        this.initializeItems(this.accept);
      }
    });
    this.storage.get("userData").then((result) => {
      this.userId = result.userInfoModel.userId;
    });
    
    if (this.lifeStoryData.roleId == 1 || this.lifeStoryData.roleId == 2) {

      // if(this.lifeStoryData.self)
      this.isChangePermission = true;
    }
  }

  ionViewWillEnter(){
    this.items = [];
    console.log("Items:: ",this.items);
    
    this.initializeItems(this.accept);
    
    this.storage.get("experienceViewed").then((result) => {
      if (result == false || result == 'false' || result == null) {
        this.coachMark = true;
        console.log("Result if: ",result);
        this.storage.set('experienceViewed', true);
      }

      console.log("Result: ",result);
    });

  }

  ionViewWillUnload() {
    this.event.unsubscribe(Constant.KEY_NOTIFF.LifeStoryUpdate);
  }

  initializeItems(accept) {
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();

    debugger;
    if(localStorage.getItem("lifeStoryData")){
      let ownerData = JSON.parse(localStorage.getItem("lifeStoryData"));
      this.ownerId = ownerData.ownerId;
    }
    // let ownerData = JSON.parse(localStorage.getItem("lifeStoryData"));
    // this.ownerId = ownerData.ownerId;

    this.storage.get("userData").then((result) => {
      this.userId = result.userInfoModel.userId
      // console.log("\n\nUserid: ", this.userId);
      this.token = result.token
      this.commonServices.getExperience("api/v1/story/experience", result.token, accept, result.userInfoModel.userId, this.ownerId, 1).subscribe(data => {

        // console.log('getExperience++++++++++++ ', data)
        var fulldata = JSON.parse(data);
        this.items = fulldata.data.contentList;

        console.log(this.items)
        // console.log(this.items.length)
        if (this.items.length > 0) {
          // console.log("false");
          this.isItems = false;
        } else {
          // console.log("true");
          this.isItems = true;
        }
        debugger

        this.nextPage = fulldata.data.nextPage;
        loader.dismiss();
      }, error => {
        console.log(error);
        loader.dismiss();
      })
    });
  }
  doInfinite(infiniteScroll) {
    debugger;
    console.log('Begin async operation');
    if (this.nextPage > 0) {
      // let loader = this.loadingCtrl.create({
      //   content: 'Please wait...'
      // });
      this.commonServices.getExperience("api/v1/story/experience", this.token, this.accept, this.userId, this.ownerId, this.nextPage).subscribe(data => {
        infiniteScroll.complete();
        console.log(data)
        var fulldata = JSON.parse(data);
        for (let i = 0; i < fulldata.data.contentList.length; i++) {
          this.items.push(fulldata.data.contentList[i]);
        }
        // console.log(this.items)
        this.nextPage = fulldata.data.nextPage;
        infiniteScroll.complete();

      }, error => {
        console.log(error);
        // loader.dismiss();
      });
    } else {
      infiniteScroll.complete();
    }

  }
  livePending(active) {
    this.accept = active;
    this.initializeItems(this.accept);
  }

  openLifeStoryDetails(expId, index) {
    debugger;
    console.log("==" + this.lifeStoryData.roleId);
    // this.navCtrl.push(ExperienceDetailsPage);
    let data = {
      'experienceId': expId, 'userId': this.userId, 'ownerId': this.ownerId, 'roleId': this.lifeStoryData.roleId
    }
    // this.app.getRootNav().push(ExperienceDetailsPage, { 'expIdData': data });
    let modal = this.modalCtrl.create('ExperienceDetailsPage', { expIdData: data });
    modal.onDidDismiss(data => {
      console.log(data);
      if (data === undefined) {
        console.log("Undefined and return");
        return;
      } else {
        this.items.splice(index, 1);
      }
      console.log(index);

    });

    modal.present();
  }
  actionExperience(expId, index) {

    let actionSheet = this.actionSheetCtrl.create({

      buttons: [
        {
          text: 'Modify',
          handler: () => {
            console.log('Modify... ');
            this.storage.set("experience", JSON.stringify(true));
            this.editExp(expId, index);
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            console.log('Deleting... ');
            this.deleteExp(expId, index);
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


  checkUpdate() {


  }
  //Like Experience
  likeExp(expId, index) {
    debugger
    this.storage.get("userData").then((result) => {
      this.userId = result.userInfoModel.userId

      let parms = {
        experienceId: expId,
        like: true,
        ownerId: this.ownerId,
        userId: this.userId
      };

      this.lifeStoryService.likeExp(parms)
        .then(data => {
          console.log(data);
          this.items[index].count = this.items[index].count + 1
          this.items[index].selfLike = true;
        }, error => {
          debugger;
          console.log(error);
        });

    });
  }
  //Edit exp  
  editExp(expId, index) {
    let data = {
      expId: expId,
      ownerId: this.ownerId,
      userId: this.userId,
      isExp: true
    }
    debugger;
    let modal = this.modalCtrl.create("AddExperiencePage", { data: data , urnType: this.lifeStoryData.urnType });
    modal.present();
    // this.navCtrl.push('AddFavoriteCharityPage', {data:{ownerId:this.ownerId,charityData:this.charityData}});
  }
  deleteExp(expId, index) {
    let data = {
      "experienceId": expId,
      "ownerId": this.ownerId,
      "userId": this.userId,
    }
    this.lifeStoryService.deleteExp(data)
      .then(data => {
        console.log(data);
        this.items.splice(index, 1);

      }, error => {
        debugger;
        console.log(error);
      });

  }

  dismiss(){
    this.coachMark = false;
    this.storage.set('experienceViewed', true);
  }
}
