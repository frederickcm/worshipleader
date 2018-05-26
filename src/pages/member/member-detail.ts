import { Component } from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { MemberPage } from './member';

@IonicPage()
@Component({
  selector: 'page-member-detail',
  templateUrl: 'member-detail.html'
})
export class MemberDetailPage {

  membersRef: AngularFireList<any>;

  
  talentsRef: AngularFireList<any>;


  talentsFB: Observable<any[]>;


  talent: {id: number, name: string};


  item: {name: string};



  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public database: AngularFireDatabase,
    public navParams: NavParams
  ) {
  	
  	this.membersRef = this.database.list('members');
    this.talentsRef = this.database.list('talent');

    this.item = navParams.get('item');


    this.talentsFB = this.talentsRef.snapshotChanges()
    .map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }); 

    if(typeof this.item =='undefined'){
       this.item ={name: ''};
      }
  }


  addMember(member){
		this.membersRef.push({
      name: member.name,
      talents: member.talents
      }
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
      talents: member.talents
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
