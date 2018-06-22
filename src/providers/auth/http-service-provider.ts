import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Events } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class HttpService extends Http {


    constructor(backend: XHRBackend,
        defaultOptions: RequestOptions, public events: Events) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.request(url, options));
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.get(url, options));
    }

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
    }

    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.delete(url, options));
    }

    getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        if (!options.headers.get('Content-Type') && !options.headers.get('skipSettingContentType')) {
            options.headers.append('Content-Type', 'application/json');
        }
        return options;
    }

    intercept(observable: Observable<Response>): Observable<Response> {
        return observable.catch((err, source) => {
            if (err.status === 401 || err.status === 403) {
                setTimeout(() => {
                    this.events.publish('user:relogin');
                }, 10);
                return Observable.throw(err);
            } 
            // else if(!err.status  || err.status === 500){
            //     console.log('err',err);
            //     err.message = 'Unable to Connect to Server';
            //     return Observable.throw(err);
            // }
            else {
                return Observable.throw(err);
            }
        });
        // return observable.map(res => {
        //   console.log('res = ', res)
        //   // If request fails, throw an Error that will be caught
        //   if(res.status < 200 || res.status >= 300) {
        //     if (res.status  === 401 || res.status === 403) {
        //       setTimeout(()=>{
        //         this.events.publish('user:relogin');
        //       },10);      
        //     }
        //     throw  Observable.throw(res);
        //   } 
        //   // If everything went fine, return the response
        //   else {
        //     let data = res['_body'] ? res.json() : res['error'].json();
        //     console.log('inside http=', data)
        //     if(data.statusCode  === 401 || data.statusCode === 403 ) {
        //          setTimeout(()=>{
        //           this.events.publish('user:relogin');
        //         },10); 
        //         data.error = data['message']; 
        //         res['_body'] = JSON.stringify(data);
        //         throw(res);
        //      } else if(data.statusCode  === 102) {
        //        data.error = data['message']; 
        //        res['_body'] = JSON.stringify(data);
        //        throw(res);
        //      } else {
        //        return res;
        //      }

        //   }
        // });
    }
}

