import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MensajesAlertService } from '../services/mensajes-alert.service';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.css']
})
export class ListadoClientesComponent implements OnInit {
  clientes: any[] = new Array<any>()
  id: string

  constructor(private firestore: AngularFirestore,
    private alerta: MensajesAlertService) { }

  ngOnInit(): void {
    //this.firestore.collection('clientes').valueChanges().subscribe(resultado => {
      //this.clientes = resultado
    //})


   this.clientes.length = 0
   this.firestore.collection('clientes').get().subscribe(resultado => {

    //console.log(resultado.docs)

    resultado.docs.forEach(item => {

      let cliente = item.data()
      cliente.id = item.id
      cliente.ref = item.ref
      this.clientes.push(cliente)
    })

   })
  }

  eliminar() {
    this.firestore.doc('clientes/' + this.id).delete().then(()=>{
      this.alerta.mensajeCorrecto('Eliminado', 'Cliente eliminado correctamente')
    }).catch(()=>{
      this.alerta.mensajeError('Error', 'Cliente no eliminado')
    })
  }

}
