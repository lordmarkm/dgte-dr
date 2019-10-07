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
    console.log('Adding item! mode=' + mode + ', item=');
    console.log(item);
    switch (mode) {
      case 'BUY':
        if (item.currency === 'CASH') {
          this.shoppingCartModel.totalAmount += item.buyPrice;
        } else if (item.currency === 'RUPEES') {
          this.shoppingCartModel.totalRupees += item.buyPrice;
        }
        this.shoppingCartModel.buyItems.push(item);
        break;
      case 'SELL':
        this.shoppingCartModel.sellItems.push(item);
        this.shoppingCartModel.totalAmount -= item.sellPrice;
        break;
      case 'RENT':
        this.shoppingCartModel.rentItems.push(item);
        this.shoppingCartModel.totalRupees += item.depositRupees;
        break;
      default:
        console.error('Unsupported cart mode: ' + mode);
        return;
    }

    this.shoppingCartModel.itemCount++;
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

    this.shoppingCartModel.itemCount--;
  }

}
