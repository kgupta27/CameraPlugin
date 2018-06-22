import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewLifeStorie2Page } from './new-life-storie2';


@NgModule({
  declarations: [
    NewLifeStorie2Page,
  ],
  imports: [
    IonicPageModule.forChild(NewLifeStorie2Page),
  ],	
  exports: [NewLifeStorie2Page]
  
})
export class NewLifeStorie2Module {}
