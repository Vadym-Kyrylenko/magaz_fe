import { Component } from '@angular/core';
import {CommunicationService} from '../communication-module/communication.service';
import {HttpService} from '../http.service';
import {Router} from '@angular/router';

export class User {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [HttpService]
})
export class LoginComponent {

  user: User;
  done   = false;
  token: string;
  feedback: any;

  constructor(private httpService: CommunicationService, private router: Router) {
    this.user = {
      email : '',
      password : ''
    };
  }



  logIn() {
    const user = this.user;
    this.httpService.logIn(user).subscribe((data: any) => {
      console.dir(data);
      this.token = data.token;
      this.done = true;
      console.log(this.done);
      console.log(this.token);
      // localStorage.setItem(this.user.email, this.token);
      localStorage.setItem('token', this.token);
      this.router.navigate(['/admin']);

      /*if (data.message === 'User LogIn') {
       this.feedback.mess = 1;
       this.feedback.user = data.user;
     } else if (data.message === 'User not LogIn') {
       this.feedback.mess = 2;
     }*/
    });
  }
}
