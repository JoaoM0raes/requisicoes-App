import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { Observable } from 'rxjs';
import { Departamento } from 'src/app/departamentos/modules/departamento.model';

import { DepartamentoService } from 'src/app/departamentos/services/departamento.service';
import { Funcionario } from '../models/funcionario.model';
import { FuncionarioService } from '../services/funcionario.service';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {

   public funcionarios$:Observable<Funcionario[]>
   public departamentos$:Observable<Departamento[]>
   public form:FormGroup
  constructor( private fb:FormBuilder, private service:FuncionarioService,private depatamentoService:DepartamentoService,private modalService:NgbModal) {

   }

  ngOnInit(): void {
    this.funcionarios$=this.service.selecionarTodos();
    this.departamentos$=this.depatamentoService.selecionarTodos();

    this.form=this.fb.group({
      id:new FormControl(""),
      nome:new FormControl(""),
      email:new FormControl(""),
      funcao:new FormControl(""),
      departamentoId:new FormControl(""),
      departamento:new FormControl("")

    })
  }
  get Nome(){
       return this.form.get("nome")
   }
   get Email(){
    return this.form.get("email")
   }
   get Funcao(){
    return this.form.get("funcao")
   }
   get Departamento(){
    return this.form.get("departamento")
   }
  public async abrirModal(modal:TemplateRef<any>,equipamento?:Funcionario){
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
  public excluir(registro:Funcionario){
    this.service.excluir(registro);
  }

}
