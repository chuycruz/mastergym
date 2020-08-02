import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { MensajesAlertService } from '../services/mensajes-alert.service';
import { Router } from '@angular/router';
import { Precio } from '../models/precio';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.css']
})
export class PreciosComponent implements OnInit {
  formularioPrecios: FormGroup
  precios: Precio[] = new Array<Precio>()
  esEditar: boolean = false
  id: String

  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private alerta: MensajesAlertService) { }

  ngOnInit(): void {

    this.formularioPrecios = this.fb.group({
      nombre: ['', Validators.required],
      costo:  ['', Validators.required],
      duracion:  ['', Validators.required],
      tipoDuracion: ['', Validators.required],
    })

    this.actualizarPrecios()
  }

  actualizarPrecios(){
    this.afs.collection('precios').get().subscribe((resultado)=> {
      this.precios.length = 0
      resultado.docs.forEach(dato=>{
        let precio = dato.data() as Precio
        precio.id = dato.id
        precio.ref = dato.ref
        this.precios.push(precio)
      })
    })
  }

  agregar(){
    console.log(this.formularioPrecios.value)
    this.afs.collection('precios').add(this.formularioPrecios.value).then(()=>{
      this.alerta.mensajeCorrecto('Precio agregado', 'El precio se agrego correctamente')
      this.formularioPrecios.reset()
      this.actualizarPrecios()
    }).catch(()=>{
      this.alerta.mensajeError('Error', 'Ocurrio un error')
    })
    
  }

  editarPrecio(precio: Precio){
    this.esEditar = true
    this.formularioPrecios.setValue({
      nombre: precio.nombre,
      costo: precio.costo,
      duracion: precio.duracion,
      tipoDuracion: precio.tipoDuracion
    })
    this.id = precio.id
  }

  editar(){
    this.afs.doc('precios/' + this.id).update(this.formularioPrecios.value).then(()=>{
      this.alerta.mensajeCorrecto('Editado correctamente', 'El precio se edito con éxito')
      this.formularioPrecios.reset()
      this.esEditar = false
      this.actualizarPrecios()
    }).catch(()=>{
      this.alerta.mensajeError('Error', 'El precio no se pudo editar')
    })
  }

}
