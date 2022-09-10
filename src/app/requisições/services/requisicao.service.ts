import { Injectable } from '@angular/core';
import { requisiscao } from '../models/requisicao';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable, take } from 'rxjs';
import { Departamento } from 'src/app/departamentos/modules/departamento.model';
import { equipamento } from 'src/app/equipamentos/modules/equipamento.module';
import { Funcionario } from 'src/app/funcionarios/models/funcionario.model';

@Injectable({
  providedIn: 'root'
})
export class RequisicaoService {

  public registros:AngularFirestoreCollection<requisiscao>

  constructor(private firestore:AngularFirestore) {
    this.registros=firestore.collection<requisiscao>("requisicoes")
  }
  public selecionarTodos():Observable<requisiscao[]>{
    return this.registros.valueChanges()
    .pipe(
     map((requisicoes:requisiscao[])=>{
      requisicoes.forEach(requisicao =>{
              this.firestore
              .collection<Departamento>("departamentos")
              .doc(requisicao.departamentoId)
              .valueChanges()
              .subscribe(x => requisicao.departamento=x)
          })
      requisicoes.forEach(requisicao =>{
            this.firestore
            .collection<equipamento>("equipamentos")
            .doc(requisicao.equipamentoId)
            .valueChanges()
            .subscribe(x => requisicao.equipamento=x)
        })

        requisicoes.forEach(requisicao =>{
          this.firestore
          .collection<Funcionario>("funcionarios")
          .doc(requisicao.funcionarioId)
          .valueChanges()
          .subscribe(x => requisicao.funcionario=x)
      })

          return requisicoes
     }),

    )

 }

  public async editar(registro:requisiscao):Promise<void>{
    return this.registros.doc(registro.id).set(registro)
  }
  public async inserir(registro:requisiscao):Promise<any>{
    if(!registro){
       return Promise.reject("item Invalido")
    }
     this.registros.add(registro).then((res)=>{
      registro.id=res.id

     this.registros.doc(res.id).set(registro)
     })
   }

   public excluir(registro:requisiscao){
         this.registros.doc(registro.id).delete();
   }
   public selecionarRequisicoesFuncionario(id: string){
    return this.selecionarTodos()
    .pipe(
      map(requisicoes => {
        return requisicoes.filter(req => req.funcionarioId === id)
      })
    )
  }

}
