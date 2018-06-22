import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events, Tabs, ActionSheetController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserCommonServices } from '../../../../../providers/usercommon-services';
import * as Constant from '../../../../../Utility/Constant';
import { AddFriendsFamilyModule } from '../../../../addstory/add-friends-family/add-friends-family.module';
import { InterestnPassionService } from '../../../../../providers/WebServices/LifeStory/InterestnPassionService';

@IonicPage()
@Component({
  selector: 'page-familynfriends',
  templateUrl: 'familynfriends.html',
})
export class FamilynFriendsPage {
  nextPage: any;
  lifeStoryData: any;
  items: any = [];
  userId: any;
  token: any;
  isItems: boolean = false;
  selectedTab: Tabs = null;
  ownerId: any = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public event: Events,
    private interestnPassionService: InterestnPassionService, public commonServices: UserCommonServices, public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController, public modalCtrl: ModalController
  ) {
    this.lifeStoryData = navParams.data;
    console.log('lifestorydata =', this.lifeStoryData);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThirdPage');
    this.initializeItems();
    this.event.subscribe(Constant.KEY_NOTIFF.LifeStoryUpdate, () => {
      debugger;
      //let navdata = this.navParams.data;
      //this.selectedTab = navdata.getSelected().index;
      console.log();
      if (this.navCtrl.parent.getSelected().index == 3) {
        this.nextPage = 0;
        this.initializeItems();


      }
      // if(navdata.getSelected().index == 0)  
      //alert(navdata);
      // do something

    });

  }

  ionViewWillEnter()
  {
    this.initializeItems();
  }

  ionViewWillUnload() {
    this.event.unsubscribe(Constant.KEY_NOTIFF.LifeStoryUpdate);
  }


  initializeItems() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();

    // debugger;

    let ownerData = JSON.parse(localStorage.getItem("lifeStoryData"));

    this.storage.get("userData").then((result) => {
      this.userId = result.userInfoModel.userId;
      console.log("++++++++++++======");
      console.log(ownerData.ownerId);
      this.ownerId = ownerData.ownerId;
      this.token = result.token
      this.commonServices.getFamilyFrnd("api/v1/story/friendFamily", result.token, result.userInfoModel.userId, ownerData.ownerId, 1).subscribe(data => {

        // console.log(data)
        var fulldata = JSON.parse(data);
        this.items = fulldata.data.contentList;

        console.log(fulldata)
        // console.log(this.items.length)
        if (this.items.length > 0) {
          // console.log("false");
          this.isItems = false;
        } else {
          // console.log("true");
          this.isItems = true;
        }
        debugger;

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
      let loader = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.commonServices.getFamilyFrnd("api/v1/story/friendFamily", this.token, this.userId, this.ownerId, this.nextPage).subscribe(data => {
        infiniteScroll.complete();
        // console.log(data)
        var fulldata = JSON.parse(data);
        for (let i = 0; i < fulldata.data.contentList.length; i++) {
          this.items.push(fulldata.data.contentList[i]);
        }
        // console.log(this.items)
        this.nextPage = fulldata.data.nextPage;
        infiniteScroll.complete();

      }, error => {
        console.log(error);
        loader.dismiss();
      });
    } else {
      infiniteScroll.complete();
    }

  }
  actionExperience(data, index) {
    console.log("this.lifeStoryData.roleId: ",this.lifeStoryData.roleId);
    if (this.lifeStoryData.roleId == 1 || this.lifeStoryData.roleId == 2) {
      let actionSheet = this.actionSheetCtrl.create({

        buttons: [
          {
            text: 'Modify',
            handler: () => {
              console.log('Modify... ');
              this.editFamily(data, index);
            }
          },
          {
            text: 'Delete',
            role: 'destructive',
            handler: () => {
              console.log('Deleting... ');
              this.deleteFamily(data, index);
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
    }else{
      console.log("Not permited");
    }
  }
  editFamily(familyData, index) {
    debugger
    let data = {
      familyData: familyData,
      ownerId: this.ownerId,
      userId: this.userId,
      urnType: this.lifeStoryData.urnType,
      isEdit: true
    }
    
    let modal = this.modalCtrl.create("AddFriendsFamilyPage", { data: data });
    modal.present();
    // console.log('data '+data+'  index '+index);

  }
  deleteFamily(data, index) {
    let parms = {
      familyMemberId: data.familyMemeberId,
      ownerId: this.ownerId,
      userId: this.userId,
    }
    this.interestnPassionService.deleteFriendFamily(parms)
      .then(data => {
        console.log(data);
        this.items.splice(index, 1);
        debugger

      }, error => {
        console.log(error);
      });
  }
}