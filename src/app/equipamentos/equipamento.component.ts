import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs';
import { equipamento } from './modules/equipamento.module';
import { EquipamentoService } from './services/equipamento.service';

@Component({
  selector: 'app-equipamento',
  templateUrl: './equipamento.component.html',
  styleUrls: ['./equipamento.component.css']
})
export class EquipamentoComponent implements OnInit {

  public equipamento$:Observable<equipamento[]>
  public form:FormGroup


  constructor(private formBuilder:FormBuilder,private modalService:NgbModal,private service:EquipamentoService) {

   }

   get Nome(){
       return this.form.get("nome")
   }
   get Serie(){
    return this.form.get("serie")
   }
   get Data(){
    return this.form.get("data")
   }
   get Preco(){
    return this.form.get("preço")
   }

  ngOnInit(): void {
      this.equipamento$=this.service.selecionarTodos();

    this.form=this.formBuilder.group({
      id:new FormControl(""),
      nome:new FormControl(""),
      serie:new FormControl(""),
      data:new FormControl(""),
      preço:new FormControl("")
    })
  }
  public async abrirModal(modal:TemplateRef<any>,equipamento?:equipamento){
    this.form.reset();

    if(equipamento)
      this.form.setValue(equipamento);

    try{
       await this.modalService.open(modal).result

       if(!equipamento){
         await this.service.inserir(this.form.value);
       }
       else{
         await this.service.editar(this.form.value)
       }

    }
    catch(error){

    }
  }
  public excluir(registro:equipamento){
    this.service.excluir(registro);
  }
}
