import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { StaticDataSource } from './static.datasource';

@Injectable()
export class StoreModel {
  private products: Product[];

  constructor(private DataSource: StaticDataSource) {
    this.products = [];
    this.DataSource.getProducts().forEach(product => this.products.push(product));
  }

  getProducts() {
    return this.products;
  }
}
