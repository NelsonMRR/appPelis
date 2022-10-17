import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

export interface Users {
  id: number;
  username: string;
  titulo_anterior: string;
  titulo_nuevo: string;
  precio_venta_anterior: string;
  precio_venta_nuevo: string;
  precio_alquiler_anterior: string;
  precio_alquiler_nuevo: string;
  fecha: string;
}

@Component({
  selector: 'app-view-historial-movies',
  templateUrl: './view-historial-movies.component.html',
  styleUrls: ['./view-historial-movies.component.css']
})
export class ViewHistorialMoviesComponent implements OnInit {

  dataSource!: MatTableDataSource<Users>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  
  private DATA: Users[] =[];
  displayedColumns: string[] = [
    'username', 
    'titulo_anterior', 
    'titulo_nuevo',
    'precio_venta_anterior',
    'precio_venta_nuevo', 
    'precio_alquiler_anterior', 
    'precio_alquiler_nuevo',
    'fecha'
  ];
  user: any;
  movieId: any;
  
  constructor(private route:ActivatedRoute,
    private restService:RestService,
    ) { 
    //this.DATA = this.getMovies();
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getHistoriales(){
    this.restService.RestApi('GET','/historial_peliculas/',{}).then((data:any)=>{
      let array = data['body'];
      let datos = [];
      for (let i = 0; i < array.length; i++) {
        if(array[i]['pelicula_historial']['id'] == this.movieId){
          let estado='';
          if (array[i]['estado']) {
            estado = 'Disponible';
          }else{
            estado = 'Finalizado';
          }
          datos.push({
            'id': array[i]['id'],
            'username': array[i]['usuario_historial']['username'],
            'titulo_anterior': array[i]['titulo_anterior'],
            'titulo_nuevo': array[i]['titulo_nuevo'],
            'precio_venta_anterior': array[i]['precio_venta_anterior'],
            'precio_venta_nuevo': array[i]['precio_venta_nuevo'],
            'precio_alquiler_anterior': array[i]['precio_alquiler_anterior'],
            'precio_alquiler_nuevo': array[i]['precio_alquiler_nuevo'],
            'fecha': array[i]['fecha']
          });
        }
      }
      this.DATA = datos;
      this.dataSource = new MatTableDataSource(this.DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  
  ngOnInit(): void {
    this.user = this.restService.getUser(); 
    this.movieId = this.route.snapshot.params['id'];
    this.getHistoriales()
  }

}
