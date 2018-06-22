import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InterestsPassionsPage } from './interests-passions';

@NgModule({
  declarations: [
    InterestsPassionsPage,
  ],
  imports: [
    IonicPageModule.forChild(InterestsPassionsPage),
  ],	
  exports: [InterestsPassionsPage]
  
})
export class InterestsPassionsModule {}
