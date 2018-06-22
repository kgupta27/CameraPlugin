import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavoriteCharityPage } from './favorite-charity';

@NgModule({
  declarations: [
    FavoriteCharityPage,
  ],
  imports: [
    IonicPageModule.forChild(FavoriteCharityPage),
  ],
})
export class FavoriteCharityPageModule {}
