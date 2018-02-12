import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';


@Injectable()
export class DataProvider {
  currency: string = 'USD';
  baseUrl: string = `https://min-api.cryptocompare.com/data`;

  constructor(private _http: HttpClient,private storage: Storage,) {
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

  get(endpoint) {
    return this._http.get(`${this.baseUrl}/${endpoint}`);
  }

  getCoins(coins) {
    const endpoint = `pricemulti?fsyms=${coins.join()}&tsyms=${this.currency}`;
    return this.get(endpoint)
               .map(coins => this.extractCoins(coins));
  }
  setCurrency(currency){
      this.currency = currency;
  }
    getCurrency(){
        return this.currency;
    }

  private extractCoins(coins) {
    let coinArray = []
    Object.keys(coins).map(name => {
        if(coins.hasOwnProperty(name)) {
            let values = this.extractValues(coins[name]);
            let coin = new Currency(name, values);
            coinArray.push(coin);
        }
    });
    return coinArray;
  }

  extractValues(rates) {
    let currencies:CurrencyValue[] = [];
    Object.keys(rates).map(currency => {
        if(rates.hasOwnProperty(currency)) {
            let value = new CurrencyValue(currency,rates[currency]);
            currencies.push(value);
        }
    });
    
    return currencies;
  }

  getCoin(coins) {
    const endpoint = `pricemultifull?fsyms=${coins.join()}&tsyms=${this.currency}`;
    return this.get(endpoint);
  }

  getChart(coin: string) {
    return this.get(`histoday?fsym=${coin}&tsym=${this.currency}&limit=30&aggregate=1`);
  }
 getChart2(duration: string, num: number, coin: string) {
    return this.get(`${duration}?fsym=${coin}&tsym=${this.currency}&limit=${num}&aggregate=1`);
  }

  allCoins() {
    return this.get("all/coinlist");
  }

}

export class Currency {
  constructor(private name: string, private value: CurrencyValue[]) {}
}

export class CurrencyValue {
  constructor(private name: string, private value: string) {}
}