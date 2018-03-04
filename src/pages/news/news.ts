import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
    
    new:Object[] = [];
    slides = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,private _dataProvider: DataProvider,private iab: InAppBrowser ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }
    ngOnInit(){
        this._dataProvider.getNews()
        .subscribe(res => {
            console.log(res);
            this.new = [];
            this.new = this.new.concat(res);
            this.slides = this.new.splice(8,5);
        })
        
    }
    openFeeds(url){
        const browser = this.iab.create(url);
    }

}
