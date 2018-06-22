import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Events, Slides, ViewController, ActionSheetController, IonicPage } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Gesture } from 'ionic-angular';
import { SharedServices } from '../../../../../providers/WebServices/Common/SharedServices';
import { InterestnPassionService } from '../../../../../providers/WebServices/LifeStory/InterestnPassionService';
import * as Constant from '../../../../../Utility/Constant';

@IonicPage()
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {
  @ViewChild('slides') slides: Slides;
  @ViewChild('thumbslide') slider: Slides;


  @ViewChild('image') element;
  @ViewChild('imageParent') elementParent;

  imagesName: any = [];
  result: any;
  nextPage: any = '1';
  image = null;
  container = null;
  transforms = [];
  adjustScale = 1;
  adjustDeltaX = 0;
  adjustDeltaY = 0;

  currentScale = null;
  currentDeltaX = null;
  currentDeltaY = null;
  index: number = 0;

  public media: any;
  public src: string;
  public mediaType: string;
  private gesture: Gesture;
  public mediaLoaded: boolean = false;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public actionSheetCtrl: ActionSheetController,
    private photoViewer: PhotoViewer,
    public event: Events,
    private sharedServices: SharedServices,
    public interestnPassion: InterestnPassionService,
  ) {
    // this.images = this.navParams.get("data");
    // console.log(this.images);
    console.log('navParams  ', navParams.data);
    //  console.log('ImageId: ',navParams.data.imageModel[0].imageId)
    //  alert(JSON.stringify(navParams.data));
    this.src = 'https://pbs.twimg.com/profile_images/697468390961651712/p1R4jPlp.png';
  }

  ionViewDidLoad() {
    // console.log("Slides", this.slides);
    // this.slides.centeredSlides = true;
    this.loadMoreImages();
  }

  onSlideChanged() {
    const currentSlide = this.slides.getActiveIndex();

    let currentIndex = this.slider.getActiveIndex();
    this.index = this.slider.getActiveIndex();

    console.log("Current index is", currentIndex);
    this.slider.slideTo(currentSlide, 500);
  }

  onThumbSlideChanged() {
    let currentIndex = this.slider.getActiveIndex();
    console.log("Current thumb slide index is", currentIndex);
    if (currentIndex >= 2) {
      if (this.nextPage > 0) {
        // alert('call load maor ' + this.nextPage);
        this.loadMoreImages();
      }
    }
    this.slides.slideTo(currentIndex, 500);
  }
  loadMoreImages() {
    debugger;
    let params = this.navParams.data.parms;
    params.page = this.nextPage;
    params.size = '9';

    this.sharedServices.loadMoreImages(params)
      .then(data => {
        this.result = data;
        console.log(data);
        for (let i = 0; i < this.result.contentList.length; i++) {
          this.imagesName.push(this.result.contentList[i]);
        }
        this.nextPage = this.result.nextPage;

      }, error => {
        debugger;
        console.log(error);
      });


  }
  slideClick() {
    let theClickedIndex = this.slider.clickedIndex;
    console.log('clicked on slide ', theClickedIndex);

    this.slides.slideTo(theClickedIndex, 500);
  }
  showThisImage(imgURL, title) {
    console.log(imgURL);
    // this.photoViewer.show(imgURL,title, {share: false});
  }

  closeGallery() {
    console.log("Close gallery");
    this.event.publish(Constant.KEY_NOTIFF.LifeStoryUpdate);
    this.viewCtrl.dismiss();
  }

  setMediaLoaded = () => {
    setTimeout(() => this.mediaLoaded = true, 200);
  }

  // ionViewDidLoad() {
  //   this.image = this.element.nativeElement;
  //   this.container = this.elementParent.nativeElement;
  //   // Prevent long press saving on mobiles.
  //   this.container.addEventListener('touchstart', function(e) {
  //     e.preventDefault();
  //   });

  //   this.init();
  // }


  /* 
Initialize listeners for gestures
*/
  init = () => {
    //create gesture obj w/ ref to DOM element
    this.gesture = new Gesture(this.element.nativeElement);

    //listen for the gesture
    this.gesture.listen();

    this.gesture.on('doubletap', (ev) => {
      this.transforms = [];
      this.adjustScale += 1;
      if (this.adjustScale >= 4) this.adjustScale = 1;
      this.transforms.push('scale(' + this.adjustScale + ')');
      this.container.style.transform = this.transforms.join(' ');
    });


    this.gesture.on("pinch", (ev) => {

      this.transforms = [];

      // Adjusting the current pinch/pan event properties using the previous ones set when they finished touching
      this.currentScale = this.adjustScale * ev.scale;
      this.currentDeltaX = this.adjustDeltaX + (ev.deltaX / this.currentScale);
      this.currentDeltaY = this.adjustDeltaY + (ev.deltaY / this.currentScale);

      // Concatinating and applying parameters.
      if (this.currentScale < 1) {
        this.currentScale = 1;
        this.currentDeltaX = 0;
        this.currentDeltaY = 0;
      }
      this.transforms.push('scale(' + this.currentScale + ')');
      this.transforms.push('translate(' + this.currentDeltaX + 'px,' + this.currentDeltaY + 'px)');
      this.container.style.transform = this.transforms.join(' ');

    });


    this.gesture.on("pinchend", (ev) => {

      // Saving the final transforms for adjustment next time the user interacts.
      this.adjustScale = this.currentScale;
      this.adjustDeltaX = this.currentDeltaX;
      this.adjustDeltaY = this.currentDeltaY;

    });

    this.gesture.on("panend", (ev) => {

      // Saving the final transforms for adjustment next time the user interacts.
      this.adjustScale = this.currentScale;
      this.adjustDeltaX = this.currentDeltaX;
      this.adjustDeltaY = this.currentDeltaY;

    });

  }

  /* close modal */
  closeModal() {
    this.event.publish(Constant.KEY_NOTIFF.LifeStoryUpdate);
    this.viewCtrl.dismiss();
  }

  actionDelete() {
    let actionSheet = this.actionSheetCtrl.create({

      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            console.log('Deleting... ');
            this.deleteImage();
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

  deleteImage() {
    this.index = this.slider.getActiveIndex();
    let params = {
      "userId": this.navParams.data.parms.userid,
      "ownerId": this.navParams.data.parms.ownerId,
      "imageId": this.imagesName[this.index].imageId
    }
    console.log("params", params);
    // Delete API

    this.interestnPassion.deleteMediaImage(params)
      .then(data => {
        console.log(data);
        debugger
        console.log("Delete at this index: ", this.index);
        this.imagesName.splice(this.index, 1);
        this.index = this.index - 1;
        setTimeout(() => {
          this.slider.slideTo(this.index, 0);
          this.slides.slideTo(this.index, 0);
        }, 100);

        console.log("After delete:", this.imagesName);
        console.log("After Index:", this.index);
        

        if (this.imagesName.length < 1) {
          this.closeGallery();
        }
        // else {
        //   this.slider.slideTo(this.index-1, 500);
        // }
      }, error => {
        console.log(error);
      });
  }

}
