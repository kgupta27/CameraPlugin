import { Injectable } from '@angular/core';
//import { User } from './user';
import { NetworkServices } from '../..//NetworkRequest/NetworkServices';
import * as Constant from '../../../Utility/Constant';
import { ConfigProvider } from '../../config/config'
//import { NetworkServices } from '../'
import { Storage } from '@ionic/storage';


@Injectable()
export class BeaconService {

  //activeUser: User;


  constructor(public networkService: NetworkServices, public config: ConfigProvider, public storage: Storage) {

  }


  checkBeconExistance(params) {
      debugger;
    var userId = window.localStorage.getItem('userId');
    //params.append("userId", userId);
    params.userId = userId;

    return new Promise((resolve, reject) => {
      try {
        let urlString = this.config.apiMethod(Constant.APIService.CheckBeaconExistance);
        //  debugger;
        this.networkService.performRequest(Constant.HTTP_METHOD.POST, params, urlString, false, false).subscribe(result => {
           debugger;
          // let user = new User(data.data.userInfoModel);
          // console.log('user ===== = ',user);

          //this.storage.set(Constant.KEY_STORAGE.Roles, result.data);

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

 

}