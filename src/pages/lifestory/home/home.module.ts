import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { BgImageWithLoaderPageModule } from '../../../components/bg-image-with-loader/bg-image-with-loader.module';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),BgImageWithLoaderPageModule
  ],	
})
export class HomePageModule {}
