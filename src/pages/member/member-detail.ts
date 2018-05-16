import { Component } from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { NavController, NavParams } from 'ionic-angular';
import { MemberPage } from './member';

@IonicPage()
@Component({
  selector: 'page-member-detail',
  templateUrl: 'member-detail.html'
})
export class MemberDetailPage {

  membersRef: AngularFireList<any>;
  item: {name: string, service: string};

  serviceRef: AngularFireList<any>;
  services: Observable<any[]>;
  serviceSelected: {name: string};

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public database: AngularFireDatabase,
    public navParams: NavParams
  ) {
  	
  	this.membersRef = this.database.list('members');
    this.item = navParams.get('item');
    if(typeof this.item =='undefined'){this.item ={name: '', service: ''};}     

    this.serviceRef = this.database.list('services');
    this.services = this.serviceRef.snapshotChanges()
    .map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });


  }


  addMember(member){
		this.membersRef.push({
	      name: member.name,
	      service: member.service}
	  );


 	const alert = this.alertCtrl.create({
      title: 'Perfecto!',
      subTitle: 'Se ha agregado un nuevo miembro!',
      buttons: ['Ok']
    });

    alert.present();

	this.navCtrl.push(MemberPage);
  
  }

  updateMember( member ){
    this.membersRef.update( member.key,{
      name: member.name,
      service: member.service
    });

 	const alert = this.alertCtrl.create({
      title: 'Perfecto!',
      subTitle: 'Se han guardado los cambios!',
      buttons: ['Ok']
    });

    alert.present();

	this.navCtrl.push(MemberPage);

  }





}
