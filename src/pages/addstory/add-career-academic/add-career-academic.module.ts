import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCareerAcademicPage } from './add-career-academic';

@NgModule({
  declarations: [
    AddCareerAcademicPage,
  ],
  imports: [
    IonicPageModule.forChild(AddCareerAcademicPage),
  ],	
  exports: [AddCareerAcademicPage]
  
})
export class AddCareerAcademicModule {}
