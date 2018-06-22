import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { InterestsPassionsModule } from '../interests-passions/interests-passions.module';
import { Storage } from '@ionic/storage';
import { UserCommonServices } from '../../../providers/usercommon-services';
import { InterestnPassionService } from '../../../providers/WebServices/LifeStory/InterestnPassionService';
import { Keyboard } from '@ionic-native/keyboard';
import { WITHOUT_FIRST_REGES_SPECIAL } from '../../../Utility/Constant';
import { SharedTaskProvider } from '../../../providers/SharedTask/sharedtask';


@IonicPage()
@Component({
  selector: 'page-add-interest-passion',
  templateUrl: 'add-interest-passion.html',
})
export class AddInterestPassionPage {

  interestForm: FormGroup;
  isValid: boolean = false;
  ownerId: any = 0;
  urnType: any = 0;
  isNotEmpty: boolean = false;
  InterestData: any;
  blankForm: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private fb: FormBuilder,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public commonServices: UserCommonServices,
    public interestPassionService: InterestnPassionService,
    public storage: Storage,
    private keyboard: Keyboard,
    public sharedTaskProvider: SharedTaskProvider
  ) {
    this.interestForm = fb.group({
      'favcolor': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'favbook': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'favouriteMusicBandSong': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      // 'favband': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'favconcert': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'favfoods': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'favperson': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'favpet': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'spirituality': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'favcar': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'visitedplace': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'visitedplacelive': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'sportsplayed': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'favmovies': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'saying': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'relax': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'hobbies': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      // 'pastime': [null, Validators.compose([  Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)])],
      'people': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'lookalike': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'wisdom': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'mantra': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      // 'sport': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'sportsRecord': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'howManyChildren': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'pets': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'bestFriends': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'whoDoYouMiss': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'worstEnemy': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'aspireToBeLike': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'ultimateDinnerPartyGuests': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'greatestFear': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'greatestAchievement': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'mostProudOf': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      // 'degreesOfSeparation': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'bestTimeInLife': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'worstTimeInLife': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      // 'strugglesEncountered': [null, Validators.compose([Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)])],
      'ifYouCouldDoItOverAgain': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'bestAdviseYouReceived': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'firstJob': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'worstJob': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'bestJob': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'bestHoliday': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'bestJokeIKnow': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'whoMakesYouLaugh': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'whatMakesYouCry': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      // 'desertedIslandCompanion': [null, Validators.compose([Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)])],
      'whatWouldYouChangeAboutTheWorld': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'ifYouCouldWhatWouldYouComeBackAs': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'bestTheatrePerformance': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'furBestFriend': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'favouritePark': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
      'owners': [null, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)],
    });

    this.ownerId = navParams.data.ownerId;
    this.urnType = navParams.data.urnType;
    this.InterestData = navParams.data.interestData;

    if (this.urnType == "1") {
      this.interestForm.controls['favperson'].setValidators(null);
      this.interestForm.controls['visitedplacelive'].setValidators(null);
    }
    else if (this.urnType == "2") {
      // this.interestForm.controls['favband'].setValidators(null);
      this.interestForm.controls['favbook'].setValidators(null);
      this.interestForm.controls['favcar'].setValidators(null);
      this.interestForm.controls['favcolor'].setValidators(null);
      this.interestForm.controls['favconcert'].setValidators(null);
      this.interestForm.controls['favmovies'].setValidators(null);
      this.interestForm.controls['favouriteMusicBandSong'].setValidators(null);
      this.interestForm.controls['favpet'].setValidators(null);
      this.interestForm.controls['hobbies'].setValidators(null);
      this.interestForm.controls['lookalike'].setValidators(null);
      this.interestForm.controls['mantra'].setValidators(null);
      this.interestForm.controls['saying'].setValidators(null);
      this.interestForm.controls['spirituality'].setValidators(null);
      this.interestForm.controls['sportsplayed'].setValidators(null);
      this.interestForm.controls['visitedplace'].setValidators(null);
      this.interestForm.controls['wisdom'].setValidators(null);
      this.interestForm.controls['sportsRecord'].setValidators(null);
      this.interestForm.controls['howManyChildren'].setValidators(null);
      this.interestForm.controls['pets'].setValidators(null);
      this.interestForm.controls['bestFriends'].setValidators(null);
      this.interestForm.controls['whoDoYouMiss'].setValidators(null);
      this.interestForm.controls['worstEnemy'].setValidators(null);
      this.interestForm.controls['aspireToBeLike'].setValidators(null);
      this.interestForm.controls['ultimateDinnerPartyGuests'].setValidators(null);
      this.interestForm.controls['greatestAchievement'].setValidators(null);
      this.interestForm.controls['mostProudOf'].setValidators(null);
      // this.interestForm.controls['degreesOfSeparation'].setValidators(null);
      this.interestForm.controls['bestTimeInLife'].setValidators(null);
      this.interestForm.controls['worstTimeInLife'].setValidators(null);
      // this.interestForm.controls['strugglesEncountered'].setValidators(null);
      this.interestForm.controls['ifYouCouldDoItOverAgain'].setValidators(null);
      this.interestForm.controls['bestAdviseYouReceived'].setValidators(null);
      this.interestForm.controls['firstJob'].setValidators(null);
      this.interestForm.controls['worstJob'].setValidators(null);
      this.interestForm.controls['bestJob'].setValidators(null);
      this.interestForm.controls['bestHoliday'].setValidators(null);
      this.interestForm.controls['bestJokeIKnow'].setValidators(null);
      this.interestForm.controls['whoMakesYouLaugh'].setValidators(null);
      this.interestForm.controls['whatMakesYouCry'].setValidators(null);
      // this.interestForm.controls['desertedIslandCompanion'].setValidators(null);
      this.interestForm.controls['whatWouldYouChangeAboutTheWorld'].setValidators(null);
      this.interestForm.controls['ifYouCouldWhatWouldYouComeBackAs'].setValidators(null);
      this.interestForm.controls['bestTheatrePerformance'].setValidators(null);

    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddInterestPassionPage');
    console.log(this.InterestData);
    if (Object.keys(this.InterestData).length > 0) {
      // console.log("Not Blank");
      this.isNotEmpty = true;
    }

    this.interestForm.controls['favcolor'].setValue(this.InterestData.colour);
    this.interestForm.controls['favouriteMusicBandSong'].setValue(this.InterestData.favouriteMusicBandSong);
    this.interestForm.controls['favbook'].setValue(this.InterestData.book);
    // this.interestForm.controls['favband'].setValue(this.InterestData.band);
    this.interestForm.controls['favconcert'].setValue(this.InterestData.firstConcert);
    this.interestForm.controls['favfoods'].setValue(this.InterestData.food);
    this.interestForm.controls['favperson'].setValue(this.InterestData.person);
    this.interestForm.controls['favpet'].setValue(this.InterestData.favouritePetAnimal);
    this.interestForm.controls['spirituality'].setValue(this.InterestData.spirituality);
    this.interestForm.controls['favcar'].setValue(this.InterestData.car);
    this.interestForm.controls['visitedplace'].setValue(this.InterestData.placeVisited);
    this.interestForm.controls['visitedplacelive'].setValue(this.InterestData.placeVisited);
    this.interestForm.controls['sportsplayed'].setValue(this.InterestData.sportsPlayed);
    this.interestForm.controls['favmovies'].setValue(this.InterestData.movie);
    this.interestForm.controls['saying'].setValue(this.InterestData.sayings);
    this.interestForm.controls['relax'].setValue(this.InterestData.waysToRelax);
    this.interestForm.controls['hobbies'].setValue(this.InterestData.hobbies);
    // this.interestForm.controls['pastime'].setValue(this.InterestData.pastTimes);
    this.interestForm.controls['people'].setValue(this.InterestData.influencer);
    this.interestForm.controls['lookalike'].setValue(this.InterestData.lookalike);
    this.interestForm.controls['wisdom'].setValue(this.InterestData.wordsOfWisdom);
    this.interestForm.controls['mantra'].setValue(this.InterestData.mantra);
    this.interestForm.controls['sportsRecord'].setValue(this.InterestData.sportsRecord);
    this.interestForm.controls['howManyChildren'].setValue(this.InterestData.howManyChildren);
    this.interestForm.controls['pets'].setValue(this.InterestData.pets);
    this.interestForm.controls['bestFriends'].setValue(this.InterestData.bestFriends);
    this.interestForm.controls['whoDoYouMiss'].setValue(this.InterestData.whoDoYouMiss);
    this.interestForm.controls['worstEnemy'].setValue(this.InterestData.worstEnemy);
    this.interestForm.controls['aspireToBeLike'].setValue(this.InterestData.aspireToBeLike);
    this.interestForm.controls['ultimateDinnerPartyGuests'].setValue(this.InterestData.ultimateDinnerPartyGuests);
    this.interestForm.controls['greatestFear'].setValue(this.InterestData.greatestFear);
    this.interestForm.controls['greatestAchievement'].setValue(this.InterestData.greatestAchievement);
    this.interestForm.controls['mostProudOf'].setValue(this.InterestData.mostProudOf);
    // this.interestForm.controls['degreesOfSeparation'].setValue(this.InterestData.degreesOfSeparation);
    this.interestForm.controls['bestTimeInLife'].setValue(this.InterestData.bestTimeInLife);
    this.interestForm.controls['worstTimeInLife'].setValue(this.InterestData.worstTimeInLife);
    // this.interestForm.controls['strugglesEncountered'].setValue(this.InterestData.strugglesEncountered);
    this.interestForm.controls['ifYouCouldDoItOverAgain'].setValue(this.InterestData.ifYouCouldDoItOverAgain);
    this.interestForm.controls['bestAdviseYouReceived'].setValue(this.InterestData.bestAdviseYouReceived);
    this.interestForm.controls['firstJob'].setValue(this.InterestData.firstJob);
    this.interestForm.controls['worstJob'].setValue(this.InterestData.worstJob);
    this.interestForm.controls['bestJob'].setValue(this.InterestData.bestJob);
    this.interestForm.controls['bestHoliday'].setValue(this.InterestData.bestHoliday);
    this.interestForm.controls['bestJokeIKnow'].setValue(this.InterestData.bestJokeIKnow);
    this.interestForm.controls['whoMakesYouLaugh'].setValue(this.InterestData.whoMakesYouLaugh);
    this.interestForm.controls['whatMakesYouCry'].setValue(this.InterestData.whatMakesYouCry);
    // this.interestForm.controls['desertedIslandCompanion'].setValue(this.InterestData.desertedIslandCompanion);
    this.interestForm.controls['whatWouldYouChangeAboutTheWorld'].setValue(this.InterestData.whatWouldYouChangeAboutTheWorld);
    this.interestForm.controls['ifYouCouldWhatWouldYouComeBackAs'].setValue(this.InterestData.ifYouCouldWhatWouldYouComeBackAs);
    this.interestForm.controls['bestTheatrePerformance'].setValue(this.InterestData.bestTheatrePerformance);
    this.interestForm.controls['furBestFriend'].setValue(this.InterestData.furBestFriend);
    this.interestForm.controls['favouritePark'].setValue(this.InterestData.favouritePark);
    this.interestForm.controls['owners'].setValue(this.InterestData.owners);

  }

  closeInterestPassion() {
    this.keyboard.close();
    this.viewCtrl.dismiss();

    //  this.navCtrl.pop();
  }

  addInterestPassion(interestPassionFormData) {
    console.log(interestPassionFormData);
    this.isValid = true;
    this.keyboard.close();

    debugger
    for(let key in this.interestForm.value){
      if(this.interestForm.value[key]==""){
        this.interestForm.value[key]=null;
      }
    }

    if (this.urnType == "1") {
      console.log("Human");
      // if (interestPassionFormData.favcolor != null && interestPassionFormData.favcolor !== undefined && interestPassionFormData.favcolor != "" && interestPassionFormData.favbook != null && interestPassionFormData.favbook !== undefined && interestPassionFormData.favbook != "" && interestPassionFormData.favmusic != null && interestPassionFormData.favmusic !== undefined && interestPassionFormData.favmusic != "" && interestPassionFormData.favband != null && interestPassionFormData.favband !== undefined && interestPassionFormData.favband != "" && interestPassionFormData.favconcert != null && interestPassionFormData.favconcert !== undefined && interestPassionFormData.favconcert != "" && interestPassionFormData.favfoods != null && interestPassionFormData.favfoods !== undefined && interestPassionFormData.favfoods != "" && interestPassionFormData.favpet != null && interestPassionFormData.favpet !== undefined && interestPassionFormData.favpet != "" && interestPassionFormData.spirituality != null && interestPassionFormData.spirituality !== undefined && interestPassionFormData.spirituality != "" && interestPassionFormData.favcar != null && interestPassionFormData.favcar !== undefined && interestPassionFormData.favcar != "" && interestPassionFormData.visitedplace != null && interestPassionFormData.visitedplace !== undefined && interestPassionFormData.visitedplace != "" && interestPassionFormData.sportsplayed != null && interestPassionFormData.sportsplayed !== undefined && interestPassionFormData.sportsplayed != "" && interestPassionFormData.favmovies != null && interestPassionFormData.favmovies !== undefined && interestPassionFormData.favmovies != "" && interestPassionFormData.saying != null && interestPassionFormData.saying !== undefined && interestPassionFormData.saying != "" && interestPassionFormData.relax != null && interestPassionFormData.relax !== undefined && interestPassionFormData.relax != "" && interestPassionFormData.hobbies != null && interestPassionFormData.hobbies !== undefined && interestPassionFormData.hobbies != "" && interestPassionFormData.pastime != null && interestPassionFormData.pastime !== undefined && interestPassionFormData.pastime != "" && interestPassionFormData.people != null && interestPassionFormData.people !== undefined && interestPassionFormData.people != "" && interestPassionFormData.lookalike != null && interestPassionFormData.lookalike !== undefined && interestPassionFormData.lookalike != "" && interestPassionFormData.wisdom != null && interestPassionFormData.wisdom !== undefined && interestPassionFormData.wisdom != "" && interestPassionFormData.mantra != null && interestPassionFormData.mantra !== undefined && interestPassionFormData.mantra != "") {

      if (this.interestForm.valid) {
        console.log(this.interestForm.valid);
        this.storage.get("userData").then((result) => {
          if (result) {
            let interestData = {
              "userId": result.userInfoModel.userId,
              "ownerId": this.ownerId,
              "colour": interestPassionFormData.favcolor,
              "book": interestPassionFormData.favbook,
              "favouriteMusicBandSong": interestPassionFormData.favouriteMusicBandSong,
              "food": interestPassionFormData.favfoods,
              "spirituality": interestPassionFormData.spirituality,
              "car": interestPassionFormData.favcar,
              "placeVisited": interestPassionFormData.visitedplace,
              "sportsPlayed": interestPassionFormData.sportsplayed,
              "movie": interestPassionFormData.favmovies,
              "sayings": interestPassionFormData.saying,
              "waysToRelax": interestPassionFormData.relax,
              "hobbies": interestPassionFormData.hobbies,
              // "pastTimes": interestPassionFormData.pastime,
              "influencer": interestPassionFormData.people,
              "lookalike": interestPassionFormData.lookalike,
              // "band": interestPassionFormData.favband,
              "firstConcert": interestPassionFormData.favconcert,
              "favouritePetAnimal": interestPassionFormData.favpet,
              "wordsOfWisdom": interestPassionFormData.wisdom,
              "mantra": interestPassionFormData.mantra,
              "sportsRecord": interestPassionFormData.sportsRecord,
              "howManyChildren": interestPassionFormData.howManyChildren,
              "pets": interestPassionFormData.pets,
              "bestFriends": interestPassionFormData.bestFriends,
              "whoDoYouMiss": interestPassionFormData.whoDoYouMiss,
              "worstEnemy": interestPassionFormData.worstEnemy,
              "aspireToBeLike": interestPassionFormData.aspireToBeLike,
              "ultimateDinnerPartyGuests": interestPassionFormData.ultimateDinnerPartyGuests,
              "greatestFear": interestPassionFormData.greatestFear,
              "greatestAchievement": interestPassionFormData.greatestAchievement,
              "mostProudOf": interestPassionFormData.mostProudOf,
              // "degreesOfSeparation": interestPassionFormData.degreesOfSeparation,
              "bestTimeInLife": interestPassionFormData.bestTimeInLife,
              "worstTimeInLife": interestPassionFormData.worstTimeInLife,
              // "strugglesEncountered": interestPassionFormData.strugglesEncountered,
              "ifYouCouldDoItOverAgain": interestPassionFormData.ifYouCouldDoItOverAgain,
              "bestAdviseYouReceived": interestPassionFormData.bestAdviseYouReceived,
              "firstJob": interestPassionFormData.firstJob,
              "worstJob": interestPassionFormData.worstJob,
              "bestJob": interestPassionFormData.bestJob,
              "bestHoliday": interestPassionFormData.bestHoliday,
              "bestJokeIKnow": interestPassionFormData.bestJokeIKnow,
              "whoMakesYouLaugh": interestPassionFormData.whoMakesYouLaugh,
              "whatMakesYouCry": interestPassionFormData.whatMakesYouCry,
              // "desertedIslandCompanion": interestPassionFormData.desertedIslandCompanion,
              "whatWouldYouChangeAboutTheWorld": interestPassionFormData.whatWouldYouChangeAboutTheWorld,
              "ifYouCouldWhatWouldYouComeBackAs": interestPassionFormData.ifYouCouldWhatWouldYouComeBackAs,
              "bestTheatrePerformance": interestPassionFormData.bestTheatrePerformance,

            };
            console.log(interestData);



            if (!this.isNotEmpty) {
              this.postInterestPassion(interestData, result.token);
            }
            else {
              //console.log("Not logged in");
              this.putInterestPassion(interestData);
            }

          } else {
            console.log("Not logged in");
          }
        });
      }
      else {
        // this.isValid = true;
        console.log("False");
        console.log(this.interestForm.valid);
      }
    }
    else {
      console.log("Pet");
      // if (interestPassionFormData.favfoods != null &&
      //    interestPassionFormData.favfoods !== undefined && 
      //    interestPassionFormData.favfoods != "" && 
      //    interestPassionFormData.favperson != null && 
      //    interestPassionFormData.favperson !== undefined && 
      //    interestPassionFormData.favperson != "" && 
      //    interestPassionFormData.pastime != null && 
      //    interestPassionFormData.pastime !== undefined && 
      //    interestPassionFormData.pastime != "" && 
      //    interestPassionFormData.people != null && 
      //    interestPassionFormData.people !== undefined &&
      //     interestPassionFormData.people != "" && 
      //     interestPassionFormData.relax != null && 
      //     interestPassionFormData.relax !== undefined && 
      //     interestPassionFormData.relax != "" && interestPassionFormData.visitedplacelive != null && interestPassionFormData.visitedplacelive !== undefined && interestPassionFormData.visitedplacelive != "") {

      if (this.interestForm.valid) {
        console.log(this.interestForm.valid);

        this.storage.get("userData").then((result) => {
          if (result) {
            let interestData = {
              "userId": result.userInfoModel.userId,
              "ownerId": this.ownerId,
              "person": interestPassionFormData.favperson,
              "food": interestPassionFormData.favfoods,
              "placeVisited": interestPassionFormData.visitedplacelive,
              "waysToRelax": interestPassionFormData.relax,
              // "pastTimes": interestPassionFormData.pastime,
              "influencer": interestPassionFormData.people,
              "furBestFriend": interestPassionFormData.furBestFriend,
              "favouritePark": interestPassionFormData.favouritePark,
              "owners": interestPassionFormData.owners
            };
            console.log(interestData);

            if (!this.isNotEmpty) {
              this.postInterestPassion(interestData, result.token);
            }
            else {
              //console.log("Not logged in");
              this.putInterestPassion(interestData);
            }
          }

        });
      }
      else {

        console.log("False");
        console.log(this.interestForm.valid);

      }
    }
  }

  postInterestPassion(interestData, token) {

    debugger
    for (let key in this.interestForm.value) {
      if (this.interestForm.value[key] == "" || this.interestForm.value[key] == null) {
        this.blankForm = true;
      }
      else {
        this.blankForm = false;
        break;
      }
    }
    console.log("Blank Form:: ", this.blankForm);

    if (!this.blankForm) {
      this.interestPassionService.postinterestsPassion(interestData)
        .then(data => {
          console.log('life story data =', data);
          //loader.dismiss();
          let InterestObject: any;
          InterestObject = data;
          if (InterestObject.responseCode == '200') {

            let message = InterestObject.data;
            this.sharedTaskProvider.showToastMessage(message);

            let modal = this.modalCtrl.create("InterestsPassionsPage", { storyData: interestData, urnType: this.urnType });
            modal.present();
          }

        }, error => {
          console.log(error);
        });

    } else {
      this.sharedTaskProvider.showToastMessage('Please provide atleast one info to save');
    }

    // let loader = this.loadingCtrl.create({
    //   content: 'Please wait...'
    // });
    // loader.present();

    // /*setTimeout(() => {
    //   loader.dismiss();
    //   try { this.closeInterestPassion(); }catch(e){ }
    // }, 5000);*/

    // // debugger;
    // // try{

    // this.commonServices.submitData(interestData, "api/v1/story/interestPassion", token).subscribe(data => {
    //   var careerJson = JSON.parse(data);
    //   console.log(careerJson);
    //   loader.dismiss();

    //   if (careerJson.success) {

    //     // this.closeInterestPassion();

    //     /*if (this.urnType == "1") {
    //       let modal = this.modalCtrl.create("InterestsPassionsPage", { interestData: interestData });
    //       modal.present();
    //     }else{
    //        //this.closeInterestPassion();
    //     }*/

    //     setTimeout(() => {
    //       this.closeInterestPassion();
    //     }, 1000);

    //   } else {
    //     console.log("Something went wrong.");
    //   }



    // });


  }

  putInterestPassion(interestData) {
    debugger
    for (let key in this.interestForm.value) {
      if (this.interestForm.value[key] == "" || this.interestForm.value[key] == null) {
        // this.interestForm.value[key] = null;
        this.blankForm = true;
      }
      else {
        this.blankForm = false;
        break;
      }
    }
    console.log("Blank Form:: ", this.blankForm);

    if (!this.blankForm) {
      console.log("Now call PUT method.");
      interestData['interestId'] = this.InterestData.interestId;
      this.interestPassionService.putinterestsPassion(interestData)
        .then(data => {
          console.log('life story data =', data);
          //loader.dismiss();
          let interestObject: any;
          interestObject = data;
          if (interestObject.responseCode == '200') {
            // this.closeCompetitionsTraining();
            let message = interestObject.data;
            this.sharedTaskProvider.showToastMessage(message);


            let modal = this.modalCtrl.create("InterestsPassionsPage", { storyData: interestData, urnType: this.urnType });
            modal.present();
          }

        }, error => {
          console.log(error);
        });
    } else {
      this.sharedTaskProvider.showToastMessage('Please provide atleast one info to save');
    }

  }

}
