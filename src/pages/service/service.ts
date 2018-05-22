import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
 import { ServiceDetailPage } from './service-detail';

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
    this.servicesRef = this.database.list('service');
    this.services = this.servicesRef.snapshotChanges()
    .map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }
 
  addNewService(){
    this.navCtrl.push(ServiceDetailPage);
  } 
 
   viewService(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ServiceDetailPage, {
      item: item
    });
  }


  removeService( service ){ 
    this.servicesRef.remove( service.key );
  }

}
