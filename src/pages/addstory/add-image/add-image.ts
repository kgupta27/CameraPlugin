import { Component } from '@angular/core';
import { IonicPage, NavController,ActionSheetController, Platform,NavParams, LoadingController,ViewController,Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserCommonServices } from '../../../providers/usercommon-services';
import { ConfigProvider } from '../../../providers/config/config';
import { Storage } from '@ionic/storage';
import { ToastServiceProvider } from '../../../providers/toast-service/toast-service';
import { CameraProvider } from '../../../providers/camera/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
// import { EMAIL_REGES,TEXT_REGES,WITHOUT_FIRST_REGES,WITHOUT_FIRST_REGES_SPECIAL,NUMBER_REGES } from '../../../providers/constants';
import { EMAIL_REGES,TEXT_REGES,WITHOUT_FIRST_REGES,WITHOUT_FIRST_REGES_SPECIAL,NUMBER_REGES } from '../../../Utility/Constant';
import * as Constant from '../../../Utility/Constant';
import { Keyboard } from '@ionic-native/keyboard';
@IonicPage()
@Component({
  selector: 'page-add-image',
  templateUrl: 'add-image.html',
})
export class AddImagePage {
ownerId:any = 0;
urnType:any =0;
isSubmit:boolean = false;
addLinkForm : FormGroup;
chosenPicture1: string = "";
 isShow: boolean = true;
public _baseUrl: any;
 addImgForm : FormGroup;
  constructor( private keyboard: Keyboard,private transfer: FileTransfer,public cameraProvider: CameraProvider,public platform: Platform,public actionsheetCtrl: ActionSheetController, public viewCtrl: ViewController,public toastCtrl: ToastServiceProvider, public commonServices: UserCommonServices,public navCtrl: NavController,public loadingCtrl: LoadingController, public navParams: NavParams, private fb: FormBuilder,private storage: Storage,public configService: ConfigProvider,public events:Events) {
    this.ownerId = navParams.data.ownerId;
    this.urnType = navParams.data.urnType;
    
    this._baseUrl = configService.getApiURI();
       this.addImgForm = fb.group({
      'title' : [null, [Validators.required,Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)]],     
      // 'title' : [null, Validators.compose([Validators.required])],     
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddImagePage');
  }

  closeAddImages() {
    this.keyboard.close();
    this.navCtrl.pop();
    
  }
  addImage(value){
    debugger
    console.log(value);
      this.isSubmit = true;
      if(value.title != null && value.title !== undefined && value.title != "" && this.chosenPicture1 !="" && this.addImgForm.valid){
      this.storage.get("userData").then((result) => {
        if (result) {
          console.log(result);
          console.log(result.userInfoModel);

          var data = 
                  {
                  "userId":result.userInfoModel.userId,
                  "ownerId":this.ownerId,
                  "title":value.title,
                  }
          console.log(data);

          let loader = this.loadingCtrl.create({
            content: 'Please wait...'
          });
          loader.present();

          if (this.chosenPicture1 != "assets/img/icPlusAdd.png") {
            this.uploadPicture1(this.chosenPicture1, this.ownerId, value.title).then(data => {
               loader.dismiss();
                this.navCtrl.pop();

            }, error => {
              loader.dismiss();
              this.toastCtrl.create('Profile pic not uploaded');
              console.log(error);
            });
          }

        //   this.commonServices.submitData( data, "api/v1/story/mediaLink", result.token).subscribe(data => {
        //      loader.dismiss();
        //   this.navCtrl.pop();

        //   }, error => {
        //   console.log(error);
        //    loader.dismiss();
        //   this.toastCtrl.create(error);
        // });
      }
      })
    }
  }
getPicture(i) {
    // const loading = this.loadingCtrl.create();
    // loading.present();

    return this.cameraProvider.getPictureFromPhotoLibrary().then(picture => {
      if (picture) {
        if (i == 1 || i == '1') {
          this.chosenPicture1 = picture;
          this.isShow = false;
        } 
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
        if (i == 1 || i == '1') {
          this.chosenPicture1 = picture;
          this.isShow = false;
        } 
      }
      loading.dismiss();
    }, error => {
      alert(error);
    });
  }
  //  uploadPicture(chosenPicture, ownerId, title?){
  //    debugger;
  //     const fileTransfer: FileTransferObject = this.transfer.create();
  //     this.storage.get("userData").then((result) => {
  //       if(result){
          
  //         let options: FileUploadOptions = {
  //           fileKey: 'mediaGallery',
  //           fileName: 'profile.jpg',
  //           chunkedMode: false,
  //           headers: {
  //             'Content-Type': undefined,
  //             'Authorization' : result.token
  //           }
  //         }


  //         var params = {
  //           userId:result.userInfoModel.userId,
  //           ownerId:ownerId,
  //           title:title,
  //         };
  //         options.params = params;
          
  //         console.log("options:");
  //         console.log(JSON.stringify(options));
  //         fileTransfer.upload(chosenPicture, this._baseUrl+'api/v1/story/mediaImage', options)
  //           .then((data) => {
  //             // alert("success");
  //             console.log(data.response);
  //             // this.toastCtrl.create('Your picture uploaded successfully');
  //             return true;
  //           }, (err) => {
  //             // error
  //             console.log(err);
  //             return false;
  //           });
  //       } else {
  //         // return false;
  //         // this.toastCtrl.create('Something went wrong!');
  //       }

  //     });
    
  // }
  uploadPicture1(chosenPicture, ownerId,title?) {
    return new Promise((resolve, reject) => {
      try {
        const fileTransfer: FileTransferObject = this.transfer.create();
        this.storage.get("userData").then((result) => {
          if (result) {

           let options: FileUploadOptions = {
            fileKey: 'mediaGallery',
            fileName: 'profile.jpg',
            chunkedMode: false,
            headers: {
              'Content-Type': undefined,
              'Authorization' : result.token
            }
          }

            // debugger;
             var params = {
            userId:result.userInfoModel.userId,
            ownerId:ownerId,
            title:title,
          };
            options.params = params;

            console.log("options:");
            console.log(JSON.stringify(options));
           fileTransfer.upload(chosenPicture, this._baseUrl+'api/v1/story/mediaImage', options)
              .then((data) => {
                resolve('data');
                this.events.publish(Constant.KEY_NOTIFF.TabSelect,Constant.LifeStoryTab.Media);
                
              }, error => {
                console.log(error);
                reject(error);
              });
          } else {
            // return false;
            // this.toastCtrl.create('Something went wrong!');
          }

        });

      } catch (e) {
        return reject(e);
      }
    });
    // return Observable.throw(true);
  }
}
