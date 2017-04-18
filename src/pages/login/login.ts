import { Component } from '@angular/core';
import {  NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { AuthProviders, AuthMethods, AngularFire } from 'angularfire2';
import { Facebook } from 'ionic-native';
import firebase from 'firebase';
import { HomePage } from '../home/home';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  email: any;
  password: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public angfire: AngularFire,
              public platform: Platform,
              public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  login() {
    this.angfire.auth.login({
        email: this.email,
        password: this.password
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password
      }).then((response) => {
      console.log('Login success' + JSON.stringify(response));
      let currentuser = {
        email: response.auth.email,
        picture: response.auth.photoURL
      };
      window.localStorage.setItem('currentuser', JSON.stringify(currentuser));
      this.navCtrl.push(HomePage);
    }).catch((error) => {
      debugger;
      this.showLoginErrors(error);
    })
  }

  twitterlogin() {
    this.angfire.auth.login({
      provider: AuthProviders.Twitter,
      method: AuthMethods.Popup
    }).then((response) => {
      console.log('Login success with twitter' + JSON.stringify(response));
      let currentuser = {
        email: response.auth.displayName,
        picture: response.auth.photoURL
      };
      window.localStorage.setItem('currentuser', JSON.stringify(currentuser));
      this.navCtrl.push(HomePage);
    }).catch((error) => {
      console.log(error);
    })

  }

  fblogin() {
    this.angfire.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    }).then((response) => {
      console.log('Login success with twitter' + JSON.stringify(response));
      let currentuser = {
        email: response.auth.displayName,
        picture: response.auth.photoURL
      };
      window.localStorage.setItem('currentuser', JSON.stringify(currentuser));
      this.navCtrl.push(HomePage);
    }).catch((error) => {
      console.log(error);
    })

  }

  showLoginErrors(error) {
    let prompt = this.alertCtrl.create({
      title: 'Login Error',
      message: error.message,
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        }
      ]
    })
    prompt.present();
  }
}


