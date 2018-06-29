import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { SpotPage } from '../spot/spot';
/**
 * Generated class for the BrowsePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-browse',
  templateUrl: 'browse.html',
})
export class BrowsePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modCtrl: ModalController) {
  
  }

  ionViewDidLoad() {

  }

 
  presentModal() {
    const modal = this.modCtrl.create(SpotPage);
    modal.present();
  }
}
