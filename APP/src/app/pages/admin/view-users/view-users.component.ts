import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RestService } from 'src/app/services/rest.service';
import Swal from 'sweetalert2';

export interface Users {
  id: number;
  username: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  fecha: string;
  tipo: string;
  numeroDePeliculas: number;
  estado: string;
}

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  dataSource!: MatTableDataSource<Users>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  
  private DATA: Users[] =[];
  displayedColumns: string[] = [
    'username', 
    'nombre', 
    'apellido', 
    'email', 
    'telefono', 
    'fecha', 
    'tipo',
    'estado',
    'opciones'];
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

  getUsers(){
    this.restService.RestApi('GET','/usuarios/',{}).then((data:any)=>{
      let array = data['body'];
      let datos = [];
      for (let i = 0; i < array.length; i++) {
        let estado = '';
        if (array[i]['estado'] == true) {
          estado = 'Activo';
        }else{
          estado = 'Inactivo';
        }
        datos.push({
          'id': array[i]['id'],
          'username': array[i]['username'],
          'nombre': array[i]['nombre'],
          'apellido': array[i]['apellido'],
          'email': array[i]['email'],
          'telefono': array[i]['telefono'],
          'fecha': array[i]['fecha'],
          'tipo': array[i]['authorities'][0]['authority'],
          'numeroDePeliculas': array[i]['numeroDePeliculas'],
          'estado': estado,
        });
      }
      this.DATA = datos;
      this.dataSource = new MatTableDataSource(this.DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  eliminarUsuario (id:any){
    Swal.fire({
      title:'Eliminar usuario',
      text:'¿Estás seguro de eliminar este usuario?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Eliminar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.restService.RestApi('DELETE','/usuarios/'+id,{}).then((data) => {
            this.DATA = this.DATA.filter((data:any) => data.id != id);
            this.dataSource = new MatTableDataSource(this.DATA);
            Swal.fire('Usuario eliminado','el usuario ha sido eliminada de la base de datos','success');
          },
          (error) => {
            Swal.fire('Error','Error al eliminar el usuario','error');
          }
        )
      }
    })
  }
  ngOnInit(): void {
    this.getUsers()
  }

}
