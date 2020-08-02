import { Component, OnInit } from '@angular/core';
import { Inscripcion } from '../models/inscripcion';
import { Cliente } from '../models/cliente';
import { AngularFirestore } from '@angular/fire/firestore';
import { Precio } from '../models/precio';
import { MensajesAlertService } from '../services/mensajes-alert.service';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css']
})
export class InscripcionComponent implements OnInit {
inscripcion: Inscripcion = new Inscripcion()
clienteSeleccionado: Cliente = new Cliente()
precioSeleccionado: Precio = new Precio()
precios: Precio[] = new Array<Precio>()
ocultar: boolean = false

  constructor(private afs: AngularFirestore,
    private alerta: MensajesAlertService) { }

  ngOnInit(): void {
    this.afs.collection('precios').get().subscribe(resultado => {
      resultado.docs.forEach(item =>{
        let precio = item.data() as Precio
        precio.id = item.id
        precio.ref = item.ref 
        this.precios.push(precio)
      })
    })
  }
  asignarCliente(cliente: Cliente){
    this.inscripcion.cliente = cliente.ref
    this.clienteSeleccionado = cliente
  }

  eliminarCliente(){
    this.clienteSeleccionado = new Cliente()
    this.inscripcion.cliente = undefined
  }

  guardar() {
    if(this.inscripcion.validar().esValido) {
      let inscripcionAgregar = {
        
        fecha: this.inscripcion.fecha,
        fechaFinal: this.inscripcion.fechaFinal,
        precios: this.inscripcion.precios,
        cliente: this.inscripcion.cliente,
        subTotal: this.inscripcion.subTotal,
        impuesto: this.inscripcion.impuesto,
        total: this.inscripcion.total
      }
      this.afs.collection('inscripciones').add(inscripcionAgregar).then(resultado =>{
        this.precioSeleccionado = new Precio()
        this.clienteSeleccionado = new Cliente()
        this.inscripcion = new Inscripcion()
        this.alerta.mensajeCorrecto('Inscripción guardada', 'La inscripción se guardo correctamente')
        this.ocultar = false

      })
      
    } else {
      this.alerta.mensajeAdvertencia('Advertencia', this.inscripcion.validar().mensaje)
    }
  }

  seleccionarPrecio (id: string){

    if (id != null){
    this.precioSeleccionado = this.precios.find(x => x.id == id)
    this.inscripcion.precios = this.precioSeleccionado.ref

    this.inscripcion.subTotal = this.precioSeleccionado.costo
    this.inscripcion.impuesto = this.inscripcion.subTotal * .16
    this.inscripcion.total = this.inscripcion.impuesto + this.inscripcion.subTotal
    

    this.inscripcion.fecha = new Date()

    if(this.precioSeleccionado.tipoDuracion == 1 ){
      let dias: number = this.precioSeleccionado.duracion
      let fechaFinal = new Date(this.inscripcion.fecha.getFullYear(), this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDate() + dias)
      this.inscripcion.fechaFinal = fechaFinal
    }
    if(this.precioSeleccionado.tipoDuracion == 2 ){
      
      let dias: number = this.precioSeleccionado.duracion * 7
      let fechaFinal = new Date(this.inscripcion.fecha.getFullYear(), this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDate() + dias)
      this.inscripcion.fechaFinal = fechaFinal
    }
    if(this.precioSeleccionado.tipoDuracion == 3 ){
      
      let dias: number = this.precioSeleccionado.duracion * 15
      let fechaFinal = new Date(this.inscripcion.fecha.getFullYear(), this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDate() + dias)
      this.inscripcion.fechaFinal = fechaFinal
    }
    if(this.precioSeleccionado.tipoDuracion == 4 ){
      
      let mes: number = this.precioSeleccionado.duracion + this.inscripcion.fecha.getMonth()
      let fechaFinal = new Date(this.inscripcion.fecha.getFullYear(), mes, this.inscripcion.fecha.getDate() )
      this.inscripcion.fechaFinal = fechaFinal
    }
    if(this.precioSeleccionado.tipoDuracion == 5 ){
      
      let anio: number = this.precioSeleccionado.duracion
      let fechaFinal = new Date(this.inscripcion.fecha.getFullYear() + anio, this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDate())
      this.inscripcion.fechaFinal = fechaFinal
    }
 } else {
   this.precioSeleccionado = new Precio()
   this.precioSeleccionado.ref = null
   this.inscripcion.fecha = null
   this.inscripcion.fechaFinal = null
   this.inscripcion.subTotal = 0
   this.inscripcion.impuesto = 0
   this.inscripcion.total = 0
 }
  }

  mostrar() {
    this.ocultar = true
  }

}
