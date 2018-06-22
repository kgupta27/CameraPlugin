import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompetitionsTrainingPage } from './competitions-training';

@NgModule({
  declarations: [
    CompetitionsTrainingPage,
  ],
  imports: [
    IonicPageModule.forChild(CompetitionsTrainingPage),
  ],
})
export class CompetitionsTrainingPageModule {}
