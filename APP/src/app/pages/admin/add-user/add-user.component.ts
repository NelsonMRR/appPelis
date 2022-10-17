import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  botonesAgregar : Boolean | undefined;
  botonesActualizar : Boolean | undefined;
  
  isEditable : Boolean | undefined;

  Data = {
    id:'',
    username:'',
    password:'',
    nombre:'',
    apellido:'',
    email:'',
    telefono:'',
    estado:true,
    tipo:''
  }
  DataUsuario = {
    id:'',
    username:'',
    password:'',
    nombre:'',
    apellido:'',
    email:'',
    telefono:'',
    estado:true,
    tipo:''
  }
  DataRol = {
    id:'',
    usuario:'',
    rol:0
  }
  id=0;
  constructor(
    private route:ActivatedRoute,
    private restService:RestService,
    private router:Router,
    private snack:MatSnackBar) { }

  guardarCuestionario(){
    console.log(this.Data);
    if(this.Data.username.trim() == '' || this.Data.password == null){
      this.snack.open('El username y password es requerido','',{
        duration:3000
      });
      return ;
    }

    this.restService.RestApi('POST','/usuarios/',this.Data).then((data:any) => {
        console.log(data);
        Swal.fire('Usuario guardado','El usuario ha sido guardado con éxito','success');
        this.Data = {
          id:'',
          username:'',
          password:'',
          nombre:'',
          apellido:'',
          email:'',
          telefono:'',
          estado:true,
          tipo:''
        }
        this.router.navigate(['/admin/users']);
      },
      (error) => {
        Swal.fire('Error','Error al guardar usuario','error');
      }
    )
  }

  public actualizarDatos(){
    let adminData = []; let tipo = 0;
    if (this.Data['tipo']=='ADMINISTRADOR') {
      tipo = 1;
    }else{
      tipo =2;
    }
    this.DataUsuario= {
      'id':this.Data['id'],
      'username':this.Data['username'],
      'password':this.Data['password'],
      'nombre':this.Data['nombre'],
      'apellido':this.Data['apellido'],
      'email':this.Data['email'],
      'telefono':this.Data['telefono'],
      'estado':this.Data['estado'],
      'tipo':this.Data['tipo']
    }
    this.DataRol= {
      'id':this.Data['id'],
      'usuario':this.Data['id'],
      'rol':tipo
    }
    this.restService.RestApi('PUT','/usuarios/',this.DataUsuario).then((data:any) => {
      // this.restService.RestApi('PUT','/roles/',this.DataRol).then((data1:any) => {
        
      // })
      Swal.fire('Usuario actualizado','El usuario ha sido actualizada con éxito','success').then(
          (e) => {
            this.router.navigate(['/admin/users']);
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
    this.id = this.route.snapshot.params['id'];
    if (this.id != null) {
      this.botonesAgregar=false;
      this.botonesActualizar=true;
      this.restService.RestApi('GET','/usuarios/'+this.id,{}).then((data:any) => {
        let tipo = '';
          if (data['body']['authorities'][0]['authority']=='ADMINISTRADOR') {
            tipo = 'ADMINISTRADOR';
          }else{
            tipo ='NORMAL';
          }
          this.Data={
            'id':data['body']['id'],
            'username':data['body']['username'],
            'password':data['body']['password'],
            'nombre':data['body']['nombre'],
            'apellido':data['body']['apellido'],
            'email':data['body']['email'],
            'telefono':data['body']['telefono'],
            'estado':data['body']['estado'],
            'tipo':tipo
          }
          this.isEditable = true;
      },
      (error) => {
        Swal.fire('Error','Error al cargar usuario','error');
        console.log(error);
      }
    )
    }
    
  }

}
