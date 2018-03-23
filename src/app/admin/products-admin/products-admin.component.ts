import {Component, OnInit} from '@angular/core';
import {StoreModel} from '../../store/store.model';
import {CommunicationService} from '../../communication-module/communication.service';
import {Product} from '../../store/product.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.css']
})
export class ProductsAdminComponent implements OnInit {
  products: Product[] = [];
  choosenProduct: Product;
  feedback: any;
  done = false;
  newProduct: Product | any;
  choosenAddProduct = false;
  currentRate: number;

  constructor(private httpService: CommunicationService, private router: Router,
              private storeModel: StoreModel) {
    this.choosenProduct = null;
    this.feedback = {
      mess: null
    };
    this.newProduct = {
      name: '',
      price: {
        priceUah: null,
        priceUsd: null
      },
      description: '',
      article: '',
      category: '',
      imgSrc: '',
      _id: ''
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
    console.dir(this.newProduct);
    if (products.name && products.article && (products.price.priceUah || products.price.priceUsd) && products.description
      && products.category && products.imgSrc) {
      this.postProduct(products);
      this.closeAddProduct();
      this.clearForm();
      this.getProducts();
    }
  }

  clearForm() {
    this.newProduct = {
      name: '',
      price: {
        priceUah: null,
        priceUsd: null
      },
      description: '',
      article: '',
      category: '',
      imgSrc: '',
      _id: ''
    };
  }

  postProduct(products: any) {
    const token = localStorage.getItem('token');
    this.httpService.postProduct(products, token).subscribe((data: any) => {
      this.done = true;

      if (data.message === 'Product saved') {
        this.feedback.mess = 1;
        this.feedback.product = data.product;
      } else if (data.message === 'Product not created') {
        this.feedback.mess = 2;
      }
      this.getProducts();
    });
  }

  putProduct() {
    const products = this.newProduct;
    if (products.name && products.article && (products.price.priceUah || products.price.priceUsd) && products.description
      && products.category && products.imgSrc) {
      const token = localStorage.getItem('token');
      this.httpService.putProduct(products, token).subscribe((data: any) => {
        if (data.message === 'Product edited') {
          this.done = true;
          this.feedback.mess = 3;
          this.feedback.product = data.product;
        } else if (data.message === 'Product not edited') {
          this.done = true;
          this.feedback.mess = 2;
        }
        this.getProducts();
      });
    }
    this.choosenAddProduct = false;

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
    const token = localStorage.getItem('token');
    this.httpService.deleteProducts(product, token).subscribe((data: any) => {

      if (data.productDeleted === true) {
        this.done = true;
        this.feedback.mess = 'del';
        this.feedback.product = data.product;
      } else if (data.message === 'Product not deleted') {
        this.done = true;
        this.feedback.mess = 2;
      }
      this.getProducts();
    });
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  createProduct() {
    this.choosenAddProduct = true;
    this.clearForm();
  }

  closeAddProduct() {
    this.choosenAddProduct = false;
  }

  updateProduct(product) {
    this.choosenAddProduct = true;
    this.newProduct = product;
  }

  changeRate() {
    this.products.forEach((product) => {
      if (product.price.priceUsd != null) {
        product.price.priceUah = product.price.priceUsd * this.currentRate;
      }
    });
  }

  saveChangeRate() {
    this.products.forEach((product) => {
      if (product.price.priceUsd != null) {
        const token = localStorage.getItem('token');
        this.httpService.putProduct(product, token).subscribe((data: any) => {
          this.done = true;
          if (data.message === 'Product edited') {
            this.feedback.mess = 3;
            this.feedback.product = data.product;
          } else if (data.message === 'Product not edited') {
            this.feedback.mess = 2;
          }
          this.getProducts();
        });
      }
    });
  }
}
