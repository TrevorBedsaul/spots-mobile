import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, App } from 'ionic-angular';
import { SpotPage } from '../spot/spot';
import { Http } from '@angular/http';
import { Spot } from '../../models/spot';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-browse',
  templateUrl: 'browse.html',
})
export class BrowsePage {

  public spots: Array<Spot> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modCtrl: ModalController, public http: Http, private app: App) {
    this.http
    .get("http://localhost:3000/spots", {
    })
    .subscribe(
        result => {
            this.spots = result.json();
            console.log("spots: " + this.spots);
        },
        error => {
            console.log(error);
        }
    );
  }

  logout() {
    this.app.getRootNav().setRoot(HomePage);
  }
  
  presentModal(spot: Spot) {
    const modal = this.modCtrl.create(SpotPage, { spot: spot });
    modal.present();
  }
}
