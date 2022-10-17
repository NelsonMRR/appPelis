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
  formData = new FormData();
  
  movieDataAntigua = {
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
  movieData = {
    titulo:'',
    descripcion:'',
    imagen:'',
    stock:'',
    precio_alquiler:'',
    precio_venta:'',
    estado:true,
  }
  user: any;

  constructor(
    private route:ActivatedRoute,
    private restService:RestService,
    private router:Router,
    private snack:MatSnackBar) { }

  movieId = 0;

  guardarCuestionario(){
    this.formData.delete('pelicula');
    if(this.movieData.titulo.trim() == '' || this.movieData.titulo == null){
      this.snack.open('El título es requerido','',{
        duration:3000
      });
      return ;
    }
    if(this.movieData.imagen.trim() == '' || this.movieData.imagen == null){
      this.snack.open('La imagen es requerida','',{
        duration:3000
      });
      return ;
    }
    this.formData.append("pelicula", JSON.stringify(this.movieData));
    console.log(this.formData);
    this.restService.RestApi('MOVIE-POST','/peliculas/',this.formData).then((data:any) => { 
      console.log(data);
        Swal.fire('Película guardada','La película ha sido guardada con éxito','success');
        this.movieData = {
          titulo:'',
          descripcion:'',
          imagen:'',
          stock:'',
          precio_alquiler:'',
          precio_venta:'',
          estado:true,
        }
        this.router.navigate(['/admin/movies']);
      },
      (error) => {
        Swal.fire('Error','Error al guardar película','error');
      }
    )
  }

  onFileSelected(event:any){
    const file:File = event.target.files[0];
    this.formData.delete('fichero');
    this.movieData.imagen=''+file['name']+'';
    this.formData.append("fichero", file);
  }

  public actualizarDatos(){
    this.formData.delete('pelicula');
    if(this.movieData.titulo.trim() == '' || this.movieData.titulo == null){
      this.snack.open('El título es requerido','',{
        duration:3000
      });
      return ;
    }
    if(this.movieData.imagen.trim() == '' || this.movieData.imagen == null){
      this.snack.open('La imagen es requerida','',{
        duration:3000
      });
      return ;
    }
    this.formData.append("pelicula", JSON.stringify(this.movieData));
    this.restService.RestApi('MOVIE-PUT','/peliculas/',this.formData).then((data:any) => {
    let dataHistorial = {
        "usuario_historial":{
            "id":this.user['id']
            },
        "pelicula_historial":{
            "id":this.movieDataAntigua['id']
            },
        "titulo_anterior": this.movieDataAntigua['titulo'],
        "titulo_nuevo":this.movieData['titulo'],
        "imagen":this.movieData['imagen'],
        "precio_venta_anterior": this.movieDataAntigua['precio_venta'],
        "precio_venta_nuevo":this.movieData['precio_venta'],
        "precio_alquiler_anterior": this.movieDataAntigua['precio_alquiler'],
        "precio_alquiler_nuevo":this.movieData['precio_alquiler']
    }
      this.restService.RestApi('POST','/historial_peliculas/',dataHistorial).then((data2:any) => {

      }) 
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
    this.user = this.restService.getUser(); 
    this.botonesAgregar = true;
    this.movieId = this.route.snapshot.params['id'];
    if (this.movieId != null) {
      this.botonesAgregar=false;
      this.botonesActualizar=true;
      this.restService.RestApi('GET','/peliculas/'+this.movieId,{}).then((data:any) => {
        this.movieData = data['body'];
        this.movieDataAntigua = data['body'];
      },
      (error) => {
        Swal.fire('Error','Error al cargar película','error');
        console.log(error);
      }
    )
    }
    
  }

}
