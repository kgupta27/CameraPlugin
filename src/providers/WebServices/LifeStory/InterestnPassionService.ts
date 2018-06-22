import { Injectable } from '@angular/core';
import { NetworkServices } from '../..//NetworkRequest/NetworkServices';
import * as Constant from '../../../Utility/Constant';
import { ConfigProvider } from '../../config/config';
import { Storage } from '@ionic/storage';


@Injectable()
export class InterestnPassionService {

  constructor(public networkService: NetworkServices, public config: ConfigProvider, public storage: Storage) {

  }

  addInterestPassion(params) {
    return new Promise((resolve, reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.addInterestPassion);
        //  debugger;
        this.networkService.performRequest(Constant.HTTP_METHOD.POST, params, urlString, true, true).subscribe(data => {
          // debugger;
          
          // this.activeUser = data.userInfoModel;
          //var userData = JSON.parse(data);
          resolve(data);

        }, error => {
          console.log(error);
          reject(error);
        });
      } catch (e) {
        return reject(e);
      }
    });
    // return Observable.throw(true);
  }


  //change
  fetchinterestsPassion(params)
  {
    return new Promise((resolve, reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.getInterestPassion);
        urlString = urlString + '?userId=' + params.userId + '&ownerId=' + params.ownerId + '&page=' + params.page + '&size=' + params.size;
        //  debugger;
        this.networkService.performRequest(Constant.HTTP_METHOD.GET, params, urlString, true, true).subscribe(result => {
          debugger;
          // this.storage.set(Constant.KEY_STORAGE.Relation, result.data);

          resolve(result.data);
        }, error => {
          console.log(error);
          debugger;
          reject(error);
        });
      } catch (e) {
        return reject(e);
      }
    });
  }

  
  

  postinterestsPassion(params) {
    return new Promise((resolve, reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.postInterest);
        
      //  urlString = urlString + '?userId=' + params.userId + '&ownerId=' + params.ownerId + '&competitionId=' + params.competitionId;
        this.networkService.performRequest(Constant.HTTP_METHOD.POST, params, urlString, true, false).subscribe(data => {
          debugger;
          resolve(data);
        }, error => {
          console.log(error);
          reject(error);
        });
      } catch (e) {
        return reject(e);
      }
    });
    // return Observable.throw(true);
  }

  putinterestsPassion(params)
  {
    return new Promise((resolve, reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.updateInterest);
        
      //  urlString = urlString + '?userId=' + params.userId + '&ownerId=' + params.ownerId + '&competitionId=' + params.competitionId;
        this.networkService.performRequest(Constant.HTTP_METHOD.POST, params, urlString, true, false).subscribe(data => {
          debugger;
          resolve(data);
        }, error => {
          console.log(error);
          reject(error);
        });
      } catch (e) {
        return reject(e);
      }
    });
  }

  fetchCompetitionTraining(params)
  {
    return new Promise((resolve, reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.getCompetitionTraining);
        urlString = urlString + '?userId=' + params.userId + '&ownerId=' + params.ownerId + '&page=' + params.page + '&size=' + params.size;
        //  debugger;
        this.networkService.performRequest(Constant.HTTP_METHOD.GET, params, urlString, true, true).subscribe(result => {
         debugger;
          // this.storage.set(Constant.KEY_STORAGE.Relation, result.data);

          resolve(result.data);
        }, error => {
          console.log(error);
          debugger;
          reject(error);
        });
      } catch (e) {
        return reject(e);
      }
    });
  }


  fetchFavoriteCharity(params)
  {
    return new Promise((resolve, reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.getCharity);
        urlString = urlString + '?userId=' + params.userId + '&ownerId=' + params.ownerId;
        //  debugger;
        this.networkService.performRequest(Constant.HTTP_METHOD.GET, params, urlString, true, true).subscribe(result => {
         debugger;
          // this.storage.set(Constant.KEY_STORAGE.Relation, result.data);

          resolve(result.data);
        }, error => {
          console.log(error);
          debugger;
          reject(error);
        });
      } catch (e) {
        return reject(e);
      }
    });
  }
  
deleteFavoriteCharity(params)
  {
    console.log(params);
    //var userId = window.localStorage.getItem('userId');
    // params.userId = window.localStorage.getItem('userId');

    return new Promise((resolve, reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.deleteCharity);
        
        //  debugger;
       
        this.networkService.performRequest(Constant.HTTP_METHOD.POST,params,urlString, true, true).subscribe(result => {
         debugger;
          // this.storage.set(Constant.KEY_STORAGE.Relation, result.data);

          resolve(result.data);
        }, error => {
          console.log(error);
          debugger;
          reject(error);
        });
      } catch (e) {
        return reject(e);
      }
    });
  }

  fetchcareernAcademics(params)
  {
    return new Promise((resolve,reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.getCareerAcademic);
        urlString = urlString + '?userId=' + params.userId + '&ownerId=' + params.ownerId + '&page=' + params.page + '&size=' + params.size;
        this.networkService.performRequest(Constant.HTTP_METHOD.GET, params, urlString, true, true).subscribe(result => {
          resolve(result.data);
        }, error => {
          
          reject(error);
        });
      } catch (e) {
        return reject(e);
      }
    });
  }
  sendEmail(params)
  {
    return new Promise((resolve, reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.sendEmail);
        urlString = urlString + '?userId=' + params.userId + '&ownerId=' + params.ownerId + '&email=' + params.email;
        //  debugger;
        this.networkService.performRequest(Constant.HTTP_METHOD.GET, params, urlString, true, true).subscribe(result => {
          debugger;
          // this.storage.set(Constant.KEY_STORAGE.Relation, result.data);

          resolve(result.data);
        }, error => {
          console.log(error);
          debugger;
          reject(error);
        });
      } catch (e) {
        return reject(e);
      }
    });
  }

  fetchHealthJourney(params)
  {
    return new Promise((resolve,reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.getHealthJourney);
        urlString = urlString + '?userId=' + params.userId + '&ownerId=' + params.ownerId + '&page=' + params.page + '&size=' + params.size;
        //  debugger;
        this.networkService.performRequest(Constant.HTTP_METHOD.GET, params, urlString, false, true).subscribe(result => {
        // debugger;
          // this.storage.set(Constant.KEY_STORAGE.Relation, result.data);

          resolve(result.data);
        }, error => {
          console.log(error);
          debugger;
          reject(error);
        });
      } catch (e) {
        return reject(e);
      }
    });
  }

  deleteHealthJourney(params)
  {
    return new Promise((resolve,reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.deleteHealthJourney);
        // urlString = urlString + '?userId=' + params.userId + '&ownerId=' + params.ownerId + '&healthId=' + params.healthId;

        this.networkService.performRequest(Constant.HTTP_METHOD.POST, params, urlString, true, true).subscribe(result => {       
          resolve(result.data);
        }, error => {
          console.log(error);
          debugger;
          reject(error);
        });
      } catch (e) {
        return reject(e);
      }
    });
  }

  deleteMediaLink(params)
  {
    return new Promise((resolve,reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.deleteMediaLink);
        // urlString = urlString + '?userId=' + params.userId + '&ownerId=' + params.ownerId + '&healthId=' + params.healthId;

        this.networkService.performRequest(Constant.HTTP_METHOD.POST, params, urlString, true, true).subscribe(result => {       
          resolve(result.data);
        }, error => {
          console.log(error);
          debugger;
          reject(error);
        });
      } catch (e) {
        return reject(e);
      }
    });
  }

  deleteFriendFamily(params)
  {
    console.log(params);
    return new Promise((resolve, reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.deleteFriendFamily);
        this.networkService.performRequest(Constant.HTTP_METHOD.POST,params,urlString, true, true).subscribe(result => {
         debugger;
          // this.storage.set(Constant.KEY_STORAGE.Relation, result.data);
          resolve(result.data);
        }, error => {
          console.log(error);
          debugger;
          reject(error);
        });
      } catch (e) {
        return reject(e);
      }
    });
  }
  
  putExperienceStatus(params)
  {
    return new Promise((resolve, reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.experienceStatus);
       // urlString = urlString + '?userId=' + params.userId + '&ownerId=' + params.ownerId;
      //  urlString = urlString + '?userId=' + params.userId + '&ownerId=' + params.ownerId + '&competitionId=' + params.competitionId;
        this.networkService.performRequest(Constant.HTTP_METHOD.POST, params, urlString, true, false).subscribe(data => {
          debugger;
          resolve(data);
        }, error => {
          console.log(error);
          reject(error);
        });
      } catch (e) {
        return reject(e);
      }
    });
  }

  deleteMediaImage(params)
  {
    return new Promise((resolve,reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.deleteMediaImage);
        // urlString = urlString + '?userId=' + params.userId + '&ownerId=' + params.ownerId + '&healthId=' + params.healthId;

        this.networkService.performRequest(Constant.HTTP_METHOD.POST, params, urlString, true, true).subscribe(result => {       
          resolve(result.data);
        }, error => {
          console.log(error);
          debugger;
          reject(error);
        });
      } catch (e) {
        return reject(e);
      }
    });

  }
}