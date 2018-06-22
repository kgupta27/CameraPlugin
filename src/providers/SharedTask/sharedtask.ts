import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { ToastServiceProvider } from '../toast-service/toast-service';
import { Storage } from '@ionic/storage';


@Injectable()
export class SharedTaskProvider {

  constructor(public toastService: ToastServiceProvider,public storageObj :Storage) { 


  }

  setValueForKey(value:any ,key:String){
      if (value == null || key == null) return;
      this.storageObj.set(value,key);
  }
  getValueForKey(key){
      if (key == null) return;
      this.storageObj.get(key);
  }


  showToastMessage(message:any){
      if(message == null )return;
      this.toastService.create(message);
  }

}
