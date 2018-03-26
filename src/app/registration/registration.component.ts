import { Component } from '@angular/core';
import {CommunicationService} from '../communication-module/communication.service';
import {HttpService} from '../http.service';

export class User {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registraion.component.css'],
  providers: [HttpService]
})
export class RegistrationComponent {

  user: User;
  done   = false;
  token: string;
  feedback: any;

  constructor(private httpService: CommunicationService) {
    this.user = {
      name: '',
      email : '',
      password : ''
    };
  }



  regUser(user) {
    user = this.user;
    this.httpService.regUser(user).subscribe((data: any) => {
      console.dir(data);
      this.token = data.token;
      this.done = true;
      console.log(this.done);
      console.log(this.token);
      localStorage.setItem(this.user.email, this.token);

      /*if (data.message === 'User register') {
        this.feedback.mess = 1;
        this.feedback.user = data.user;
      } else if (data.message === 'User not registered') {
        this.feedback.mess = 2;
      }*/
    });
  }
}
