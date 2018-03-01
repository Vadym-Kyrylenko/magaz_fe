import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class CommunicationService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get('http://localhost:3000/products');
  }
 /* postData(order: Order) {
    const body = {};
    return this.http.post('http://localhost:3000/products', body);
  }*/
}
