import {Component, OnInit} from '@angular/core';
import {Product} from '../store/product.model';
import {HttpService} from '../http.service';
import {StoreModel} from '../store/store.model';
// import {Order} from '../store/order.model';
import {IOrderContacts} from '../interfaces/all.interfaces';
import {CommunicationService} from '../communication-module/communication.service';

@Component({
  selector: 'app-shop-content',
  templateUrl: './shop-content.component.html',
  styleUrls: ['./shop-content.component.css'],
  providers: [HttpService]
})
export class ShopContentComponent implements OnInit {
  products: Product[] = [];
  // order: Order = new Order();
  orderContacts: IOrderContacts;
  choosenProduct: Product;
  // choosenOrder: Order;
  // done = false;
  // receivedOrder: Order;
  constructor(private httpService: CommunicationService,
              private storeModel: StoreModel) {
    this.choosenProduct = null;
    // this.choosenOrder = null;
    this.orderContacts = {
      nameCustomer: '',
      email: '',
      phone: '',
      textOrder: ''
    };
  }

  ngOnInit() {
    this.getProducts();
    // this.postOrders();
  }

  getProducts() {
    this.storeModel.getProducts().subscribe((data: Product[]) => {
      // console.dir(data);
      this.products = data;
    });
  }

  choseProduct(product) {
    this.choosenProduct = product;
  }

  closeProduct() {
    this.choosenProduct = null;
  }

  /*addOrder(orders.nameCustomer: string, orders.email: string, orders.phone: string, orders.textOrder: string, name: string,
  priceUah: number, priceUsd: number, description: string,
  article: string, category: string) {
    this.orders.push(new Order (nameCustomer, email, phone, textOrder, name, priceUah, priceUsd, description, article, category));
  }*/
  addOrder() {
    const order = Object.assign(this.orderContacts, this.choosenProduct); /*{
      contacts: this.orderContacts,
      product: this.choosenProduct
      };*/

    // console.dir(order);
    this.postOrders(order);
  }
  postOrders(order: any) {
    this.httpService.postOrders(order).subscribe((data: any) => {
      console.dir(data);
      // this.orders = data;
    });
  }
}
