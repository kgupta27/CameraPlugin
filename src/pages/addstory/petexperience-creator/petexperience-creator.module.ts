import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PetExperienceCreatorPage } from './petexperience-creator';

@NgModule({
  declarations: [
    PetExperienceCreatorPage,
  ],
  imports: [
    IonicPageModule.forChild(PetExperienceCreatorPage),
  ],	
  exports: [PetExperienceCreatorPage]
  
})
export class PetExperienceCreatorModule {}
