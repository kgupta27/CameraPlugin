import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { AlertController, LoadingController } from 'ionic-angular';
import { Toast, ToastController } from 'ionic-angular';

//import { ConfigProvider } from './config/config';
//import { Network } from '@ionic-native/network';
import { Network } from '@ionic-native/network';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
import * as Constant from '../../Utility/Constant';
import * as Errors from '../../Utility/Errors';

import { ToastServiceProvider } from '../toast-service/toast-service';


import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';





export var errorMessage: string = '';
export var isNeedToShowToast: boolean = false;
@Injectable()
export class NetworkServices {

  public _baseUrl: any;
  public headers: Headers;
  // public isNeedToShowToast:boolean = false;
  // public loadingCtrl: LoadingController;
  // Showing loader
  //public  loader:any;

  // public storage: any;

  constructor(
    public http: Http,
    //public configService: ConfigProvider, 
    private network: Network,
    private alertCtrl: AlertController,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public toastService: ToastServiceProvider,
    private transfer: FileTransfer,
    private file: File
  ) {
    // this.loader = this.loadingCtrl.create({
    //     content: 'Please wait...'
    //   });
    // this._baseUrl = configService.getApiURI();
    // this.headers = configService.getHeaders();

    //debugger;
    // this.headers = this.getHttpHeaders();

  }

  isOnline(): boolean {
    console.log(this.network.type);
    if (this.network.type != 'none') {
      return true;
    } else {
      return false;
    }
  }

  private extractPostData(res: Response) {
    debugger;
    // console.log("************************* Response Start ***********************");
    // console.log("Response :", res);
    // console.log("************************* Response End ***********************");

    if (res.status === 200) {
      return res.json() || {};
    } else {
      throw new Error(res.text());
    }
  }

  private handleError(error: Response | any) {
    debugger
    console.log('handle error');
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;

    if (error instanceof Response) {
      try {
        const body = error.json() || '';
        const err = body.error || body.message;
        errMsg = `${err}`;


      } catch (e) {
        errMsg = `${error.statusText || ''}`;

      }
    } else {
      try {
        errMsg = JSON.parse(error._body.message);

      } catch (e) {
        errMsg = error
      }

    }
    console.error(errMsg);
    if (isNeedToShowToast) {
      if (errMsg == 'undefined') {
        errMsg = 'Something went wrong!!!';
      }
      //this.toastService.create(errMsg);
    }
    errorMessage = errMsg;


    return Observable.throw(errMsg || 'Network Error');
  }


  addMendatoryFields(params) {
    params.deviceToken = window.localStorage.getItem('deviceReg');
    params.deviceType = localStorage.getItem('deviceInfo');
    
    return params;
  }


  addFormDataMendatoryFields(params) {

    // var deviceToken = window.localStorage.getItem('deviceReg');
    // alert(deviceToken +' ::::::' +localStorage.getItem('deviceInfo'));
    // alert(localStorage.getItem('deviceReg'));
    //params.deviceToken=deviceToken; 
    params.append("deviceToken", localStorage.getItem('deviceReg'));
    params.append("deviceType", localStorage.getItem('deviceInfo'));

    return params;
  }
  getHttpHeaders() {
    // debugger;
    //************* Set token in header if user is logged in
    var httpHeader = new Headers();
    httpHeader.append('Accept', 'application/json');

    var token = window.localStorage.getItem('token');
    if (token != null)
      httpHeader.append("Authorization", token);


    return httpHeader;
  }

  getMultipartHeaders() {
    var httpHeader = new Headers();
    httpHeader.append("Cache-Control", "no-cache");
    httpHeader.append("Cache-Control", "no-store");
    httpHeader.append("Pragma", "no-cache");
    httpHeader.append('enctype', 'multipart/form-data');

    var token = window.localStorage.getItem('token');
    if (token != null)
      httpHeader.append("Authorization", token);

    return httpHeader;
  }


  //////////
  performRequest(requestMethod: Constant.HTTP_METHOD, parameters: any = null, urlString, showLoader: boolean = false, showToast: boolean = false) {
    // debugger;

    isNeedToShowToast = showToast;
    errorMessage = "";
    /// needtoShow = showToast;
    try {
      if(parameters == null){
        parameters = {}; 
      }
      parameters = this.addMendatoryFields(parameters);
      

      if (!this.isOnline()) {

        if (isNeedToShowToast) {
          this.toastService.create(Errors.ErrorMessages.InternetConnection);

        }
        return this.handleError(Errors.ErrorMessages.InternetConnection);
      }

      this.headers = this.getHttpHeaders();

      return this.performHTTPRequest(requestMethod, parameters, urlString, showLoader);

    } catch (e) {
      console.log('exception =', e);
      return null;
    }

  }

  performRequestProfile(requestMethod: Constant.HTTP_METHOD, parameters: any = null, urlString, showLoader: boolean = false, showToast: boolean = false) {
    // debugger;

    isNeedToShowToast = showToast;
    errorMessage = "";
    /// needtoShow = showToast;
    try {
      if(parameters == null){
        parameters = {}; 
      }
      parameters = this.addFormDataMendatoryFields(parameters);
      

      if (!this.isOnline()) {

        if (isNeedToShowToast) {
          this.toastService.create(Errors.ErrorMessages.InternetConnection);

        }
        return this.handleError(Errors.ErrorMessages.InternetConnection);
      }

      this.headers = this.getHttpHeaders();

      return this.performHTTPRequest(requestMethod, parameters, urlString, showLoader);

    } catch (e) {
      console.log('exception =', e);
      return null;
    }

  }
  performMultipartRequest(requestMethod: Constant.HTTP_METHOD, parameters: any = null, urlString, showLoader: boolean = true, showToast: boolean = false) {
    // debugger;

    isNeedToShowToast = showToast;
    errorMessage = "";
    /// needtoShow = showToast;
    try {
      parameters = this.addFormDataMendatoryFields(parameters);

      if (!this.isOnline()) {

        if (isNeedToShowToast) {
          this.toastService.create(Errors.ErrorMessages.InternetConnection);

        }
        return this.handleError(Errors.ErrorMessages.InternetConnection);
      }

      this.headers = this.getMultipartHeaders();

      return this.performHTTPRequest(requestMethod, parameters, urlString, showLoader);

    } catch (e) {
      console.log('exception =', e);
      return null;
    }

  }


  performHTTPRequest(requestMethod: Constant.HTTP_METHOD, parameters: any, urlString: string, showLoader: boolean = false) {
    // debugger
    console.log("************************* Request Start ***********************");
    console.log("Request Method :", requestMethod);
    console.log("Request URL : ", urlString);
    console.log("Request Header :", this.headers);
    console.log("Parameters : ", parameters);
    console.log("showLoader : ", showLoader);
    console.log("************************* Request End  ***********************");

    let tprovider = this.toastService;
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    if (showLoader) {
      loader.present();
    }

    var response: any;
    switch (requestMethod) {
      case Constant.HTTP_METHOD.GET: {
        response = this.http.get(urlString, { headers: this.headers });
      }
        break;
      case Constant.HTTP_METHOD.POST: {
        response = this.http.post(urlString, parameters, { headers: this.headers })
      }
        break;
      case Constant.HTTP_METHOD.PUT: {
        response = this.http.put(urlString, parameters, { headers: this.headers })
      }
        break;
      case Constant.HTTP_METHOD.DELETE: {
        response = this.http.delete(urlString, { headers: this.headers });
      }
        break;
      default:
        break;
    }
    //    .timeout(50000, new Error('timeout exceeded'))    

    return response.map(this.extractPostData)
      .catch(this.handleError)
      .finally(() => {
        debugger;
        loader.dismiss();
        if (isNeedToShowToast) {
          tprovider.create(errorMessage);

        }
      });

  }


  uploadImage(imageToBeUpload, params, urlString) {

    debugger;
    params.deviceToken = localStorage.getItem('deviceReg');
    params.deviceType = localStorage.getItem('deviceInfo');


    return new Promise((resolve, reject) => {
      try {
        // debugger;
        if (imageToBeUpload == null || params == null || params.fileName == null || params.fileKey == null)
          return reject("Either ImageTobeUpload,filename or filekey is null");


        const fileTransfer: FileTransferObject = this.transfer.create();
        this.storage.get("userData").then((result) => {
          if (result) {
            // debugger;
            var options: FileUploadOptions = {
              fileKey: params.fileKey,
              fileName: params.fileName,
              chunkedMode: false,
              headers: {
                'Content-Type': undefined,
                'Authorization': result.token
              }
            }

            options.params = params;

            console.log("options:");
            console.log(JSON.stringify(options));
            fileTransfer.upload(imageToBeUpload, urlString, options)
              .then((data) => {
                resolve(data);

              }, error => {
                console.log(error);
                reject(error);
              });
          } else {
            // return false;
            // this.toastCtrl.create('Something went wrong!');
          }

        });


      } catch (e) {
        return reject(e);
      }
    });
    // return Observable.throw(true);
  }


}
