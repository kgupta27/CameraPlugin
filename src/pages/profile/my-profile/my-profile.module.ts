import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyProfilePage } from './my-profile';
import {BgImageWithLoaderPageModule } from '../../../components/bg-image-with-loader/bg-image-with-loader.module';

@NgModule({
  declarations: [
    MyProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(MyProfilePage),BgImageWithLoaderPageModule
  ],	
  exports: [MyProfilePage]
  
})
export class MyProfileModule {}
