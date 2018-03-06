import {Injectable} from '@angular/core';
import {Product} from './product.model';
// import { StaticDataSource } from './static.datasource';
import {CommunicationService} from '../communication-module/communication.service';
import {Observable} from 'rxjs/Observable';
import {Order} from './order.model';


@Injectable()
export class StoreModel {
  private products: Product[];
  private orders: Order [];

  constructor(private DataSource: CommunicationService) {
    this.products = [];
    this.orders = [];
  }

  getProducts() {
    return new Observable(observer => {
      this.DataSource.getData().subscribe((data: Product[]) => {
        // console.dir(data);
        this.products = data;
        observer.next(data);
        observer.complete();
      });
    });
  }

 /* postOrders(orders: Order) {
    return new Observable(observer => {
      this.DataSource.postOrders(orders).subscribe((data: Order[]) => {
        console.dir(data);
        this.orders = data;
      });
    });
  }*/
  getOrders() {
    return new Observable(observer => {
      this.DataSource.getOrders().subscribe((data: Order[]) => {
        // console.dir(data);
        this.orders = data;
        observer.next(data);
        observer.complete();
      });
    });
  }
}
