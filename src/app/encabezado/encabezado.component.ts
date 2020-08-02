import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html'
})
export class EncabezadoComponent implements OnInit {
  router: any;

  constructor(private auth: AngularFireAuth) { }

  ngOnInit(): void {
    
  }

  logout() {
    this.auth.signOut();
  }

}
