import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {CommunicationService} from '../communication-module/communication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  constructor(private router: Router) {  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
