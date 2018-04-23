import {Component, OnInit} from '@angular/core';
import {Product} from '../store/product.model';
import {HttpService} from '../http.service';
import {StoreModel} from '../store/store.model';
import {IOrderContacts} from '../interfaces/all.interfaces';
import {CommunicationService} from '../communication-module/communication.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-shop-content',
  templateUrl: './shop-content.component.html',
  styleUrls: ['./shop-content.component.css'],
  providers: [HttpService]
})
export class ShopContentComponent implements OnInit {
  products: Product[] = [];
  orderContacts: IOrderContacts;
  choosenProduct: Product;
  feedback: any;
  done = false;


  constructor(private httpService: CommunicationService,
              private storeModel: StoreModel) {
    this.choosenProduct = null;
    this.feedback = {
      mess: null
    },
    this.orderContacts = {
      nameCustomer: '',
      email: '',
      phone: '',
      textOrder: ''
    };
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.storeModel.getProducts().subscribe((data: Product[]) => {
      this.products = [];
      this.products = data;
    });
  }

  choseProduct(product) {
    this.choosenProduct = product;
  }

  closeProduct() {
    this.choosenProduct = null;
  }

  addOrder() {
    const order = Object.assign(this.orderContacts, this.choosenProduct);
    const token = localStorage.getItem('token');
    this.postOrders(order, token);
    this.orderContacts = {
      nameCustomer: '',
      email: '',
      phone: '',
      textOrder: ''
    };
    this.closeProduct();
  }

  postOrders(order: any, jwttoken: string) {
    this.httpService.postOrders(order, jwttoken).subscribe((data: any) => {
      this.done = true;

      if (data.message === 'Order saved') {
        this.feedback.mess = 1;
        this.feedback.order = data.order;
      } else if (data.message === 'Order not created') {
        this.feedback.mess = 2;
      }
    });
  }

  fgh(event) {
    if (event.path[0].className === 'wrapper') {
      this.closeProduct();
    }
  }
  closeOrderAnswer() {
    this.done = false;
  }

}
