import {Injectable} from '@angular/core';
import {Product} from './product.model';
// import { StaticDataSource } from './static.datasource';
import {CommunicationService} from '../communication-module/communication.service';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class StoreModel {
  private products: Product[];

  constructor(private DataSource: CommunicationService) {
    this.products = [];
  }

  getProducts() {
    return new Observable(observer => {
      this.DataSource.getData().subscribe((data: Product[]) => {
        console.dir(data);
        this.products = data;
        observer.next(data);
        observer.complete();
      });
    });
  }
}
