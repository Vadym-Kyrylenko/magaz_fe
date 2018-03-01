import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Order} from '../store/order.model';
import {Product} from '../store/product.model';


@Injectable()
export class CommunicationService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get('http://localhost:3000/products');
  }
  postOrders(order: Order) {
    return this.http.post('http://localhost:3000/orders', Order);
  }
}
