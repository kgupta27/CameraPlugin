import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LifeStoryService } from '../../../providers/WebServices/LifeStory/LifeStoryService';
import { SharedTaskProvider } from '../../../providers/SharedTask/sharedtask';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AlertServiceProvider } from '../../../providers/alert-service/alert-service';

@IonicPage()
@Component({
  selector: 'page-documents',
  templateUrl: 'documents.html',
})
export class DocumentsPage {

  ownerId: any;
  urnType: any;
  isProfile: boolean = true;
  items: any = [];
  errMsg: any = '';
  documentData: any = {};
  isDataFound: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public lifeStoryService: LifeStoryService,
    public sharedTaskProvider: SharedTaskProvider,
    public actionSheetCtrl: ActionSheetController,
    public inAppBrowser: InAppBrowser,
    public alertServiceProvider: AlertServiceProvider, ) {

    this.ownerId = navParams.data.ownerId;
    this.urnType = navParams.data.urnType;
    this.isProfile = navParams.data.isProfile;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DocumentsPage');
    if (this.isProfile) {
      this.document();
    }
  }

  document() {
    this.storage.get("userData").then((result) => {
      console.log("result= ", result.userInfoModel);


      var params = {
        // 'page': '1',
        'ownerId': this.ownerId,
      };
      console.log("params::", params);
      this.lifeStoryService.getPdfList(params)
        .then((result: any) => {
          debugger;
          if (result.data == null) {
            this.isDataFound = true;
            this.sharedTaskProvider.showToastMessage("No data found.");
            return false;
          }
          // data not null
          if (result.data.length > 0) {
            for (let i = 0; i < result.data.length; i++) {
              const element = result.data[i];
              this.items.push(element);
            }
            // var arr = Object.keys(result).map(function (k) { return result[k] });
            //this.items = result.data;
            console.log(this.items);
            // this.items = this.documentData.contentList[0];
          }

        }, error => {

          if (error == "No internet connection.") {
            this.errMsg = "Please check your internet connection and try again";
          } else {
            this.errMsg = "Something went wrong";
          }
          console.log(error);
        });
    });
  }

  dismiss() {
    this.navCtrl.pop();
  }

  presentActionSheet(pdfData, index) {
    console.log("Index:: ", index);
    let actionSheet = this.actionSheetCtrl.create({

      buttons: [
        {
          text: 'View',
          handler: () => {
            this.pdfViewer(pdfData.pdfFile);
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
                this.deletePdf(pdfData.id, index);
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

  pdfViewer(pdfLink) {
    let newFileURL = "http://docs.google.com/gview?url=" + pdfLink + "&embedded=true";

    try {
      this.inAppBrowser.create(newFileURL, '_blank', 'location=yes');

    }
    catch (e) {
      console.log("Invalid Url");
      // this.toastProvider.create("Invalid Url");
    }
  }

  deletePdf(pdfId, index) {
    this.storage.get("userData").then((result) => {
      console.log("result= ", result.userInfoModel);


      var params = {
        'pdfId': pdfId,
        'ownerId': this.ownerId,
      };
      console.log("params::", params);
      this.lifeStoryService.deletePdfFile(params)
        .then(result => {
          console.log("Success!");
          this.items.splice(index, 1);
          if (this.items.length > 0) {
            console.log("Array is not empty");
          } else {
            console.log("Array is empty");
            this.isDataFound = true;
          }
        }, error => {

          if (error == "No internet connection.") {
            this.errMsg = "Please check your internet connection and try again";
          } else {
            this.errMsg = "Something went wrong";
          }
          console.log(error);
        });
    });
  }
}
