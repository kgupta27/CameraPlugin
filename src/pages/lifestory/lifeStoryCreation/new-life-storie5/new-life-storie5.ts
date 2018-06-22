import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import {
  NavController,
  NavParams,
  Platform,
  ActionSheetController,
  LoadingController,
  ModalController,
  IonicPage
} from 'ionic-angular';
import { CameraProvider } from '../../../../providers/camera/camera';
import { ToastServiceProvider } from '../../../../providers/toast-service/toast-service';
import { AlertServiceProvider } from '../../../../providers/alert-service/alert-service';
// import { HomePage } from '../../home/home';
import { UserCommonServices } from '../../../../providers/usercommon-services';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ConfigProvider } from '../../../../providers/config/config';
import { SharedServices } from '../../../../providers/WebServices/Common/SharedServices';
import * as Constant from '../../../../Utility/Constant';
import { LifeStoryPage } from '../../life-story/life-story';
import { LifeStoryService } from '../../../../providers/WebServices/LifeStory/LifeStoryService';

@IonicPage()
@Component({
  selector: 'page-new-life-storie5',
  templateUrl: 'new-life-storie5.html',
})
export class NewLifeStorie5Page {
  firstImageUpload: boolean = false;
  chosenPicture1: string = "assets/img/icPlusAdd.png";
  // chosenPicture2: string = "assets/img/icPlusAddsub.png";
  // chosenPicture3: string = "assets/img/icPlusAddsub.png";
  // chosenPicture4: string = "assets/img/icPlusAddsub.png";
  // chosenPicture5: string = "assets/img/icPlusAddsub.png";
  progress: any;
  storyData: any;
  public _baseUrl: any;
  defaultImage: boolean = false;
  isShow: boolean = true;
  isPetFlow: boolean = true;
  isEdit: boolean = false;
  lifeStoryData: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastServiceProvider,
    public actionsheetCtrl: ActionSheetController,
    public cameraProvider: CameraProvider,
    private storage: Storage,
    public platform: Platform,
    public lifeStoryService: LifeStoryService,
    public loadingCtrl: LoadingController,
    public alertService: AlertServiceProvider,
    public commonServices: UserCommonServices,
    private transfer: FileTransfer,
    private file: File,
    public configService: ConfigProvider,
    public sharedServices: SharedServices

  ) {
    this.progress = 75;
    this.storyData = navParams.data.lifeStoryData;
    if (typeof navParams.data.lifeStoryData != 'undefined') {
      this.lifeStoryData = navParams.data.lifeStoryData;
      this.isEdit = navParams.data.isEdit;
      console.log("LifestoryData:: ",this.lifeStoryData);
      this.chosenPicture1 = this.lifeStoryData.defaultImage? this.lifeStoryData.defaultImage : 'assets/img/icPlusAdd.png';
      // this.chosenPicture1 = this.lifeStoryData.defaultThumbImage200 ? this.lifeStoryData.defaultThumbImage200 : 'assets/img/icPlusAdd.png'
    }
    if (this.isEdit) {
      this.isShow = false;
    }

    this._baseUrl = configService.getApiURI();
    console.log("this.isEdit ", this.isEdit);
    console.log(this.storyData);
    console.log("this.lifeStoryData::: ", this.lifeStoryData);
    debugger
    console.log("Story Type: ");
    console.log(this.storyData.relationShip);
    if (localStorage.getItem("createStoryType") == "1") {
      this.isPetFlow = false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewLifeStorie5Page');
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
  getIMageIndex(i, picture) {
    switch (i) {
      case 1:
        this.chosenPicture1 = picture;
        this.isShow = false;
        break;
      // case 2:
      //   this.chosenPicture2 = picture;
      //   break;
      // case 3:
      //   this.chosenPicture3 = picture;
      //   break;
      // case 4:
      //   this.chosenPicture4 = picture;
      //   break;
      // case 5:
      //   this.chosenPicture5 = picture;
      //   break;
      default:
        break;

    }
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
  addStoryRequest(data, token, isEdit?) {
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();

    this.commonServices.addUpdateLifestory(data, token, this.isEdit).subscribe(data => {
      var relType = JSON.parse(data);
      var imageResponce;

      console.log("Owner ID: ", relType.data)
      // Image uploding
      if (this.chosenPicture1 != "assets/img/icPlusAdd.png" && this.chosenPicture1 != this.lifeStoryData.defaultImage) {

        this.uploadLifeStoryPic(this.chosenPicture1, 1, relType.data, loader, isEdit);

      } else {
        // if (this.isEdit == false) {
          loader.dismiss();
        
          var message = '<span>A life story for "' + this.storyData.ownerName + '" has been created. Lets add some experiences and what makes "' + this.storyData.ownerName + '" unique<span>';
          if (localStorage.getItem('CreateByBeaconId')) {
              message = '<span>A life story for "' + this.storyData.ownerName + '" has been created and URN is linked. Lets add some experiences and what makes you unique<span>';
          } else {
            
            console.log("Relationship: ", this.storyData.relationShip)
            if (this.storyData.relationShip == 1) {
              message = '<span>Your life story has been created. Let’s add some experiences and what makes you unique.<span>';
            } 
           
          }
          // this.navCtrl.setRoot(HomePage);
          this.alertService.presentCongratsAlert(message).then((yes) => {
            if (yes) { // this.toastCtrl.create('Created');
              debugger;
              console.log("Yes:: ",yes);
              this.navigate(this.storyData, data, relType.data);

            }
          });
          // this.navigate(this.storyData, data, relType.data);
          // this.navCtrl.setRoot(HomePage);

        // } else {
        //   loader.dismiss();
        //   this.navCtrl.setRoot(HomePage);
        // }
      }
      // if (this.chosenPicture2 != "assets/img/icPlusAddsub.png") {
      //   this.uploadPicture(this.chosenPicture2, 2, relType.data);
      // }
      // if (this.chosenPicture3 != "assets/img/icPlusAddsub.png") {
      //   this.uploadPicture(this.chosenPicture3, 3, relType.data);
      // }
      // if (this.chosenPicture4 != "assets/img/icPlusAddsub.png") {
      //   this.uploadPicture(this.chosenPicture4, 4, relType.data);
      // }
      // if (this.chosenPicture5 != "assets/img/icPlusAddsub.png") {
      //   this.uploadPicture(this.chosenPicture5, 5, relType.data);
      // }
    }, error => {
      console.log(error);
      this.toastCtrl.create(error);
      loader.dismiss();
    });
  }

  navigate(storyData, data, ownerId) {
    console.log("data: ", data);
    console.log("Owner Id: ", ownerId)
    debugger;
    // if (storyData.relationShip == 1) {
      console.log("Navigate here");
      var params = {
        ownerId: ownerId,
      };
      this.lifeStoryService.fetchLifeStoryById(params)
        .then(result => {
          if (result.responseCode == 200) {
            this.showLifeStoryDetail(result.data);
          }
        }, error => {
          console.log(error);
        });

    // }
    // else {
    //   this.navCtrl.setRoot(HomePage);
    // }
  }
  showLifeStoryDetail(item) {
    localStorage.setItem("lifeStoryData", JSON.stringify(item));
    this.navCtrl.push(LifeStoryPage, {
      lifeData: item,
    });
  }

  doneStory() {
    console.log("Done clicked");
    console.log(this.storyData);
    this.storage.get("userData").then((result) => {
      if (result) {
        console.log(result);
        console.log(result.userInfoModel);
        if (this.isEdit) {
          var data = {
            "alive": this.lifeStoryData.isAlive,
            "beaconId": 0,
            "birthdate": this.lifeStoryData.dateofBirth,
            "birthplace": this.lifeStoryData.placeofBirth,
            "breed": this.lifeStoryData.breed,
            "currentLocation": this.lifeStoryData.currentLocation,
            "deathDate": this.lifeStoryData.dateOfPassing,
            "ownerId": this.lifeStoryData.ownerId,
            "ownerName": this.lifeStoryData.ownerName,
            "pedigree": this.lifeStoryData.pedigree,
            "relationType": this.lifeStoryData.relationShip,
            "restPlace": this.lifeStoryData.restingPlace,
            "typeOfPet": this.lifeStoryData.typeOfPet,
            "urnType": this.lifeStoryData.urnType,
            "causeOfDeath": this.lifeStoryData.causeOfDeath,
            "userId": result.userInfoModel.userId

          }
        } else {
          var data = {
            "alive": this.storyData.isAlive,
            "beaconId": 0,
            "birthdate": this.storyData.dateofBirth,
            "birthplace": this.storyData.placeofBirth,
            "breed": this.storyData.breed,
            "currentLocation": this.storyData.currentLocation,
            "deathDate": this.storyData.dateOfPassing,
            "ownerId": this.storyData.ownerId,
            "ownerName": this.storyData.ownerName,
            "pedigree": this.storyData.pedigree,
            "relationType": this.storyData.relationShip,
            "restPlace": this.storyData.restingPlace,
            "typeOfPet": this.storyData.typeOfPet,
            "urnType": this.storyData.userType,
            "userId": result.userInfoModel.userId,
            "causeOfDeath": this.lifeStoryData.causeOfDeath,
          }
        }
        console.log(data);
        if (localStorage.getItem('CreateByBeaconId')) {
          var beaconId = localStorage.getItem('CreateByBeaconId');
          data.beaconId = parseInt(beaconId);
        }


        this.addStoryRequest(data, result.token, this.isEdit);
      }
    });
  }


  uploadPicture(chosenPicture, index, ownerId) {
    console.log("index: ", index);

    const fileTransfer: FileTransferObject = this.transfer.create();
    this.storage.get("userData").then((result) => {
      if (result) {

        let options: FileUploadOptions = {
          fileKey: 'lifeStoryImage',
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
          defaultImage: this.defaultImage,
          position: index
        };
        options.params = params;

        console.log("options:");
        console.log(JSON.stringify(options));
        let urlString = this.configService.apiMethod(Constant.APIService.UploadLifeStoryPic);
        fileTransfer.upload(chosenPicture, urlString, options)
          .then((data) => {
            // success
            console.log(data.response);
            // this.toastCtrl.create('Your picture uploaded successfully');


          }, (err) => {
            // error
            console.log(err);
          });
      } else {
        // return false;
        // this.toastCtrl.create('Something went wrong!');
      }
    });
  }

  uploadLifeStoryPic(chosenPicture, index, ownerId, loader, isEdit?) {
    console.log('......3');
    this.storage.get("userData").then((result) => {
      if (result) {

        var param = {
          userId: result.userInfoModel.userId,
          ownerId: ownerId,
          defaultImage: true,
          position: index,
          fileKey: 'lifeStoryImage',
          fileName: 'profile.jpg'

        };

        //this.sharedServices.uploadImage(chosenPicture,index,ownerId).
        this.sharedServices.uploadImage(chosenPicture, param)
          .then(data => {
            // if (this.isEdit == false) {
              loader.dismiss();
              console.log('life story data =', data);

              
              debugger
              var message = '<span>A life story for "' + this.storyData.ownerName + '" has been created. Lets add some experiences and what makes "' + this.storyData.ownerName + '" unique<span>';
              console.log("this.storyData.relationShip: ",this.storyData.relationShip);
              if (this.storyData.relationShip == 1) {
                message = '<span>Your life story has been created. Let’s add some experiences and what makes you unique.<span>';
              }
              // else {
              //   message = '<span>A life story for "' + this.storyData.ownerName + '" has been created. Lets add some experiences and what makes "' + this.storyData.ownerName + '" unique<span>';
              // }
              this.alertService.presentCongratsAlert(message).then((yes) => {
                if (yes) { // this.toastCtrl.create('Created');
                  this.navigate(this.storyData, data, ownerId);
                }
              });
            // } else {
            //   loader.dismiss();
            //   this.navCtrl.setRoot(HomePage);
            // }
          }, error => {
            loader.dismiss();
            this.toastCtrl.create('Profile pic not uploaded');
            console.log(error);
          });


      }


    });


  }






}