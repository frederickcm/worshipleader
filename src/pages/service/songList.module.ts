import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SongListPage } from './songList';

@NgModule({
  declarations: [
    SongListPage,
  ],
  imports: [
    IonicPageModule.forChild(SongListPage),
  ],
  exports: [
    SongListPage
  ]
})
export class SongListPageModule {}