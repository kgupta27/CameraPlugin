import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HealthJourneyPage } from './health-journey';

@NgModule({
  declarations: [
    HealthJourneyPage,
  ],
  imports: [
    IonicPageModule.forChild(HealthJourneyPage),
  ],	
  exports: [HealthJourneyPage]
  
})
export class HealthJourneyModule {}
