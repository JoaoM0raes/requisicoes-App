import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import  firebase from "firebase/compat/app"
import { AuthenticationService } from '../auth/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navibar',
  templateUrl: './navibar.component.html',
  styleUrls: ['./navibar.component.css']
})
export class NavibarComponent implements OnInit {
  public UsuarioLogado:Observable<firebase.User | null>
  constructor(private authService:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
    this.UsuarioLogado=this.authService.usuarioLogado
  }

  public sair(){
    this.authService.deslogar()
    .then(()=>this.router.navigate(["/login"]))
  }


}
