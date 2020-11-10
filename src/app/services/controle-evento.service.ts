import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable  } from 'rxjs';
import { retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})


export class ControleEventoService {

  dataAtual = new Date();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(
    private _httpClient: HttpClient
  ) { }
  private url = "http://localhost:3000/eventos";

  getAllEventos(): Observable<any[]> {
    return this._httpClient.get<any[]>(this.url);
  }

  getByIdEvento(id): Observable<any> {
    return this._httpClient.get<any>(this.url + '/' + id);
  }


  updateEvento(res): Observable<any> {

    return this._httpClient.patch(this.url + '/' +res.id , {

    "vagas": res.vagas,
    })
  }

  public getEvento(item) {
    let data_evento = item.data_evento.split('/')
    data_evento = new Date(data_evento[2], data_evento[1] - 1, data_evento[0]);
    let tipo_evento = 0;
    if (item.vagas>0 && data_evento > this.dataAtual) {
      tipo_evento = 1;
    } else if ((item.vagas <= 0||!item.vagas) && data_evento > this.dataAtual) {
      tipo_evento = 2;
    } else {
      tipo_evento = 3;
    }
    let evento = {
      id: item.id,
      titulo: item.titulo,
      descricao: item.descricao,
      data_evento: data_evento,
      vagas: item.vagas,
      tipoEvento: tipo_evento
    }
    return evento;
  }

}
