import { Component, ViewChild } from '@angular/core';
import { IonicPage,Slides, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-experience-gallary',
  templateUrl: 'experience-gallary.html',
})
export class ExperienceGallaryPage {

  @ViewChild('thumbslide') slider: Slides;
  @ViewChild('slides') slides: Slides;
  imagesName: any =[];

  constructor(public navCtrl: NavController,  public viewCtrl: ViewController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExperienceGallaryPage');
    this.imagesName = [];
    // this.initalIndex = this.navParams.get('index');
    this.imagesName = this.navParams.get('imageModel');
  }

  closeGallery() {
    console.log("Close gallery");
    // this.event.publish(Constant.KEY_NOTIFF.LifeStoryUpdate);
    this.viewCtrl.dismiss();
  }

  slideClick() {
    let theClickedIndex = this.slider.clickedIndex;
    console.log('clicked on slide ', theClickedIndex);

    this.slides.slideTo(theClickedIndex, 500);
  }
   
}
