import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddHealthJourneyPage } from './add-health-journey';

@NgModule({
  declarations: [
    AddHealthJourneyPage,
  ],
  imports: [
    IonicPageModule.forChild(AddHealthJourneyPage),
  ],	
  exports: [AddHealthJourneyPage]
  
})
export class AddHealthJourneyModule {}
