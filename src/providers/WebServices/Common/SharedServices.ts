import { Injectable } from '@angular/core';
//import { User } from './user';
import { NetworkServices } from '../..//NetworkRequest/NetworkServices';
import * as Constant from '../../../Utility/Constant';
import { ConfigProvider } from '../../config/config'
//import { NetworkServices } from '../'
import { Storage } from '@ionic/storage';


@Injectable()
export class SharedServices {

  //activeUser: User;


  constructor(public networkService: NetworkServices, public config: ConfigProvider, public storage: Storage) {

  }


  fetchRoles(params) {
    return new Promise((resolve, reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.RoleDetails);
        //  debugger;
        this.networkService.performRequest(Constant.HTTP_METHOD.GET, params, urlString, true, true).subscribe(result => {
          // debugger;
          // let user = new User(data.data.userInfoModel);
          // console.log('user ===== = ',user);

          this.storage.set(Constant.KEY_STORAGE.Roles, result.data);

          // this.activeUser = data.userInfoModel;
          //var userData = JSON.parse(data);
          resolve(result.data);

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

  fetchRelationship(params) {
    return new Promise((resolve, reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.RelationDetails);
        //  debugger;
        this.networkService.performRequest(Constant.HTTP_METHOD.GET, params, urlString, true, true).subscribe(result => {

          //console.log('user ===== = ',data);

          this.storage.set(Constant.KEY_STORAGE.Relation, result.data);

          resolve(result.data);

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
  loadMoreImages(params) {
    return new Promise((resolve, reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.loadMoreImageUrl);
        // let urlString = this.config.apiMethod(Constant.APIService. getHealthJourney);
        urlString = urlString + '?userId=' + params.userid + '&ownerId=' + params.ownerId + '&page=' + params.page + '&size=' + params.size;
        //  debugger;
        this.networkService.performRequest(Constant.HTTP_METHOD.GET, params, urlString, true, true).subscribe(result => {

          //console.log('user ===== = ',data);

          this.storage.set(Constant.KEY_STORAGE.Relation, result.data);

          resolve(result.data);

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

  uploadImage(imageToBeUpload, params) {
    return new Promise((resolve, reject) => {
      debugger;
      let urlStrings = this.config.apiMethod(Constant.APIService.UploadLifeStoryPic);


      this.networkService.uploadImage(imageToBeUpload, params, urlStrings).then(data => {
        //loader.dismiss();
        // this.toastCtrl.create('Profile pic is uploaded');
        //this.navCtrl.setRoot(HomePage);
        //this.alertService.presentCongratsAlert('<span>A life story for "' + this.storyData.ownerName + '" has been created. Lets add some experiences and what makes you unique<span>').then((yes) => {
        // if (yes) { // this.toastCtrl.create('Created');
        // }
        resolve(data);
      }, error => {
        reject(error);
      });



    });

  }

  uploadImageTask(imageToBeUpload, params, urlString) {
    var userId = window.localStorage.getItem('userId');
    params.userId = userId;
    // params.deviceToken = 

    return new Promise((resolve, reject) => {
      debugger;


      this.networkService.uploadImage(imageToBeUpload, params, urlString).then(data => {
        //loader.dismiss();
        // this.toastCtrl.create('Profile pic is uploaded');
        //this.navCtrl.setRoot(HomePage);
        //this.alertService.presentCongratsAlert('<span>A life story for "' + this.storyData.ownerName + '" has been created. Lets add some experiences and what makes you unique<span>').then((yes) => {
        // if (yes) { // this.toastCtrl.create('Created');
        // }
        resolve(data);
      }, error => {
        reject(error);
      });

    });

  }


}