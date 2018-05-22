import { Component } from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { ServiceDetailPage } from './service-detail';
import { ServicePage } from './service';

@IonicPage()
@Component({
  selector: 'page-service-detail',
  templateUrl: 'service-detail.html'
})
export class ServiceDetailPage {

  serviceRef: AngularFireList<any>;

  item: {name: string, begindate: date};
 

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public database: AngularFireDatabase,
    public navParams: NavParams
  ) {
  	
  	this.serviceRef = this.database.list('service');

    this.item = navParams.get('item');

    if(typeof this.item =='undefined'){
       this.item ={name: '',begindate: new Date().toISOString()};
      }
  }


  addService(service){
		this.serviceRef.push({
      name: service.name,
      begindate: service.begindate
      }
	  );


 	const alert = this.alertCtrl.create({
      title: 'Perfecto!',
      subTitle: 'Se ha agregado un nuevo miembro!',
      buttons: ['Ok']
    });

    alert.present();

	this.navCtrl.push(ServicePage);
  
  }

  updateService( service ){
    this.serviceRef.update( service.key,{
      name: service.name,
      begindate: service.begindate
    });

 	const alert = this.alertCtrl.create({
      title: 'Perfecto!',
      subTitle: 'Se han guardado los cambios!',
      buttons: ['Ok']
    });

    alert.present();

	this.navCtrl.push(ServicePage);

  }





}
