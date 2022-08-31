import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { equipamento } from '../modules/equipamento.module';

@Injectable({
  providedIn: 'root'
})
export class EquipamentoService {
  registros:AngularFirestoreCollection<equipamento>
  constructor(private firestore:AngularFirestore) {
    this.registros=firestore.collection<equipamento>("equipamentos")
  }


  public selecionarTodos():Observable<equipamento[]>{
     return this.registros.valueChanges();
  }
  public async editar(registro:equipamento):Promise<void>{
    return this.registros.doc(registro.id).set(registro)
  }
  public async inserir(registro:equipamento):Promise<any>{
    if(!registro){
       return Promise.reject("item Invalido")
    }
     this.registros.add(registro).then((res)=>{
      registro.id=res.id

     this.registros.doc(res.id).set(registro)
     })
   }

   public excluir(equipamento:equipamento){
         this.registros.doc(equipamento.id).delete();
   }
}
