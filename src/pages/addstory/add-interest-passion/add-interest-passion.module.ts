import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddInterestPassionPage } from './add-interest-passion';

@NgModule({
  declarations: [
    AddInterestPassionPage,
  ],
  imports: [
    IonicPageModule.forChild(AddInterestPassionPage),
  ],	
  exports: [AddInterestPassionPage]
  
})
export class AddInterestPassionModule {}
