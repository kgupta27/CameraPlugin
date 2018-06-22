import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExperiencePage } from './experience';
import {BgImageWithLoaderPageModule } from '../../../../../components/bg-image-with-loader/bg-image-with-loader.module';

@NgModule({
  declarations: [
    ExperiencePage,
  ],
  imports: [
    IonicPageModule.forChild(ExperiencePage),BgImageWithLoaderPageModule
  ],
})
export class ExperiencePageModule {}
