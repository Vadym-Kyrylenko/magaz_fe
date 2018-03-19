import {Component, OnInit} from '@angular/core';
import {StoreModel} from '../../store/store.model';
import {CommunicationService} from '../../communication-module/communication.service';
import {Product} from '../../store/product.model';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.css']
})
export class ProductsAdminComponent implements OnInit {
  products: Product[] = [];
  choosenProduct: Product;
  feedback: any;
  done   = false;
  newProduct: Product;

  constructor(private httpService: CommunicationService,
              private storeModel: StoreModel) {
    this.choosenProduct = null;
    this.feedback = {
      mess: null
    };
    this.newProduct = {
      name : '',
      price: {
      priceUah : null,
      priceUsd : null
    },
    description : '',
    article: '',
    category: '',
    imgSrc: ''
    };
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.storeModel.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  choseProduct(product) {
    this.choosenProduct = product;
  }

  closeProduct() {
    this.choosenProduct = null;
  }

  addProduct() {
    const products = this.newProduct;
    console.dir(products);
    this.postProduct(products);
  }

  postProduct(products: any) {
    const token = localStorage.getItem('token');
    this.httpService.postProduct(products, token).subscribe((data: any) => {
      this.done = true;
      // console.log(this.done);

      if (data.message === 'Product saved') {
        this.feedback.mess = 1;
        this.feedback.order = data.order;
      } else if (data.message === 'Product not created') {
        this.feedback.mess = 2;
      }
    });
  }
  fgh(event) {
    if (event.path[0].className === 'wrapper') {
      this.closeProduct();
    }
  }

  closeProductAnswer() {
    this.done = false;
  }

  deleteProduct(product) {
    console.log(product);
    const token = localStorage.getItem('token');
    this.httpService.deleteProducts(product, token).subscribe((data: any) => {
      console.log(data);
      this.products = data.products;
    });
  }
}
