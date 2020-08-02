import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formularioLogin: FormGroup
  datosCorrectos: boolean = false
  textoError: String

  constructor(private creadorFormulario: FormBuilder,
    private auth: AngularFireAuth,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.formularioLogin = this.creadorFormulario.group({
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      password: ['', Validators.required]
    })
  }

  ingresar(){
    if(this.formularioLogin.valid){
      this.datosCorrectos = false
       this.spinner.show()
      this.auth.signInWithEmailAndPassword(this.formularioLogin.value.email, this.formularioLogin.value.password)
      .then((usuario) => {
        console.log(usuario)
        this.spinner.hide()
    }).catch((error)=>{
      this.datosCorrectos = true
      this.textoError = error.message
      this.spinner.hide()
    })
    }
    else {
      this.datosCorrectos = true
      this.textoError = 'Revisa que tus datos sean correctos'
    }
    
  }

}
