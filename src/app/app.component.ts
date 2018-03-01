import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpService} from './http.service';

import {Product} from './store/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService]
})
export class AppComponent {

}
