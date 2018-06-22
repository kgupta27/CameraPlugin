import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExperienceGallaryPage } from './experience-gallary';
import { BgImageWithLoaderPageModule } from '../../../../../components/bg-image-with-loader/bg-image-with-loader.module';

@NgModule({
  declarations: [
    ExperienceGallaryPage,
  ],
  imports: [
    IonicPageModule.forChild(ExperienceGallaryPage),BgImageWithLoaderPageModule
  ],
})
export class ExperienceGallaryPageModule {}
