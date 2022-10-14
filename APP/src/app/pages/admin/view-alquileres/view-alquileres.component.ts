import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import Swal from 'sweetalert2';

export interface Users {
  id: number;
  username: string;
  pelicula: string;
  precio: string;
  fecha_inicio: string;
  fecha_fin: string;
  estado: string;
}

@Component({
  selector: 'app-view-alquileres',
  templateUrl: './view-alquileres.component.html',
  styleUrls: ['./view-alquileres.component.css']
})
export class ViewAlquileresComponent implements OnInit {

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
    'fecha_inicio', 
    'fecha_fin',
    'estado'];
  //dataSource = this.DATA;

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
        datos.push({
          'id': array[i]['id'],
          'username': array[i]['username'],
          'pelicula': array[i]['pelicula'],
          'precio': array[i]['precio'],
          'fecha_inicio': array[i]['fecha_inicio'],
          'fecha_fin': array[i]['fecha_fin'],
          'estado': array[i]['estado']
        });
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
