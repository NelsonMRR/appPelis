import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private procesando = new BehaviorSubject<boolean>(false);

  constructor() { }

  //SETTEAR SESIONES
  iniciaProceso(){
    this.procesando.next(true);
  }
  finalizaProceso(){
    this.procesando.next(false);
  }
}
