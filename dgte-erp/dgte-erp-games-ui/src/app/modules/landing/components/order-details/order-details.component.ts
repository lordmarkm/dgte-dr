import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamerService, OrderService } from '@games/shared/services';
import { AngularFireAuth } from "@angular/fire/auth";
import { Order } from '@games/shared/models';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'games-order-details-page',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  public isLoading = false;
  public order: Order;
  public error: string;

  constructor(private route: ActivatedRoute,
    public afAuth: AngularFireAuth,
    private orderService: OrderService) { }

  ngOnInit() {
    //combineLatest instead of forkJoin because route.queryParams is never "completed"
    combineLatest(
      this.afAuth.authState,
      this.route.queryParams
    ).subscribe(obs => {
      let auth = obs[0];
      let params = obs[1];
      if (!auth) {
        this.error = 'You are not logged in yo';
      } else if (!params || !params.orderCode) {
        this.error = 'Invalid order code';
      } else {
        this.getOrder(params.orderCode);
      }
    });
  }

  private getOrder(orderCode) {
    delete this.error;
    this.orderService.findOrderByCode(orderCode).subscribe(
      order => this.order = order,
      err => this.error = 'Could not find order!'
    );
  }

}
