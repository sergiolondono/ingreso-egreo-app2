import { Injectable } from '@angular/core';

import 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import * as authActions from '../auth/auth.actions';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';

import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription!: Subscription;
  private _usuario!: Usuario | null;

  get usuario() {
    return {...this._usuario};
  }

  constructor(private auth: AngularFireAuth,
              private firestore: AngularFirestore,
              private store: Store<AppState>) { }

  initAuthListener(){
    this.auth.authState.subscribe(fUser => {
      if(fUser)
      {
        this.userSubscription = this.firestore.doc(`${fUser!.uid}/usuario`).valueChanges()
          .subscribe((fireStoreUser:any) => {

          const user = Usuario.fromFirebase(fireStoreUser);
          this._usuario = user;
          this.store.dispatch(authActions.setUser({ user }));
         
        });
      } else{
        this._usuario = null;
        this.userSubscription?.unsubscribe();
        this.store.dispatch(authActions.unSetUser());
        this.store.dispatch(ingresoEgresoActions.unSetItems());
      }
    });
  }

  crearUsuario(nombre: string, correo: string, password: string){

    return this.auth.createUserWithEmailAndPassword(correo, password)
      .then( ({ user }) => {
        const newUser = new Usuario(user!.uid, nombre, user!.email!);

        return this.firestore.doc(`${user!.uid}/usuario`)
          .set({ ...newUser });
      });   
  }

  loginUsuario(correo: string, password: string) {
    return this.auth.signInWithEmailAndPassword(correo, password);   
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fbUser => fbUser != null)
    );
  }

}
