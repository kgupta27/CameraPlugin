import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GalleryPage } from './gallery';
import { BgImageWithLoaderPageModule } from '../../../../../components/bg-image-with-loader/bg-image-with-loader.module';
// import 'hammerjs';
// import { NgxGalleryModule } from 'ngx-gallery';

@NgModule({
  declarations: [
    GalleryPage,
  ],
  imports: [
    IonicPageModule.forChild(GalleryPage),BgImageWithLoaderPageModule
  ],exports: [GalleryPage
    ],
})
export class GalleryModule {}
