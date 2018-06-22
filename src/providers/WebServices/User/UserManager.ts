
import { Injectable } from '@angular/core';
import { User } from './user';
import { NetworkServices } from '../../NetworkRequest/NetworkServices';
import * as Constant from '../../../Utility/Constant';
import { ConfigProvider } from '../../config/config'
//import { NetworkServices } from '../'
import { Storage } from '@ionic/storage';


@Injectable()
export class UserManager {

  ownerId: any;
  activeUser: User;
  constructor(public networkService: NetworkServices, public config: ConfigProvider, public storage: Storage) {

  }

  login(params) {
    return new Promise((resolve, reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.Login);
        // debugger;
        this.networkService.performRequest(Constant.HTTP_METHOD.POST, params, urlString, true, true).subscribe(data => {
          // debugger;
          let user = new User(data.data.userInfoModel);
          console.log('user ===== = ', user);

          this.storage.set("ActiveUser", data);

          // this.activeUser = data.userInfoModel;
          //var userData = JSON.parse(data);
          resolve(this.activeUser);

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


  getActiveUser() {
    this.storage.get("userData").then((result) => {
      if (result) {
        let user = new User(result);
        return user;
      }
      return null;
    });
  }



  changePassword(params) {
    // debugger;
    // var userId = window.localStorage.getItem('userId');
    // params.userId = userId;
    
    return new Promise((resolve, reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.ChangePassword);
        debugger;
        console.log(Constant.HTTP_METHOD.POST);
        this.networkService.performRequest(Constant.HTTP_METHOD.POST, params, urlString, true, true).subscribe(data => {
          // debugger;
          
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


  editProfile(params) {
    debugger;
    var userId = window.localStorage.getItem('userId');
    params.append("userId", userId);
    console.log(userId);
    return new Promise((resolve, reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.EditProfile);
        debugger;
        console.log(Constant.HTTP_METHOD.POST);
        this.networkService.performRequestProfile(Constant.HTTP_METHOD.POST, params, urlString, true, true).subscribe(data => {
          debugger;


          this.storage.set("ActiveUser", data);

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

  }

  confirmpswrd(params) {
    // var userId = window.localStorage.getItem('userId');
    // params.append("userId",userId); 
    // console.log(userId);
    // debugger;

    return new Promise((resolve, reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.ConfirmPass);
        debugger;
        console.log(Constant.HTTP_METHOD.POST);
        this.networkService.performRequest(Constant.HTTP_METHOD.POST, params, urlString, true, true).subscribe(data => {
          // debugger;


          this.storage.set("ActiveUser", data);

          // this.activeUser = data.userInfoModel;
          //var userData = JSON.parse(data);
          resolve(this.activeUser);

        }, error => {
          console.log(error);
          reject(error);
        });
      } catch (e) {
        return reject(e);
      }
    });

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
}