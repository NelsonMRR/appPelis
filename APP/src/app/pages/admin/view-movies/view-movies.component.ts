import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RestService } from 'src/app/services/rest.service';
import Swal from 'sweetalert2';


export interface Movies {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  stock: number;
  precio_alquiler: number;
  precio_venta: number;
  fecha: string;
  estado: string;
  numeroDeReacciones: number;
}

@Component({
  selector: 'app-view-movies',
  templateUrl: './view-movies.component.html',
  styleUrls: ['./view-movies.component.css']
})
export class ViewMoviesComponent implements OnInit  {
  
  ListaMovies:any=[];
  dataSource!: MatTableDataSource<Movies>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  
  private DATA: Movies[] =[];
  displayedColumns: string[] = ['titulo', 'descripcion', 'imagen', 'stock', 'precio_alquiler', 'precio_venta','fecha', 'estado','numeroDeReacciones','opciones'];
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

  getMovies(){
    this.restService.RestApi('GET','/peliculas/',{}).then((data:any)=>{
      let array = data['body'];
      let datos = [];
      for (let i = 0; i < array.length; i++) {
        let estado = '';
        if (array[i]['estado'] == true) {
          estado = 'Disponible';
        }else{
          estado = 'No Disponible';
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
      this.DATA = datos;
      this.dataSource = new MatTableDataSource(this.DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  eliminarMovie (id:any){
    Swal.fire({
      title:'Eliminar película',
      text:'¿Estás seguro de eliminar esta película?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Eliminar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.restService.RestApi('DELETE','/peliculas/'+id,{}).then((data) => {
            this.DATA = this.DATA.filter((movis:any) => movis.id != id);
            this.dataSource = new MatTableDataSource(this.DATA);
            Swal.fire('Película eliminada','La película ha sido eliminada de la base de datos','success');
          },
          (error) => {
            Swal.fire('Error','Error al eliminar la película','error');
          }
        )
      }
    })
  }

  ngOnInit(): void {
    this.getMovies();
  }

}
