import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeValue } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { environment } from 'src/environments/environment';
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
  imageSource: any;
  imagenBase64: any;
  movie_photo: SafeValue | undefined;

  constructor(private restService:RestService,
    private router:Router,
    private sanitizer: DomSanitizer,
    private http:HttpClient) { }

  getMovies(){
    this.restService.RestApi('GET','/peliculas/',{}).then((data:any)=>{
      let array = data['body'];
      let datos: { id: any; titulo: any; descripcion: any; imagen: any; imagenPortada: any; stock: any; precio_alquiler: any; precio_venta: any; fecha: any; estado: string; numeroDeReacciones: any; idReaccion: number; reaccion: number; }[] = []; 
      for (let i = 0; i < array.length; i++) { let imageSource = '';
        let idReaccion = 0; let reaccion = 0; 
        this.http.get(environment['api_ruta']+'/peliculas/imagenes/pelicula'+array[i]['id'],{responseType: 'text' }).subscribe(data1=>{
          this.imagenBase64 = data1;console.log(this.imagenBase64);
        
          imageSource = 'data:image/jpeg;base64, '+this.imagenBase64+'';
          for (let j = 0; j < this.Reacciones.length; j++) {
            
            if (array[i]['id']==this.Reacciones[j]['pelicula_reaccion']['id'] && this.user['id'] ==this.Reacciones[j]['usuario_reaccion']['id']) {
              idReaccion=this.Reacciones[j]['id'];
              reaccion = 1;
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
              'imagenPortada': imageSource,
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
        });
      }
      this.Movies = datos;
    })
  }
  Reacciones:any;
  getReacciones(){
    this.restService.RestApi('GET','/ureacciones/usuarios/',{}).then((data:any)=>{
      this.Reacciones=data['body'];
      this.getMovies();
    })
  }

  megusta(id: number,idReaccion:number,reaccion:number){
    let peli = {}
    for (let i = 0; i < this.Movies.length; i++) {
      if (this.Movies[i]['id'] == id) {
        let estado = false;
          if (this.Movies[i]['estado'] == 'Activo') {
            estado = true;
          }else{
            estado = false;
          }
        if (reaccion == 1) {
          peli ={
            "id":id,
            "titulo":this.Movies[i]['titulo'],
            "descripcion":this.Movies[i]['descripcion'],
            "imagen":this.Movies[i]['imagen'],
            "stock":this.Movies[i]['stock'],
            "precio_alquiler":this.Movies[i]['precio_alquiler'],
            "precio_venta":this.Movies[i]['precio_venta'],
            "fecha":this.Movies[i]['fecha'],
            "estado":estado,
            "numeroDeReacciones":Number(this.Movies[i]['numeroDeReacciones'])-1
          }
        }else{
          peli ={
            "id":id,
            "titulo":this.Movies[i]['titulo'],
            "descripcion":this.Movies[i]['descripcion'],
            "imagen":this.Movies[i]['imagen'],
            "stock":this.Movies[i]['stock'],
            "precio_alquiler":this.Movies[i]['precio_alquiler'],
            "precio_venta":this.Movies[i]['precio_venta'],
            "fecha":this.Movies[i]['fecha'],
            "estado":estado,
            "numeroDeReacciones":Number(this.Movies[i]['numeroDeReacciones'])+1
          }
        }
      }
    }
    if (reaccion == 1) {
      this.restService.RestApi('DELETE','/ureacciones/'+idReaccion,{}).then((data:any)=>{
        this.restService.RestApi('DELETE','/ureacciones/'+idReaccion,{}).then((data:any)=>{
          this.restService.RestApi('PUT','/peliculas/',peli).then((data:any)=>{
            this.getReacciones();
          })
        })
      })
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
        this.restService.RestApi('PUT','/peliculas/',peli).then((data:any)=>{
          this.getReacciones();
        })
      })
    }
  }

  obtenerImagen(imagen: string){
    let sanitizer = this.sanitizer.bypassSecurityTrustUrl(imagen);
    return sanitizer
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
          "tipo":"1"
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
