import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mastergym';

  usuario:User;

  cargando: boolean = true

  constructor(private auth: AngularFireAuth) {

    this.auth.user.subscribe(usuario => {
      setTimeout(()=> {
        this.cargando = false
        this.usuario = usuario
      }, 1000)
    })
  }
  login() {
    this.auth.signInWithEmailAndPassword('jesus@gym.com', 'mastergym')
  }
  logout() {
    this.auth.signOut();
  }
}
