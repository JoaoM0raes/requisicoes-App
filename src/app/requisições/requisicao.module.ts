import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequisicaoRoutingModule } from './requisicao-routing.module';
import { RequisicaoComponent } from './requisicao.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatTabsModule} from '@angular/material/tabs';
import { RequisicaoFuncionarioComponent } from './requisicao/requisicao-funcionario.component';
import { RequisicaoDepartamentoComponent } from './requisicao-departamentos/requisicao-departamento.component';



@NgModule({
  declarations: [
    RequisicaoComponent,
    RequisicaoFuncionarioComponent,
    RequisicaoDepartamentoComponent
  ],
  imports: [
    CommonModule,
    RequisicaoRoutingModule,
    ReactiveFormsModule,
     NgSelectModule,
     MatTabsModule,

  ]
})
export class RequisicaoModule { }
