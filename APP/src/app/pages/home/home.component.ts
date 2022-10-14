import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Movies:any;

  constructor(private restService:RestService) { }

  getMovies(){
    this.restService.RestApi('GET','/peliculas/',{}).then((data:any)=>{
      let array = data['body'];
      let datos = [];
      for (let i = 0; i < array.length; i++) {
        let estado = '';
        if (array[i]['estado'] == true) {
          if (array[i]['estado'] == true) {
            estado = 'Disponible';
          }else{
            estado = 'No disponible';
          }
          datos.push({
            'id': array[i]['id'],
            'titulo': array[i]['titulo'],
            'descripcion': array[i]['descripcion'],
            'imagen': array[i]['imagen'],
            'stock': array[i]['stock'],
            'precio_alquiler': array[i]['precio_alquiler'],
            'precio_venta': array[i]['precio_venta'],
            'fecha': array[i]['fecha'],
            'estado': estado,
            'numeroDeReacciones': array[i]['numeroDeReacciones']
          });
        }
      }
      this.Movies = datos;
    })
  }

  ngOnInit(): void {
    this.getMovies();
  }

}
