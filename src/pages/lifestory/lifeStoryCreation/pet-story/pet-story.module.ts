import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PetStoryPage} from './pet-story';


@NgModule({
  declarations: [
    PetStoryPage,
  ],
  imports: [
    IonicPageModule.forChild(PetStoryPage),
  ],	
  exports: [PetStoryPage]
  
})
export class PetStoryModule {}
