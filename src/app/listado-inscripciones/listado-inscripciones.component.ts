import { Component, OnInit } from '@angular/core';
import { Inscripcion } from '../models/inscripcion';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-listado-inscripciones',
  templateUrl: './listado-inscripciones.component.html',
  styleUrls: ['./listado-inscripciones.component.css']
})
export class ListadoInscripcionesComponent implements OnInit {
  inscripciones: any[] = []

  constructor(private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.afs.collection('inscripciones').get().subscribe(resultado => {
      resultado.forEach(inscripcion => {
        let inscripcionObtenida = inscripcion.data()
        inscripcionObtenida.id = inscripcion.id

        this.afs.doc(inscripcion.data().cliente.path).get().subscribe(cliente => {
          inscripcionObtenida.clienteObtenido = cliente.data()
          this.inscripciones.push(inscripcionObtenida)
          inscripcionObtenida.fecha = new Date(inscripcionObtenida.fecha.seconds * 1000)
          inscripcionObtenida.fechaFinal = new Date(inscripcionObtenida.fechaFinal.seconds * 1000)
        })
      })
    })
  }

}
