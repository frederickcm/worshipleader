import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SongDetailPage } from './song-detail';

@NgModule({
  declarations: [
    SongDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SongDetailPage),
  ],
  exports: [
    SongDetailPage
  ]
})
export class SongDetailPageModule {}