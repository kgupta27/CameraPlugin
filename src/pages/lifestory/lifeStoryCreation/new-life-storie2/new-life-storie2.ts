import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { NewLifeStorie4Module } from '../new-life-storie4/new-life-storie4.module';
import { NewLifeStorie3Module } from '../new-life-storie3/new-life-storie3.module';
import { ToastServiceProvider } from '../../../../providers/toast-service/toast-service';

@IonicPage()
@Component({
  selector: 'page-new-life-storie2',
  templateUrl: 'new-life-storie2.html',
})
export class NewLifeStorie2Page {

  userType: any;
  progress: any;
  storyAlreadyAddded: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastProvider: ToastServiceProvider, ) {
    this.userType = navParams.data.userType;
    this.progress = 50;
  }

  ionViewDidLoad() {
    debugger
    console.log('ionViewDidLoad NewLifeStorie2Page');
    let lifeStoryData = JSON.parse(localStorage.getItem('lifeStoryData'));
    console.log("LifestoryData = ", lifeStoryData);
    // console.log(" ", lifeStoryData['relationShip']);
    if (lifeStoryData['relationShip'] == "Self") {
      this.storyAlreadyAddded = true;
    }
  }

  openMyselfStory() {
    if (this.storyAlreadyAddded) {
      this.toastProvider.create("Your life story is already created!");
    }
    else {
      this.navCtrl.push('NewLifeStorie3Page', { userType: this.userType });
    }
  }

  openSomeoneElseStory() {
    this.navCtrl.push('NewLifeStorie4Page', { userType: this.userType });
  }
}
