import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  objectKeys = Object.keys;
  likedCoins = [];
  raw = [];
  liked = [];
  allcoins:any;

  constructor(private storage: Storage, private _data: DataProvider, public loading: LoadingController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    let loader = this.loading.create({
      content: 'Refreshing..',
      spinner: 'bubbles'
    });

    loader.present().then(() => {

      this.storage.get('likedCoins').then((val) => {
        this.likedCoins = val;
      });

      this._data.allCoins()
        .subscribe(res => {
          console.log(res);
          this.raw = res['Data'];
          this.allcoins = res['Data'];

          loader.dismiss();

          this.storage.get('likedCoins').then((val) => {
            this.liked = val;
          })

        })
    });
  }
   
  addCoin(coin) {
    this.storage.remove('likedCoins');
      if(this.likedCoins.indexOf(coin)<0){
        
        this.likedCoins.push(coin);
         }
    
    console.log(this.likedCoins);
    this.storage.set('likedCoins',this.likedCoins);
  }

  searchCoins(ev: any) {

    let val = ev.target.value;

    this.allcoins = this.raw;

    if (val && val.trim() != '') {

      const filtered = Object.keys(this.allcoins)
        .filter(key => val.toUpperCase().includes(key))
        .reduce((obj,key) => {
          obj[key] = this.allcoins[key];
          return obj;
        }, {});

      this.allcoins = filtered;

    }
  }
    
    setValue(){
        this.navCtrl.pop();
    }

}
