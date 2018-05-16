import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { MemberDetailPage } from './member-detail';

@IonicPage()
@Component({
  selector: 'page-member',
  templateUrl: 'member.html'
})
export class MemberPage {

  membersRef: AngularFireList<any>;
  members: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public database: AngularFireDatabase
  ) {
    this.membersRef = this.database.list('members');
    this.members = this.membersRef.snapshotChanges()
    .map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }); 


  }
/*
  createMember(){
    let newMemberModal = this.alertCtrl.create({
      title: 'Agregar ministro',
      message: "Favor completar la información",
      inputs: [
        {
          name: 'Nombre',
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
            this.membersRef.push({
              title: data.title,
              done: false
            });
          }
        }
      ]
    });
    newMemberModal.present( newMemberModal );
  }*/

  addNewMember() {
    this.navCtrl.push(MemberDetailPage);
  }

  viewMember(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(MemberDetailPage, {
      item: item
    });
  }


  removeMember( member ){
    console.log( member );
    this.membersRef.remove( member.key );
  }

}
