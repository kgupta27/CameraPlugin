import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Tabs, App, ActionSheetController, ModalController } from 'ionic-angular';
import * as Constant from '../../../../../Utility/Constant';
import { Storage } from '@ionic/storage';
import { LifeStoryService } from '../../../../../providers/WebServices/LifeStory/LifeStoryService';
import { GalleryModule } from '../gallery/gallery.module';
import { AlertServiceProvider } from '../../../../../providers/alert-service/alert-service';
import { InterestnPassionService } from '../../../../../providers/WebServices/LifeStory/InterestnPassionService';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ToastServiceProvider } from '../../../../../providers/toast-service/toast-service';


@IonicPage()
@Component({
  selector: 'page-media',
  templateUrl: 'media.html',
})
export class MediaPage {
  selectedTab: Tabs;
  ownerID: any = 0;
  mediaData: any = [];
  userId: any;
  userName = '';
  linkModul: any = [];
  role: any = 0;
  album_length: number = 0;
  count: number = 0;
  isAlbum: boolean = false; isLinks: boolean = false; isNoData: boolean = false;
  constructor(
    public app: App,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public navParams: NavParams,
    public event: Events,
    private storage: Storage,
    public interestnPassion: InterestnPassionService,
    public alertServiceProvider: AlertServiceProvider,
    public inAppBrowser: InAppBrowser,
    public toastProvider: ToastServiceProvider,
    public lifeStoryService: LifeStoryService) {
    this.ownerID = navParams.data.ownerId;
    this.role = navParams.data.roleId;
    console.log(navParams.data);
    console.log('lifestorydata =', navParams.data.roleId);
  }

  ionViewDidLoad() {
    this.getMedia();

    this.event.subscribe(Constant.KEY_NOTIFF.LifeStoryUpdate, () => {
      if (this.navCtrl.parent.getSelected().index == 1) {
        console.log("2");
        debugger
        this.getMedia();
      }
    });
    console.log('ionViewDidLoad SecondPage');
  }

  ionViewWillEnter()
  {
    debugger
    this.getMedia();
    console.log("11");
  }

  ionViewWillUnload() {
    this.event.unsubscribe(Constant.KEY_NOTIFF.LifeStoryUpdate);
  }

  getMedia() {
    this.storage.get("userData").then((result) => {
      this.userId = result.userInfoModel.userId;
      let parms = {
        'userid': result.userInfoModel.userId,
        'ownerId': this.ownerID,
      };
      this.lifeStoryService.getMediadata(parms)
        .then(data => {
          console.log(data);
          debugger
          this.mediaData = data;
          this.mediaData = this.mediaData.data;
          this.linkModul = this.mediaData.linkModel;
          console.log("mediaData.imageModel:: ",this.mediaData.imageModel.length);
          this. album_length = this.mediaData.imageCount;
          if(this. album_length > 5){
            this.count = this.album_length - 5;
          }
          

          console.log(" this. album_length", this. album_length);
          console.log(" this. count", this. count);
          if (this.mediaData.imageModel.length > 0) {
            this.isAlbum = true;
          } if (this.mediaData.linkModel.length > 0) {
            this.isLinks = true;
          } if (this.mediaData.imageModel.length == 0 && this.mediaData.linkModel.length == 0) {
            this.isNoData = true;
            this.isAlbum = false;
          }if (this.mediaData.imageModel.length == 0) {
            this.isAlbum = false;
           }
        }, error => {
          console.log(error);
        });
    });
  }
  openMediaGallery(index) {
    let galleryModal = this.modalCtrl.create('GalleryPage', {
      'imageModel': this.mediaData.imageModel, 'parms': {
        'userid': this.userId,
        'ownerId': this.ownerID,
      }
    });
    galleryModal.present();
    // this.app.getRootNav().push('GalleryPage', {
    //   'imageModel': this.mediaData.imageModel, 'parms': {
    //     'userid': this.userId,
    //     'ownerId': this.ownerID,
    //   }
    // });
  }

  presentActionSheet(mediaLink, index) {
    console.log("mediaData:: ", mediaLink);
    console.log("Index:: ", index);
    let actionSheet = this.actionSheetCtrl.create({

      buttons: [
        {
          text: 'Modify',
          handler: () => {
            this.editLink(mediaLink, index);
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
                this.deleteMediaLink(mediaLink.linkId, index);
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



  deleteMediaLink(mediaId, index) {
    console.log(mediaId);
    console.log(index);
    this.storage.get("userData").then((result) => {
      this.userName = result.userInfoModel.userName;
      var params =
        {
          userId: result.userInfoModel.userId,
          ownerId: this.ownerID,
          linkId: mediaId
        };

      this.interestnPassion.deleteMediaLink(params)
        .then(data => {
          console.log(data);
          // this.mediaData.linkModel.splice();
          // //Remove data from array
          console.log("Delete at this index: ", index);
          // console.log("Before delete:", this.mediaData.linkModel);
          this.linkModul.splice(index, 1);
          if (this.mediaData.linkModel.length > 0) {
            this.isLinks = true;
          } else {
            this.isLinks = false;
          }
          // console.log("After delete:", this.mediaData.linkModel);
        }, error => {
          console.log(error);
        });
    });

  }
  editLink(mediaLink, index) {
    console.log('Modify... ');
    this.storage.get("userData").then((result) => {
      let data = {
        ownerId: this.ownerID,
        mediaLink: mediaLink,
        userId: result.userInfoModel.userId,
        isUpdate: true,

      }
      let modal = this.modalCtrl.create("AddLinkPage", { data: data });
      modal.onDidDismiss(data => {
        console.log("Updated Media URL: ", data);
        this.event.publish(Constant.KEY_NOTIFF.TabSelect, Constant.LifeStoryTab.Media);

        if (data === undefined) {
          console.log("Undefined and return");
          return;
        }
        console.log(index);

      });
      modal.present();
    });
  }
  inAppBrowserOpen(link) {
    console.log(link);
    var res1 = link.includes("https://");
    var res2 = link.includes("http://");
    console.log(res1+"::"+res2);

    if(!res1 && !res2)
    {
      link="https://"+link;
    }
    
    try {
      const browser = this.inAppBrowser.create(link, '_blank', 'location=yes');

    }
    catch (e) {
      console.log("Invalid Url");
      this.toastProvider.create("Invalid Url");
    }
  }
}