import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { MensajesAlertService } from '../services/mensajes-alert.service';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css']
})
export class AgregarClienteComponent implements OnInit {
  formularioClientes: FormGroup
  porcentajeSubida = 0
  urlImagen: string = ''
  editarCliente: boolean = false
  eliminarCliente: boolean = false
  id: string


  constructor(private fb: FormBuilder,
              private storage: AngularFireStorage,
              private afs: AngularFirestore,
              private activeRoute: ActivatedRoute,
              private alert: MensajesAlertService) { }

  ngOnInit(): void {

    //validaciones del formulario para crear clientes
    this.formularioClientes = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      cedula: [''],
      telefono: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      imgUrl: ['', Validators.required],
    })

    
     //Ruta para editar cliente mediante su id
     this.id = this.activeRoute.snapshot.params.clienteID

     if (this.id != undefined){
       this.editarCliente = true
      this.afs.doc<any>('clientes' + '/' + this.id).valueChanges().subscribe(cliente => {
        console.log(new Date(cliente.fechaNacimiento.seconds * 1000).toISOString().substr(0,10))
       this.formularioClientes.setValue({
         nombre: cliente.nombre,
         apellido: cliente.apellido,
         correo: cliente.correo,
         cedula: cliente.cedula,
         telefono: cliente.telefono,
         fechaNacimiento: new Date(cliente.fechaNacimiento.seconds * 1000).toISOString().substr(0,10),
         imgUrl: ''
         })
 
         this.urlImagen = cliente.imgUrl
     })
     }
  }


  //Acción para botón de Agregar clientes
  agregar(){
    this.formularioClientes.value.imgUrl = this.urlImagen
    this.formularioClientes.value.fechaNacimiento = new Date(this.formularioClientes.value.fechaNacimiento)
    this.afs.collection('clientes').add(this.formularioClientes.value).then(termino => {
      this.alert.mensajeCorrecto('Cliente agregado','Se agrego el cliente correctamente')
    }).catch(() => {
      
      this.alert.mensajeError('Cliente no agregado','No se pudo agregar el cliente')
    })
  }

  //Método para editar a cliente
  editar(){
    this.formularioClientes.value.imgUrl = this.urlImagen
    this.formularioClientes.value.fechaNacimiento = new Date(this.formularioClientes.value.fechaNacimiento)
    this.afs.doc('clientes/' + this.id).update(this.formularioClientes.value).then(() => {
      this.alert.mensajeCorrecto('Cliente editado','Se edito el cliente correctamente')
    }).catch(()=>{
      this.alert.mensajeError('Cliente no editado','No se pudo editar el cliente')
    })
  }

  //Método para subir imagen
  subirImagen(evento){
    let archivo = evento.target.files[0]    
    let nombreArchivo = archivo.name
    let ruta = "clientes/" + nombreArchivo
    const referencia = this.storage.ref(ruta)
    const tarea = referencia.put(archivo)
    tarea.then(objeto => {
      console.log('Imagen subida')
      //conseguir url de la imagen con ruta completa del sistema
      referencia.getDownloadURL().subscribe(url => {
        this.urlImagen = url
    }) 
    })
    tarea.percentageChanges().subscribe(porcentaje => {
      this.porcentajeSubida = parseInt(porcentaje.toString())
    })

    
  }

  //Método para eliminar a cliente
  eliminar() {
    this.formularioClientes.value.fechaNacimiento = new Date(this.formularioClientes.value.fechaNacimiento)
    this.afs.doc('clientes/' + this.id).delete().then(()=>{
      this.alert.mensajeCorrecto('Eliminado', 'Cliente eliminado correctamente')
    }).catch(()=>{
      this.alert.mensajeError('Error', 'Cliente no eliminado')
    })
  }

}
