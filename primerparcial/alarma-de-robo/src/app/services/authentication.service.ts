import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(
  	private afAuth: AngularFireAuth
  ) { }

  //registrar un nuevo usuario en el servicio de autenticación de Firebase
  registerUser(value) {
    return new Promise<any>((resolve, reject) => {

      this.afAuth.createUserWithEmailAndPassword(value.email.trim(), value.password)
        .then(
          res => resolve(res),
          err => reject(err))
        //console.log("llego?");
    })

  }
  //Para iniciar sesión en un usuario
  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(value.email.trim(), value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }
  //elimina la sesión del usuario en el servicio Firebase Authentication
  logoutUser() {
    return new Promise((resolve, reject) => {
      if (this.afAuth.currentUser) {
        this.afAuth.signOut()
          .then(() => {
            console.log("LOG Out");
            resolve();
          }).catch((error) => {
            reject();
          });
      }
    })
  }
  //método que devuelve los detalles del usuario que inició sesión
  userDetails() {
    return this.afAuth.user
  }
}
