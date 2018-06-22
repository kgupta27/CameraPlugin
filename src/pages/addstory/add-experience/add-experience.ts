import { Component } from '@angular/core';
import { IonicPage, NavController, ActionSheetController, NavParams, ViewController, LoadingController, Platform, Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CameraProvider } from '../../../providers/camera/camera';
import { Storage } from '@ionic/storage';
import { ConfigProvider } from '../../../providers/config/config';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { ToastServiceProvider } from '../../../providers/toast-service/toast-service';
import { UserCommonServices } from '../../../providers/usercommon-services';
import { EMAIL_REGES, TEXT_REGES, WITHOUT_FIRST_REGES, WITHOUT_FIRST_REGES_SPECIAL, NUMBER_REGES } from '../../../Utility/Constant';
import * as Constant from '../../../Utility/Constant';
import { Keyboard } from '@ionic-native/keyboard';
import { LifeStoryService } from '../../../providers/WebServices/LifeStory/LifeStoryService';
@IonicPage()
@Component({
  selector: 'page-add-experience',
  templateUrl: 'add-experience.html',
})
export class AddExperiencePage {
  addExpForm: FormGroup;
  isSubmit: boolean = false;
  isShow: boolean = true;
  urnType: any = 0;
  defaultImage: boolean = false;
  ownerId: any = 0;
  isValidDate: boolean = false;
  result: any;
  isExp: any = false;
  isImage: boolean = false;
  imageCount: number = 0;
  loader: any;

  public _baseUrl: any;
  chosenPicture1: string = "assets/img/icPlusAddsub.png";
  chosenPicture2: string = "assets/img/icPlusAddsub.png";
  chosenPicture3: string = "assets/img/icPlusAddsub.png";
  chosenPicture4: string = "assets/img/icPlusAddsub.png";
  chosenPicture5: string = "assets/img/icPlusAddsub.png";
  chosenPicture6: string = "assets/img/icPlusAddsub.png";
  chosenPicture7: string = "assets/img/icPlusAddsub.png";
  chosenPicture8: string = "assets/img/icPlusAddsub.png";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private fb: FormBuilder,
    public loadingCtrl: LoadingController,
    public cameraProvider: CameraProvider,
    public actionsheetCtrl: ActionSheetController,
    public platform: Platform,
    private storage: Storage,
    private transfer: FileTransfer,
    public configService: ConfigProvider,
    public toastCtrl: ToastServiceProvider,
    public commonServices: UserCommonServices,
    public events: Events,
    private keyboard: Keyboard,
    private lifeStoryService: LifeStoryService

  ) {
    debugger;
    console.log('navParams  ', navParams.data);
    this.isExp = navParams.data.data;
    if (typeof this.isExp === 'undefined') {
      this.ownerId = navParams.data.ownerId;
    } else {
      this.getExperineceDetails();
      this.ownerId = navParams.data.data.ownerId;
    }
    // alert(this.ownerId);
    this._baseUrl = configService.getApiURI();
    this.addExpForm = fb.group({
      'title': [null, [Validators.required, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)]],
      'whHappen': [null, [Validators.required, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)]],
      // 'wnHappen': [null, Validators.compose([Validators.required])],
      'wnHappen': [null],
      'withYou': [null, [Validators.required, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)]],
      'expDetails': [null, [Validators.required, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)]],
    });

    this.urnType = navParams.data.urnType;
    console.log("this.urnType: ", this.urnType);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddExperiencePage');
  }

  closeAddExp() {
    debugger
    if(this.loader){
      this.loader.dismiss();
      this.loader = undefined;
    }
    
    this.events.publish(Constant.KEY_NOTIFF.LifeStoryUpdate);

    if (this.urnType == 1) {
      this.storage.get("experience").then((resulst) => {
        debugger;

        if (resulst) {
          this.keyboard.close();
          console.log("\n\nSecond time");
          // setTimeout(() => {
          this.navCtrl.pop();
          // },1500);

        } else {
          this.storage.set("experience", JSON.stringify(true));
          console.log("\n\nFirst time");
          this.keyboard.close();
          console.log("POp to called ");
          // this.navCtrl.popTo('ExperiencePage');
          this.navCtrl.popToRoot();

        }
      });
    }

    // if (this.urnType == 2) {
      else{
      this.storage.get("petexperience").then((resulst) => {
        debugger;

        if (resulst) {
          this.keyboard.close();
          console.log("\n\nSecond time");
          // setTimeout(() => {
            this.navCtrl.pop();
          // },1500);

        } else {
          this.storage.set("petexperience", JSON.stringify(true));
          console.log("\n\nFirst time");
          this.keyboard.close();
          console.log("POp to called ");
          // this.navCtrl.popTo('ExperiencePage');
          this.navCtrl.popToRoot();

        }
      });
    }
    // this.events.publish(Constant.KEY_NOTIFF.LifeStoryUpdate);

  }


  getIMageIndex(i, picture) {
    debugger
    switch (i) {
      case 1:
        this.chosenPicture1 = picture;
        this.isShow = false;
        break;
      case 2:
        this.chosenPicture2 = picture;
        break;
      case 3:
        this.chosenPicture3 = picture;
        break;
      case 4:
        this.chosenPicture4 = picture;
        break;
      case 5:
        this.chosenPicture5 = picture;
        break;
      case 6:
        this.chosenPicture6 = picture;
        break;
      case 7:
        this.chosenPicture7 = picture;
        break;
      case 8:
        this.chosenPicture8 = picture;
        break;
      default:
        break;


    }
  }
  getPicture(i) {
    return this.cameraProvider.getPictureFromPhotoLibrary().then(picture => {
      if (picture) {
        this.getIMageIndex(i, picture);

      }
      // loading.dismiss();
    }, error => {
      alert(error);
    });
  }

  addPicture(i) {

    const actionsheet = this.actionsheetCtrl.create({
      title: 'Upload Picture',
      buttons: [
        {
          text: 'Take Photo',
          icon: !this.platform.is('ios') ? null : null,
          handler: () => {
            this.takePicture(i);
          }
        },
        {
          text: !this.platform.is('ios') ? 'Choose Existing' : 'Choose Existing',
          icon: !this.platform.is('ios') ? null : null,
          handler: () => {
            this.getPicture(i);
          }
        },
        {
          text: 'Cancel',
          icon: !this.platform.is('ios') ? null : null,
          role: 'destructive',
          handler: () => {
            console.log('the user has cancelled the interaction.');
          }
        }
      ]
    });
    return actionsheet.present();
  }

  takePicture(i) {
    const loading = this.loadingCtrl.create();

    loading.present();
    return this.cameraProvider.getPictureFromCamera().then(picture => {
      if (picture) {
        this.getIMageIndex(i, picture);
      }
      loading.dismiss();
    }, error => {
      alert(error);
    });
  }
  uploadPicture(chosenPicture, index, ownerId, expId?) {
    debugger
    console.log("index: ", index);
    console.log("Begin Upload,Image count: ",this.imageCount);

    // let loader = this.loadingCtrl.create({
    //   content: 'Please wait...'
    // });
    // loader.present();

    const fileTransfer: FileTransferObject = this.transfer.create();
    this.storage.get("userData").then((result) => {
      if (result) {

        let options: FileUploadOptions = {
          fileKey: 'experienceGallery',
          fileName: 'profile.jpg',
          chunkedMode: false,
          headers: {
            'Content-Type': undefined,
            'Authorization': result.token
          }
        }

        if (index == '1' || index == 1) {
          this.defaultImage = true;
        } else {
          this.defaultImage = false;
        }

        var params = {
          userId: result.userInfoModel.userId,
          ownerId: ownerId,
          experienceId: expId,
          position: index
        };
        options.params = params;
        // debugger;
        console.log("options:");
        console.log(JSON.stringify(options));
        fileTransfer.upload(chosenPicture, this._baseUrl + 'api/v1/story/upLoadImageExperience', options)
          .then((data) => {
            // alert("success");
            this.imageCount = this.imageCount - 1;
            console.log("Image Successfully uploaded, count: ",this.imageCount);
            console.log(data.response);
            // loader.dismiss();
            if(this.imageCount == 0){
              console.log("Inside this Function: ",this.imageCount);
              this.closeExperience();
            }
            // this.toastCtrl.create('Your picture uploaded successfully');

          }, (err) => {
            // error
            
            // loader.dismiss();
            this.toastCtrl.create('Image not uploaded successfully!');
            console.log(err);
          });
      } else {
        // loader.dismiss();
        // this.toastCtrl.create('Something went wrong!');
      }

    });
  }

  closeExperience(){

    if(this.imageCount == 0){
      console.log("Inside the upload and now closing");
      this.closeAddExp();
      setTimeout(() => {

        this.events.publish(Constant.KEY_NOTIFF.TabSelect, Constant.LifeStoryTab.Experience);
        }, 1000);
    }

  }

  addExp(value) {
    debugger;
    this.isSubmit = true;
    var today = new Date();
    var dd = ('0' + (today.getDate())).slice(-2);
    var mm = ('0' + (today.getMonth() + 1)).slice(-2); //January is 0!
    var yyyy = today.getFullYear();
    console.log(mm);
    var maxDate = yyyy + '-' + mm + '-' + dd;
    if (value.wnHappen > maxDate) {
      this.isValidDate = true;
      console.log("isValidDate: ", this.isValidDate);
      // this.toastCtrl.create('Date of birth is not valid');
      return;
    } else {
      this.isValidDate = false;
    }
    if (this.addExpForm.valid)
      this.storage.get("userData").then((result) => {
        if (result) {
          console.log(result);
          console.log(result.userInfoModel);
          var data = {};
          if (typeof this.isExp != 'undefined') {
            debugger
            console.log("value.wnHappen: ",value.wnHappen);
            if(value.wnHappen != null){
              let date = new Date(value.wnHappen);
              value.wnHappen = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + (date.getDate())).slice(-2);
            }
            else{
              console.log("value.wnHappen: null ");
              value.wnHappen = null;
            }
            
            data =
              {
                "userId": result.userInfoModel.userId,
                "ownerId": this.ownerId,
                "title": value.title,
                "experiencePlace": value.whHappen,
                "experienceDate": value.wnHappen,
                "personWithYou": value.withYou,
                "despcription": value.expDetails,
                "experienceId": this.navParams.data.data.expId
              }

          } else {
            data =
              {
                "userId": result.userInfoModel.userId,
                "ownerId": this.ownerId,
                "title": value.title,
                "experiencePlace": value.whHappen,
                "experienceDate": value.wnHappen,
                "personWithYou": value.withYou,
                "despcription": value.expDetails
              }
          }
          console.log(data);

          this.loader = this.loadingCtrl.create({
            content: 'Please wait...'
          });
          this.loader.present();
          ///////////////////////////////////////////
          if (typeof this.isExp == 'undefined') {
            this.commonServices.submitDataExperience(data, "api/v1/story/experience", result.token, false).subscribe(data => {
              var relType = JSON.parse(data);
              console.log(relType.data);

              // debugger;
              console.log("storyid: ", relType.data);

              // Image uploding
              if (this.chosenPicture1 != "assets/img/icPlusAddsub.png") {
                this.imageCount = this.imageCount + 1;;
                console.log("Image Count: ",this.imageCount);
                this.uploadPicture(this.chosenPicture1, 1, this.ownerId, relType.data);
              }
              if (this.chosenPicture2 != "assets/img/icPlusAddsub.png") {
                this.imageCount = this.imageCount + 1;;
                this.uploadPicture(this.chosenPicture2, 2, this.ownerId, relType.data);
              }
              if (this.chosenPicture3 != "assets/img/icPlusAddsub.png") {
                this.imageCount = this.imageCount + 1;;
                this.uploadPicture(this.chosenPicture3, 3, this.ownerId, relType.data);
              }
              if (this.chosenPicture4 != "assets/img/icPlusAddsub.png") {
                this.imageCount = this.imageCount + 1;;
                this.uploadPicture(this.chosenPicture4, 4, this.ownerId, relType.data);
              }
              if (this.chosenPicture5 != "assets/img/icPlusAddsub.png") {
                this.imageCount = this.imageCount + 1;;
                this.uploadPicture(this.chosenPicture5, 5, this.ownerId, relType.data);
              }
              if (this.chosenPicture6 != "assets/img/icPlusAddsub.png") {
                this.imageCount = this.imageCount + 1;;
                this.uploadPicture(this.chosenPicture6, 6, this.ownerId, relType.data);
              }
              if (this.chosenPicture7 != "assets/img/icPlusAddsub.png") {
                this.imageCount = this.imageCount + 1;;
                this.uploadPicture(this.chosenPicture7, 7, this.ownerId, relType.data);
              }
              if (this.chosenPicture8 != "assets/img/icPlusAddsub.png") {
                this.imageCount = this.imageCount + 1;;
                this.uploadPicture(this.chosenPicture8, 8, this.ownerId, relType.data);
              }
              // loader.dismiss();
              
              // this.toastCtrl.create('Saved scu');

              // this.navCtrl.popToRoot();
              console.log("Image Count:: ",this.imageCount);
              // this.closeExperience();
              
              if(this.imageCount <= 0){
                console.log("Image Count:: ",this.imageCount);
                // this.loader.dismiss();
                this.closeAddExp();
                setTimeout(() => {

                this.events.publish(Constant.KEY_NOTIFF.TabSelect, Constant.LifeStoryTab.Experience);
                }, 1000);
              }
              

            }, error => {

              console.log(error);
              this.loader.dismiss();
              this.loader = undefined;
              this.toastCtrl.create(error);
            });
          } else {

            console.log(data)
            debugger

            this.commonServices.submitDataExperience(data, "api/v1/story/updateExperience", result.token, true).subscribe(data => {

              var relType = JSON.parse(data);
              console.log(relType.data);

              debugger;
              console.log("storyid: ", relType.data);

              // if images are available
              // if(this.isImage){
              // Image uploding
              console.log("counter:: ", this.imageCount);
              if (this.chosenPicture1 != "assets/img/icPlusAddsub.png" && !this.chosenPicture1.startsWith('http')) {
                this.imageCount = this.imageCount + 1;
                this.uploadPicture(this.chosenPicture1, 1, this.ownerId, this.navParams.data.data.expId);
              }
              if (this.chosenPicture2 != "assets/img/icPlusAddsub.png" && !this.chosenPicture2.startsWith('http')) {
                this.imageCount = this.imageCount + 1;;
                this.uploadPicture(this.chosenPicture2, 2, this.ownerId, this.navParams.data.data.expId);
              }
              if (this.chosenPicture3 != "assets/img/icPlusAddsub.png" && !this.chosenPicture3.startsWith('http')) {
                this.imageCount = this.imageCount + 1;;
                this.uploadPicture(this.chosenPicture3, 3, this.ownerId, this.navParams.data.data.expId);
              }
              if (this.chosenPicture4 != "assets/img/icPlusAddsub.png" && !this.chosenPicture4.startsWith('http')) {
                this.imageCount = this.imageCount + 1;;
                this.uploadPicture(this.chosenPicture4, 4, this.ownerId, this.navParams.data.data.expId);
              }
              if (this.chosenPicture5 != "assets/img/icPlusAddsub.png" && !this.chosenPicture5.startsWith('http')) {
                this.imageCount = this.imageCount + 1;;
                this.uploadPicture(this.chosenPicture5, 5, this.ownerId, this.navParams.data.data.expId);
              }
              if (this.chosenPicture6 != "assets/img/icPlusAddsub.png" && !this.chosenPicture6.startsWith('http')) {
                this.imageCount = this.imageCount + 1;;
                this.uploadPicture(this.chosenPicture6, 6, this.ownerId, this.navParams.data.data.expId);
              }
              if (this.chosenPicture7 != "assets/img/icPlusAddsub.png" && !this.chosenPicture7.startsWith('http')) {
                this.imageCount = this.imageCount + 1;;
                this.uploadPicture(this.chosenPicture7, 7, this.ownerId, this.navParams.data.data.expId);
              }
              if (this.chosenPicture8 != "assets/img/icPlusAddsub.png" && !this.chosenPicture8.startsWith('http')) {
                this.imageCount = this.imageCount + 1;;
                this.uploadPicture(this.chosenPicture8, 8, this.ownerId, this.navParams.data.data.expId);
              }
            // }
              // loader.dismiss();
              this.closeExperience();
              // debugger
              // console.log("Close Page");
              // this.closeAddExp();
              // setTimeout(() => {
              //   this.events.publish(Constant.KEY_NOTIFF.TabSelect, Constant.LifeStoryTab.Experience);
              // }, 1000);

            }, error => {
              console.log(error);
              this.loader.dismiss();
              this.loader = undefined;
              this.toastCtrl.create(error);
            });
          }
          //////////////////////////////////////////////////
          console.log("After Close function");

        }
      });
  }
  getExperineceDetails() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();

    this.storage.get("userData").then((result) => {
      let parms = {
        experienceId: this.navParams.data.data.expId,
        ownerId: this.navParams.data.data.ownerId,
        userId: this.navParams.data.data.userId
      };
      debugger
      this.lifeStoryService.fetExperience(parms)
        .then(data => {
          console.log(data);
          this.result = data;
          this.addExpForm.controls['title'].setValue(this.result.data.title);
          this.addExpForm.controls['whHappen'].setValue(this.result.data.experiencePlace);
          console.log("this.result.data.experienceDateIso:: ",this.result.data.experienceDateIso);

          // if(this.result.data.experienceDateIso === '') {
          //   console.log("yes blanck 12");
          // }else {
          //   console.log("no blanck 12");
          // }

          // if(this.result.data.experienceDateIso) {
          //   console.log("not blanck 2");
          // }else {
          //   console.log("yes blanck 2");
          // }

          if( this.result.data.experienceDateIso ){
            console.log("inside experienceDateIso");
            let date = this.result.data.experienceDateIso;
            this.addExpForm.controls['wnHappen'].setValue(date);
          } else {
            console.log("yes blanck 2");
          }
          
          this.addExpForm.controls['withYou'].setValue(this.result.data.personWithYou);
          this.addExpForm.controls['expDetails'].setValue(this.result.data.despcription);
          if (this.result.data.experienceGallery.length > 0) {
            this.isImage = true; 
            console.log("isImage:: ",this.isImage);
            for (let i = 0; i < this.result.data.experienceGallery.length; i++) {
              this.getIMageIndex(this.result.data.experienceGallery[i].position, this.result.data.experienceGallery[i].imageThumbUrl200)
            }
          }
          loader.dismiss();
          // this.expData = data;
          // this.expData = this.expData.data;
          // if (this.expData.experienceGallery.length > 0) {
          //   this.bgColor = this.expData.experienceGallery[0].imageMediumUrl500;
          //   this.isAlbum = true;
          //}
        }, error => {
          loader.dismiss();
          console.log(error);
        });
    });
  }

}