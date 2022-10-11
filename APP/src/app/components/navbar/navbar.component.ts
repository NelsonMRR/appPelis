import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  user:any = null;

  constructor(
    public restService:RestService
    ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.restService.isLoggedIn();
    this.user = this.restService.getUser();
    this.restService.loginStatusSubjec.asObservable().subscribe(() => {
        this.isLoggedIn = this.restService.isLoggedIn();
        this.user = this.restService.getUser();
      }
    )
  }

  public logout(){
    this.restService.logout();
    window.location.reload();
  }
}
