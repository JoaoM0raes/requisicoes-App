import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Departamento } from '../modules/departamendo.module';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
    registros:AngularFirestoreCollection<Departamento>
  constructor(private firestore:AngularFirestore) {
     this.registros=firestore.collection<Departamento>("departamentos")
   }

   public async inserir(registro:Departamento):Promise<any>{
    if(!registro){
       return Promise.reject("item Invalido")
    }
    const res =await this.registros.add(registro)

    registro.id=res.id

    this.registros.doc(res.id).set(registro)
   }
   public async editar(registro:Departamento):Promise<void>{
       return this.registros.doc(registro.id).set(registro)
   }
   public selecionarTodos():Observable<Departamento[]>{
      return this.registros.valueChanges();
   }
   public excluir(departamendo:Departamento):Promise<void>{
      return this.registros.doc(departamendo.id).delete()
   }
}
