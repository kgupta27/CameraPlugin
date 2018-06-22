import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditProfilePage } from './edit-profile';
import {BgImageWithLoaderPageModule } from '../../../components/bg-image-with-loader/bg-image-with-loader.module';

@NgModule({
  declarations: [
    EditProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(EditProfilePage),BgImageWithLoaderPageModule
  ],	
  exports: [EditProfilePage]
  
})
export class EditProfileModule {}
