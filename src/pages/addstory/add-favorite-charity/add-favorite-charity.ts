import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, LoadingController, Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CareerAcademicPage } from '../career-academic/career-academic';
import { Storage } from '@ionic/storage';
import { UserCommonServices } from '../../../providers/usercommon-services';
import { URL, WITHOUT_FIRST_REGES_SPECIAL, EMAIL_REGES, TEXT_REGES, WITHOUT_FIRST_REGES, NUMBER_REGES } from '../../../Utility/Constant';
import * as Constant from '../../../Utility/Constant';
import { Keyboard } from '@ionic-native/keyboard';
import { InterestnPassionService } from '../../../providers/WebServices/LifeStory/InterestnPassionService';
@IonicPage()
@Component({
  selector: 'page-add-favorite-charity',
  templateUrl: 'add-favorite-charity.html',
})
export class AddFavoriteCharityPage {
  ownerId: any = 0;
  isSubmit: boolean = false;
  charityUrlForm: FormGroup;
  charityUrl: any;
  ischarityUrl: boolean = false;
  public _baseUrl: any;
  constructor(public interestnPassion: InterestnPassionService, private keyboard: Keyboard, public viewCtrl: ViewController, public commonServices: UserCommonServices, public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, private fb: FormBuilder, private storage: Storage, public events: Events) {
    debugger
    if (navParams.data.data == undefined) {
      this.ownerId = navParams.data.ownerId;
    } else {
      this.ownerId = navParams.data.data.ownerId;
      console.log('charityData  ', navParams.data.data.charityData)
    }
    // this._baseUrl = configService.getApiURI();
    
    this.charityUrlForm = fb.group({
      'charityUrl': [null, [Validators.required, Validators.pattern(URL)]],

    });
  }

  ionViewDidLoad() {
    this.getCharityUrl();
    console.log("this.navParams.data.data = ", this.navParams.data.data);

    if (this.navParams.data.data != undefined) {
      console.log("yes");
      this.charityUrl = this.navParams.data.data.charityData.charityUrl;
      this.charityUrlForm.controls['charityUrl'].setValue(this.charityUrl);
      this.ischarityUrl = true;
    } else {
      console.log("No");
    }
    console.log('ionViewDidLoad addcharityUrl');
  }

  closeAddLink(charityUrl?) {
    let data = {
      charityUrl: charityUrl
    }
    this.keyboard.close();
    if (charityUrl != '' && charityUrl != undefined) {
      this.viewCtrl.dismiss(data);
    } else {
      this.viewCtrl.dismiss();
    }
  }
  addCharityUr(value) {
    console.log(value);
    this.isSubmit = true;
    if (value.charityUrl != null && value.charityUrl !== undefined && value.charityUrl != "" && this.charityUrlForm.valid) {
      this.storage.get("userData").then((result) => {
        if (result) {
          console.log(result);
          console.log(result.userInfoModel);
          value.charityUrl = this.addhttp(value.charityUrl);
          var data =
            {
              "userId": result.userInfoModel.userId,
              "ownerId": this.ownerId,
              "charityUrl": value.charityUrl
            }
          console.log(data);

          let loader = this.loadingCtrl.create({
            content: 'Please wait...'
          });
          loader.present();
          if(this.ischarityUrl == false){
          this.commonServices.addUpdateCharityUrl(data, result.token).subscribe(data => {
            loader.dismiss();
            this.closeAddLink(value.charityUrl);

            //this.events.publish(Constant.KEY_NOTIFF.TabSelect,Constant.LifeStoryTab.Profile);

          }, error => {
            console.log(error);
            loader.dismiss();
            // this.toastCtrl.create(error);
          });
        }else{
          this.commonServices.addUpdateCharityUrl(data, result.token).subscribe(data => {
            loader.dismiss();
            this.closeAddLink(value.charityUrl);

            //this.events.publish(Constant.KEY_NOTIFF.TabSelect,Constant.LifeStoryTab.Profile);

          }, error => {
            console.log(error);
            loader.dismiss();
            // this.toastCtrl.create(error);
          });
        }
        }
      })
    }
  }
  getCharityUrl() {

    this.storage.get("userData").then((result) => {

      var params = {
        'userId': result.userInfoModel.userId,
        'ownerId': this.ownerId,
        'page': '1',
        'size': '1'
      };

      this.interestnPassion.fetchFavoriteCharity(params)
        .then(data => {
          debugger
          // this.charityData = data;
          console.log(data);
          this.charityUrl = data;
          if (this.charityUrl.charityUrl) {
            this.charityUrlForm.controls['charityUrl'].setValue(this.charityUrl.charityUrl);
            this.ischarityUrl = true;
          }else{
            this.ischarityUrl = false;
          }

          /*if (this.charityUrl.charityUrl != "" ) {
            
          }*/
          
        }, error => {
          //debugger;
          console.log(error);
        });

    });
  }
 addhttp(url) {
    if (!/^(f|ht)tps?:\/\//i.test(url)) {
       url = "http://" + url;
    }
    return url;
 }
}
