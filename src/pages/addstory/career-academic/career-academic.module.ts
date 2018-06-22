import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CareerAcademicPage } from './career-academic';

@NgModule({
  declarations: [
    CareerAcademicPage,
  ],
  imports: [
    IonicPageModule.forChild(CareerAcademicPage),
  ],	
  exports: [CareerAcademicPage]
  
})
export class CareerAcademicModule {}
