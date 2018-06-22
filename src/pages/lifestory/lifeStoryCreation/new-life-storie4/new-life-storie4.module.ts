import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewLifeStorie4Page } from './new-life-storie4';


@NgModule({
  declarations: [
    NewLifeStorie4Page,
  ],
  imports: [
    IonicPageModule.forChild(NewLifeStorie4Page),
  ],	
  exports: [NewLifeStorie4Page]
  
})
export class NewLifeStorie4Module {}
