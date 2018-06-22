import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCompetitionsTrainingPage } from './add-competitions-training';

@NgModule({
  declarations: [
    AddCompetitionsTrainingPage,
  ],
  imports: [
    IonicPageModule.forChild(AddCompetitionsTrainingPage),
  ],	
  exports: [AddCompetitionsTrainingPage]
  
})
export class AddCompetitionsTrainingModule {}
