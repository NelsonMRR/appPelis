import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DataService } from './data.service';
import { environment } from 'src/environments/environment';
import { catchError, firstValueFrom, Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  public loginStatusSubjec = new Subject<boolean>();
  public token:String='';

  constructor(
    private http: HttpClient,
    private dataService: DataService) { }

    private handleError(error: HttpErrorResponse) {
      let errorMessage = 'Unknown error!';
      if (error.error instanceof ErrorEvent) {
        // Client-side errors
          this.dataService.finalizaProceso();
        errorMessage = `Error: ${error.error.message}`;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        if (error.status==401)
        {
          //llamar generacion de token
        }
      }
      return throwError(()=>errorMessage);
    }
  
  
  
  
  
  //FUNCION MANEJO DE METODOS LLAMADO API
  public async RestApi(method: string, path: string, payload: any): Promise<Observable<any>>{
    let result:any;
    this.token = environment.api_key;
    this.dataService.iniciaProceso();
    if (method=='GET'){
      result= await firstValueFrom(this.http.get(environment.api_ruta + path, 
        { 'observe':'response',
        'headers':{"content-type": "application/json", "Access-Control-Allow-Origin": '*', 
        "Access-Control-Allow-Methods":"GET, POST, PUT, DELETE , OPTIONS"} } ).pipe(catchError(this.handleError))).then(resp =>{
          this.dataService.finalizaProceso();
          return resp;
        }).finally(()=>  this.dataService.finalizaProceso());
    }
    if (method=='POST'){
      // console.log('TOKEN ES ' + this.token );
      result= await firstValueFrom(this.http.post(environment.api_ruta + path, JSON.stringify(payload),
        { 'observe':'response',
        'headers':{"content-type": "application/json", "Access-Control-Allow-Origin": '*', 
        "Access-Control-Allow-Methods":"GET, POST, PUT, DELETE , OPTIONS"} } ).pipe(catchError(this.handleError))).then(resp =>{
          this.dataService.finalizaProceso();
          return  resp;
        }).finally(()=>  this.dataService.finalizaProceso());
    }
    if (method=='PUT'){
      result= await firstValueFrom(this.http.put(environment.api_ruta + path, JSON.stringify(payload),
        {'observe':'response', 'headers':{"content-type": "application/json", "Access-Control-Allow-Origin": '*',  
        "Access-Control-Allow-Methods":"GET, POST, PUT, DELETE , OPTIONS"} } ).pipe(catchError(this.handleError))).then(data =>{
          this.dataService.finalizaProceso();
          return data;
        }).finally(() =>  this.dataService.finalizaProceso());
    }
    if (method=='DELETE'){
      result= await firstValueFrom(this.http.delete(environment.api_ruta + path,
        { 'observe':'response',
        'headers':{"content-type": "application/json", "Access-Control-Allow-Origin": '*',  
        "Access-Control-Allow-Methods":"GET, POST, PUT, DELETE , OPTIONS"} } ).pipe(catchError(this.handleError))).then(data =>{
          this.dataService.finalizaProceso();
          return data;
        }).finally(() =>  this.dataService.finalizaProceso());
    }
    if (method=='OPTIONS'){
      result= await firstValueFrom(this.http.options(environment.api_ruta + path,
        {'observe':'response', 'headers':{"content-type": "application/json",
        "Access-Control-Allow-Origin": '*', 
        "Access-Control-Allow-Methods":"GET, POST, PUT, DELETE , OPTIONS"} } ).pipe(catchError(this.handleError))).then(data =>{
          this.dataService.finalizaProceso();
          return data;} ).finally(() =>  this.dataService.finalizaProceso());
    }  
    if (method=='MOVIE-POST'){
      // console.log('TOKEN ES ' + this.token );
      result= await firstValueFrom(this.http.post(environment.api_ruta + path, payload).pipe(catchError(this.handleError))).then(resp =>{
          this.dataService.finalizaProceso();
          return  resp;
        }).finally(()=>  this.dataService.finalizaProceso());
    }
    if (method=='MOVIE-PUT'){
      // console.log('TOKEN ES ' + this.token );
      result= await firstValueFrom(this.http.put(environment.api_ruta + path, payload).pipe(catchError(this.handleError))).then(resp =>{
          this.dataService.finalizaProceso();
          return  resp;
        }).finally(()=>  this.dataService.finalizaProceso());
    }
    return result;
  }

  //generamos el token
  public generarToken(loginData:any){
    return this.RestApi('POST','/generar-token',loginData);
  }

  public getCurrentUser(){
    return this.RestApi('GET','/actual-usuario',{});
  }

  //iniciamos sesión y establecemos el token en el localStorage
  public loginUser(token:any){
    localStorage.setItem('token',token);
    return true;
  }

  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    }else{
      return true;
    }
  }

  //cerranis sesion y eliminamos el token del localStorage
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //obtenemos el token
  public getToken(){
    return localStorage.getItem('token');
  }

  public setUser(user:any){
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }

}
