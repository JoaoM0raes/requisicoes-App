import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import  firebase from "firebase/compat/app"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public usuarioLogado:Observable<firebase.User | null>

  constructor(private auth:AngularFireAuth) {
      this.usuarioLogado=auth.authState
   }

   public login(email:string,senha:string):Promise<firebase.auth.UserCredential>{
      return this.auth.signInWithEmailAndPassword(email,senha)
   }
   public resetEmail(email:string):Promise<void>{
      return this.auth.sendPasswordResetEmail(email)
   }
   public deslogar():Promise<void>{
       return this.auth.signOut();
   }
   public cadastrar(email: string, senha: string): Promise<firebase.auth.UserCredential>{
    return this.auth.createUserWithEmailAndPassword(email, senha);
  }
}
