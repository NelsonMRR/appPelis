import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-alquiler',
  templateUrl: './add-alquiler.component.html',
  styleUrls: ['./add-alquiler.component.css']
})
export class AddAlquilerComponent implements OnInit {

  botonesAgregar : Boolean | undefined;
  botonesActualizar : Boolean | undefined;
  
  movieData = {
    id:'',
    titulo:'',
    precio_alquiler:'',
    precio_venta:'',
    fecha_inicio:'',
    fecha_fin:''
  }
  user: any;

  constructor(
    private route:ActivatedRoute,
    private restService:RestService,
    private router:Router,
    private snack:MatSnackBar) { }

  movieId = 0;

  guardarCuestionario(){
    if(this.movieData.fecha_inicio == null || this.movieData.fecha_fin == null){
      this.snack.open('Seleccione un rango de fechas','',{
        duration:3000
      });
      return ;
    }
    Swal.fire({
      title:'Alquilar película',
      text:'¿Estás seguro de alquilar esta película?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Aceptar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        console.log(this.movieData);
        
        let crearAlquiler = {
          "usuario_pelicula":{
              "id":this.user['id']
              },
          "pelicula_usuario":{
              "id":this.movieData.id
              },
          "fecha_inicio":this.movieData.fecha_inicio,
          "fecha_fin":this.movieData.fecha_fin,
          "estado":true,
          "tipo":"2"
        }
        this.restService.RestApi('POST','/upeliculas/',crearAlquiler).then((data:any) => {
            console.log(data);
            Swal.fire('Película alquilada','La película ha sido guardada con éxito','success');
            this.movieData = {
              id:'',
              titulo:'',
              precio_alquiler:'',
              precio_venta:'',
              fecha_inicio:'',
              fecha_fin:''
            }
            this.router.navigate(['/user-dashboard/mymovies']);
          },
          (error) => {
            Swal.fire('Error','Error al guardar película','error');
          }
        )
      }
    })
  }

  ngOnInit(): void {
    this.user = this.restService.getUser(); 
    this.movieId = this.route.snapshot.params['id'];
    if (this.movieId != null) {
      this.botonesAgregar=false;
      this.botonesActualizar=true;
      this.restService.RestApi('GET','/peliculas/'+this.movieId,{}).then((data:any) => {
        this.movieData = data['body'];
        console.log(this.movieData);
      },
      (error) => {
        Swal.fire('Error','Error al cargar película','error');
        console.log(error);
      }
    )
    }else{
      this.router.navigate(['/user-dashboard/movies']);
    }
    
  }

}
