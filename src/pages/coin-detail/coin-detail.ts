import { Component,ElementRef  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
import { Chart } from 'chart.js';
import { LoadingController } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
/**
 * Generated class for the CoinDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coin-detail',
  templateUrl: 'coin-detail.html',
})
export class CoinDetailPage {
  coin= [];
  details:any[] = [];
  chart: any;
  currency: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private _dataProvider: DataProvider, private elementRef: ElementRef,private admobFree: AdMobFree,
    private storage: Storage,
    public loading: LoadingController) {
      this.coin[0] = this.navParams.get('coin');
      console.log(this.coin);
  }
    ngOnInit() {
        const bannerConfig: AdMobFreeBannerConfig = {
         // add your config here
         // for the sake of this example we will just use the test config
         id: 'ca-app-pub-2929147522219560/6947435351',
         autoShow: true
        };
        this.admobFree.banner.config(bannerConfig);

        this.admobFree.banner.prepare()
          .then(() => {
            console.log('prepared');
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
        this.currency  = this._dataProvider.getCurrency();
        this._dataProvider.getCoin(this.coin)
        .subscribe(res => {
            console.log(res);
          this.details[0] = res['DISPLAY'][this.coin[0]][this.currency];
          this._dataProvider.getChart(this.coin[0])
          .subscribe(res => {
            console.log(res);
            let coinHistory = res['Data'].map((a) => (a.close));
            console.log(coinHistory);
            setTimeout(()=> {
              const chartOptions = {
                tooltips: {
                  callbacks: {
                      label: function(tooltipItems, data) {
                          return "$" + tooltipItems.yLabel.toString();
                      }
                    }
                  },
                  responsive: true, 
                  legend: {
                    display: false
                },
                scales: {
                  xAxes: [{
                    display: true
                  }],
                  yAxes: [{
                    display: true
                  }],
                }
              };
            let htmlRef = this.elementRef.nativeElement.querySelector(`#canvas2`).getContext('2d');
                console.log(htmlRef);
                var gradient = htmlRef.createLinearGradient(500, 100, 0, 100);
                            gradient.addColorStop(0, 'rgba(65,176,203,1)');
                            gradient.addColorStop(1, 'rgba(128,113,222,1)');
                
              this.chart = new Chart(htmlRef, {
                type: 'line',
                data: {
                  labels: coinHistory,
                  datasets: [{ 
                      data: coinHistory,
                      borderColor: gradient,
                      backgroundColor: 'rgba(65,176,203,0.5)'
                    },
                  ]
                },
                options: chartOptions
              });
            }, 250);
          });
        });
      }
    
    twofour(){
        let loader = this.loading.create({
              content: 'Refreshing..',
              spinner: 'bubbles'
            });
        loader.present().then(() => {
            this.currency  = this._dataProvider.getCurrency();
                  this._dataProvider.getCoin(this.coin)
                .subscribe(res => {
                    console.log(res);
                  this.details[0] = res['DISPLAY'][this.coin[0]][this.currency];
                  this._dataProvider.getChart2('histohour',24,this.coin[0])
                  .subscribe(res => {
                    console.log(res);
                    let coinHistory = res['Data'].map((a) => (a.close));
                    console.log(coinHistory);
                    setTimeout(()=> {
                      const chartOptions = {
                        tooltips: {
                          callbacks: {
                              label: function(tooltipItems, data) {
                                  return "$" + tooltipItems.yLabel.toString();
                              }
                            }
                          },
                          responsive: true, 
                          legend: {
                            display: false
                        },
                        scales: {
                          xAxes: [{
                            display: true
                          }],
                          yAxes: [{
                            display: true
                          }],
                        }
                      };
                    let htmlRef = this.elementRef.nativeElement.querySelector(`#canvas2`).getContext('2d');
                        console.log(htmlRef);
                        var gradient = htmlRef.createLinearGradient(500, 100, 0, 100);
                                    gradient.addColorStop(0, 'rgba(65,176,203,1)');
                                    gradient.addColorStop(1, 'rgba(128,113,222,1)');
                      this.chart = new Chart(htmlRef, {
                        type: 'line',
                        data: {
                          labels: coinHistory,
                          datasets: [{ 
                              data: coinHistory,
                              borderColor: gradient,
                              backgroundColor: 'rgba(65,176,203,0.5)',
                              fill: 'origin'
                            },
                          ]
                        },
                        options: chartOptions
                      });
                    }, 250);
                      loader.dismiss();
                  });
                });
        });
        
    }
    
    onem(){
        let loader = this.loading.create({
              content: 'Refreshing..',
              spinner: 'bubbles'
            });
        loader.present().then(() => {
            this.currency  = this._dataProvider.getCurrency();
                  this._dataProvider.getCoin(this.coin)
                .subscribe(res => {
                    console.log(res);
                  this.details[0] = res['DISPLAY'][this.coin[0]][this.currency];
                  this._dataProvider.getChart2('histoday',30,this.coin[0])
                  .subscribe(res => {
                    console.log(res);
                    let coinHistory = res['Data'].map((a) => (a.close));
                    console.log(coinHistory);
                    setTimeout(()=> {
                      const chartOptions = {
                        tooltips: {
                          callbacks: {
                              label: function(tooltipItems, data) {
                                  return "$" + tooltipItems.yLabel.toString();
                              }
                            }
                          },
                          responsive: true, 
                          legend: {
                            display: false
                        },
                        scales: {
                          xAxes: [{
                            display: true
                          }],
                          yAxes: [{
                            display: true
                          }],
                        }
                      };
                    let htmlRef = this.elementRef.nativeElement.querySelector(`#canvas2`).getContext('2d');
                        console.log(htmlRef);
                        var gradient = htmlRef.createLinearGradient(500, 100, 0, 100);
                                    gradient.addColorStop(0, 'rgba(65,176,203,1)');
                                    gradient.addColorStop(1, 'rgba(128,113,222,1)');
                      this.chart = new Chart(htmlRef, {
                        type: 'line',
                        data: {
                          labels: coinHistory,
                          datasets: [{ 
                              data: coinHistory,
                              borderColor: gradient,
                              backgroundColor: 'rgba(65,176,203,0.5)',
                              fill: 'origin'
                            },
                          ]
                        },
                        options: chartOptions
                      });
                    }, 250);
                      loader.dismiss();
                  });
                });
        });
        
    }
    
    onew(){
        let loader = this.loading.create({
              content: 'Refreshing..',
              spinner: 'bubbles'
            });
        loader.present().then(() => {
            this.currency  = this._dataProvider.getCurrency();
                  this._dataProvider.getCoin(this.coin)
                .subscribe(res => {
                    console.log(res);
                  this.details[0] = res['DISPLAY'][this.coin[0]][this.currency];
                  this._dataProvider.getChart2('histoday',7,this.coin[0])
                  .subscribe(res => {
                    console.log(res);
                    let coinHistory = res['Data'].map((a) => (a.close));
                    console.log(coinHistory);
                    setTimeout(()=> {
                      const chartOptions = {
                        tooltips: {
                          callbacks: {
                              label: function(tooltipItems, data) {
                                  return "$" + tooltipItems.yLabel.toString();
                              }
                            }
                          },
                          responsive: true, 
                          legend: {
                            display: false
                        },
                        scales: {
                          xAxes: [{
                            display: true
                          }],
                          yAxes: [{
                            display: true
                          }],
                        }
                      };
                    let htmlRef = this.elementRef.nativeElement.querySelector(`#canvas2`).getContext('2d');
                        console.log(htmlRef);
                        var gradient = htmlRef.createLinearGradient(500, 100, 0, 100);
                                    gradient.addColorStop(0, 'rgba(65,176,203,1)');
                                    gradient.addColorStop(1, 'rgba(128,113,222,1)');
                      this.chart = new Chart(htmlRef, {
                        type: 'line',
                        data: {
                          labels: coinHistory,
                          datasets: [{ 
                              data: coinHistory,
                              borderColor: gradient,
                              backgroundColor: 'rgba(65,176,203,0.5)',
                              fill: 'origin'
                            },
                          ]
                        },
                        options: chartOptions
                      });
                    }, 250);
                      loader.dismiss();
                  });
                });
        });
        
    }
        

  ionViewDidLoad() {
    console.log('ionViewDidLoad CoinDetailPage');
  }

}
