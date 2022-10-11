import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class NormalGuard implements CanActivate {
  
  constructor(
    private restService:RestService,
    private router:Router
    ){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.restService.isLoggedIn() && this.restService.getUserRole() == 'NORMAL'){
        return true;
      }
  
      this.router.navigate(['login']);
      return false;
  }
}
