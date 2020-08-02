import { DocumentReference } from '@angular/fire/firestore/interfaces'

export class Inscripcion {
    fecha: Date
    fechaFinal: Date
    precios: DocumentReference
    cliente: DocumentReference
    subTotal: number
    impuesto: number
    total: number
    constructor(){
        this.fecha = null
        this.cliente = this.cliente
        this.precios = this.precios
        this.fechaFinal = null
        this.subTotal = this.subTotal
        this.impuesto = this.impuesto
        this.total = this.total
    }

    validar (): any {
        let respuesta = {
            esValido: false,
            mensaje: ''
        }

        if (this.cliente == null || this.cliente == undefined){
            respuesta.esValido = false
            respuesta.mensaje = 'No selecciono un cliente'
            return respuesta
        }
        
        if (this.fecha == null || this.fecha == undefined){
            respuesta.esValido = false
            respuesta.mensaje = 'No tiene fecha de inicio'
            return respuesta
        }

        
        if (this.fechaFinal == null || this.fechaFinal == undefined){
            respuesta.esValido = false
            respuesta.mensaje = 'No tiene fecha final'
            return respuesta
        }

        
        if (this.precios == null || this.precios == undefined){
            respuesta.esValido = false
            respuesta.mensaje = 'No se ha seleccionado un precio'
            return respuesta
        }

        
        if (this.subTotal <= 0 || this.subTotal == undefined){
            respuesta.esValido = false
            respuesta.mensaje = 'No se pudo calcular el subtotal'
            return respuesta
        }

        
        if (this.impuesto <= 0 || this.impuesto == undefined){
            respuesta.esValido = false
            respuesta.mensaje = 'No se pudo calcular el impuesto'
            return respuesta
        }

        
        if (this.total <= 0 || this.total == undefined){
            respuesta.esValido = false
            respuesta.mensaje = 'No se pudo calcular el total'
            return respuesta
        }

        respuesta.esValido = true
        return respuesta
    }

    
}