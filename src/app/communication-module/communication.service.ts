import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../login/login.component';


@Injectable()
export class CommunicationService {

  constructor(private http: HttpClient) {
  }

  getData() {
    return this.http.get('http://localhost:3000/products');
  }

  postProduct(product: any, jwttoken: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwttoken
      })
    };
    return this.http.post('http://localhost:3000/products', product, httpOptions);
  }

  putProduct(product: any, jwttoken: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwttoken
      })
    };
    return this.http.put('http://localhost:3000/products', product, httpOptions);
  }

  putRateProduct(currentRate: any, jwttoken: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwttoken
      })
    };
    return this.http.put('http://localhost:3000/products/' + currentRate, httpOptions);
  }

  postOrders(order: any, jwttoken: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwttoken
      })
    };
    return this.http.post('http://localhost:3000/orders', order, httpOptions);
  }

  getOrders(jwttoken: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwttoken
      })
    };
    return this.http.get('http://localhost:3000/orders', httpOptions);
  }

  deleteOrders(order: any, jwttoken: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwttoken
      })
    };
    return this.http.delete('http://localhost:3000/orders/' + order, httpOptions);
  }

  deleteProducts(product: any, jwttoken: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwttoken
      })
    };
    return this.http.delete('http://localhost:3000/products/' + product, httpOptions);
  }

  logIn(user: User) {
    return this.http.post('http://localhost:3000/login/', user);
  }

  regUser(user) {
    return this.http.post('http://localhost:3000/register/', user);
  }
}
