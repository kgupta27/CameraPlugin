import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CareerAcademicModule } from '../career-academic/career-academic.module';
import { Storage } from '@ionic/storage';
import { UserCommonServices } from '../../../providers/usercommon-services';
import { Keyboard } from '@ionic-native/keyboard';
import { LifeStoryService } from '../../../providers/WebServices/LifeStory/LifeStoryService';
import { ToastServiceProvider } from '../../../providers/toast-service/toast-service';
import { EMAIL_REGES, TEXT_REGES, WITHOUT_FIRST_REGES, WITHOUT_FIRST_REGES_SPECIAL, NUMBER_REGES } from '../../../Utility/Constant';

@IonicPage()
@Component({
  selector: 'page-add-career-academic',
  templateUrl: 'add-career-academic.html',
})
export class AddCareerAcademicPage {

  careerForm: FormGroup;
  isValid: boolean = false;
  ownerId: any = 0;
  careerData: any;
  isNotEmpty: boolean = false;
  blankForm: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private fb: FormBuilder,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public commonServices: UserCommonServices,
    private keyboard: Keyboard,
    public storage: Storage,
    public lifeStoryService: LifeStoryService,
    public toastCtrl: ToastServiceProvider
  ) {
    this.careerForm = fb.group({
      'school': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'academic': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'publications': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'accolades': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'employemnt': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'workstory': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'business': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'accreditations': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'industryExperience': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'mentors': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'domains': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'skills': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'furtherLearning': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'companyWorkedFor': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'workRelatedLinks': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],

    });

    this.ownerId = navParams.data.ownerId;
    this.careerData = navParams.data.careerData;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCareerAcademicPage');

    if (Object.keys(this.careerData).length > 0) {
      console.log(this.careerData);
      this.isNotEmpty = true;
      this.careerForm.controls['school'].setValue(this.careerData.schoolsAttendant);
      this.careerForm.controls['academic'].setValue(this.careerData.academicAchievement);
      // this.careerForm.controls['sport'].setValue(this.careerData.sportsPlayed);
      // this.careerForm.controls['achiev'].setValue(this.careerData.lifeAchievement);
      this.careerForm.controls['publications'].setValue(this.careerData.publication);
      this.careerForm.controls['accolades'].setValue(this.careerData.accolades);
      this.careerForm.controls['employemnt'].setValue(this.careerData.employment);
      this.careerForm.controls['workstory'].setValue(this.careerData.workExperience);
      this.careerForm.controls['business'].setValue(this.careerData.businessesStarted);
      this.careerForm.controls['accreditations'].setValue(this.careerData.accreditations);
      this.careerForm.controls['industryExperience'].setValue(this.careerData.industryExperience);
      this.careerForm.controls['mentors'].setValue(this.careerData.mentors);
      this.careerForm.controls['domains'].setValue(this.careerData.domains);
      this.careerForm.controls['skills'].setValue(this.careerData.skills);
      this.careerForm.controls['furtherLearning'].setValue(this.careerData.furtherLearning);
      this.careerForm.controls['companyWorkedFor'].setValue(this.careerData.companyWorkedFor);
      this.careerForm.controls['workRelatedLinks'].setValue(this.careerData.workRelatedLinks);

    } else {
      console.log("No data");
    }
  }

  closeCareerAcademic() {
    this.keyboard.close();
    this.viewCtrl.dismiss();
  }

  addCareerAcademic(healthFormData) {
    this.isValid = true;
    this.keyboard.close();
    debugger;
    // if (healthFormData.school != null && healthFormData.school !== undefined && healthFormData.school != "" && healthFormData.academic != null && healthFormData.academic !== undefined && healthFormData.academic != "" && healthFormData.publications != null && healthFormData.publications !== undefined && healthFormData.publications != "" && healthFormData.accolades != null && healthFormData.accolades !== undefined && healthFormData.accolades != "" && healthFormData.employemnt != null && healthFormData.employemnt !== undefined && healthFormData.employemnt != "" && healthFormData.workstory != null && healthFormData.workstory !== undefined && healthFormData.workstory != "" && healthFormData.business != null && healthFormData.business !== undefined && healthFormData.business != "" && healthFormData.accreditations != null && healthFormData.accreditations !== undefined && healthFormData.accreditations != "" && healthFormData.industryExperience != null && healthFormData.industryExperience !== undefined && healthFormData.industryExperience != "" && healthFormData.mentors != null && healthFormData.mentors !== undefined && healthFormData.mentors != "" && healthFormData.domains != null && healthFormData.domains !== undefined && healthFormData.domains != "" && healthFormData.skills != null && healthFormData.skills !== undefined && healthFormData.skills != ""  && healthFormData.furtherLearning != null && healthFormData.furtherLearning !== undefined && healthFormData.furtherLearning != "" && healthFormData.companyWorkedFor != null && healthFormData.companyWorkedFor !== undefined && healthFormData.companyWorkedFor != "" && healthFormData.workRelatedLinks != null && healthFormData.workRelatedLinks !== undefined && healthFormData.workRelatedLinks != "") {key 
      // for(let key in healthFormData){
      //   if(healthFormData[key]==""){
      //     healthFormData[key]=null;
      //   }
      // }
  //   if (!this.validateText(this.careerForm.value.school)) {
  //     console.log("validateText: ", this.validateText(this.careerForm.value.school));
  //     this.formIndex = 1;
  //   }else if(!this.validateText(this.careerForm.value.academic)){
  //     this.formIndex =2;
  //   }else if(!this.validateText(this.careerForm.value.publications)){
  //     this.formIndex =3;
  //   }else if(!this.validateText(this.careerForm.value.accolades)){
  //     this.formIndex =4;
  //   }else if(!this.validateText(this.careerForm.value.employemnt)){
  //     this.formIndex =5;
  //   }else if(!this.validateText(this.careerForm.value.workstory)){
  //     this.formIndex =6;
  //   }else if(!this.validateText(this.careerForm.value.business)){
  //     this.formIndex =7;
  //   }else if(!this.validateText(this.careerForm.value.accreditations)){
  //     this.formIndex =8;
  //   }else if(!this.validateText(this.careerForm.value.industryExperience)){
  //     this.formIndex =9;
  //   }else if(!this.validateText(this.careerForm.value.companyWorkedFor)){
  //     this.formIndex =10;
  //   }else if(!this.validateText(this.careerForm.value.domains)){
  //     this.formIndex =11;
  //   }else if(!this.validateText(this.careerForm.value.skills)){
  //     this.formIndex =12;
  //   }else if(!this.validateText(this.careerForm.value.furtherLearning)){
  //     this.formIndex =13;
  //   }else if(!this.validateText(this.careerForm.value.companyWorkedFor)){
  //     this.formIndex =14;
  //   }else if(!this.validateText(this.careerForm.value.workRelatedLinks)){
  //     this.formIndex =15;
  //   // }
  // }else{
  //     this.isValid = false;
  //   }


  // healthFormData.forEach(function(element) {
  //   console.log(element);
  // });

  for(let key in healthFormData){
      if(healthFormData[key]=="" || healthFormData[key] == null){
        this.blankForm = true;
      }
      else{
          this.blankForm = false;
          break;
      }
    }
    console.log("Blank Form:: ",this.blankForm);

    for(let key in healthFormData){
        if(healthFormData[key]==""){
          healthFormData[key]=null;
        }
      }


    // if (!this.isValid) {
      // if (healthFormData.school != null && healthFormData.school !== undefined && healthFormData.school != "" && healthFormData.academic != null && healthFormData.academic !== undefined && healthFormData.academic != "" && healthFormData.sport != null && healthFormData.sport !== undefined && healthFormData.sport != "" && healthFormData.achiev != null && healthFormData.achiev !== undefined && healthFormData.achiev != "" && healthFormData.publications != null && healthFormData.publications !== undefined && healthFormData.publications != "" && healthFormData.accolades != null && healthFormData.accolades !== undefined && healthFormData.accolades != "" && healthFormData.employemnt != null && healthFormData.employemnt !== undefined && healthFormData.employemnt != "" && healthFormData.workstory != null && healthFormData.workstory !== undefined && healthFormData.workstory != "" && healthFormData.business != null && healthFormData.business !== undefined && healthFormData.business != "") {
      if(!this.blankForm){
      if (this.careerForm.valid) {
        this.isValid = false;

        this.storage.get("userData").then((result) => {
          if (result) {
            // console.log(result.userInfoModel);

            let careerData = {
              "academicAchievement": healthFormData.academic,
              "accolades": healthFormData.accolades,
              "businessesStarted": healthFormData.business,
              "employment": healthFormData.employemnt,
              "lifeAchievement": healthFormData.academic,
              "userId": result.userInfoModel.userId,
              "ownerId": this.ownerId,
              "publication": healthFormData.publications,
              "schoolsAttendant": healthFormData.school,
              // "sportsPlayed": healthFormData.sport,
              // "sportsRecord": healthFormData.achiev,
              "workExperience": healthFormData.workstory,
              "accreditations": healthFormData.accreditations,
              "industryExperience": healthFormData.industryExperience,
              "mentors": healthFormData.mentors,
              "domains": healthFormData.domains,
              "skills": healthFormData.skills,
              "furtherLearning": healthFormData.furtherLearning,
              "companyWorkedFor": healthFormData.companyWorkedFor,
              "workRelatedLinks": healthFormData.workRelatedLinks,
            };
            console.log(careerData);

            if (!this.isNotEmpty) {
              console.log("Submit, Now call POST");

              this.lifeStoryService.postCompetitionTraining(careerData)
                .then(data => {
                  console.log('life story data =', data);

                  let careerDataObject: any;
                  careerDataObject = data;
                  if (careerDataObject.responseCode == '200') {

                    this.toastCtrl.create(careerDataObject.data);
                    let modal = this.modalCtrl.create('CareerAcademicPage', { careerData: careerData });
                    modal.present();
                  }

                }, error => {
                  console.log(error);
                });
            } else {
              console.log("Update, Now call PUT");
              careerData['careerId'] = this.careerData.careerId;
              this.lifeStoryService.putCompetitionTraining(careerData)
                .then(data => {
                  console.log('life story data =', data);

                  let careerDataObject: any;
                  careerDataObject = data;
                  if (careerDataObject.responseCode == '200') {

                    this.toastCtrl.create(careerDataObject.data);
                    let modal = this.modalCtrl.create('CareerAcademicPage', { careerData: careerData });
                    modal.present();
                  }

                }, error => {
                  console.log(error);
                });
            }

          } else {
            console.log("Not logged in");
          }
        });

        // let modal = this.modalCtrl.create(CareerAcademicPage, { helthJourneyData: healthFormData });
        // modal.present();
      }
     else {
      this.isValid = true;
      console.log("False");
    }
  }else{
    this.toastCtrl.create('Please provide atleast one info to save');
  }
  }

  showCareerAcademics() {
    let modal = this.modalCtrl.create("CareerAcademicPage", { ownerId: this.ownerId, isProfile: true });
    modal.present();
  }

}
