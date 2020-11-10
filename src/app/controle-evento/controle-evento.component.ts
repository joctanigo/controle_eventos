import { ControleEventoService } from '../services/controle-evento.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-controle-evento',
  templateUrl: './controle-evento.component.html',
  styleUrls: ['./controle-evento.component.css']
})
export class ControleEventoComponent implements OnInit {

  constructor(
    private _controleEventoService: ControleEventoService
  ) { }

  resEventos: Array<any> = [];


  ngOnInit() {

    this._controleEventoService.getAllEventos().subscribe(res => {
      this.resEventos = res.map(item => {
        return this._controleEventoService.getEvento(item);
      });
    })
  }


}
