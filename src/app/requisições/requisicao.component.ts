import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



import { Observable } from 'rxjs';
import { Departamento } from '../departamentos/modules/departamento.model';
import { DepartamentoService } from '../departamentos/services/departamento.service';
import { equipamento } from '../equipamentos/modules/equipamento.module';
import { EquipamentoService } from '../equipamentos/services/equipamento.service';
import { Funcionario } from '../funcionarios/models/funcionario.model';
import { FuncionarioService } from '../funcionarios/services/funcionario.service';
import { requisiscao } from './models/requisicao';
import { RequisicaoService } from './services/requisicao.service';

@Component({
  selector: 'app-requisicao',
  templateUrl: './requisicao.component.html',
  styleUrls: ['./requisicao.component.css']
})
export class RequisicaoComponent implements OnInit {

  public funcionarios$:Observable<Funcionario[]>
  public departamentos$:Observable<Departamento[]>
  public requisicoes$:Observable<requisiscao[]>
  public equipamentos$:Observable<equipamento[]>

  public form:FormGroup


  constructor(private FormBuilder:FormBuilder,private serviceFuncionario:FuncionarioService,private serviceDepartamaneto:DepartamentoService,private serviceRequisicao:RequisicaoService,private serviceEquipamento:EquipamentoService,private modalService:NgbModal)
   {

   }

  ngOnInit(): void {
     this.funcionarios$=this.serviceFuncionario.selecionarTodos();
     this.departamentos$=this.serviceDepartamaneto.selecionarTodos();
     this.requisicoes$=this.serviceRequisicao.selecionarTodos();
     this.equipamentos$=this.serviceEquipamento.selecionarTodos();

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

    if(requisicao)
      this.form.setValue(requisicao);

    try{
       await this.modalService.open(modal).result
       if(!requisicao){
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
  public ArrumarData(){
    var data = new Date();

    var dia = data.getDay();

    var mes =data.getMonth();
    var ano =data.getFullYear();

    var dataHoje:string=`${dia+4}/${mes+1}/${ano}`
    console.log(dataHoje)
    this.form.get("data")?.setValue(dataHoje)
  }


}
