import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import {Order} from '../store/order.model';
import {Product} from '../store/product.model';


@Injectable()
export class CommunicationService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get('http://localhost:3000/products');
  }

  postProduct(product: any) {
    console.log(product);
    return this.http.post('http://localhost:3000/products', product);
  }

  postOrders(order: any) {
    // console.log(order);
    // return this.http.post('http://localhost:3000/orders', {order: order});
    return this.http.post('http://localhost:3000/orders', order);
  }

  getOrders() {
    return this.http.get('http://localhost:3000/orders');
  }

  deleteOrders(order) {
    console.log(order);
    return this.http.delete('http://localhost:3000/orders/' + order);
  }

  deleteProducts(product) {
    console.log(product);
    return this.http.delete('http://localhost:3000/products/' + product);
  }
}
