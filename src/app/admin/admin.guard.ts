/*
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

export class AdminGuard implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return confirm('Вы админ?');
  }
}
*/


import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CanActivate} from '@angular/router';
import {JwtHelper} from 'angular2-jwt';
// import {AsyncLocalStorage} from 'angular-async-local-storage';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {
  }

  jwtHelper: JwtHelper = new JwtHelper();

  canActivate(): Observable<boolean> {
    return new Observable(observer => {
      const token = localStorage.getItem('token');
      if (token) {
        if (this.jwtHelper.isTokenExpired(token)) {
          this.router.navigate(['/login']);
          observer.next(false);
        } else {
          observer.next(true);
        }
      } else {
        this.router.navigate(['/login']);
        observer.next(false);
      }
    });
  }
}

