import { Component , ElementRef} from '@angular/core';
import { Nav,Platform, ModalController, NavController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
import { Chart } from 'chart.js';
import { LoadingController } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { CoinDetailPage } from '../coin-detail/coin-detail';
import { SettingsPage } from '../settings/settings';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  detailToggle = [];
  objectKeys = Object.keys;
  coins: any[];
  details: any[] = [];
  likedCoins = ['BTC','ETH','LTC','XRP'];
  chart: any[] = [];
  currency: string;

  constructor( 
    public navCtrl: NavController, 
    private _dataProvider: DataProvider, 
    private storage: Storage,
     private elementRef: ElementRef,
    public loading: LoadingController,
     public modalCtrl: ModalController,
     private admobFree: AdMobFree
  ) {
  }
    
    
    ngOnInit(){
        const bannerConfig: AdMobFreeBannerConfig = {
         // add your config here
         // for the sake of this example we will just use the test config
         isTesting: false,
         id: 'ca-app-pub-2929147522219560/6947435351',
         autoShow: true
        };
        this.admobFree.banner.config(bannerConfig);

        this.admobFree.banner.prepare()
          .then(() => {
            // banner Ad is ready
            // if we set autoShow to false, then we will need to call the show method here
          })
          .catch(e => console.log(e));
        console.log('entered');
        
        this.storage.get('currency')
        .then(val => {
            if(val){
                this.currency = val;
            }
            else{
                this.storage.set('currency', 'USD');
            }
        });
        this.storage
          .get('likedCoins')
          .then(val => {
              if(val) {
                this.likedCoins = val;
                return val;
              } else {
                this.storage.set('likedCoins', this.likedCoins);
                return this.likedCoins;
              }
          })
        
          .then((coins) => {
            this.currency  = this._dataProvider.getCurrency();
            this._dataProvider.getCoin(coins)
                .subscribe(res => {
                 console.log(res);
                  for(let i=0;i<this.likedCoins.length;i++){
                      console.log(this.likedCoins[i]);
                      this.details[i] = res['DISPLAY'][this.likedCoins[i]][this.currency];
                      this._dataProvider.getChart(this.likedCoins[i])
                      .subscribe(res => {
                        console.log(res);
                        let coinHistory = res['Data'].map((a) => (a.close));
                        console.log(coinHistory);
                        setTimeout(()=> {
                          const chartOptions = {
                            tooltips: {
                              enabled: false
                              },
                              responsive: true, 
                              legend: {
                                display: false
                            },
                            scales: {
                              xAxes: [{
                                display: false
                              }],
                              yAxes: [{
                                display: false
                              }],
                            }

                          };
                        let htmlRef = this.elementRef.nativeElement.querySelector(`#canvas${i}`).getContext('2d');
                         console.log(htmlRef);
                         console.log('canvas'+i);
                         var gradient = htmlRef.createLinearGradient(500, 100, 0, 100);
                            gradient.addColorStop(0, 'rgba(65,176,203,1)');
                            gradient.addColorStop(1, 'rgba(128,113,222,1)');
                          this.chart[i] = new Chart('canvas'+i , {
                            type: 'line',
                            data: {
                              labels: coinHistory,
                              datasets: [{ 
                                  data: coinHistory,
                                  borderColor: gradient,
                                  fill: false,
                                  pointRadius: 0
                                }
                              ]
                            },
                            options: chartOptions
                          });
                        }, 1000);
                      });
                  }
                
                console.log(this.details);
            })
          })
      }

  ionViewDidEnter() {
      console.log('didEnter');
      const bannerConfig: AdMobFreeBannerConfig = {
         // add your config here
         // for the sake of this example we will just use the test config
         isTesting: false,
         id: 'ca-app-pub-2929147522219560/6947435351',
         autoShow: true
        };
        this.admobFree.banner.config(bannerConfig);

        this.admobFree.banner.prepare()
          .then(() => {
            // banner Ad is ready
            // if we set autoShow to false, then we will need to call the show method here
          })
          .catch(e => console.log(e));
        console.log('entered');
        
        this.storage.get('currency')
        .then(val => {
            if(val){
                this.currency = val;
            }
            else{
                this.storage.set('currency', 'USD');
            }
        });
    this.refreshCoins();
      this.storage.get('currency')
        .then(val => {
            if(val){
                this.currency = val;
            }
            else{
                this.storage.set('currency', 'USD');
            }
        });
      this.storage
              .get('likedCoins')
              .then(val => {
                  if(val) {
                    this.likedCoins = val;
                    return val;
                  } else {
                    this.storage.set('likedCoins', this.likedCoins);
                    return this.likedCoins;
                  }
              })
              .then((coins) => {
                this._dataProvider.getCoins(coins)
                .subscribe(res => {
                  this.coins = res;
                  console.log(this.coins);
                });
          this.currency  = this._dataProvider.getCurrency();
                this._dataProvider.getCoin(coins)
                .subscribe(res => {
                 console.log(res);
                  for(let i=0;i<this.likedCoins.length;i++){
                      console.log(this.likedCoins[i]);
                      this.details[i] = res['DISPLAY'][this.likedCoins[i]][this.currency];
                      this._dataProvider.getChart(this.likedCoins[i])
                      .subscribe(res => {
                        console.log(res);
                        let coinHistory = res['Data'].map((a) => (a.close));
                        console.log(coinHistory);
                          const chartOptions = {
                              animation: {
                                    duration: 0, // general animation time
                                },
                                hover: {
                                    animationDuration: 0, // duration of animations when hovering an item
                                },
                                responsiveAnimationDuration: 0, // animation duration after a resize
                            tooltips: {
                              enabled: false
                              },
                              responsive: true, 
                              legend: {
                                display: false
                            },
                            scales: {
                              xAxes: [{
                                display: false
                              }],
                              yAxes: [{
                                display: false
                              }],
                            }

                          };
                        let htmlRef = this.elementRef.nativeElement.querySelector(`#canvas${i}`).getContext('2d');
                          var gradient = htmlRef.createLinearGradient(500, 100, 0, 100);
                            gradient.addColorStop(0, 'rgba(65,176,203,1)');
                            gradient.addColorStop(1, 'rgba(128,113,222,1)');
                          this.chart[i] = new Chart('canvas'+i , {
                            type: 'line',
                            data: {
                              labels: coinHistory,
                              datasets: [{ 
                                  data: coinHistory,
                                  borderColor: gradient,
                                  fill: false,
                                  pointRadius: 0
                                }
                              ]
                            },
                            options: chartOptions
                          });
                      });
                 
                      
                  }
                console.log(this.details);
            });
              }) 
      setInterval(() => {
          this.storage
              .get('likedCoins')
              .then(val => {
                  if(val) {
                    this.likedCoins = val;
                    return val;
                  } else {
                    this.storage.set('likedCoins', this.likedCoins);
                    return this.likedCoins;
                  }
              })
              .then((coins) => {
                this._dataProvider.getCoins(coins)
                .subscribe(res => {
                  this.coins = res;
                  console.log(this.coins);
                });
              this.currency  = this._dataProvider.getCurrency();
                this._dataProvider.getCoin(coins)
                .subscribe(res => {
                 console.log(res);
                  for(let i=0;i<this.likedCoins.length;i++){
                      console.log(this.likedCoins[i]);
                      this.details[i] = res['DISPLAY'][this.likedCoins[i]][this.currency];                     
                  }
                console.log(this.details);
            });
              }) 
          
    }, 10000);
  }

  refreshCoins() {
    let loader = this.loading.create({
      content: 'Refreshing..',
      spinner: 'bubbles'
    });

    loader.present().then(() => {
      this.storage.get('currency')
        .then(val => {
            if(val){
                this.currency = val;
            }
            else{
                this.storage.set('currency', 'USD');
            }
        });
      this.storage
      .get('likedCoins')
      .then(val => {
          if(val) {
            this.likedCoins = val;
            return val;
          } else {
            this.storage.set('likedCoins', this.likedCoins);
            return this.likedCoins;
          }
      })
      .then((coins) => {
        this._dataProvider.getCoins(coins)
        .subscribe(res => {
          this.coins = res;
          console.log(this.coins);
        });
          this.currency  = this._dataProvider.getCurrency();
          this._dataProvider.getCoin(coins)
                .subscribe(res => {
                 console.log(res);
                  for(let i=0;i<this.likedCoins.length;i++){
                      console.log(this.likedCoins[i]);
                      this.details[i] = res['DISPLAY'][this.likedCoins[i]][this.currency];
                      
                  }
                        loader.dismiss();

            });
      })
    });
  }
  coinDetail(coin, details){ 
      this.navCtrl.push('CoinDetailPage',{
          coin: coin,
          details: details
      })
  }


  swiped(index) {
    this.detailToggle[index] = false;
  }

  removeCoin(coin) {
    console.log(this.likedCoins);
    console.log(coin);
    this.detailToggle.fill(false);
    if(this.likedCoins.indexOf(coin)>=0){
        this.storage.remove('likedCoins');
        this.likedCoins.splice(this.likedCoins.indexOf(coin),1);
        this.details.splice(this.details.indexOf(coin),1);
        this.storage.set('likedCoins',this.likedCoins);
        this.currency  = this._dataProvider.getCurrency();
        this._dataProvider.getCoin(this.likedCoins)
                .subscribe(res => {
                 console.log(res);
                  for(let i=0;i<this.likedCoins.length;i++){
                      console.log(this.likedCoins[i]);
                      this.details[i] = res['DISPLAY'][this.likedCoins[i]][this.currency];
                      this._dataProvider.getChart(this.likedCoins[i])
                      .subscribe(res => {
                        console.log(res);
                        let coinHistory = res['Data'].map((a) => (a.close));
                        console.log(coinHistory);
                        setTimeout(()=> {
                          const chartOptions = {
                            tooltips: {
                              enabled: false
                              },
                              responsive: true, 
                              legend: {
                                display: false
                            },
                            scales: {
                              xAxes: [{
                                display: false
                              }],
                              yAxes: [{
                                display: false
                              }],
                            }

                          };
                        let htmlRef = this.elementRef.nativeElement.querySelector(`#canvas${i}`).getContext('2d');
                            
                            var gradient = htmlRef.createLinearGradient(500, 100, 0, 100);
                            gradient.addColorStop(0, 'rgba(65,176,203,1)');
                            gradient.addColorStop(1, 'rgba(128,113,222,1)');
                         console.log(htmlRef);
                         console.log('canvas'+i);
                          this.chart[i] = new Chart('canvas'+i , {
                            type: 'line',
                            data: {
                              labels: coinHistory,
                              datasets: [{ 
                                  data: coinHistory,
                                  borderColor: gradient,
                                  fill: false,
                                  pointRadius: 0
                                }
                              ]
                            },
                            options: chartOptions
                          });
                        }, 1000);
                      });
                  }
                console.log(this.details);
            })
    }
    setTimeout(() => {
      this.refreshCoins();
    }, 300);
  }
    
openSettings(){
        let modal = this.modalCtrl.create(SettingsPage);
        modal.onDidDismiss(()=>{
            this.storage
          .get('likedCoins')
          .then(val => {
              if(val) {
                this.likedCoins = val;
                return val;
              } else {
                this.storage.set('likedCoins', this.likedCoins);
                return this.likedCoins;
              }
          })
        
          .then((coins) => {
            this.currency  = this._dataProvider.getCurrency();
            this._dataProvider.getCoin(coins)
                .subscribe(res => {
                 console.log(res);
                  for(let i=0;i<this.likedCoins.length;i++){
                      console.log(this.likedCoins[i]);
                      this.details[i] = res['DISPLAY'][this.likedCoins[i]][this.currency];
                      this._dataProvider.getChart(this.likedCoins[i])
                      .subscribe(res => {
                        console.log(res);
                        let coinHistory = res['Data'].map((a) => (a.close));
                        console.log(coinHistory);
                        setTimeout(()=> {
                          const chartOptions = {
                            tooltips: {
                              enabled: false
                              },
                              responsive: true, 
                              legend: {
                                display: false
                            },
                            scales: {
                              xAxes: [{
                                display: false
                              }],
                              yAxes: [{
                                display: false
                              }],
                            }
                          };
                        let htmlRef = this.elementRef.nativeElement.querySelector(`#canvas${i}`).getContext('2d');
                         console.log(htmlRef);
                         console.log('canvas'+i);
                         var gradient = htmlRef.createLinearGradient(500, 100, 0, 100);
                            gradient.addColorStop(0, 'rgba(65,176,203,1)');
                            gradient.addColorStop(1, 'rgba(128,113,222,1)');
                          this.chart[i] = new Chart('canvas'+i , {
                            type: 'line',
                            data: {
                              labels: coinHistory,
                              datasets: [{ 
                                  data: coinHistory,
                                  borderColor: gradient,
                                  fill: false,
                                  pointRadius: 0
                                }
                              ]
                            },
                            options: chartOptions
                          });
                        }, 1000);
                      });
                  }
                
                console.log(this.details);
            })
          })
        });
        modal.present();
    }
  showSearch() {
    this.navCtrl.push(SearchPage);
  }
}
