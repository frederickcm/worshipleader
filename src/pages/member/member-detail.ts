import { Component } from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { NavController, NavParams } from 'ionic-angular';
import { MemberPage } from './member';

@IonicPage()
@Component({
  selector: 'page-member-detail',
  templateUrl: 'member-detail.html'
})
export class MemberDetailPage {

  membersRef: AngularFireList<any>;
  item: {name: 'string', service: string};

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public database: AngularFireDatabase,
    public navParams: NavParams
  ) {
  	
  	this.membersRef = this.database.list('members');
    this.item = navParams.get('item');
    if(typeof this.item =='undefined'){this.item ={name: '', service: ''};}     
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
