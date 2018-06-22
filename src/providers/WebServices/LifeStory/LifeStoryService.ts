import { Injectable } from '@angular/core';
import { NetworkServices } from '../..//NetworkRequest/NetworkServices';
import * as Constant from '../../../Utility/Constant';
import { ConfigProvider } from '../../config/config';
import { Storage } from '@ionic/storage';


@Injectable()
export class LifeStoryService {
  isLifeStoryModified:Boolean = false;
  
  constructor(
    public networkService: NetworkServices,
    public config: ConfigProvider,
    public storage: Storage
  ) {

  }
  
  fetLifeStories(params) {
    return new Promise((resolve, reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.addInterestPassion);
        
        urlString = urlString + '?userId=' + params.userId + '&ownerId=' + params.ownerId + '&experienceId=' + params.experienceId;
        this.networkService.performRequest(Constant.HTTP_METHOD.POST, params, urlString, true, false).subscribe(data => {
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

  fetExperience(params) {
    // console.log(params);
    
    return new Promise((resolve, reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.getExperienceDetails);
        urlString = urlString + '?userId=' + params.userId + '&ownerId=' + params.ownerId + '&experienceId=' + params.experienceId;
        console.log(urlString);
        //  debugger;
        this.networkService.performRequest(Constant.HTTP_METHOD.GET, params, urlString, true, false).subscribe(data => {
          // debugger;
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

 getMediadata(params) {
    // console.log(params);
    
    return new Promise((resolve, reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.getMediaData);
        urlString = urlString + '?userId=' + params.userid + '&ownerId=' + params.ownerId;
        console.log(urlString);
        //  debugger;
        this.networkService.performRequest(Constant.HTTP_METHOD.GET, params, urlString, true, false).subscribe(data => {
          // debugger;
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

  getLifeStoryData(params) {
    // console.log(params);
    
    return new Promise((resolve, reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.LifeStory);
        
        console.log(urlString);
        urlString = urlString + '?userId=' + params.userid +'&page='+params.pageNo+'&size='+6+'&paired='+params.paired;
        //  debugger;
        this.networkService.performRequest(Constant.HTTP_METHOD.GET, params, urlString, false, true).subscribe(data => {
          // debugger;
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
 likeExp(params) {
    // console.log(params);
    
    return new Promise((resolve, reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.likeExpUrl);
        urlString = urlString + '?userId=' + params.userId + '&ownerId=' + params.ownerId + '&experienceId=' + params.experienceId;
        console.log(urlString);
        //  debugger;
        this.networkService.performRequest(Constant.HTTP_METHOD.POST, params, urlString, true, false).subscribe(data => {
          // debugger;
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
  deleteExp(params) {
    // console.log(params);
    
    return new Promise((resolve, reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.deletExpUrl);
  
        console.log(urlString);
        //  debugger;
        this.networkService.performRequest(Constant.HTTP_METHOD.POST, params, urlString, true, false).subscribe(data => {
          // debugger;
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

  putCompetitionTraining(params) {
    return new Promise((resolve, reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.updateCareerAcademic);
        
        this.networkService.performRequest(Constant.HTTP_METHOD.POST, params, urlString, false, true).subscribe(data => {
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

  addHelthJourney(params) {
    return new Promise((resolve, reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.getHealthJourney);
        
        this.networkService.performRequest(Constant.HTTP_METHOD.POST, params, urlString, true, true).subscribe(data => {
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

  fetCompetitionnTraining(params) {
    return new Promise((resolve, reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.updateCompetitionTraining);
        
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
  
  putHelthJourney(params) {
    return new Promise((resolve, reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.updateHealthJourney);
        
        this.networkService.performRequest(Constant.HTTP_METHOD.POST, params, urlString, true, true).subscribe(data => {
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

  putMediaLink(params)
  {
    return new Promise((resolve, reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.updateMediaLink);
        
        this.networkService.performRequest(Constant.HTTP_METHOD.POST, params, urlString, true, true).subscribe(data => {
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

  postCompetitionTraining(params) {
    return new Promise((resolve, reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.getCareerAcademic);
        
        this.networkService.performRequest(Constant.HTTP_METHOD.POST, params, urlString, false, true).subscribe(data => {
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

  


  postCompetitionnTraining(params) {
    return new Promise((resolve, reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.addCompetitionnTraining);
        
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

    // return Observable.throw(true);
  



  connectLifeStoryAsViewer(params):Promise<any> {
    // console.log(params);
    var userId = window.localStorage.getItem('userId');
    params.userId = userId;
    
    return new Promise((resolve, reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.ConnectLifeStoryAsViewer);
        
        console.log(urlString);
        //  debugger;
        this.networkService.performRequest(Constant.HTTP_METHOD.POST, params, urlString, true, true).subscribe(data => {
          // debugger;
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

  connectBeaconToLifeStory(params) : Promise<any>{
    // console.log(params);
    var userId = window.localStorage.getItem('userId');
    params.userId = userId;
    
    return new Promise((resolve, reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.ConnectLifeStory);
        
        console.log(urlString);
        //  debugger;
        this.networkService.performRequest(Constant.HTTP_METHOD.POST, params, urlString, false, true).subscribe(data => {
          // debugger;
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

  deleteLifestory(params)
  {
    return new Promise((resolve,reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.deleteLifestory);
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

  fetchLifeStoryById(params) : Promise<any>{
    // console.log(params);
    var userId = window.localStorage.getItem('userId');
   // params.userId = userId;
    
    return new Promise((resolve, reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.GetLifeStoryById);
        urlString = urlString + '?userId=' + userId + '&ownerId=' + params.ownerId ;

        console.log(urlString);
        //  debugger;
        this.networkService.performRequest(Constant.HTTP_METHOD.GET, params, urlString, true, true).subscribe(data => {
          // debugger;
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

  getPdfList(params){
    debugger
    console.log("Params:",params);
    return new Promise((resolve, reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.getPdfList);
        
        console.log(urlString);
        urlString = urlString +'?ownerId='+params.ownerId; 
        this.networkService.performRequest(Constant.HTTP_METHOD.GET, params, urlString, false, true).subscribe(data => {
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

  deletePdfFile(params){
    return new Promise((resolve, reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.deletePdfFile);
  
        console.log(urlString);
        this.networkService.performRequest(Constant.HTTP_METHOD.POST, params, urlString, true, false).subscribe(data => {
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
}

