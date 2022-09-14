import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder ,FormControl, FormGroup } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { Departamento } from 'src/app/departamentos/modules/departamento.model';
import { DepartamentoService } from 'src/app/departamentos/services/departamento.service';
import { equipamento } from 'src/app/equipamentos/modules/equipamento.module';
import { EquipamentoService } from 'src/app/equipamentos/services/equipamento.service';
import { Funcionario } from 'src/app/funcionarios/models/funcionario.model';
import { FuncionarioService } from 'src/app/funcionarios/services/funcionario.service';
import { requisiscao } from '../models/requisicao';
import { RequisicaoService } from '../services/requisicao.service';

@Component({
  selector: 'app-requisicao-departamento',
  templateUrl: './requisicao-departamento.component.html',
  styleUrls: ['./requisicao-departamento.component.css']
})
export class RequisicaoDepartamentoComponent implements OnInit {

  public funcionarios$:Observable<Funcionario[]>
  public departamentos$:Observable<Departamento[]>
  public requisicoes$:Observable<requisiscao[]>
  public equipamentos$:Observable<equipamento[]>
  public processoAutenticado$: Subscription;

  public funcionarioLogadoId:string

  public form:FormGroup


  constructor(private FormBuilder:FormBuilder,private serviceFuncionario:FuncionarioService,private serviceDepartamaneto:DepartamentoService,private serviceRequisicao:RequisicaoService,private serviceEquipamento:EquipamentoService,private modalService:NgbModal,private authService: AuthenticationService)
   {

   }

  ngOnInit(): void {
     this.funcionarios$=this.serviceFuncionario.selecionarTodos();
     this.departamentos$=this.serviceDepartamaneto.selecionarTodos();
     this.equipamentos$=this.serviceEquipamento.selecionarTodos();

     this.authService.usuarioLogado.subscribe(usuario => {
      const email = usuario?.email!;

      this.processoAutenticado$ = this.serviceFuncionario.selecionarFuncionarioLogado(email)
      .subscribe(funcionario => {
        this.funcionarioLogadoId = funcionario.id
        this.requisicoes$ = this.serviceRequisicao.selecionarRequisicoesDepartamento(this.funcionarioLogadoId);
      });
    })

    this.form=this.FormBuilder.group({
      id:new FormControl(""),
      descricao:new FormControl(""),
      departamentoId:new FormControl(""),
      departamento:new FormControl(""),
      funcionarioId:new FormControl(""),
      funcionario:new FormControl(""),
      equipamentoId:new FormControl(""),
      equipamento:new FormControl(""),
      data:new FormControl("")
    })
  }
  public async abrirModal(modal:TemplateRef<any>,requisicao?:requisiscao){
    this.form.reset();

    this.form.get('data')?.setValue(new Date());

    this.form.get('funcionarioId')?.setValue(this.funcionarioLogadoId);


    if(requisicao)
      this.form.setValue(requisicao);

    try{
       await this.modalService.open(modal).result

       if(!requisicao){
        console.log(this.form.value)
         await this.serviceRequisicao.inserir(this.form.value);
       }
       else{
         await this.serviceRequisicao.editar(this.form.value)
       }

    }
    catch(error){

    }
  }
  public excluir(registro:requisiscao){
    this.serviceRequisicao.excluir(registro);
  }
}


