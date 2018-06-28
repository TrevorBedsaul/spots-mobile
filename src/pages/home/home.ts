import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { BrowsePage } from '../browse/browse';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public email: string;
  public password: string;
  constructor(public navCtrl: NavController, public storage: Storage, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public http: Http) {
    // storage.get('token').then((val) => {
    //   if(val){
    //     this.navCtrl.push(TabsPage);
    //   }
    // });
  }

  navigateToBrowse() {
    this.navCtrl.push(BrowsePage);
  }

  navigateToRegister() {
    this.navCtrl.push(RegisterPage);
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
        content: "Logging you in. Please wait...",
        duration: 500
    });
    loader.present();
    this.http
        .post("http://localhost:3000/login", {
            email: this.email,
            password: this.password,
        })
        .subscribe(
            result => {
                console.log(result);
                var responseJson = result.json();
                this.storage.set('token', responseJson.token);
                console.log("jwt: ", responseJson.token);
                this.navCtrl.push(BrowsePage, {
                    token: responseJson.token
                });
            },
            error => {
                console.log(error);
                let toast = this.toastCtrl.create({
                    message: 'Invalid email and password combination.',
                    duration: 2000
                  });
                  toast.present();
            }
        );
}

}
