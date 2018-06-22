import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { ConfigProvider } from '../config/config';
import { Network } from '@ionic-native/network';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
// import { Observable } from 'rxjs/Observable';
import {Observable} from 'rxjs/Rx';
import { ToastServiceProvider } from '../../providers/toast-service/toast-service';


@Injectable()
export class AuthProvider {

  public _baseUrl: any;
  public headers: any;
  constructor(
    public http: Http, 
    public configService: ConfigProvider, 
    private network: Network, 
    private alertCtrl: AlertController,
    private storage: Storage,
    public toastCtrl: ToastServiceProvider,
  ) {
    console.log('Hello AuthServiceProvider Provider');
    this._baseUrl = configService.getApiURI();
    this.headers = configService.getHeaders();
  }

  isOnline(): boolean {
    console.log(this.network.type);
    if(this.network.type != 'none'){
      return true;
    } else {
      return false;
    }
  }

  getAuthenticate(credentials: any, type: string) {

    credentials.deviceToken = localStorage.getItem("deviceReg");
    credentials.deviceType = localStorage.getItem("deviceInfo");
    
    if(this.isOnline()){

      return this.http.post(this._baseUrl + type, credentials, {headers:  this.headers})

      .map(this.extractPostData)
      .catch(this.handleError);
    } else {

      this.toastCtrl.create('No internet connection');
    }
  }
// this is modified
  getApiReqeust(url) : Observable<any>{
    return this.http.get(this._baseUrl + url).do(data => {
      // console.log('All: ' + JSON.stringify(data));
    })
    .map((res: Response) => {
      let result = res;
      return result;
    })
    .catch(this.handleError);
  }

  private extractPostData(res: Response) {
    // console.log(res);
    if (res.status === 200) {
      return res.text() || {};
    } else {
      throw new Error(res.text());
    }
  }
  
  private handleError (error: Response | any) {
    
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
    // console.log(errMsg);
    return Observable.throw(errMsg);
  }
}
