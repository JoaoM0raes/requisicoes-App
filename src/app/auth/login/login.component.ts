
import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form:FormGroup;
  public formRecuperacao:FormGroup
  constructor(private formBuilder:FormBuilder,private authService:AuthenticationService,private router:Router,private modalService:NgbModal) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      email:new FormControl(""),
      senha:new FormControl("")
    })
    this.formRecuperacao=this.formBuilder.group({
      emailRecuperacao:new FormControl("")
    })
  }

  get Email() :AbstractControl | null{
   return this.form.get("email")
  }
  get Senha():AbstractControl | null{
    return  this.form.get("senha")
  }
  get EmailRecuperacao():AbstractControl | null{
    return this.formRecuperacao.get("emailRecuperacao")
  }
  public async login(){
     const email:string  = this.Email?.value
     const senha:string = this.Senha?.value

       try{
         const resposta =await this.authService.login(email,senha)

         if (resposta.user)
         this.router.navigate(["/painel"])
       }
       catch (error){

       }
  }

  public async abrirModal(modal:TemplateRef<any>){
     this.modalService.open(modal)
        .result
        .then(resultado=>{
           if(resultado==="enviar"){
              this.authService.resetEmail(this.EmailRecuperacao?.value)
           }
        })
        .catch(()=>{
          this.formRecuperacao.get("emailRecuperacao")?.reset()
        })

  }
}
