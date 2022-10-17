import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RestService } from 'src/app/services/rest.service';

export interface Users {
  id: number;
  username: string;
  pelicula: string;
  precio: string;
  fecha: string;
  estado: string;
}

@Component({
  selector: 'app-view-compras',
  templateUrl: './view-compras.component.html',
  styleUrls: ['./view-compras.component.css']
})
export class ViewComprasComponent implements OnInit {

  dataSource!: MatTableDataSource<Users>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  
  private DATA: Users[] =[];
  displayedColumns: string[] = [
    'username', 
    'pelicula', 
    'precio', 
    'fecha',
    'estado'];

  constructor(private restService:RestService) { 
    //this.DATA = this.getMovies();
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAlquileres(){
    this.restService.RestApi('GET','/upeliculas/peliculas/',{}).then((data:any)=>{
      let array = data['body'];
      let datos = [];
      for (let i = 0; i < array.length; i++) {
        if(array[i]['tipo'] == 1){
          let estado='';
          if (array[i]['estado']) {
            estado = 'Disponible';
          }else{
            estado = 'Finalizado';
          }
          datos.push({
            'id': array[i]['id'],
            'username': array[i]['usuario_pelicula']['username'],
            'pelicula': array[i]['pelicula_usuario']['titulo'],
            'precio': array[i]['pelicula_usuario']['precio_venta'],
            'fecha': array[i]['fecha_inicio'],
            'estado': estado
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
    this.getAlquileres()
  }

}
