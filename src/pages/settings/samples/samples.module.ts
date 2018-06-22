import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SamplesPage } from './samples';

@NgModule({
  declarations: [
    SamplesPage,
  ],
  imports: [
    IonicPageModule.forChild(SamplesPage),
  ],
})
export class SamplesPageModule {}
