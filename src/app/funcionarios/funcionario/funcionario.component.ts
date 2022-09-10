import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
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
  constructor( private fb:FormBuilder, private service:FuncionarioService,private depatamentoService:DepartamentoService,private modalService:NgbModal,private auth:AuthenticationService) {

   }

  ngOnInit(): void {
    this.funcionarios$=this.service.selecionarTodos();
    this.departamentos$=this.depatamentoService.selecionarTodos();

    this.form=this.fb.group({
      funcionario:new FormGroup({
        id:new FormControl(""),
        nome:new FormControl(""),
        email:new FormControl(""),
        funcao:new FormControl(""),
        departamentoId:new FormControl(""),
        departamento:new FormControl("")
      }),
      senha:new FormControl("")
    })
  }

  get Id(){
    return this.form.get("funcionario.id")
  }
  get Nome(){
       return this.form.get("funcionario.nome")
   }
   get Email(){
    return this.form.get("funcionario.email")
   }
   get Funcao(){
    return this.form.get("funcionario.funcao")
   }
   get Departamento(){
    return this.form.get("funcionario.departamento")
   }
   get Senha(){
     return this.form.get("senha")
   }
  public async abrirModal(modal:TemplateRef<any>,funcionario?:Funcionario){
    this.form.reset();

    if(funcionario){
      const departamento = funcionario.Departamento?funcionario.Departamento: null;
      const funcionarioCompleto = {
        ...funcionario,
        departamento
      }

      this.form.get('funcionario')?.setValue(funcionarioCompleto);
    }


    try{
       await this.modalService.open(modal).result

       if(!funcionario){
         await this.service.inserir(this.form.get('funcionario')?.value);
         await this.auth.cadastrar(this.Email?.value,this.Senha?.value);
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
