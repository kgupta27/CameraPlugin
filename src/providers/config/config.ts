import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import * as Constant from '../../Utility/Constant';


export const Environment = {
  Dev: "Dev",
  QA: "QA",
  Staging: "Staging",
  Production: "Production"
};

//####################### Current Environment ######################
//##################################################################

//Change base URL
var currentEnvironment: String = Environment.Staging;

// var apiURL = 'http://172.16.20.126:8080/modurn/'; //Local
// var apiURL = 'https://prod.modurngroup.com/modurn/'; //Production
var apiURL = 'https://staging.modurngroup.com/modurn/'; //staging
// var apiURL = 'https://dev.modurngroup.com/modurn/'; //dev
//  var apiURL = 'https://qa.modurngroup.com/modurn/';//qa


var shareURL = 'https://staging.modurngroup.com/'; //staging

//##################################################################
//##################################################################

export const URI = {
  DevURI: "https://dev.modurngroup.com/modurn/api/v1/",
  QAURI: "https://qa.modurngroup.com/modurn/api/v1/",
  StagingURI: "https://staging.modurngroup.com/modurn/api/v1/",
  // ProductionURI: "http://172.16.20.126:8080/modurn/api/v1/"
  ProductionURI: "https://prod.modurngroup.com/modurn/api/v1/"

}



@Injectable()
export class ConfigProvider {

  constructor(public http: Http) {
    // console.log('Hello ConfigProvider Provider');
  }

  getApiURI() {
    // console.log('current env = ', this.apiMethod(Constant.APIService.SignUp));

    return apiURL;
  }

  getHeaders() {
    let header = new Headers();
    header.append('Accept', 'application/json');
    return header;
  }

  getHeadersToken() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append("Authorization", 'Token');
    return headers;
  }
  
  apiMethod(url) {
    var baseURL = ""
    switch (currentEnvironment) {
      case "Dev":
        baseURL = URI.DevURI;
        break;
      case "QA":
        baseURL = URI.QAURI;
        break;
      case "Staging":
        baseURL = URI.StagingURI;
        break;
      case "Production":
        baseURL = URI.ProductionURI;
        break;
      default:
        baseURL = "DevBaseURL";
        break;
    }
    return baseURL + url;
  }


  shareUrl(){
    return shareURL;
  }
}
