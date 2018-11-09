import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterGooglePage } from './registergoogle';

@NgModule({
  declarations: [
    RegisterGooglePage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterGooglePage),
  ],
  exports: [
    RegisterGooglePage
  ]
})
export class RegisterGooglePageModule {}