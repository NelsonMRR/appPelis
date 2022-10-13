import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private restService:RestService
  ) { }

  ngOnInit(): void {
  }

  public logout(){
    this.restService.logout();
    window.location.reload();
  }

}
