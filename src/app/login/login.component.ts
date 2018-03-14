import { Component } from '@angular/core';

export class User {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: User;

  constructor() {
    this.user = {
      email : '',
      password : ''
    };
  }



  logIn() {
    console.log(this.user);
    localStorage.setItem(this.user.password, this.user.email);
  }
}
