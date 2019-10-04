import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddToCartComponent } from '@games/shared/components';

@Component({
  selector: 'buyable-game',
  templateUrl: './buyable-game.component.html',
  styleUrls: ['./buyable-game.component.scss']
})
export class BuyableGameComponent {
  @Input() game: any;

  constructor(private modalService: NgbModal) {}

  public addToCart(game) {
    const modalRef = this.modalService.open(AddToCartComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    modalRef.componentInstance.game = this.game;
    modalRef.componentInstance.mode = 'BUY';
    modalRef.result.then(orderItem => this.handleAddToCartResult(orderItem));
  }

  private handleAddToCartResult(orderItem) {}

}
