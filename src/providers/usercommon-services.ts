import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { ConfigProvider } from './config/config';
import { Network } from '@ionic-native/network';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Rx'
import * as Constant from '../Utility/Constant';

@Injectable()
export class UserCommonServices {
userId:any;
token:any;
  public _baseUrl: any;
  public headers: Headers;
  constructor(
    public http: Http, 
    public configService: ConfigProvider, 
    private network: Network, 
    private alertCtrl: AlertController,
    private storage: Storage,
    
  ) {
    this._baseUrl = configService.getApiURI();
    // this.headers = configService.getHeaders();
  }

  isOnline(): boolean {
    console.log(this.network.type);
    if(this.network.type != 'none'){
      return true;
    } else {
      return false;
    }
  }

  submitPictureData(data, type, authToken) {

    // debugger;
    // console.log(data);
    this.headers = new Headers();
    this.headers.append('Accept', 'application/json');
    
    // this.headers.append("Cache-Control", "no-cache");
    // this.headers.append("Cache-Control", "no-store");
    // this.headers.append("Pragma", "no-cache");
    // this.headers.append('enctype', 'multipart/form-data');
    
    this.headers.append("Authorization", authToken);
debugger
    var form = new FormData();
    form.append("name", data.name);
    form.append("nickName", data.nickName);
    form.append("userId", data.userId);
    form.append("deviceType", data.deviceType);
    form.append("deviceToken", data.deviceToken);


    if(this.isOnline()){
      console.log(this.headers);
      console.log(data);
      return this.http.post(this._baseUrl + type, form, {headers:  this.headers})

      .map(this.extractPostData)
      .catch(this.handleError);
    } else {
      let alert = this.alertCtrl.create({
        title: 'No internet connection',
        buttons: ['Okay']
      });
      alert.present();
      return;
    }
  }


  submitFriendsData(data, type, authToken,isEdit) {
    
        // debugger;
        // console.log(data);
        this.headers = new Headers();
        var form = new FormData();
        form.append("userId", data.userId);
        form.append("ownerId", data.ownerId);
        form.append("name", data.name);
        form.append("nickName", data.nickName);
        form.append("userEmail", data.userEmail);
        form.append("relationshipId", data.relationshipId);
        form.append("friendUserId", data.friendUserId?data.friendUserId:0);
        form.append("roleId", data.roleId);
        form.append("familyMemberId",data.familyMemberId);
        // if(isEdit){
          this.headers.append('Accept', 'application/json');
          this.headers.append("Authorization", authToken);
        // }else{
        // // this.headers.append('Accept', 'application/json');
        // this.headers.append("Cache-Control", "no-cache");
        // this.headers.append("Cache-Control", "no-store");
        // this.headers.append("Pragma", "no-cache");
        // this.headers.append('enctype', 'multipart/form-data');
        // this.headers.append("Authorization", authToken);
        // this.headers.append('Accept', 'application/json');
        // this.headers.append("Authorization", authToken);

    
        // }
        if(this.isOnline()){
          console.log(this.headers);
          console.log(data);
          if(isEdit){
            return this.http.post(this._baseUrl + type, form, {headers:  this.headers})
          .map(this.extractPostData)
          .catch(this.handleError);
          }else{
            return this.http.post(this._baseUrl + type, form, {headers:  this.headers})
          .map(this.extractPostData)
          .catch(this.handleError);
          }
        
        } else {
          let alert = this.alertCtrl.create({
            title: 'No internet connection',
            buttons: ['Okay']
          });
          alert.present();
          return;
        }
      }

  submitData(credentials, token) {
    // console.log(token);
    debugger;
    this.headers = new Headers();
    this.headers.append('Accept', 'application/json');
    this.headers.append("Authorization", token);
   
    

    console.log("Header: ", this.headers);
    if(this.isOnline()){

        let urlString = this.configService.apiMethod(Constant.APIService.addMediaLink); 
      return this.http.post(urlString, credentials, {headers:  this.headers})
      .map(this.extractPostData)
      .catch(this.handleError);
      

    } else {
      let alert = this.alertCtrl.create({
        title: 'No internet connection',
        buttons: ['Okay']
      });
      alert.present();
      return;
    }
      
  }
  addUpdateLifestory(credentials, token, isUpdate?) {
    // console.log(token);
    debugger;
    this.headers = new Headers();
    this.headers.append('Accept', 'application/json');
    this.headers.append("Authorization", token);
   
    

    console.log("Header: ", this.headers);
    if(this.isOnline()){
      if(isUpdate){
        let urlString = this.configService.apiMethod(Constant.APIService.updateLifeStory); 
      return this.http.post(urlString, credentials, {headers:  this.headers})
      .map(this.extractPostData)
      .catch(this.handleError);
      }else{
        let urlString = this.configService.apiMethod(Constant.APIService.LifeStory); 
    return this.http.post(urlString, credentials, {headers:  this.headers})
      .map(this.extractPostData)
      .catch(this.handleError);
      }

    } else {
      let alert = this.alertCtrl.create({
        title: 'No internet connection',
        buttons: ['Okay']
      });
      alert.present();
      return;
    }
      
  }
  submitDataExperience(credentials,url, token, isUpdate?){
    debugger;
    this.headers = new Headers();
    this.headers.append('Accept', 'application/json');
    this.headers.append("Authorization", token);
    // this.headers.append('Access-Control-Allow-Origin', '*');
    // // this.headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    // this.headers.append('Allow', 'GET, POST, PUT, DELETE');
   
    

    console.log("Header: ", this.headers);
    if(this.isOnline()){
      if(isUpdate){
      return this.http.post(this._baseUrl+url ,credentials, {headers:  this.headers})
      .map(this.extractPostData)
      .catch(this.handleError);
      }else{
    return this.http.post(this._baseUrl+url, credentials, {headers:  this.headers})
      .map(this.extractPostData)
      .catch(this.handleError);
      }

    } else {
      let alert = this.alertCtrl.create({
        title: 'No internet connection',
        buttons: ['Okay']
      });
      alert.present();
      return;
    }

  }
  getExperience(api,token,accept,id,ownerId,nextPage?) {
    // console.log(token);
  
    // debugger;
    this.headers = new Headers();
    this.headers.append('Accept', 'application/json');
    this.headers.append("Authorization", token);

    console.log("Header: ", this.headers);
    if(this.isOnline()){
      return this.http.get(this._baseUrl + api+'?userId='+id+'&accept='+accept+'&ownerId='+ownerId+'&page='+nextPage+'&size='+6, {headers:  this.headers})

      .map(this.extractPostData)
      .catch(this.handleError);
    } else {
      let alert = this.alertCtrl.create({
        title: 'No internet connection',
        buttons: ['Okay']
      });
      alert.present();
      return;
    }
  }

  putData(credentials, type, token) {
    console.log(token);
    // debugger;
    this.headers = new Headers();
    this.headers.append('Accept', 'application/json');
    this.headers.append("Authorization", token);

    console.log("Header: ", this.headers);
    if(this.isOnline()){
      return this.http.put(this._baseUrl + type, credentials, {headers:  this.headers})

      .map(this.extractPostData)
      .catch(this.handleError);
    } else {
      let alert = this.alertCtrl.create({
        title: 'No internet connection',
        buttons: ['Okay']
      });
      alert.present();
      return;
    }
      
  }
  
  addUpdateCharityUrl(credentials, token) {
    console.log(token);
    // debugger;
    this.headers = new Headers();
    this.headers.append('Accept', 'application/json');
    this.headers.append("Authorization", token);

    console.log("Header: ", this.headers);
    if(this.isOnline()){
      let urlString = this.configService.apiMethod(Constant.APIService.updateCharityUrl); 
      return this.http.post(urlString, credentials, {headers:  this.headers})

      .map(this.extractPostData)
      .catch(this.handleError);
    } else {
      let alert = this.alertCtrl.create({
        title: 'No internet connection',
        buttons: ['Okay']
      });
      alert.present();
      return;
    }
      
  }
  getData(type, token) {
    // console.log(token);
    // debugger;
    this.headers = new Headers();
    this.headers.append('Accept', 'application/json');
    this.headers.append("Authorization", token);

    console.log("Header: ", this.headers);
    if(this.isOnline()){
      return this.http.get(this._baseUrl + type, {headers:  this.headers})

      .map(this.extractPostData)
      .catch(this.handleError);
    } else {
      let alert = this.alertCtrl.create({
        title: 'No internet connection',
        buttons: ['Okay']
      });
      alert.present();
      return;
    }
      
  }

  getHelthData(type, token, id, ownerId, nextPage?) {
    // console.log(token);
  
    // debugger;
    this.headers = new Headers();
    this.headers.append('Accept', 'application/json');
    this.headers.append("Authorization", token);

    console.log("Header: ", this.headers);
    if(this.isOnline()){
      return this.http.get(this._baseUrl + type+'?userId='+id+'&ownerId='+ownerId+'&page='+nextPage+'&size='+6, {headers:  this.headers})

      .map(this.extractPostData)
      .catch(this.handleError);
    } else {
      let alert = this.alertCtrl.create({
        title: 'No internet connection',
        buttons: ['Okay']
      });
      alert.present();
      return;
    }
      
  }
  getFamilyFrnd(api, token,id,ownerId,nextPage?) {
    // console.log(token);
  
    // debugger;
    this.headers = new Headers();
    this.headers.append('Accept', 'application/json');
    this.headers.append("Authorization", token);

    console.log("Header: ", this.headers);
    if(this.isOnline()){
      return this.http.get(this._baseUrl +api+'?userId='+id+'&ownerId='+ownerId+'&page='+nextPage+'&size='+6, {headers:  this.headers})

      .map(this.extractPostData)
      .catch(this.handleError);
    } else {
      let alert = this.alertCtrl.create({
        title: 'No internet connection',
        buttons: ['Okay']
      });
      alert.present();
      return;
    }
  }
  getLifeStory(type, token,id,nextPage?) {
    // console.log(token);
  
    // debugger;
    this.headers = new Headers();
    this.headers.append('Accept', 'application/json');
    this.headers.append("Authorization", token);

    console.log("Header: ", this.headers);
    if(this.isOnline()){
      return this.http.get(this._baseUrl + 'api/v1/story/lifeStory'+'?userId='+id+'&page='+nextPage+'&size='+6, {headers:  this.headers})

      .map(this.extractPostData)
      .catch(this.handleError);
    } else {
      let alert = this.alertCtrl.create({
        title: 'No internet connection',
        buttons: ['Okay']
      });
      alert.present();
      return;
    }
  }

  // modified 
  getApiReqeust(url) : Observable<any>{
    return this.http.get(this._baseUrl + url).do(data => console.log('All: ' + JSON.stringify(data)))
    .map((res: Response) => {
      let result = res;
      return result;
    })
    .catch(this.handleError);
}

  private extractPostData(res: Response) {
    // debugger;
    // console.log(res);
    if (res.status === 200) {
      return res.text() || {};
    } else {
      throw new Error(res.text());
    }
  }
  private handleError (error: Response | any) {
    
    // debugger;
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || body.message;
      errMsg = `${err}`;
      //errMsg = `${error.statusText || ''}`;
    } else {

      // errMsg = error._body ? error._body : error.toString();
       errMsg =  JSON.parse(error._body.message);
       
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


  getByName(value,api,token, id, ownerId){
    
        // debugger;
        this.headers = new Headers();
        this.headers.append('Accept', 'application/json');
        this.headers.append("Authorization", token);
    
        console.log("Header: ", this.headers);
        if(this.isOnline()){
          return this.http.get(this._baseUrl + api+'/?userId='+id+'&ownerId='+ownerId+'&userName='+value, {headers:  this.headers})
    
          .map(this.extractPostData)
          .catch(this.handleError);
        } else {
          let alert = this.alertCtrl.create({
            title: 'No internet connection',
            buttons: ['Okay']
          });
          alert.present();
          return;
        }
    
      }
}