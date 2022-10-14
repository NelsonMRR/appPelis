import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

  constructor(private restService:RestService) { }

  ngOnInit(): void {
  }

  public logout(){
    this.restService.logout();
    window.location.reload();
  }

}
