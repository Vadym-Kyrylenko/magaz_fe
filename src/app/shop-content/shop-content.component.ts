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

  ngOnInit () {
    this.getProducts();
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
}
