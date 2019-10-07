import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '@env/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ShoppingCartService {
  private shoppingCartModel: any = {
    buyItems: [],
    sellItems: [],
    rentItems: [],
    itemCount: 0,
    totalAmount: 0,
    totalRupees: 0
  };

  private shoppingCartSubject = new BehaviorSubject<any>(this.shoppingCartModel);
  public shoppingCart = this.shoppingCartSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  public addItem(item, mode: string) {
    switch (mode) {
      case 'BUY':
        this.shoppingCartModel.buyItems.push(item);
        break;
      case 'SELL':
        this.shoppingCartModel.sellItems.push(item);
        break;
      case 'RENT':
        this.shoppingCartModel.rentItems.push(item);
        break;
      default:
        console.error('Unsupported cart mode: ' + mode);
        return;
    }

    this.recomputeTotals();
  }

  public removeItem(index, mode: string) {
    switch (mode) {
      case 'BUY':
        this.shoppingCartModel.buyItems.splice(index, 1);
        break;
      case 'SELL':
        this.shoppingCartModel.sellItems.splice(index, 1);
        break;
      case 'RENT':
        this.shoppingCartModel.rentItems.splice(index, 1);
        break;
      default:
        console.error('Unsupported cart mode: ' + mode);
        return;
    }

    this.recomputeTotals();
  }

  public onCurrencyChange(item) {
    switch (item.currency) {
      case 'CASH':
        item.buyPrice = item.game.sellPrice;
        break;
      case 'RUPEES':
        item.buyPrice = item.game.sellRupees;
        break;
      default:
        console.log('Unknown currency: ' + item.currency);
    }
    this.recomputeTotals();
  }

  private recomputeTotals() {
    this.shoppingCartModel.itemCount = this.shoppingCartModel.buyItems.length + this.shoppingCartModel.sellItems.length + this.shoppingCartModel.rentItems.length;

    this.shoppingCartModel.totalAmount = 0;
    this.shoppingCartModel.totalRupees = 0;
    for (var item of this.shoppingCartModel.buyItems) {
        if (item.currency === 'CASH') {
          this.shoppingCartModel.totalAmount += item.buyPrice;
        } else if (item.currency === 'RUPEES') {
          this.shoppingCartModel.totalRupees += item.buyPrice;
        }
    }
    for (var item of this.shoppingCartModel.sellItems) {
        if (item.currency === 'CASH') {
          this.shoppingCartModel.totalAmount -= item.buyPrice;
        } else if (item.currency === 'RUPEES') {
          this.shoppingCartModel.totalRupees -= item.buyPrice;
        }
    }
    for (var item of this.shoppingCartModel.rentItems) {
        this.shoppingCartModel.totalRupees -= item.depositRupees;
    }
  }

}
