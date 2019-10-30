import { BaseDto } from '@games/shared/models';

export class Game extends BaseDto {
  name: string;
  shortName: string;
  platform: any;
  deleted: boolean;
  code: string;
  buylistPrice: number;
  buyPrice: number;
  sellPrice: number;
  sellRupees: number;
  depositRupees: number;
  imageUrl: string;

  public smallImage(): string {
    console.log('small image called. imageUrl=' + this.imageUrl);
    return this.imageUrl ? this.imageUrl.replace(/\.([^.]+)$/, 's.$1') : 'assets/images/cart-1.jpg';
  }

}
