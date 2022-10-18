import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeValue } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-view-movies',
  templateUrl: './user-view-movies.component.html',
  styleUrls: ['./user-view-movies.component.css']
})
export class UserViewMoviesComponent implements OnInit {

  Movies:any;
  user: any;
  fechaActual:any;
  DatosU:any;
  uMovies:any;
  pipe: any;
  imageSource: any;
  movie_photo: SafeValue | undefined;

  constructor(private restService:RestService,
    private sanitizer: DomSanitizer,
    private http:HttpClient) { }

  getMovies(){
    this.restService.RestApi('GET','/peliculas/',{}).then((data:any)=>{
      let array = data['body'];
      let datos = [];
      for (let i = 0; i < array.length; i++) {
        let idReaccion = 0; let reaccion = 0;
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
      this.getUmovies();
    })
  }
  Reacciones:any;
  getReacciones(){
    this.restService.RestApi('GET','/ureacciones/usuarios/',{}).then((data:any)=>{
      this.Reacciones=data['body'];
      this.getMovies();
    })
  }
  
  getUmovies(){
    let datos: { id: any; titulo: any; descripcion: any; imagen: any; imagenPortada: any;  stock: any; precio_alquiler: any; precio_venta: any; estado: any; numeroDeReacciones: any; idReaccion: any; reaccion: any; fecha: any; fecha_inicio: any; fecha_fin: any; tipo: any; pagoMora: any;idUsuarioP: any;}[] = [];
    this.restService.RestApi('GET','/upeliculas/peliculas/',{}).then((data:any)=>{
      this.uMovies=data['body']; 
      for (let i = 0; i < this.Movies.length; i++) {
        
        for (let j = 0; j < this.uMovies.length; j++) {
          if (this.Movies[i]['id']==this.uMovies[j]['pelicula_usuario']['id'] && this.user['id'] ==this.uMovies[j]['usuario_pelicula']['id']) {
            
            this.http.get(environment['api_ruta']+'/peliculas/imagenes/pelicula'+this.Movies[i]['id'],{responseType: 'text' }).subscribe(data1=>{
              let imagenBase64=data1;
              this.imageSource = 'data:image/jpeg;base64, '+imagenBase64+'';
            
            let mora = false;
            if (this.uMovies[j]['fecha_fin'] < this.fechaActual) {
              mora = true;
            }else{
              mora = false;
            }
            if (this.uMovies[j]['estado']) {
              datos.push({
                'id': this.Movies[i]['id'],
                'titulo': this.Movies[i]['titulo'],
                'descripcion': this.Movies[i]['descripcion'],
                'imagen': this.Movies[i]['imagen'],
                'imagenPortada': this.imageSource,
                'stock': this.Movies[i]['stock'],
                'precio_alquiler': this.Movies[i]['precio_alquiler'],
                'precio_venta': this.Movies[i]['precio_venta'],
                'estado': this.Movies,
                'numeroDeReacciones': this.Movies[i]['numeroDeReacciones'],
                'idReaccion':this.Movies[i]['idReaccion'],
                'reaccion':this.Movies[i]['reaccion'],
                'fecha':this.Movies[i]['fecha'],
                'fecha_inicio':this.uMovies[j]['fecha_inicio'],
                'fecha_fin':this.uMovies[j]['fecha_fin'],
                'tipo':this.uMovies[j]['tipo'],
                'pagoMora':mora,
                'idUsuarioP':this.uMovies[j]['id'],
              });
            }
          })
          }
        }
      }
      this.DatosU = datos;
      console.log(this.DatosU)
    })
  }

  obtenerImagen(imagen: string){
    let sanitizer = this.sanitizer.bypassSecurityTrustUrl(imagen);
    return sanitizer
  }

  megusta(id: number,idReaccion:number,reaccion:number){
    let peli = {}
    for (let i = 0; i < this.DatosU.length; i++) {
      if (this.DatosU[i]['id'] == id) {
        let estado = false;
          if (this.DatosU[i]['estado'] == 'Activo') {
            estado = true;
          }else{
            estado = false;
          }
        if (reaccion == 1) {
          peli ={
            "id":id,
            "titulo":this.DatosU[i]['titulo'],
            "descripcion":this.DatosU[i]['descripcion'],
            "imagen":this.DatosU[i]['imagen'],
            "stock":this.DatosU[i]['stock'],
            "precio_alquiler":this.DatosU[i]['precio_alquiler'],
            "precio_venta":this.DatosU[i]['precio_venta'],
            "fecha":this.DatosU[i]['fecha'],
            "estado":estado,
            "numeroDeReacciones":Number(this.DatosU[i]['numeroDeReacciones'])-1
          }
        }else{
          peli ={
            "id":id,
            "titulo":this.DatosU[i]['titulo'],
            "descripcion":this.DatosU[i]['descripcion'],
            "imagen":this.DatosU[i]['imagen'],
            "stock":this.DatosU[i]['stock'],
            "precio_alquiler":this.DatosU[i]['precio_alquiler'],
            "precio_venta":this.DatosU[i]['precio_venta'],
            "fecha":this.DatosU[i]['fecha'],
            "estado":estado,
            "numeroDeReacciones":Number(this.DatosU[i]['numeroDeReacciones'])+1
          }
        }
      }
    }
    if (reaccion == 1) {
      this.restService.RestApi('DELETE','/ureacciones/'+idReaccion,{}).then((data:any)=>{
        this.restService.RestApi('DELETE','/ureacciones/'+idReaccion,{}).then((data:any)=>{
          this.restService.RestApi('PUT','/peliculas/likes/',peli).then((data:any)=>{
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
        this.restService.RestApi('PUT','/peliculas/likes/',peli).then((data:any)=>{
          this.getReacciones();
        })
      })
    }
  }
    

  devolver(id:number, id_movie:number){
    Swal.fire({
      title:'Devolver película',
      text:'¿Estás seguro de devolver esta película?',
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
          "id":id,
          "usuario_pelicula":{
            "id":this.user['id']
            },
          "pelicula_usuario":{
              "id":id_movie
              },
          "fecha_inicio":fecha,
          "estado":false,
          "tipo":'2'
        };
        this.restService.RestApi('PUT','/upeliculas/',reaccionDatos).then((data:any)=>{
          this.getReacciones();
        })
      }})
    
  }

  ngOnInit(): void {
    this.pipe = new DatePipe('en-US');
    this.fechaActual = this.pipe.transform(Date.now(), 'yyyy-MM-dd');
    this.user = this.restService.getUser(); 
    this.getReacciones();
  }

}
