import {Component, OnInit} from '@angular/core';
import {Product} from '../store/product.model';
import {HttpService} from '../http.service';
import {StoreModel} from '../store/store.model';
import {Order} from '../store/order.model';

@Component({
  selector: 'app-shop-content',
  templateUrl: './shop-content.component.html',
  styleUrls: ['./shop-content.component.css'],
  providers: [HttpService]
})
export class ShopContentComponent implements OnInit {
  products: Product[] = [];
  // order: Order = new Order();
  orders: Order [] = [];
  choosenProduct: Product;
  choosenOrder: Order;
  done = false;
  receivedOrder: Order;

  constructor(private storeService: StoreModel) {
    this.choosenProduct = null;
    this.choosenOrder = null;
  }

  ngOnInit() {
    this.getProducts();
    // this.postOrders();
  }

  getProducts() {
    this.storeService.getProducts().subscribe((data: Product[]) => {
      console.dir(data);
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

  /*postOrders(orders: Order) {
    this.storeService.postOrders(orders).subscribe((data: Order[]) => {
      console.dir(data);
      this.orders = data;
    });
  }*/


}
