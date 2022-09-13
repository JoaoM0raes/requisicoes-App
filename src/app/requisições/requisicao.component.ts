import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



import { Observable, Subscription } from 'rxjs';
import { AuthenticationService } from '../auth/services/authentication.service';
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
  navLinks: any[];

  constructor(){
    this.navLinks = [
      {
          label: 'Minhas Requisicoes',
          link: '/requisicoes/funcionario',
          index: 0
      }, {
          label: 'Requisicoes Departamento',
          link: '/requisicoes/departamento',
          index: 1
      }
  ];
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }







}
