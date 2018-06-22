import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, NavParams, App, AlertController, ActionSheetController } from 'ionic-angular';
import { AuthProvider } from '../../../providers/auth/auth';
import { LifeStoryPage } from '../life-story/life-story';
import { ModalController } from 'ionic-angular';
import { SettingsModule } from '../../settings/settings/settings.module';
import { NewLifeStorie1Module } from '../lifeStoryCreation/new-life-storie1/new-life-storie1.module';
import { NewPetStorie1Module } from '../lifeStoryCreation/new-pet-storie1/new-pet-storie1.module';
import { PetStoryModule } from '../lifeStoryCreation/pet-story/pet-story.module';
import { NewLifeStorie3Module } from '../lifeStoryCreation/new-life-storie3/new-life-storie3.module';
import { NewLifeStorie4Module } from '../lifeStoryCreation/new-life-storie4/new-life-storie4.module';
import { SharedServices } from '../../../providers/WebServices/Common/SharedServices';
import { Storage } from '@ionic/storage';
import { UserCommonServices } from '../../../providers/usercommon-services';
import { LifeStoryService } from '../../../providers/WebServices/LifeStory/LifeStoryService';
import { AlertServiceProvider } from '../../../providers/alert-service/alert-service';
import { SharedTaskProvider } from '../../../providers/SharedTask/sharedtask';
import { SearchBeaconPage } from '../../../pages/settings/search-beacon/search-beacon';
import { DomSanitizer } from '@angular/platform-browser'

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  nextPage: any;
  items: any = [];
  userId: any;
  token: any;
  isItems: boolean = false;
  isRefresh: boolean = false;
  errMsg: any = '';
  selectedBeacon: any = null;
  popupMode: boolean = false;
  pageTitle: string = '';
  message: any;
  flag: any = 1;
  html: any;
  constructor(
    public navCtrl: NavController,
    private sanitizer: DomSanitizer,
    public modalCtrl: ModalController,
    public authService: AuthProvider,
    public actionSheetCtrl: ActionSheetController,
    private storage: Storage,
    public commonServices: UserCommonServices,
    public lifeStoryService: LifeStoryService,
    public loadingCtrl: LoadingController,
    public sharedServices: SharedServices,
    public navParams: NavParams,
    public alertService: AlertServiceProvider,
    public sharedTask: SharedTaskProvider,
    public _app: App,
    public alertCtrl: AlertController
  ) {
    
    try {
      this.selectedBeacon = navParams.data.navData;
    } catch (e) {
      this.selectedBeacon = null;
    }

    this.html = sanitizer.bypassSecurityTrustHtml('style="background-image: url(https://picsum.photos/500/500);"');
  }

  ionViewDidLoad() {
    
    // debugger
    // this.initializeItems();

  }
  ionViewWillEnter() {
    this.initializeItems();

    if (this.selectedBeacon) {
      if (this.selectedBeacon.beaconPaired == false) {
        this.renderUItoPopupMode(true);
      } else {
        this.renderUItoPopupMode(false);
      }
    } else {
      this.renderUItoPopupMode(false);
      // this.initializeItems();
    }
  }
  renderUItoPopupMode(flag: Boolean) {
    if (flag) {
      this.popupMode = true;
      this.pageTitle = 'Link your story';
    } else {
      this.popupMode = false;
      this.pageTitle = 'Life stories'
    }
  }


  ionViewWillLeave() {
    // debugger;
    this.selectedBeacon = null;

  }
  getLifeStory() {
    this.isRefresh = false;
    this.initializeItems();
  }

  initializeItems(refresher: any = null) {
    this.items = [];
    this.storage.get("userData").then((result) => {
      this.nextPage = 1;

      var userDataInfo = {
        userid: result.userInfoModel.userId,
        pageNo: 1,
        paired: false
      };

      if (this.selectedBeacon && this.selectedBeacon.beaconPaired == false) {
        userDataInfo.paired = true;
      }


      this.lifeStoryService.getLifeStoryData(userDataInfo)
        .then(result => {
          this.completeRefresher(refresher);
          // console.log(typeof(result));
          var arr = Object.keys(result).map(function (k) { return result[k] });

          if (!refresher && arr.length > 0 && this.selectedBeacon) {
            this.showLifeStoryLinkingPopup(this.selectedBeacon);
          }
         
          this.items = arr[0].contentList;
          console.log(arr[0].contentList);
          if (this.items.length > 0) {
            this.isItems = false;
          } else {
            this.isItems = true;
          }
          this.nextPage = arr[0].nextPage;
        }, error => {
          this.completeRefresher(refresher);


          if (error == "No internet connection.") {
            this.errMsg = "Please check your internet connection and try again";
          } else {
            this.errMsg = "Something went wrong";
          }
          this.isRefresh = true;
          console.log(error);
        });

    });
  }

  modifyLifestory(event, LifestoryData, index) {
    if (this.selectedBeacon) {
      if (LifestoryData.urnType != this.selectedBeacon.urnType) {
        // show relink
        this.alertService.presentReLinkAlert().then((yes) => {

          if (yes) {
            // this.toastCtrl.create('Re-link');
            console.log('Re-link');
          }
        });

      } else {
        if (!this.selectedBeacon.beaconPaired) {
          this.alertService.beaconConfirmationAlertMsg('Are you sure you want to connect to this life story ').then((clicked) => {

            if (clicked == 1) {
              // this.toastCtrl.create('Re-link');
              this.connectBeaconToLifeStory(this.selectedBeacon, LifestoryData);
              this.initializeItems();
            } else if (clicked == 2) {
              // this._app.getRootNav().setRoot(SearchBeaconPage);
              this.navCtrl.setRoot(SearchBeaconPage);

            }
          });
        }


      }
      // if already associated.
      // if(){

      // }

      console.log("Clicking a linked lifestory");

      if (LifestoryData.roleId == 1 ) {
        let actionSheet = this.actionSheetCtrl.create({
  
          buttons: [
            {
              text: 'View',
              handler: () => {
                console.log('View lifestory... ');
                this.lifeTapped(event, LifestoryData);
  
              }
            },
            {
              text: 'Edit',
              handler: () => {
                console.log('Edit lifestory... ');
                this.editLifeStory(LifestoryData, index);
  
              }
            },
            {
              text: 'Delete',
              role: 'destructive',
              handler: () => {
                console.log('Deleting... ');
                this.alertService.presentLogOutAlert('Are you sure want to delete?').then((yes) => {
                  if (yes) {
                    console.log("Yes");
                    console.log("index::" + index);
                    this.deleteLifeStory(LifestoryData.ownerId, index);
                    //  this.deleteLifeStory(Lifestorydata , index);
                    // this.deleteLifeStory(index);
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
      } else if (LifestoryData.roleId == 2 ) {
        let actionSheet = this.actionSheetCtrl.create({
  
          buttons: [
            {
              text: 'View',
              handler: () => {
                console.log('View lifestory... ');
                this.lifeTapped(event, LifestoryData);
  
              }
            },
            {
              text: 'Edit',
              handler: () => {
                console.log('Edit lifestory... ');
                this.editLifeStory(LifestoryData, index);
  
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
      } else {
        let actionSheet = this.actionSheetCtrl.create({
  
          buttons: [
            {
              text: 'View',
              handler: () => {
                console.log('View lifestory... ');
                this.lifeTapped(event, LifestoryData);
  
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
  


    } 

    else
    {



    if (LifestoryData.roleId == 1 ) {
      let actionSheet = this.actionSheetCtrl.create({

        buttons: [
          {
            text: 'View',
            handler: () => {
              console.log('View lifestory... ');
              this.lifeTapped(event, LifestoryData);

            }
          },
          {
            text: 'Edit',
            handler: () => {
              console.log('Edit lifestory... ');
              this.editLifeStory(LifestoryData, index);

            }
          },
          {
            text: 'Delete',
            role: 'destructive',
            handler: () => {
              console.log('Deleting... ');
              this.alertService.presentLogOutAlert('Are you sure want to delete?').then((yes) => {
                if (yes) {
                  console.log("Yes");
                  console.log("index::" + index);
                  this.deleteLifeStory(LifestoryData.ownerId, index);
                  //  this.deleteLifeStory(Lifestorydata , index);
                  // this.deleteLifeStory(index);
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
    } else if (LifestoryData.roleId == 2 ) {
      let actionSheet = this.actionSheetCtrl.create({

        buttons: [
          {
            text: 'View',
            handler: () => {
              console.log('View lifestory... ');
              this.lifeTapped(event, LifestoryData);

            }
          },
          {
            text: 'Edit',
            handler: () => {
              console.log('Edit lifestory... ');
              this.editLifeStory(LifestoryData, index);

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
    } else{
      let actionSheet = this.actionSheetCtrl.create({

        buttons: [
          {
            text: 'View',
            handler: () => {
              console.log('View lifestory... ');
              this.lifeTapped(event, LifestoryData);

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

  }
  }

  editLifeStory(LifestoryData, index) {
    console.log(LifestoryData);
    if (LifestoryData.urnType == 1) {
     localStorage.setItem("createStoryType", "1");
      if (LifestoryData.relationShip == "Self") {
        this.navCtrl.push('NewLifeStorie3Page', {data:{LifestoryData: LifestoryData,isEdit: true}});
      }
      else {
        this.navCtrl.push('NewLifeStorie4Page', {data:{LifestoryData: LifestoryData,isEdit: true}});
      }
    }
    else {
      localStorage.setItem("createStoryType", "2");
      
      // this.navCtrl.push('NewPetStorie1Page', {data:{LifestoryData: LifestoryData,isEdit: true}});
      this.navCtrl.push('PetStoryPage', {data:{LifestoryData: LifestoryData,isEdit: true}});
    }

  }

  deleteLifeStory(LifestoryData, index) {
    console.log(LifestoryData);
    this.storage.get("userData").then((result) => {
      //this.userName = result.userInfoModel.userName;
      var params =
        {
          userId: result.userInfoModel.userId,
          ownerId: LifestoryData

        };

      this.lifeStoryService.deleteLifestory(params)
        .then(data => {
          console.log(data);

          //Remove data from array
          this.items.splice(index, 1);
          localStorage.removeItem('lifeStoryData');

        }, error => {
          console.log(error);
        });
    });
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    if (this.nextPage > 0) {

      this.storage.get("userData").then((result) => {
        var userDataInfo = {
          userid: result.userInfoModel.userId,
          pageNo: this.nextPage,
          paired: false
        };

        if (this.selectedBeacon && this.selectedBeacon.beaconPaired == false) {
          userDataInfo.paired = true;
        }

        this.lifeStoryService.getLifeStoryData(userDataInfo)
          .then(result => {
            infiniteScroll.complete();
            var arr = Object.keys(result).map(function (k) { return result[k] });

            for (let i = 0; i < arr[0].contentList.length; i++) {
              this.items.push(arr[0].contentList[i]);
            }
            this.nextPage = arr[0].nextPage;
          }, error => {
            console.log(error);
          });
      });
    } else {
      infiniteScroll.complete();
    }

  }


  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.nextPage = 1;
    this.initializeItems(refresher);
    //refresher.complete();

  }
  completeRefresher(refresher) {
    if (refresher)
      refresher.complete();
  }

  lifeTapped(event, item) {
    console.log("lifeTapped");
    // if (this.selectedBeacon) {
    //   if (item.urnType != this.selectedBeacon.urnType) {
    //     // show relink
    //     this.alertService.presentReLinkAlert().then((yes) => {

    //       if (yes) {
    //         // this.toastCtrl.create('Re-link');
    //         console.log('Re-link');
    //       }
    //     });

    //   } else {
    //     if (!this.selectedBeacon.beaconPaired) {
    //       this.alertService.beaconConfirmationAlertMsg('Are you sure you want to connect life story to this URN').then((clicked) => {

    //         if (clicked == 1) {
    //           // this.toastCtrl.create('Re-link');
    //           this.connectBeaconToLifeStory(this.selectedBeacon, item);
    //         } else if (clicked == 2) {
    //           this._app.getRootNav().setRoot(SearchBeaconPage);

    //         }
    //       });
    //     }


    //   }
    //   // if already associated.
    //   // if(){

    //   // }
    // } else {
      this.showLifeStoryDetail(item);
    // }
  }

  showLifeStoryLinkingPopup(beacon) {
    if (this.selectedBeacon.beaconPaired == true) {

      this.alertService.newLifeStoryAlert('CONNECT & VIEW LIFE STORY').then((yes) => {

        if (yes) {
          // this.toastCtrl.create('Re-link');
          this.connectToLifeStoryAsViewer(beacon);
        }
      });

    } else {



      // ADD TO THIS Life story 
      this.alertService.newLifeStoryAlert('ADD TO THIS LIFE STORY').then((yes) => {

        if (yes) {
          // this.toastCtrl.create('Re-link');
          if (this.items.length == 0) {
            this.addStories();
            //send to screen no 16
          } else {
            //this.connectBeaconToLifeStory(beacon)
          }
        }
      });
    }
  }

  connectToLifeStoryAsViewer(beaconInfo) {
    var params = {
      "ownerId": beaconInfo.ownerId,
    };
    this.lifeStoryService.connectLifeStoryAsViewer(params)
      .then(result => {
        if (result.responseCode == 200) {
          console.log("Set img1");
          this.newViewerAlert('You have been added as viewer.', beaconInfo.lifeStoryName).then((clicked) => {

            if (clicked == 1) {
              console.log('view life story....');
              this.fetchLifeStoryById(beaconInfo.ownerId);
            }
            if (clicked == 2) {
              this.selectedBeacon = null;
              this.initializeItems();
            }
          });

        }

      }, error => {

        console.log(error);
      });
  }

  connectBeaconToLifeStory(beaconInfo, lifeStory) {
    var params = {

      "beaconId": beaconInfo.beaconId,
      "ownerId": lifeStory.ownerId,

    };
    this.lifeStoryService.connectBeaconToLifeStory(params)
      .then(result => {
        if (result.responseCode == 200) {
          this.sharedTask.showToastMessage(lifeStory.ownerName + 'life story has been mapped successfully');
          // this.showLifeStoryDetail(lifeStory);
          this.selectedBeacon = null;
          this.renderUItoPopupMode(false);
        }
      }, error => {
        console.log(error);
      });
  }


  fetchLifeStoryById(ownerId) {
    console.log("fetchLifeStoryById");
    var params = {
      ownerId: ownerId,
    };
    this.lifeStoryService.fetchLifeStoryById(params)
      .then(result => {
        if (result.responseCode == 200) {
          this.showLifeStoryDetail(result.data);
        }
      }, error => {
        console.log(error);
      });

  }


  showLifeStoryDetail(item) {
    console.log("showLifeStoryDetail");
    localStorage.setItem("lifeStoryData", JSON.stringify(item));
    this.navCtrl.push(LifeStoryPage, {
      lifeData: item,
    });
  }


  gotoSettings() {
    // this.fetchLifeStories();
    let modal = this.modalCtrl.create("SettingsPage");
    modal.present();

  }

  addStories() {
    console.log("addStories");
    var pageToOpen = '';
    var userType = '';

    if (this.selectedBeacon && this.selectedBeacon.beaconPaired == false) {
      if (this.selectedBeacon.urnType == 1) {
        pageToOpen = 'NewLifeStorie2Page';
        localStorage.setItem("createStoryType", "1");
        userType = '1';
      } else {
        pageToOpen = 'PetStoryPage';
        localStorage.setItem("createStoryType", "2");
        userType = '2';
      }
      localStorage.setItem("CreateByBeaconId", this.selectedBeacon.beaconId);
      this.navCtrl.push(pageToOpen, { userType: userType });

    } else {
      if (localStorage.getItem('CreateByBeaconId')) {
        localStorage.removeItem('CreateByBeaconId');
      }
      this.navCtrl.push('NewLifeStorie1Page');
    }
  }

  fetchLifeStories() {
    var params = new FormData();
    this.lifeStoryService.fetLifeStories(params)
      .then(data => {


        console.log('life story data =', data);

      }, error => {
        console.log(error);
      });
  }


  fetchRoles() {


    var params = new FormData();
    this.sharedServices.fetchRoles(params)
      .then(data => {
        console.log('life story data =', data);
      }, error => {

        console.log(error);
      });
  }

  fetchRelationship() {
    var params = new FormData();
    this.sharedServices.fetchRelationship(params)
      .then(data => {
        console.log('life story data =', data);
      }, error => {
        console.log(error);
      });
  }


  newViewerAlert(message: string, name: String): Promise<any> {

    // var bckUrl = this.selectedBeacon.lifeStoryImage200?this.selectedBeacon.lifeStoryImage200:'../assets/img/defaultHuman.png'; 
    var bckUrl = this.selectedBeacon.lifeStoryImage200 ? this.selectedBeacon.lifeStoryImage200 : '../assets/img/defaultHuman.png';

    return new Promise((resolve, reject) => {
      const alert = this.alertCtrl.create(
        {
          subTitle: '<div class="cong-msg"><div class="cong-msg-img"><img src="' + bckUrl + '" /></div> <h1> ' + name + ' Life Story</h1>' + message + '</div>',
          buttons: [
            {
              text: 'VIEW LIFE STORY',
              handler: () => {
                console.log("Clicked VIEW LIFE STORY");
                alert.dismiss().then(() => resolve(1));

              }
            },
            {
              text: 'Skip',
              role: 'cancel',
              cssClass: 'cancelbtn',
              handler: () => {
                console.log("Cancel Clicked");
                alert.dismiss().then(() => resolve(2));
              }
            }
          ],
          enableBackdropDismiss: false,

          cssClass: 'newViewer-alert'
        });
      return alert.present();

      /*var el = document.getElementById("alert-subhdr-1");
      el.style.background = 'url(https://picsum.photos/500/500) no-repeat center center';
      el.style.backgroundSize="50% 50%";*/
    });

  }

}