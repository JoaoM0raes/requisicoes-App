import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {AngularFireModule} from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import {AngularFireAuthModule} from '@angular/fire/compat/auth'
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { LoginComponent } from './auth/login/login.component'
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './auth/services/authentication.service';
import { PainelComponent } from './painel/painel.component';
import { NavibarComponent } from './navibar/navibar.component';
import { MovimentacaoComponent } from './requisições/movimentacoes/movimentacao.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PainelComponent,
    NavibarComponent,
    MovimentacaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
