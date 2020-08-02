import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { AgregarClienteComponent } from './agregar-cliente/agregar-cliente.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { PreciosComponent } from './precios/precios.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
import { ListadoInscripcionesComponent } from './listado-inscripciones/listado-inscripciones.component';

const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'inscripcion'},
  { path: 'inscripcion', component: InscripcionComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'listado-clientes', component: ListadoClientesComponent, canActivate: [AngularFireAuthGuard]  },
  {path: 'agregar-cliente', component: AgregarClienteComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'agregar-cliente/:clienteID', component: AgregarClienteComponent, canActivate: [AngularFireAuthGuard] },
  {path: 'precios', component: PreciosComponent, canActivate: [AngularFireAuthGuard] },
  {path: 'listado-inscripciones', component: ListadoInscripcionesComponent, canActivate: [AngularFireAuthGuard] }
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }