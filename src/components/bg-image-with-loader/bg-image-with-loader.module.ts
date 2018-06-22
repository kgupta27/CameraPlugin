import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BgImageWithLoader } from './bg-image-with-loader';

@NgModule({
  declarations: [
    BgImageWithLoader
  ],
  imports: [
    IonicPageModule.forChild(BgImageWithLoader),
  ],
  exports : [BgImageWithLoader]
})
export class BgImageWithLoaderPageModule {}
