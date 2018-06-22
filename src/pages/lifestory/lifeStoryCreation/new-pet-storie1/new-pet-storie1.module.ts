import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewPetStorie1Page } from './new-pet-storie1';


@NgModule({
  declarations: [
    NewPetStorie1Page,
  ],
  imports: [
    IonicPageModule.forChild(NewPetStorie1Page),
  ],	
  exports: [NewPetStorie1Page]
  
})
export class NewPetStorie1Module {}
