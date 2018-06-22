import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsPage } from './settings';
import {BgImageWithLoaderPageModule } from '../../../components/bg-image-with-loader/bg-image-with-loader.module';

@NgModule({
  declarations: [
    SettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingsPage),BgImageWithLoaderPageModule
  ],	
  exports: [SettingsPage]
  
})
export class SettingsModule {}
