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
        if (auth) {
          this.getOrders();
        }
    });
  }

  private getOrders() {
    this.orderService.getOrders(this.searchQuery.toParams()).subscribe(page => {
        this.isLoading = false;
        this.transactions = page.content;
        this.searchQuery.totalElements = page.totalElements;
    });
  }

  public onSort(event): void {
    const column: string = event.column.prop;
    this.searchQuery.sort = `${column},${event.newValue}`;
    this.getOrders();
  }

  public setPage(pageInfo) {
    const page = pageInfo.page - 1;
    this.searchQuery.setPageNumber(page);
    this.getOrders();
  }

}
