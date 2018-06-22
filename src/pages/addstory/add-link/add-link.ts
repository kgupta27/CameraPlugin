import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController, Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserCommonServices } from '../../../providers/usercommon-services';
import { ConfigProvider } from '../../../providers/config/config';
import { Storage } from '@ionic/storage';
import { ToastServiceProvider } from '../../../providers/toast-service/toast-service';
import { URL, EMAIL_REGES,TEXT_REGES,WITHOUT_FIRST_REGES,WITHOUT_FIRST_REGES_SPECIAL,NUMBER_REGES } from '../../../Utility/Constant';
import * as Constant from '../../../Utility/Constant';
import { Keyboard } from '@ionic-native/keyboard';
import { LifeStoryService } from '../../../providers/WebServices/LifeStory/LifeStoryService';

@IonicPage()
@Component({
  selector: 'page-add-link',
  templateUrl: 'add-link.html',
})
export class AddLinkPage {
  ownerId: any = 0;
  urnType:any = 0;
  isSubmit: boolean = false;
  mediaData: any = {};
  addLinkForm: FormGroup;
  public _baseUrl: any;
  isNotEmpty: boolean = false;
  constructor(private keyboard: Keyboard,
    public lifeStoryService: LifeStoryService,
    public viewCtrl: ViewController,
    public toastCtrl: ToastServiceProvider, 
    public commonServices: UserCommonServices, 
    public navCtrl: NavController, 
    public loadingCtrl: LoadingController, 
    public navParams: NavParams, private fb: FormBuilder, private storage: Storage, public configService: ConfigProvider,public events:Events ) 
  {
    console.log(navParams.data.data);
    this.ownerId = navParams.data.data.ownerId;
    this.urnType = navParams.data.data.urnType;
    
    //console.log(navParams.data.data.mediaLink.linkId);
    this._baseUrl = configService.getApiURI();
    this.addLinkForm = fb.group({
      'title': [null, [Validators.required, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)]],
      // 'link': [null, Validators.compose([Validators.required, Validators.pattern(URL)])]
      'link': [null, [Validators.required]]
    });

    this.mediaData = navParams.data.data.mediaLink;
    console.log(this.mediaData);
    if (typeof this.mediaData === 'undefined'){
      this.mediaData = {};
  }
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddLinkPage');
    if (Object.keys(this.mediaData).length > 0) {
      // console.log(this.helthData);
      this.isNotEmpty = true;
      this.addLinkForm.controls['title'].setValue(this.mediaData.linkTitle);
      this.addLinkForm.controls['link'].setValue(this.mediaData.linkUrl);
    } else {
      console.log("No data");
    }
  }

  closeAddLink() {
    this.keyboard.close();
    this.viewCtrl.dismiss();
    

  }
  addLink(value) {
    console.log(value);
    this.isSubmit = true;
    if (value.title != null && value.title !== undefined && value.title != "" && value.link != null && value.link !== undefined && value.link != "" && this.addLinkForm.valid) {
      this.storage.get("userData").then((result) => {
        if (result) {
          if (!this.isNotEmpty) {
            
            
          console.log(result);
          console.log(result.userInfoModel);

          var data =
            {
              "userId": result.userInfoModel.userId,
              "ownerId": this.ownerId,
              "linkTitle": value.title,
              "linkUrl": value.link,
            }
          console.log(data);

          let loader = this.loadingCtrl.create({
            content: 'Please wait...'
          });
          loader.present();
          this.commonServices.submitData(data,result.token).subscribe(data => {
            loader.dismiss();
            // this.navCtrl.pop();
            this.closeAddLink();
            this.events.publish(Constant.KEY_NOTIFF.TabSelect,Constant.LifeStoryTab.Media);
            this.toastCtrl.create(data.data);


          }, error => {
            console.log(error);
            loader.dismiss();
            this.toastCtrl.create(error);
          });


        }

        else
        {
          console.log("Call PUT");
          
          let mediaData = {
            // "link": [
            //   {
            //     "userId": result.userInfoModel.userId,
            //     "ownerId": this.ownerId,
            //     "linkId":value.linkId,
            //     "linkTitle": value.title,
            //     "linkUrl": value.link,
            //   }
            //  ],
            userId: result.userInfoModel.userId,
            ownerId: this.ownerId,
            linkId:this.mediaData.linkId,
            linkUrl: value.link,
            linkTitle: value.title,
          }
          console.log("linkData== "+mediaData);
          this.lifeStoryService.putMediaLink(mediaData)
            .then(data => {
              console.log('data =', data);
              let mediaLinkObject: any;
              mediaLinkObject = data;
              this.toastCtrl.create(mediaLinkObject.data);
              
              this.viewCtrl.dismiss(mediaData);

            }, error => {
              console.log(error);
            });


        }
        }
      })
    }
  }
}
