import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewLifeStorie1Page } from './new-life-storie1';


@NgModule({
  declarations: [
    NewLifeStorie1Page,
  ],
  imports: [
    IonicPageModule.forChild(NewLifeStorie1Page),
  ],	
  exports: [NewLifeStorie1Page]
  
})
export class NewLifeStorie1Module {}
