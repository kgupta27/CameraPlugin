import { Component } from '@angular/core';
import { NewLifeStorie2Module } from '../new-life-storie2/new-life-storie2.module';
import { PetStoryModule } from '../pet-story/pet-story.module';
import { UserCommonServices } from '../../../../providers/usercommon-services';
import { Storage } from '@ionic/storage';
import { ToastServiceProvider } from '../../../../providers/toast-service/toast-service';
import {
  NavController,
  NavParams,
  Platform,
  LoadingController,
  ViewController,IonicPage
} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-new-life-storie1',
  templateUrl: 'new-life-storie1.html',
})
export class NewLifeStorie1Page {

  progress;
  userName = 'Troy Pearson';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public commonServices: UserCommonServices,
    public toastCtrl: ToastServiceProvider,
  ) {
    this.progress = 25;
  }

  openStoryPage2(userType) {
    localStorage.setItem("createStoryType", "1");
    this.navCtrl.push('NewLifeStorie2Page', { userType: userType });
  }

  ionViewDidLoad() {
    this.storage.get("userData").then((result) => {
      if (result) {
        this.userName = result.userInfoModel.userName;
      } else {
        console.log("else result");
      }
    });
  }

  openPetStory(petType){
    console.log(petType);
    localStorage.setItem("createStoryType", "2");
    this.navCtrl.push('PetStoryPage', { userType: petType });
  }

}
