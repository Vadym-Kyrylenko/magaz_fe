import {Component, OnInit} from '@angular/core';
import {Product} from '../store/product.model';
import {HttpService} from '../http.service';
import {StoreModel} from '../store/store.model';


@Component({
  selector: 'app-shop-content',
  templateUrl: './shop-content.component.html',
  styleUrls: ['./shop-content.component.css'],
  providers: [HttpService]
})
export class ShopContentComponent implements OnInit {
  products: Product[] = [];
  choosenProduct: Product;

  constructor(private storeService: StoreModel) {
    this.choosenProduct = null;
  }

  ngOnInit() {
      this.getProducts();
    // this.http.get('products.json').subscribe((data:Product) => this.product=data);
    // this.httpService.getData().subscribe(data => this.products = data['productList']);
  }
  getProducts() {
    this.products = this.storeService.getProducts();
  }

  choseProduct(product) {
    this.choosenProduct = product;
  }
  closeProduct() {
    this.choosenProduct = null;
  }
}
