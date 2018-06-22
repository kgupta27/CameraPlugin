import { Component } from '@angular/core';
import { InterestnPassionService } from '../../../providers/WebServices/LifeStory/InterestnPassionService';
import { IonicPage, NavController, NavParams, ViewController, ModalController,ActionSheetController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SharedTaskProvider } from '../../../providers/SharedTask/sharedtask';
import { AddFavoriteCharityModule } from '../add-favorite-charity/add-favorite-charity.module';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ToastServiceProvider } from '../../../providers/toast-service/toast-service';

@IonicPage()
@Component({
  selector: 'page-favorite-charity',
  templateUrl: 'favorite-charity.html',
})
export class FavoriteCharityPage {

  ownerId: any;
  charityData: any = [];
  isCharityData = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public storage: Storage,
    public interestnPassion: InterestnPassionService,
    public modalCtrl: ModalController,
    public sharedTaskProvider: SharedTaskProvider,
     public actionSheetCtrl: ActionSheetController,
     public toastProvider: ToastServiceProvider,
     public inAppBrowser:InAppBrowser
  ) {
    this.ownerId = navParams.data.ownerId;
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoriteCharityPage');
    
    this.getCharityUrl();
  }

  closeFavoriteCharityPage() {
    this.viewCtrl.dismiss();
    //this.navCtrl.popToRoot();
  }

  getCharityUrl() {
    this.storage.get("userData").then((result) => {
      var params = {
        'userId': result.userInfoModel.userId,
        'ownerId': this.ownerId,
        'page': '1',
        'size': '1'
      };
      this.interestnPassion.fetchFavoriteCharity(params)
        .then(data => {
          this.charityData = data;
          console.log(data);
          if(this.charityData){
          }else{
            this.isCharityData = true;
            this.toastProvider.create("No data found.");
            
          }
        }, error => {
          console.log(error);
        });

    });
  }
editCharityUrl(){
  let modal = this.modalCtrl.create("AddFavoriteCharityPage",{data:{ownerId:this.ownerId,charityData:this.charityData}});
  modal.onDidDismiss(data => {
    if(data ==undefined){
      console.log('undefined +++++++++++++++++++ ',data);
              console.log(data);
    }else{
     this.charityData.charityUrl = data.charityUrl;
     console.log('url changed +++++++++++++++++++ ',data);
              console.log(data);
    }
              
             
              // this.healthData[index] = updatedHelth;
            });
    modal.present();
// this.navCtrl.push('AddFavoriteCharityPage', {data:{ownerId:this.ownerId,charityData:this.charityData}});
}
deleteCharityUrl(){
    this.storage.get("userData").then((result) => {
        var params = {
          'userId': result.userInfoModel.userId,
          'ownerId': this.ownerId,
          'page': '1',
          'size': '1'
        };
        this.interestnPassion.deleteFavoriteCharity(params)
          .then(data => {
            this.charityData = data;
            console.log(data);
            debugger
            if(this.charityData){
            }else{
              this.isCharityData = true;
            }
          }, error => {
            console.log(error);
          });

      });
  }
   actionExperience(expId,index) {
    
        let actionSheet = this.actionSheetCtrl.create({
    
          buttons: [
            {
              text: 'Modify',
              handler: () => {
                console.log('Modify... ');
              this.editCharityUrl();
              }
            },
            {
              text: 'Delete',
              role: 'destructive',
              handler: () => {
                console.log('Deleting... ');
                this.deleteCharityUrl();
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
  inAppBrowserOpen(link){ 
    console.log(link);
    try
    {
      const browser = this.inAppBrowser.create(link, '_blank', 'location=yes');
    
    }
    catch(e)
    {
      console.log("Invalid Url");
      this.toastProvider.create("Invalid Url");
    }
  }
}
