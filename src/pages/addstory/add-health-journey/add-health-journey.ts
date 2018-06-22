import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HealthJourneyModule } from '../health-journey/health-journey.module';
import { Storage } from '@ionic/storage';
import { UserCommonServices } from '../../../providers/usercommon-services';
import { NUMBER_REGES, WITHOUT_FIRST_REGES_SPECIAL, TEXT_REGES, WITHOUT_FIRST_REGES } from '../../../Utility/Constant';
import { ToastServiceProvider } from '../../../providers/toast-service/toast-service';
import { Keyboard } from '@ionic-native/keyboard';
import { LifeStoryService } from '../../../providers/WebServices/LifeStory/LifeStoryService';


@IonicPage()
@Component({
  selector: 'page-add-health-journey',
  templateUrl: 'add-health-journey.html',
})
export class AddHealthJourneyPage {

  healthForm: FormGroup;
  isValid: boolean = false;
  isValidAge: boolean = false;
  ownerId: any = 0;
  helthData: any = {};
  isNotEmpty: boolean = false;
  urnType:any = 0;
  ownerName:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public commonServices: UserCommonServices,
    public storage: Storage,
    private viewController: ViewController,
    public lifeStoryService: LifeStoryService,
    public toastCtrl: ToastServiceProvider,
    public viewCtrl: ViewController,
    private keyboard: Keyboard,
  ) {
    this.healthForm = fb.group({
      'title': [null, [Validators.required, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)]],
      'age': [null, [Validators.required, Validators.pattern(NUMBER_REGES)]],
      'desc': [null, [Validators.required, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)]]
    });

    console.log(navParams.data);
    
    this.ownerId = navParams.data.ownerId;
    this.helthData = navParams.data.helthData;
    this.urnType = navParams.data.urnType;
    this.ownerName = navParams.data.ownerName;

    console.log("add health journey: ", this.urnType);
    if (typeof this.helthData === 'undefined'){
      this.helthData = {};
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddHealthJourneyPage');
    if (Object.keys(this.helthData).length > 0) {
      // console.log(this.helthData);
      this.isNotEmpty = true;
      this.healthForm.controls['title'].setValue(this.helthData.title);
      this.healthForm.controls['age'].setValue(this.helthData.age);
      this.healthForm.controls['desc'].setValue(this.helthData.description);
    } else {
      console.log("No data");
    }
  }

  closeHealthJourney() {
    this.keyboard.close();
    this.navCtrl.pop();
    // this.viewCtrl.dismiss(selectionRelationship);
  }

  addHealthJourney(healthFormData) {
    this.isValid = true;
    
    if (this.healthForm.valid) {
      this.isValid = false;

      this.storage.get("userData").then((result) => {
        if (result) {

          if (!this.isNotEmpty) {
            console.log("Call POST");

            let helthData = {
              "healths": [
                {
                  "age": healthFormData.age,
                  "description": healthFormData.desc,
                  "title": healthFormData.title
                }
              ],
              userId: result.userInfoModel.userId,
              ownerId: this.ownerId,
            }
            console.log(helthData);
            this.lifeStoryService.addHelthJourney(helthData)
              .then(data => {
                console.log('helth data =', data);

                let helthDataObject: any;
                helthDataObject = data;
                if (helthDataObject.responseCode == '200' ) {

                  this.toastCtrl.create(helthDataObject.data);
                  let modal = this.modalCtrl.create("HealthJourneyPage", { ownerId: this.ownerId, urnType:this.urnType, ownerName:this.ownerName });
                  modal.present();
                }
              }, error => {
                console.log(error);
              });

          } else {
            console.log("Call PUT");
            
            let helthData = {
              "healths": [
                {
                  "age": healthFormData.age,
                  "description": healthFormData.desc,
                  "title": healthFormData.title,
                  "healthId": this.helthData.id,
                }
              ],
              userId: result.userInfoModel.userId,
              ownerId: this.ownerId,
            }
            
            this.lifeStoryService.putHelthJourney(helthData)
              .then(data => {
                console.log('helth data =', data);
                
                let helthDataObject: any;
                helthDataObject = data;
                this.toastCtrl.create(helthDataObject.data);
                
                this.viewCtrl.dismiss(helthData);

              }, error => {
                console.log(error);
              });
          }

        }
      });

    } else {
      this.isValid = true;
      console.log("False");
    }
  }

  isAgeChanged(searchValue: string) {
    console.log(searchValue);
  }
}
