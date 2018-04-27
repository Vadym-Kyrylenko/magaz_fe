import { Injectable } from '@angular/core';
import { Product } from './product.model';


@Injectable()
export class StaticDataSource {
  private products: Product[];

  constructor() {
    this.products = [
      new Product( 'wallet_blue', {priceUah: 910, priceUsd: 0},  'синий кошелек из кожи', 'wallet-003', 'wallet',  ''),
      new Product( 'wallet_red', {priceUsd: 20, priceUah: 0}, 'красный кошелек из кожи', 'wallet-004', 'wallet',  ''),
      new Product('wallet_grey', {priceUah: 700, priceUsd: 0}, 'серый кошелек из кожи', 'wallet-006', 'wallet',  ''),
      new Product('wallet_yellow', {priceUsd: 15, priceUah: 0}, 'желтый кошелек из кожи', 'wallet-005', 'wallet', ''),
      new Product('wallet_pink', {priceUsd: 20, priceUah: 0}, 'розовый кошелек из кожи', 'wallet-007', 'wallet', ''),
      new Product('wallet_new',  {priceUsd: 50, priceUah: 0}, 'description', 'article', 'category', '')
    ];
  }

  getProducts(): Product[] {
      return this.products;
  }
}
