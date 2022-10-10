import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    "username" : '',
    "password" : '',
  }

  constructor(
    private snack:MatSnackBar,
    private restService:RestService,
    private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit(){
    if(this.loginData.username.trim() == '' || this.loginData.username.trim() == null){
      this.snack.open('El nombre de usuario es requerido !!','Aceptar',{
        duration:3000
      })
      return;
    }

    if(this.loginData.password.trim() == '' || this.loginData.password.trim() == null){
      this.snack.open('La contraseña es requerida !!','Aceptar',{
        duration:3000
      })
      return;
    }

    this.restService.generateToken(this.loginData).then(
      (data:any) => {
        console.log(data);
        this.restService.loginUser(data.token);
        this.restService.getCurrentUser().then((user:any) => {
          this.restService.setUser(user);
          console.log(user);

          if(this.restService.getUserRole() == 'ADMIN'){
            //dashboard admin
            //window.location.href = '/admin';
            this.router.navigate(['admin']);
            this.restService.loginStatusSubjec.next(true);
          }
          else if(this.restService.getUserRole() == 'NORMAL'){
            //user dashboard
            //window.location.href = '/user-dashboard';
            this.router.navigate(['user-dashboard']);
            this.restService.loginStatusSubjec.next(true);
          }
          else{
            this.restService.logout();
          }
        })
      },(error) => {
        console.log(error);
        this.snack.open('Detalles inválidos , vuelva a intentar !!','Aceptar',{
          duration:3000
        })
      }
    )
  }

}
