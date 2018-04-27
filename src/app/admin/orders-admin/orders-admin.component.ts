import {Component, OnInit} from '@angular/core';
import {CommunicationService} from '../../communication-module/communication.service';
import {StoreModel} from '../../store/store.model';
import {HttpService} from '../../http.service';
import {Order} from '../../store/order.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-orders-admin',
  templateUrl: './orders-admin.component.html',
  styleUrls: ['./orders-admin.component.css'],
  providers: [HttpService]
})

export class OrdersAdminComponent implements OnInit {
  orders: Order [] = [];
  choosenOrder: Order;
  feedback: any;
  done = false;


  constructor(private httpService: CommunicationService, private router: Router,
              private storeModel: StoreModel) {
    this.choosenOrder = null;
    this.feedback = {
      mess: null
    };
  }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.storeModel.getOrders().subscribe((data: Order[]) => {
      this.orders = data;
    });
  }

  choseOrder(order) {
    this.choosenOrder = order;
  }

  closeOrder() {
    this.choosenOrder = null;
  }

  deleteOrder(order) {
    const token = localStorage.getItem('token');
      this.httpService.deleteOrders(order, token).subscribe((data: any) => {
        this.orders = data.orders;

        if (data.orderDeleted === true) {
          this.done = true;
          this.feedback.mess = 'del';
          this.feedback.order = data.order;
        } else if (data.message === 'Order not deleted') {
          this.done = true;
          this.feedback.mess = 2;
        }
      });
  }

  fgh(event) {
    if (event.path[0].className === 'wrapper') {
      this.closeOrder();
    }
  }

  closeOrderAnswer() {
    this.done = false;
  }
}
