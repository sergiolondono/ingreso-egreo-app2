import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  crearUsuario(nombre: string, correo: string, password: string){
    console.log(correo, password);
    return this.auth.createUserWithEmailAndPassword(correo, password);
    
  }

}
