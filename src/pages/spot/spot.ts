import { Component } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { NavParams } from 'ionic-angular'
import { LoadingController } from 'ionic-angular';
import { Spot } from '../../models/spot';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-spot',
  templateUrl: 'spot.html'
})
export class SpotPage {
  public spot: Spot;
  public token: string;
  public user_id: number;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, public toastCtrl: ToastController, public http: Http, public storage: Storage, public actionSheetCtrl: ActionSheetController) {
    this.spot = this.navParams.get("spot");
    storage.get('token').then((val) => {
      this.token = val;
      this.http
        .get("http://localhost:3000/user/token", {
          params: {
            token: this.token
          }
        })
        .subscribe(
          result => {
            this.user_id = result.json().user.id;
          },
          error => {
            console.log(error);
          }
        );
    });
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'There now',
          role: 'destructive',
          handler: () => {
            console.log('There now clicked');
          }
        }, {
          text: 'Going',
          handler: () => {
            console.log('Going clicked');
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  closeModal() {
    this.navCtrl.pop();
  }
}
