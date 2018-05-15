import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
 

@IonicPage()
@Component({
  selector: 'page-service',
  templateUrl: 'service.html'
})
export class ServicePage {

  servicesRef: AngularFireList<any>;
  services: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public database: AngularFireDatabase
  ) {
    this.servicesRef = this.database.list('services');
    this.services = this.servicesRef.snapshotChanges()
    .map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }
 
  addNewService(){
    let newServiceModal = this.alertCtrl.create({
      title: 'Agregar Servicio',
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
            this.servicesRef.push({
              name: data[0]
            });
          }
        }
      ]
    });
    newServiceModal.present( newServiceModal );
  } 
 

  removeService( service ){ 
    this.servicesRef.remove( service.key );
  }

}
