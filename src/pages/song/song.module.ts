import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SongPage } from './song';

@NgModule({
  declarations: [
    SongPage,
  ],
  imports: [
    IonicPageModule.forChild(SongPage),
  ],
  exports: [
    SongPage
  ]
})
export class SongPageModule {}