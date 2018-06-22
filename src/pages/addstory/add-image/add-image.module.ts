import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddImagePage } from './add-image';
import {BgImageWithLoaderPageModule } from '../../../components/bg-image-with-loader/bg-image-with-loader.module';

@NgModule({
  declarations: [
    AddImagePage,
  ],
  imports: [
    IonicPageModule.forChild(AddImagePage),BgImageWithLoaderPageModule
  ],	
  exports: [AddImagePage]
  
})
export class AddImageModule {}
