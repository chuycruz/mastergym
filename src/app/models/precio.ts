import { DocumentReference } from '@angular/fire/firestore/interfaces'

export class Precio {
    id: String
    nombre: String
    costo: number
    duracion: number
    tipoDuracion: number
    ref: DocumentReference
}