import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
 

@IonicPage()
@Component({
  selector: 'page-talent',
  templateUrl: 'talent.html'
})
export class TalentPage {

  talentsRef: AngularFireList<any>;
  talents: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public database: AngularFireDatabase
  ) {
    this.talentsRef = this.database.list('talent');
    this.talents = this.talentsRef.snapshotChanges()
    .map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }
 
  addNewTalent(){
    let newTalentModal = this.alertCtrl.create({
      title: 'Agregar Talento',
      message: "Favor completar la información",
      inputs: [
        {
          title: 'Nombre',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cerrar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            this.talentsRef.push({
              name: data[0]
            });
          }
        }
      ]
    });
    newTalentModal.present( newTalentModal );
  } 
 

  removeTalent( talent ){ 
    this.talentsRef.remove( talent.key );
  }

}
