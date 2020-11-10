import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ControleEventoComponent } from './controle-evento/controle-evento.component';
import {HttpClientModule} from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/pt';
import { InscricaoParticipanteComponent } from './inscricao-participante/inscricao-participante.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { ModalModule } from 'ngx-bootstrap/modal';

import * as $ from 'jquery';

registerLocaleData(localeBr, 'pt');


@NgModule({
  declarations: [
    AppComponent,
    ControleEventoComponent,
    InscricaoParticipanteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    TextMaskModule
    ,ModalModule.forRoot()
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
