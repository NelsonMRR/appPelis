import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-movies',
  templateUrl: './user-movies.component.html',
  styleUrls: ['./user-movies.component.css']
})
export class UserMoviesComponent implements OnInit {

  Movies:any;
  meGusta : Boolean | undefined;
  user: any;

  constructor(private restService:RestService,
    private router:Router) { }

  getUsers(){
    this.restService.RestApi('GET','/peliculas/',{}).then((data:any)=>{
      let array = data['body'];
      let datos = [];
      for (let i = 0; i < array.length; i++) {
        let idReaccion = 0; let reaccion = 0;
        for (let j = 0; j < this.Reacciones.length; j++) {
          
          if (array[i]['id']==this.Reacciones[j]['pelicula_reaccion']['id'] && this.user['id'] ==this.Reacciones[j]['usuario_reaccion']['id']) {
            idReaccion=this.Reacciones[j]['id'];
            reaccion = 1;
          }else{
            idReaccion=0;
            reaccion = 0;
          }
        }
        let estado = '';
        if (array[i]['estado'] == true) {
          if (array[i]['estado'] == true) {
            estado = 'Activo';
          }else{
            estado = 'Inactivo';
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
            'numeroDeReacciones': array[i]['numeroDeReacciones'],
            'idReaccion':idReaccion,
            'reaccion':reaccion
          });
        }
        
      }
      this.Movies = datos;
    })
  }
  Reacciones:any;
  getReacciones(){
    this.restService.RestApi('GET','/ureacciones/usuarios/',{}).then((data:any)=>{
      this.Reacciones=data['body'];
      this.getUsers();
    })
  }

  megusta(id: number,idReaccion:number,reaccion:number){
    
    
    if (reaccion == 1) {
      // console.log(idReaccion)
      // this.restService.RestApi('DELETE','/ureacciones/'+idReaccion,{}).then((data:any)=>{
      // this.getReacciones();
      // })
    }else{
      let reaccionDatos = {
        "pelicula_reaccion":{
          "id":id
          },
        "usuario_reaccion":{
            "id":this.user['id']
            },
        "reaccion":"1",
        "estado":true
      };
      this.restService.RestApi('POST','/ureacciones/',reaccionDatos).then((data:any)=>{
        this.getReacciones();
      })
    }
  }

  comprar(id:number){
    Swal.fire({
      title:'Comprar película',
      text:'¿Estás seguro de comprar esta película?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Aceptar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        let fecha = new Date();
        let reaccionDatos = {
          "usuario_pelicula":{
            "id":this.user['id']
            },
          "pelicula_usuario":{
              "id":id
              },
          "fecha_inicio":fecha,
          "estado":true,
          "tipo":1
        };
        this.restService.RestApi('POST','/upeliculas/',reaccionDatos).then((data:any)=>{
          this.router.navigate(['/user-dashboard/mymovies']);
        })
      }})
    
  }

  ngOnInit(): void {
    this.user = this.restService.getUser(); 
    
    this.getReacciones();
    
  }

}
