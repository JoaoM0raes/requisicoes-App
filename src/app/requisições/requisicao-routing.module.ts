import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequisicaoDepartamentoComponent } from './requisicao-departamentos/requisicao-departamento.component';
import { RequisicaoComponent } from './requisicao.component';
import { RequisicaoFuncionarioComponent } from './requisicao/requisicao-funcionario.component';

const routes: Routes = [{
  path:"", component:RequisicaoComponent,
  children: [
    { path: '', redirectTo: 'funcionario', pathMatch: 'full' },
    { path: 'funcionario', component: RequisicaoFuncionarioComponent },
    { path: 'departamento', component: RequisicaoDepartamentoComponent  }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequisicaoRoutingModule { }
