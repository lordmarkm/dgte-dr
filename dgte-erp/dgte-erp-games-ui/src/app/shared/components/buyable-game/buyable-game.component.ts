import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddToCartComponent } from '@games/shared/components/modal-add-to-cart/modal-add-to-cart.component';

@Component({
  selector: 'buyable-game',
  templateUrl: './buyable-game.component.html',
  styleUrls: ['./buyable-game.component.scss']
})
export class BuyableGameComponent implements OnInit {
  @Input() game: any;
  public imgUrl;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
    this.imgUrl = this.game.imageUrl.replace(/\.([^.]+)$/, 'l.$1');
  }

  public addToCart(game) {
    const modalRef = this.modalService.open(AddToCartComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    modalRef.componentInstance.game = this.game;
    modalRef.componentInstance.mode = 'BUY';
    modalRef.result.then(orderItem => this.handleAddToCartResult(orderItem));
  }

  private handleAddToCartResult(orderItem) {}

}
