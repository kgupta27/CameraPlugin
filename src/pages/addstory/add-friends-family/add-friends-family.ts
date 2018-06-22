import { Component } from '@angular/core';
import { IonicPage, NavController, ActionSheetController, NavParams, ViewController, LoadingController, Platform, ModalController, Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CameraProvider } from '../../../providers/camera/camera';
import { Storage } from '@ionic/storage';
import { ConfigProvider } from '../../../providers/config/config';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { ToastServiceProvider } from '../../../providers/toast-service/toast-service';
import { UserCommonServices } from '../../../providers/usercommon-services';
import { RelationshipModule } from '../../addstory/relationship/relationship.module';
// import { EMAIL_REGES, TEXT_REGES, WITHOUT_FIRST_REGES, WITHOUT_FIRST_REGES_SPECIAL, NUMBER_REGES } from '../../../providers/constants';
import { EMAIL_REGES, TEXT_REGES, WITHOUT_FIRST_REGES, WITHOUT_FIRST_REGES_SPECIAL, NUMBER_REGES, NICKNAME_REGES } from '../../../Utility/Constant';
import { Observable } from 'rxjs/Rx'
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/observable/of'
import { AlertServiceProvider } from '../../../providers/alert-service/alert-service';
import * as Constant from '../../../Utility/Constant';
import { Keyboard } from '@ionic-native/keyboard';
import { InterestnPassionService } from '../../../providers/WebServices/LifeStory/InterestnPassionService';

@IonicPage()
@Component({
  selector: 'page-add-friends-family',
  templateUrl: 'add-friends-family.html',
})

export class AddFriendsFamilyPage {
  public headers: any;
  userId: any = '';
  url: string = '';
  addFamily: FormGroup;
  urnType:any = 0;
  isSubmit: boolean = false;
  isShow: boolean = true;
  defaultImage: boolean = false;
  ownerId: any = 0;
  isValidDate: boolean = false;
  public _baseUrl: any;
  chosenPicture1: string = "";
  relationship: any;
  selected: any = "";
  items: any = [];
  itemIsShown: boolean = false;
  isautoFill: boolean = true
  friendUserId: any = '';
  disableEmail: boolean = false;
  loader: boolean = false
  isEdit: boolean = false;
  isDisablerole: boolean = true;
  showemailError: boolean = false
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
    public interestnPassion: InterestnPassionService,
    private transfer: FileTransfer,
    public configService: ConfigProvider,
    public toastCtrl: ToastServiceProvider,
    public commonServices: UserCommonServices,
    public events: Events,
    private keyboard: Keyboard,
    public modalCtrl: ModalController, private http: Http, public alertService: AlertServiceProvider, ) 
    {
      debugger
      console.log(navParams.data.urnType);
      this.ownerId = navParams.data.data.ownerId;
      this.urnType = navParams.data.data.urnType;
      
      // alert(this.ownerId);
      this._baseUrl = configService.getApiURI();
      // let EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      this.addFamily = fb.group({
        'name': [null, [Validators.required, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)]],
        'nickName': [null, [Validators.required, Validators.pattern(NICKNAME_REGES)]],
        'email': [null, [Validators.required, Validators.pattern(EMAIL_REGES)]],
        'relationship': [null, [Validators.required, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)]],
        'role': [null, [Validators.required]],

      });

      // this.addFamily.controls['name'].valueChanges.subscribe(value => {
      //   console.log('addFamily name value : ', value)
      //   if(typeof value == 'string'){
      //     this.getItems(value);
      //   }
      // })

  }
  ionViewDidLoad() {

    if (this.navParams.data.data.isEdit == true && this.navParams.data.data != undefined) {
      this.isEdit = this.navParams.data.data.isEdit;
      this.disableEmail = true;
      this.relationship=this.navParams.data.data.familyData.relationshipId;
      this.addFamily.controls['email'].setValidators(null);
      this.addFamily.controls['name'].setValue(this.navParams.data.data.familyData.name);
      this.addFamily.controls['nickName'].setValue(this.navParams.data.data.familyData.nickName);
      this.addFamily.controls['email'].setValue(this.navParams.data.data.familyData.familyFriendEmailId);
      this.addFamily.controls['relationship'].setValue(this.navParams.data.data.familyData.relationship);
      this.addFamily.controls['role'].setValue(this.navParams.data.data.familyData.roleId);
      if (this.navParams.data.data.familyData.defaultImage != this.navParams.data.data.familyData.defaultMediumImage500) {
        this.chosenPicture1 = this.navParams.data.data.familyData.defaultMediumImage500;
      }
      if (this.navParams.data.data.familyData.roleId == 5) {
        this.isDisablerole = true;
        this.addFamily.controls['email'].setValidators(null);
        this.addFamily.controls['role'].setValidators(null);
      }else{
        this.isDisablerole = false;
      }
      
    }
    console.log('ionViewDidLoad AddFriendsFamilyPage');
    this.storage.get("userData").then((result) => {
      this.headers = new Headers();
      this.headers.append('Accept', 'application/json');
      this.headers.append("Authorization", result.token);
      this.userId = result.userInfoModel.userId;
    })
  }

  closeFriendsFamily() {
    this.keyboard.close();
    this.navCtrl.pop();

  }
  openRelationship() {
    console.log("Hi openRelationship");
    //RelationshipPage

    let modal = this.modalCtrl.create("RelationshipPage", { relationType: this.urnType });
    modal.onDidDismiss(data => {
      console.log(data);
      this.relationship = data.relationId;
      this.addFamily.controls['relationship'].setValue(data.relationshipType);
      this.addFamily.controls['relationship'].markAsTouched();

    });
    modal.present();
  }
  addFriendsFamily(value) {

    if (value.email != '' && value.email != null) {
      // this.form.controls["firstName"].setValidators([Validators.minLength(1), Validators.maxLength(30)]);
      // let EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      this.addFamily.controls['email'].setValidators([Validators.required, Validators.pattern(EMAIL_REGES)]);

    }

    debugger
    console.log(value);
    this.isSubmit = true;
    // if(this.chosenPicture1 !="" && this.addFamily.valid){
    if (this.addFamily.valid) {
      // var EMAIL_REGEXP = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (!EMAIL_REGES.test(value.email)) {
        console.log("EMAIL_REGEXP  not vlid");
      }
      this.storage.get("userData").then((result) => {
        if (result) {
          console.log(result);
          console.log(result.userInfoModel);
          let loader = this.loadingCtrl.create({
            content: 'Please wait...'
          });
          loader.present();
          if (this.chosenPicture1 != "" && this.isautoFill == false) {
            value.relationshipId=this.relationship;
            
            this.uploadPicture1(this.chosenPicture1, this.ownerId, value, this.isEdit).then(response => {
              
              loader.dismiss();
              console.log(response);
              let responceData = JSON.parse("[" + response + "]");
              console.log(responceData);
              if (responceData[0].data.responseCode == 202) {
                this.alertService.presentAlert('Info', responceData[0].message);
              } else if (responceData[0].data.responseCode == 201) {
                this.alertService.presentAlertWithCallback('Alert!',
                  responceData[0].message).then((yes) => {
                    if (yes) {
                    var parameter ={
                      "email": value.email
                    }

                      this.sendEmail(parameter);
                      // this.toastCtrl.create('Email sent successfully');
                      this.navCtrl.pop();
                    }
                  });
              } else {

                this.navCtrl.pop();
              }



            }, error => {
              loader.dismiss();
              this.toastCtrl.create('Profile pic not uploaded');
              console.log(error);
            });
          } else {
            var data = {
              "userId": result.userInfoModel.userId, "friendUserId": this.friendUserId, "ownerId": this.ownerId, "name": value.name, "nickName": value.nickName, "roleId": value.role, "userEmail": value.email, "relationshipId": this.relationship,
              "familyMemberId": 0
            }
            //*******************/add condition for update hare
            var url = '';
            if (this.isEdit) {
              //update url
              url = 'api/v1/story/updateFriendFamily';
              data.familyMemberId = this.navParams.data.data.familyData.familyMemeberId;
            } else {
              url = 'api/v1/story/friendFamily';
            }
            this.commonServices.submitFriendsData(data, url, result.token, this.isEdit).subscribe(data => {
              console.log(data);
              loader.dismiss();
              data = JSON.parse(data)
              //Email is already existed as a viewer but name is changed
              if (data.data.responseCode == 202) {
                this.alertService.presentAlert('Info', data.message);
              } else if (data.data.responseCode == 201) {
                //Email is already existed as app user but not viewer
                this.alertService.presentAlertWithCallback('Alert!',
                  data.message).then((yes) => {
                    if (yes) {
                      var parameter ={
                        "email": value.email
                      }
  
                        this.sendEmail(parameter);
                     
                      // this.toastCtrl.create('Email sent successfully');
                      this.navCtrl.pop();
                      //---------------------------------
                      this.events.publish(Constant.KEY_NOTIFF.TabSelect, Constant.LifeStoryTab.FriendsnFamily);

                    }
                  });
              } else {
                //If register as a new Friend and family user.
                this.navCtrl.pop();
                //---------------------------------
                this.events.publish(Constant.KEY_NOTIFF.TabSelect, Constant.LifeStoryTab.FriendsnFamily);


              }

            }, error => {
              console.log(error);
              loader.dismiss();
              this.toastCtrl.create(error);
            });
          }
        }
      })
    }
  }
  getPicture(i) {
    
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

    if (this.disableEmail) {
    } else {
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

  uploadPicture1(chosenPicture, ownerId, data, isEdit) {
    debugger;
    return new Promise((resolve, reject) => {
      try {
        const fileTransfer: FileTransferObject = this.transfer.create();
        this.storage.get("userData").then((result) => {
          if (result) {

            var options: FileUploadOptions = {
              fileKey: 'friendPic',
              fileName: 'profile.jpg',
              chunkedMode: false,

              headers: {
                'Content-Type': undefined,
                'Authorization': result.token
              }
            }

            // debugger;
            var url = '';
            var params = {
              userId: result.userInfoModel.userId,
              ownerId: ownerId,
              name: data.name,
              nickName: data.nickName,
              userEmail: data.email,
              relationshipId: this.relationship,
              roleId: data.roleId,
              // friendUserId:0,
              familyFriendId: 0,
              familyMemberId: 0
            };
            if (isEdit) {
              //update url
              url = 'api/v1/story/updateFriendFamily';
              params.familyMemberId = this.navParams.data.data.familyData.familyMemeberId;
            } else {
              url = 'api/v1/story/friendFamily';
            }
            options.params = params;
            console.log(JSON.stringify(options));
            fileTransfer.upload(chosenPicture, this._baseUrl + url, options)
              .then((data) => {
                resolve(data.response);
                console.log(data);
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
  observableSource = (keyword: any): Observable<any[]> => {
    console.log(this.headers);
    this.url = this._baseUrl + 'api/v1/profile/searchByUserDetail?userId=' + this.userId + '&ownerId=' + this.ownerId + '&userName=' + keyword;
    console.log(keyword.length);
    return this.http.get(this.url, { headers: this.headers })
      .map(res => {
        let json = res.json();

        console.log(json.data);
        if (json.data.length > 0) {
          return json.data;
        } else {
          return [];
        }

      })


  }
  suggetionSelected(item) {
    console.log('suggetionSelected : ', item);
    this.itemIsShown = false;
    this.isautoFill = true
    this.disableEmail = true;
    this.addFamily.controls['name'].setValue(item.name)
    this.addFamily.controls['email'].setValue(item.email)
    this.addFamily.controls['nickName'].setValue(item.nickName)
    this.chosenPicture1 = item.defaultMediumImage500;
    this.friendUserId = item.userId;



  }
  getItems(ev) {
    console.log(ev);
    console.log(ev.length);
    if (ev.length == 0) {
      this.itemIsShown = false;
    }
    if (ev.length > 0) {
      // this.addFamily.controls['name'].setValue('');
      this.addFamily.controls['email'].setValue('');
      this.addFamily.controls['nickName'].setValue('');
      // this.chosenPicture1 = '';
      this.disableEmail = false;

      this.storage.get("userData").then((result) => {
        this.loader = true;
        if (result) {
          this.commonServices.getByName(ev, "api/v1/profile/searchByUserDetail", result.token, result.userInfoModel.userId, this.ownerId).subscribe(data => {

            // loader.dismiss();

            console.log("++++++++++++++++++++++++");
            this.loader = false;
            data = JSON.parse(data)
            this.disableEmail = true;
            this.itemIsShown = true;
            this.items = data.data;
            this.isautoFill = true;
            this.isDisablerole = false;
            if (this.items == undefined || this.items.length == 0 || this.items[0] == '') {
              this.itemIsShown = false;
              this.isautoFill = false;
              this.friendUserId = 0;
              this.disableEmail = false;
              this.loader = false;
              this.isDisablerole = true;
              this.addFamily.controls['role'].setValue(5);
              this.addFamily.controls['role'].setValidators(null);
              this.addFamily.controls['email'].setValue('');
              this.addFamily.controls['email'].setValidators(null);
            }

            console.log('this.items : ', this.items)
            // debugger;

          }, error => {
            console.log(error);
            // loader.dismiss();
            this.toastCtrl.create(error);
          });
        }
      });
    }
  }


  sendEmail(parameter) {
    this.storage.get("userData").then((result) => {

      var params = {
        'userId': result.userInfoModel.userId,
        'ownerId': this.ownerId,
        'email': parameter.email
      };

      this.interestnPassion.sendEmail(params)
        .then(data => {
            console.log(data);

            let interestnPassionObject: any;
            interestnPassionObject = data;
            this.toastCtrl.create(interestnPassionObject.message);

            this.toastCtrl.create(data);
          
        }, error => {
          //debugger;
          console.log(error);
        });

    });
  }
}

