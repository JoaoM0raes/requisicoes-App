import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { FuncionarioComponent } from './funcionario/funcionario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    FuncionarioComponent
  ],
  imports: [
    CommonModule,
    FuncionarioRoutingModule,
     ReactiveFormsModule,
     NgSelectModule
  ]
})
export class FuncionarioModule { }
