import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../login/login.component';
import {urlsettings} from '../config/constants';

@Injectable()
export class CommunicationService {

  constructor(private http: HttpClient) {
  }

  getData() {
    return this.http.get(urlsettings.backurl + '/products');
  }

  postProduct(product: any, jwttoken: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwttoken
      })
    };
    return this.http.post(urlsettings.backurl + '/products', product, httpOptions);
  }

  putProduct(product: any, jwttoken: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwttoken
      })
    };
    return this.http.put(urlsettings.backurl + '/products', product, httpOptions);
  }

  putRateProduct(currentRate: any, jwttoken: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwttoken
      })
    };
    return this.http.put(urlsettings.backurl + '/products/' + currentRate, httpOptions);
  }

  postOrders(order: any, jwttoken: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwttoken
      })
    };
    return this.http.post(urlsettings.backurl + '/orders', order, httpOptions);
  }

  getOrders(jwttoken: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwttoken
      })
    };
    return this.http.get(urlsettings.backurl + '/orders', httpOptions);
  }

  deleteOrders(order: any, jwttoken: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwttoken
      })
    };
    return this.http.delete(urlsettings.backurl + '/orders/' + order, httpOptions);
  }

  deleteProducts(product: any, jwttoken: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwttoken
      })
    };
    return this.http.delete(urlsettings.backurl + '/products/' + product, httpOptions);
  }

  logIn(user: User) {
    return this.http.post(urlsettings.backurl + '/login/', user);
  }

  regUser(user) {
    return this.http.post(urlsettings.backurl + '/register/', user);
  }
}
