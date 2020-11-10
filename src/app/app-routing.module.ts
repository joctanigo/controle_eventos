import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ControleEventoComponent } from './controle-evento/controle-evento.component';
import { InscricaoParticipanteComponent } from './inscricao-participante/inscricao-participante.component';


const routes: Routes = [
  {
    path:"",redirectTo:"eventos",pathMatch:"full"
  },
  {
    path:"eventos", component: ControleEventoComponent
  },
  {
    path:"inscricao",
    children: [
      { path: '', component: InscricaoParticipanteComponent },
      { path: ':id', component: InscricaoParticipanteComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
