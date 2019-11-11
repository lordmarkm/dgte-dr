import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GamerService, OrderService } from '@games/shared/services';
import { AngularFireAuth } from "@angular/fire/auth";
import { Order, TxnSearch } from '@games/shared/models';

@Component({
  selector: 'games-txns-table',
  templateUrl: './txns-table.component.html',
  styleUrls: ['./txns-table.component.scss']
})
export class TransactionsTableComponent implements OnInit {
  public isLoading = false;
  public transactions: Order[];
  public noRecordsMsg: string = 'You don\'t have any transactions on record';
  public searchQuery: any = new TxnSearch();

  constructor(private router: Router, private gamerService: GamerService,
    public afAuth: AngularFireAuth,
    private orderService: OrderService) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(auth => {
        console.log(auth);
        if (auth) {
          this.getOrders();
        }
    });
  }

  private getOrders() {
    this.orderService.getOrders({}).subscribe(page => {
        this.isLoading = false;
        this.transactions = page.content;
        this.searchQuery.totalElements = page.totalElements;
    });
  }

}
