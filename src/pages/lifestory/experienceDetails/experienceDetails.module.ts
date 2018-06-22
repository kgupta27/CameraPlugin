import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExperienceDetailsPage } from './experienceDetails';
import { BgImageWithLoaderPageModule } from '../../../components/bg-image-with-loader/bg-image-with-loader.module';

@NgModule({
  declarations: [
    ExperienceDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ExperienceDetailsPage),BgImageWithLoaderPageModule
  ],	
})
export class ExperienceDetailsModule {}
