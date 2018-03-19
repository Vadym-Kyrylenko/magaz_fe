import {Injectable} from '@angular/core';
import {Product} from './product.model';
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

  getOrders() {
    return new Observable(observer => {
      const token = localStorage.getItem('token');
      this.DataSource.getOrders(token).subscribe((data: Order[]) => {
        // console.dir(data);
        this.orders = data;
        observer.next(data);
        observer.complete();
      });
    });
  }
}
