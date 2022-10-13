import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  botonesAgregar : Boolean | undefined;
  botonesActualizar : Boolean | undefined;
  
  movieData = {
    id:'',
    titulo:'',
    descripcion:'',
    imagen:'',
    stock:'',
    precio_alquiler:'',
    precio_venta:'',
    fecha:'',
    estado:true,
    numeroDeReacciones:''
  }

  constructor(
    private route:ActivatedRoute,
    private restService:RestService,
    private router:Router,
    private snack:MatSnackBar) { }

  movieId = 0;

  guardarCuestionario(){
    console.log(this.movieData);
    if(this.movieData.titulo.trim() == '' || this.movieData.titulo == null){
      this.snack.open('El título es requerido','',{
        duration:3000
      });
      return ;
    }

    this.restService.RestApi('POST','/peliculas/',this.movieData).then((data:any) => {
        console.log(data);
        Swal.fire('Película guardada','La película ha sido guardada con éxito','success');
        this.movieData = {
          id:'',
          titulo:'',
          descripcion:'',
          imagen:'',
          stock:'',
          precio_alquiler:'',
          precio_venta:'',
          fecha:'',
          estado:true,
          numeroDeReacciones:''
        }
        this.router.navigate(['/admin/movies']);
      },
      (error) => {
        Swal.fire('Error','Error al guardar película','error');
      }
    )
  }

  public actualizarDatos(){
    this.restService.RestApi('PUT','/peliculas/',this.movieData).then((data:any) => {
        Swal.fire('Película actualizada','La película ha sido actualizada con éxito','success').then(
          (e) => {
            this.router.navigate(['/admin/movies']);
          }
        );
      },
      (error) => {
        Swal.fire('Error en el sistema','No se ha podido actualizar.','error');
        console.log(error);
      }
    )
  }

  ngOnInit(): void {
    this.botonesAgregar = true;
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
    }
    
  }

}
