import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { InterestsPassionsPage } from '../interests-passions/interests-passions';
import { Storage } from '@ionic/storage';
import { UserCommonServices } from '../../../providers/usercommon-services';
import { InterestnPassionService } from '../../../providers/WebServices/LifeStory/InterestnPassionService';
import { Keyboard } from '@ionic-native/keyboard';
import { LifeStoryService } from '../../../providers/WebServices/LifeStory/LifeStoryService';
import { SharedTaskProvider } from '../../../providers/SharedTask/sharedtask';
import { WITHOUT_FIRST_REGES_SPECIAL } from '../../../Utility/Constant';
import { CompetitionsTrainingPageModule } from '../competitions-training/competitions-training.module';

@IonicPage()
@Component({
  selector: 'page-add-competitions-training',
  templateUrl: 'add-competitions-training.html',
})
export class AddCompetitionsTrainingPage {

  competitionsTrainingForm: FormGroup;
  isValid: boolean = false;
  ownerId: any = 0;
  trainingData: any;
  isNotEmpty: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private fb: FormBuilder,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public commonServices: UserCommonServices,
    public interestPassionService: InterestnPassionService,
    private keyboard: Keyboard,
    public lifeStoryService: LifeStoryService,
    public storage: Storage,
    public sharedTaskProvider: SharedTaskProvider
  ) {
    this.competitionsTrainingForm = fb.group({
      "breeder": [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      "bloodLine": [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      "training": [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      "competitions": [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      "publications": [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      "achievements": [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      "accolades": [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)]
    });

    this.ownerId = navParams.data.ownerId;
    this.trainingData = navParams.data.trainingdata;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCompetitionsTrainingPage');
    console.log(this.trainingData);
    if (Object.keys(this.trainingData).length > 0) {
      console.log("Not Blank");
      this.isNotEmpty = true;
    }

    this.competitionsTrainingForm.controls['breeder'].setValue(this.trainingData.breeder);
    this.competitionsTrainingForm.controls['bloodLine'].setValue(this.trainingData.bloodLine);
    this.competitionsTrainingForm.controls['training'].setValue(this.trainingData.training);
    this.competitionsTrainingForm.controls['competitions'].setValue(this.trainingData.competitions);
    this.competitionsTrainingForm.controls['publications'].setValue(this.trainingData.publications);
    this.competitionsTrainingForm.controls['achievements'].setValue(this.trainingData.achievements);
    this.competitionsTrainingForm.controls['accolades'].setValue(this.trainingData.accolades);


    //this.competitionsTrainingForm.setValue(this.trainingData);
  }

  closeCompetitionsTraining() {
    this.keyboard.close();

    // let modal = this.modalCtrl.create("CompetitionsTrainingPage", {storyData: this.trainingData});
    // modal.present();
    this.navCtrl.pop();
  }

  addCompetitionsTraining(interestPassionFormData) {
    console.log(interestPassionFormData);
    var emptyForm: boolean = true;

    if (interestPassionFormData.accolades != null || interestPassionFormData.achievements != null || interestPassionFormData.bloodLine != null || interestPassionFormData.breeder != null || interestPassionFormData.competitions != null || interestPassionFormData.publications != null || interestPassionFormData.training != null) {
      emptyForm = false;
    }
    this.isValid = true;
    this.keyboard.close();

    // if (interestPassionFormData.breeder != null && interestPassionFormData.breeder !== undefined && interestPassionFormData.breeder != "" && interestPassionFormData.bloodLine != null && interestPassionFormData.bloodLine !== undefined && interestPassionFormData.bloodLine != "" && interestPassionFormData.training != null && interestPassionFormData.training !== undefined && interestPassionFormData.training != "" && interestPassionFormData.competitions != null && interestPassionFormData.competitions !== undefined && interestPassionFormData.competitions != "" && interestPassionFormData.publications != null && interestPassionFormData.publications !== undefined && interestPassionFormData.publications != "" && interestPassionFormData.achievements != null && interestPassionFormData.achievements !== undefined && interestPassionFormData.achievements != "" && interestPassionFormData.accolades != null && interestPassionFormData.accolades !== undefined && interestPassionFormData.accolades != "") {
    //   this.isValid = false;
    if (!emptyForm) {
      if (this.competitionsTrainingForm.valid) {
        this.storage.get("userData").then((result) => {
          if (result) {
            // console.log(result.userInfoModel);

            let interestData = {
              "userId": result.userInfoModel.userId,
              "ownerId": this.ownerId,
              "breeder": interestPassionFormData.breeder,
              "bloodLine": interestPassionFormData.bloodLine,
              "training": interestPassionFormData.training,
              "competitions": interestPassionFormData.competitions,
              "publications": interestPassionFormData.publications,
              "achievements": interestPassionFormData.achievements,
              "accolades": interestPassionFormData.accolades

            };
            console.log(interestData);

            // let loader = this.loadingCtrl.create({
            //   content: 'Please wait...'
            // });
            // loader.present();

            /*setTimeout(() => {
              loader.dismiss();
              try { this.closeCompetitionsTraining(); }catch(e){ }
            }, 5000);*/

            // debugger;
            // try{

            if (!this.isNotEmpty) {
              // console.log("Now call POST method.");
              // this.commonServices.submitData( interestData, "api/v1/story/competitionTraining", result.token).subscribe(data => {
              //   var careerJson = JSON.parse(data);
              //   console.log(careerJson);
              //   loader.dismiss();

              //   if(careerJson.responseCode == '200'){
              //     this.closeCompetitionsTraining();
              //     // let modal = this.modalCtrl.create(InterestsPassionsPage, { interestData: interestData });
              //     // modal.present();
              //   } else {
              //     console.log("Something went wrong.");
              //    }
              // });

              this.lifeStoryService.postCompetitionnTraining(interestData)
                .then(data => {
                  console.log('life story data =', data);
                  //loader.dismiss();
                  let trainingObject: any;
                  trainingObject = data;
                  if (trainingObject.responseCode == '200') {
                    // this.closeCompetitionsTraining();
                    let message = trainingObject.data;
                    this.sharedTaskProvider.showToastMessage(message);

                    let modal = this.modalCtrl.create("CompetitionsTrainingPage", { storyData: interestData });
                    modal.present();
                  }

                }, error => {
                  console.log(error);
                });
            }


            else {
              console.log("Now call PUT method.");
              interestData['competitionId'] = this.trainingData.competitionId;
              this.lifeStoryService.fetCompetitionnTraining(interestData)
                .then(data => {
                  console.log('life story data =', data);
                  //loader.dismiss();
                  let trainingObject: any;
                  trainingObject = data;
                  if (trainingObject.responseCode == '200') {
                    // this.closeCompetitionsTraining();
                    let message = trainingObject.data;
                    this.sharedTaskProvider.showToastMessage(message);


                    let modal = this.modalCtrl.create("CompetitionsTrainingPage", { storyData: interestData });
                    modal.present();
                  }

                }, error => {
                  console.log(error);
                });

            }

            // }catch(e){
            //   loader.dismiss();
            // }
          } else {
            console.log("Not logged in");
          }
        });

        // let modal = this.modalCtrl.create(InterestsPassionsPage, { helthJourneyData: interestPassionFormData });
        // modal.present();
        // } else {
        //   this.isValid = true;
        //   console.log("False");
        // }
      }
    }
    else {
      console.log("Form is blank");
      this.sharedTaskProvider.showToastMessage('Please enter data in any of the above field');
    }
  }

}
