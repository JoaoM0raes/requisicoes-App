import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Departamento } from './modules/departamento.model';
import { DepartamentoService } from './services/departamento.service';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {

  public departamento$:Observable<Departamento[]>
  public form:FormGroup;

  constructor(private departamentoService:DepartamentoService,private formBuilder:FormBuilder,private modalService:NgbModal) { }

  ngOnInit(): void {
    this.departamento$=this.departamentoService.selecionarTodos();

    this.form=this.formBuilder.group({
      id:new FormControl(""),
      nome:new FormControl(""),
      telefone:new FormControl("")
    })

  }
  get Nome():AbstractControl | null{
     return this.form.get("nome")
  }
  get Telefone():AbstractControl | null{
    return this.form.get("telefone")
  }

  public async abrirModal(modal:TemplateRef<any>,departamendo?:Departamento){

       this.form.reset();

       if(departamendo)
         this.form.setValue(departamendo);

       try{
          await this.modalService.open(modal).result

          if(!departamendo){
            await this.departamentoService.inserir(this.form.value);
          }
          else{
            await this.departamentoService.editar(this.form.value)
          }

       }
       catch(error){

       }

  }
  public excluir(departamendo:Departamento){
   this.departamentoService.excluir(departamendo);
  }
}
