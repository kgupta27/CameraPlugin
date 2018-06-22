import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewLifeStorie5Page } from './new-life-storie5';
import {BgImageWithLoaderPageModule } from '../../../../components/bg-image-with-loader/bg-image-with-loader.module';

@NgModule({
  declarations: [
    NewLifeStorie5Page,
  ],
  imports: [
    IonicPageModule.forChild(NewLifeStorie5Page),BgImageWithLoaderPageModule
  ],	
  exports: [NewLifeStorie5Page]
  
})
export class NewLifeStorie5Module {}
