import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Departamento } from 'src/app/departamentos/modules/departamento.model';

import { Funcionario } from '../models/funcionario.model';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  registros:AngularFirestoreCollection<Funcionario>
  constructor(private firestore:AngularFirestore) {
    this.registros=firestore.collection<Funcionario>("funcionarios")
  }


  public selecionarTodos():Observable<Funcionario[]>{
     return this.registros.valueChanges()
     .pipe(
      map((funcionarios:Funcionario[])=>{
           funcionarios.forEach(funcionario =>{
               this.firestore
               .collection<Departamento>("departamentos")
               .doc(funcionario.departamentoId)
               .valueChanges()
               .subscribe(x => funcionario.Departamento=x)
           })
           return funcionarios
      })
     )

  }
  public async editar(registro:Funcionario):Promise<void>{
    return this.registros.doc(registro.id).set(registro)
  }
  public async inserir(registro:Funcionario):Promise<any>{
    if(!registro){
       return Promise.reject("item Invalido")
    }
     this.registros.add(registro).then((res)=>{
      registro.id=res.id

     this.registros.doc(res.id).set(registro)
     })
   }

   public excluir(registro:Funcionario){
         this.registros.doc(registro.id).delete();
   }
}
