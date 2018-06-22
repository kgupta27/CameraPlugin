import { Component , ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-samples',
  templateUrl: 'samples.html',
})
export class SamplesPage {
  @ViewChild(Slides) slides: Slides;
  samples:  any[];
  currentIndex:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad SamplesPage');
    this.samples = [
      {
        title: "ModUrn",
        description: "World first smart cremation urn combining design and technology.",
        image: "assets/img/Sample_1.jpg",
        cssClass:"title0" 
      },
      {
        title: "Memento",
        description: "A beautiful memorial keepsake to honour a life and connect future generations.",
        image: "assets/img/Sample_2.jpg",
        cssClass:"title1" 
      },
      {
        title: "Bespoke Urns",
        description: "Our range includes a Premium wood print Urn and custom opportunities for “bespoke” Urns.",
        image: "assets/img/Sample_3.jpg",
        cssClass:"title2" 
      },
      {
        title: "Lux Urns",
        description: "Stylish, smart and compatable with your lifestyle.",
        image: "assets/img/Sample_4.jpg",
        cssClass:"title3" 
      },
      {
        title: "Pet Urns",
        description: "Because our pets are family and deserve a stylish and modern way to be remembered.",
        image: "assets/img/Sample_5.jpg",
        cssClass:"title4" 
      },
    ];

  }

  slideChanged() {
    // this.slides.slideTo(2, 500);
    this.currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', this.currentIndex);
  }

  getStarted(){
    if(this.currentIndex == 4){
      this.navCtrl.pop();
    }else{
      this.slides.slideNext(500);
    }

   
    // this.currentIndex++;
    console.log('Current index is', this.currentIndex);
  }
}
