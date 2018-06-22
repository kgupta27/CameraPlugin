import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FamilynFriendsPage } from './familynfriends';
import {BgImageWithLoaderPageModule } from '../../../../../components/bg-image-with-loader/bg-image-with-loader.module';

@NgModule({
  declarations: [
    FamilynFriendsPage,
  ],
  imports: [
    IonicPageModule.forChild(FamilynFriendsPage),BgImageWithLoaderPageModule
  ],
})
export class FamilynFriendsModule {}
