import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddFavoriteCharityPage } from './add-favorite-charity';

@NgModule({
  declarations: [
    AddFavoriteCharityPage,
  ],
  imports: [
    IonicPageModule.forChild(AddFavoriteCharityPage),
  ],	
  exports: [AddFavoriteCharityPage]
  
})
export class AddFavoriteCharityModule {}
