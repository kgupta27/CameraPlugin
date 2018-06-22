import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'profile-popover',
  templateUrl: 'profile-popover.html'
})
export class ProfilePopoverComponent {

  text: string;

  constructor(public viewCtrl: ViewController) {
    console.log('Hello ProfilePopoverComponent Component');
    this.text = 'Hello World';
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
