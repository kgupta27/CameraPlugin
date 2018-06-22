import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-relationship',
  templateUrl: 'relationship.html',
})
export class RelationshipPage {

  relationData: any = [];
  relType: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
    public viewCtrl: ViewController
  ) {
    this.relType = this.navParams.get('relationType');
    // console.log("Relationship type: ");
    // console.log(this.relType);
  }

  ionViewDidLoad() {
    debugger;
    console.log('ionViewDidLoad RelationshipPage');
    this.storage.get("relationData").then((result) => {
      debugger;
      if(result){
        for(let i = 0; i < result.length; i++) {
          if(result[i].isHuman =="1" && this.relType == '1'){
            if(result[i].relationId == '1' || result[i].relationId == 1){
            }else{
              this.relationData.push(result[i]);
            }
          } else if(result[i].isHuman == "0" && this.relType == '2') {
            // console.log(result[i]);
            this.relationData.push(result[i]);
          }
        }

        // console.log(this.relationData);
      }
    });
  }

  selectData(selectionRelationship){
    console.log(selectionRelationship);
    // localStorage.setItem("selectionRelationship", selectionRelationship);
    this.viewCtrl.dismiss(selectionRelationship);
    // this.navCtrl.pop();
  }
}
