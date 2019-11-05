import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GamerService, OrderService } from '@games/shared/services';
import { AngularFireAuth } from "@angular/fire/auth";
import { Order } from '@games/shared/models';

@Component({
  selector: 'games-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss']
})
export class UserProfilePageComponent implements OnInit {
  public isLoading = false;
  public userProfile;
  public displayName: String;
  public displayImage: String;
  public orders: Order[];

  constructor(private router: Router, private gamerService: GamerService,
    public afAuth: AngularFireAuth,
    private orderService: OrderService) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(auth => {
        console.log(auth);
        if (auth) {
          this.displayName = auth['displayName'];
          this.displayImage = auth['photoURL'];
          this.getOrders();
        } else {
          delete this.displayName;
          delete this.displayImage;
        }
    });
  }

  private getOrders() {
    this.orderService.getOrders({}).subscribe(orders => this.orders = orders);
  }

}
