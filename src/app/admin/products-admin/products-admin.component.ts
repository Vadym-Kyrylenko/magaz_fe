import {Component, OnInit} from '@angular/core';
import {StoreModel} from '../../store/store.model';
import {CommunicationService} from '../../communication-module/communication.service';
import {Product} from '../../store/product.model';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {RequestOptions} from '@angular/http';

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
  file: any;
  imgName: string;

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
        priceUsd: null,
        rateUsd: null
      },
      description: '',
      article: '',
      category: '',
      bufferImg: '',
      _id: ''
    };
  }


  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.storeModel.getProducts().subscribe((data: Product[]) => {
      this.products = [];
      this.products = data;
      console.dir(data);
      return this.currentRate = this.products[0].price.rateUsd;
    });
  }


  getImg(product, i) {
      const im: any = document.getElementById(i + '');
      if (im) {
    const bl = new Blob([new Uint8Array(JSON.parse(product.bufferImg).data)], {type: 'image/jpg'});
      im.src = URL.createObjectURL(bl);
    }
  }
  getChoosenImg(product) {
    const im: any = document.getElementById( 'i');
    if (im) {
      const bl = new Blob([new Uint8Array(JSON.parse(product.bufferImg).data)], {type: 'image/jpg'});
      im.src = URL.createObjectURL(bl);
    }
  }

  choseProduct(product) {
    this.choosenProduct = product;
  }

  closeProduct() {
    this.choosenProduct = null;
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.file = fileList[0];
    }
  }

  addProduct() {
    console.dir(this.file);
    const products = this.newProduct;

    if (products.name && products.article && (products.price.priceUah || products.price.priceUsd) && products.description
      && products.category) {
      this.postProduct(products);
      this.closeAddProduct();
      this.clearForm();
    }
  }

  postImg (img: any) {
    const fd = new FormData();
    console.log(img);
    fd.append(this.imgName, img);

    const token = localStorage.getItem('token');
    this.httpService.postImg(fd, token).subscribe((data: any) => {
      this.done = true;
      this.getProducts();
    });
  }

  postProduct(products: any) {

    const token = localStorage.getItem('token');
    this.httpService.postProduct(products, token).subscribe((data: any) => {
      this.done = true;
      console.dir(data.product.article);

      this.imgName = data.product.article;

      const img = this.file;
      this.postImg(img);

      if (data.message === 'Product saved') {
        this.feedback.mess = 1;
        this.feedback.product = data.product;
      } else if (data.message === 'Product not created') {
        this.feedback.mess = 2;
      }
    });
  }

  putProduct() {
    const products = this.newProduct;
    if (products.name && products.article && (products.price.priceUah || products.price.priceUsd) && products.description
      && products.category) {
      delete products.bufferImg;
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

  fgh(event) {
    if (event.path[0].className === 'wrapper') {
      this.closeProduct();
    }
  }

  clearForm() {
    this.newProduct = {
      name: '',
      price: {
        priceUah: null,
        priceUsd: null,
        rateUsd: null
      },
      description: '',
      article: '',
      category: '',
      _id: ''
    };
  }

  closeProductAnswer() {
    this.done = false;
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
        product.price.priceUah = Math.round(product.price.priceUsd * this.currentRate * 100) / 100;
      }
    });
  }

  saveChangeRate() {
    console.dir('saveChangeRate2');
    if (this.currentRate != null) {
      const token = localStorage.getItem('token');
      this.httpService.putRateProduct(this.currentRate, token).subscribe((data: any) => {
        console.dir(data);
        this.done = true;
        this.getProducts();
        if (data.message === 'Rate changed') {
          this.feedback.mess = 3;
          this.feedback.product = data.product;
        } else if (data.message === 'Products not edited') {
          this.feedback.mess = 2;
        }
      });
    }
  }

  resetRate() {
    this.getProducts();
    return this.currentRate = this.products[0].price.rateUsd;

  }

}
