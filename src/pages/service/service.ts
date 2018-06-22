import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController } from 'ionic-angular';
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
  servicesNext: Observable<any[]>;
  servicesPast: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public database: AngularFireDatabase,
    public loadingCtrl: LoadingController
  ) {

    let loading = this.loadingCtrl.create({content: 'Please wait...'});
    loading.present();

    this.servicesRef = this.database.list('service'); 

    this.servicesNext = this.servicesRef.snapshotChanges()
    .map(changes => {
      
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });


    this.servicesPast =this.servicesNext;


    this.servicesNext = this.servicesNext.map(x => {loading.dismiss();
           return x.filter(y=>y.begindate > new Date().toISOString() );
      }); 

    this.servicesNext = this.servicesNext.map(things => things.sort(
        (a, b) => { 
          if (new Date(a.begindate) < new Date(b.begindate))
            return -1;
          if (new Date(a.begindate) > new Date(b.begindate))
            return 1;
          return 0;
        }
    )); 
    
    this.servicesPast = this.servicesPast.map(x => {
           return x.filter(y=>y.begindate < new Date().toISOString() );
      });
    this.servicesPast = this.servicesPast.map(things => things.sort(
        (a, b) => {
          if (new Date(a.begindate) > new Date(b.begindate))
            return -1;
          if (new Date(a.begindate) < new Date(b.begindate))
            return 1;
          return 0;
        }
    ));

    

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
