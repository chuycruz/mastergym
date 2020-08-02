import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MensajesAlertService {

  constructor() { }

  mensajeError(titulo: string, descripcion: string){
    Swal.fire({
      title: titulo,
      text: descripcion,
      icon: 'error'
    })
    
  }

  mensajeCorrecto(titulo: string, descripcion: string){
    Swal.fire({
      title: titulo,
      text: descripcion,
      icon: 'success'
    })

  }

  mensajeAdvertencia(titulo: string, descripcion: string){
    Swal.fire({
      title: titulo,
      text: descripcion,
      icon: 'warning'
    })
  }
}
