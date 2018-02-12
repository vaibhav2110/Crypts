import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
    currency: string = 'USD';

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,private storage: Storage, private _dataProvider: DataProvider) {
  }
    ngOnInit(){
        this.storage.get('currency')
        .then(val => {
            if(val){
                this.currency = val;
            }
            else{
                this.storage.set('currency', this.currency);
            }
        })
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    
  }
    dismiss(){
        this.viewCtrl.dismiss();
    }
    setValue(){
        this._dataProvider.setCurrency(this.currency);
        this.storage.remove('currency');
        this.storage.set('currency', this.currency);
        console.log('yo');
        console.log(this.currency);
        this.viewCtrl.dismiss();
    }

}
