import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExperienceCreatorPage } from './experience-creator';

@NgModule({
  declarations: [
    ExperienceCreatorPage,
  ],
  imports: [
    IonicPageModule.forChild(ExperienceCreatorPage),
  ],	
  exports: [ExperienceCreatorPage]
  
})
export class ExperienceCreatorModule {}
