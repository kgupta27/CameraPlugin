import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController, ViewController,ModalController } from 'ionic-angular';
// import { SocialSharing } from '@ionic-native/social-sharing';
import { ProfilePopoverComponent } from '../../../components/profile-popover/profile-popover';
import { ActionSheetController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserCommonServices } from '../../../providers/usercommon-services';
import { InterestnPassionService } from '../../../providers/WebServices/LifeStory/InterestnPassionService';
import { LifeStoryService } from '../../../providers/WebServices/LifeStory/LifeStoryService';
import { ToastServiceProvider } from '../../../providers/toast-service/toast-service';
import { ExperienceGallaryPageModule } from '../../lifestory/life-story/LifeStoryTab/experience-gallary/experience-gallary.module';

@IonicPage()
@Component({
  selector: 'experience-details',
  templateUrl: 'experienceDetails.html',
})
export class ExperienceDetailsPage {

  selectedItem: any;
  lifeStatus: any;
  isPending: boolean = false;
  images: string[];
  bgColor: string = '';
  expData: any = [];
  ownerInfo: any;
  isAlbum: boolean = false;
  ownerId:any;
  roleId: any;
  userId:any = 0;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    // private socialSharing: SocialSharing,
    private storage: Storage,
    public viewCtrl: ViewController,
    public lifeStoryService: LifeStoryService,
    public actionSheetCtrl: ActionSheetController,
    public toastProvider: ToastServiceProvider,
    public interestPassionService: InterestnPassionService,
    public modalCtrl: ModalController
  ) {
    // this.roleId = navParams.data.expIdData.roleId;
    // this.selectedItem = navParams.get('item');
    
    
    try {
      this.expData = navParams.get('expIdData');
      // this.lifeStatus == "pending";
      // this.images = ['11.jpg', '22.jpg', '33.jpg', '44.jpg', '55.jpg'];
      this.bgColor = 'assets/img/Group2.png';

      this.ownerInfo = localStorage.getItem("lifeStoryData");
      this.ownerInfo = JSON.parse(this.ownerInfo);
      this.ownerId = this.ownerInfo.ownerId;
      
      this.getExperineceDetails();
    } catch (e) {
      console.log("expereince e = ", e);
    }

    this.storage.get("userData").then((result) => {
      this.userId = result.userInfoModel.userId;
      
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage lifeStatus : ', this.lifeStatus);
    if (this.lifeStatus == "pending") {
      this.isPending = true;
    }

  }

  getExperineceDetails() {
    this.storage.get("userData").then((result) => {
      this.lifeStoryService.fetExperience(this.expData)
        .then(data => {
          this.expData = data;
          this.expData = this.expData.data;
          if (this.expData.experienceGallery.length > 0) {
            // this.bgColor = this.expData.experienceGallery[0].imageMediumUrl500;
            this.isAlbum = true;
          }
        }, error => {
          console.log(error);
        });
    });
  }

  
  actionExpDet() {

    let actionSheet = this.actionSheetCtrl.create({

      buttons: [
        {
          text: 'Modify',
          handler: () => {
            console.log('Modify... ');
            // let navTransition = actionSheet.dismiss();
            // return false;
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            console.log('Deleting... ');
            // let navTransition = actionSheet.dismiss();
            // return false;
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

  experienceStatus(status)
  {
    console.log("Experience Status PUT method.");
    console.log("status== "+status);
    
    this.expData.accept = status;
    this.expData.status = status;
    this.expData.userId = this.userId;
    this.expData.ownerId = this.ownerId;
    
    this.interestPassionService.putExperienceStatus(this.expData)
     .then(data => {
       console.log('life story data =', data);
       let experienceObject: any;
       experienceObject = data;
       if (experienceObject.responseCode == '200') {
        this.viewCtrl.dismiss(data);
        
        let message = experienceObject.data;
        this.toastProvider.create(message);
       }
     }, error => {
       console.log(error);
     });
  }

  closeExperienceDetails() {
      this.viewCtrl.dismiss(); 
  }

  openExperienceGallary(){

    console.log(" this.expData.experienceGallery:: ", this.expData.experienceGallery);
    let galleryModal = this.modalCtrl.create('ExperienceGallaryPage', {
      'imageModel': this.expData.experienceGallery, 'parms': {
        'userid': this.userId,
        'ownerId': this.ownerId,
      }
    });
    galleryModal.present();
  }
}
