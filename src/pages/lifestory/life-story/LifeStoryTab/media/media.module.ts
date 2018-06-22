import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MediaPage } from './media';
import {BgImageWithLoaderPageModule } from '../../../../../components/bg-image-with-loader/bg-image-with-loader.module';

@NgModule({
  declarations: [
    MediaPage,
  ],
  imports: [
    IonicPageModule.forChild(MediaPage),BgImageWithLoaderPageModule
  ],exports: [MediaPage
    ],
})
export class SecondPageModule {}
