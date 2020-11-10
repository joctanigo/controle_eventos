import { Component, OnInit, Injector, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GenericValidator } from '../services/validator.service';
import { ActivatedRoute } from '@angular/router';
import { ControleEventoService } from '../services/controle-evento.service';
import { jsPDF } from 'jspdf';
import * as $ from 'jquery';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-inscricao-participante',
  templateUrl: './inscricao-participante.component.html',
  styleUrls: ['./inscricao-participante.component.css']
})
export class InscricaoParticipanteComponent implements OnInit {

  protected route: ActivatedRoute;
  modalRef: BsModalRef;
  constructor(
    private formBuilder: FormBuilder,
    protected injector: Injector,
    // tslint:disable-next-line: variable-name
    private _controleEventoService: ControleEventoService,
    private modalService: BsModalService
  ) {
    this.route = this.injector.get(ActivatedRoute);
  }

  inscricaoForm: FormGroup;
  evento: any;

  @ViewChild('content', { static: false }) content: ElementRef;

  public myModel = ' ';
  public maskCpf = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  public maskTelefone = ['(', /[1-9]/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  ngOnInit() {
    this.buildForm();
    this._controleEventoService.getByIdEvento(this.route.snapshot.url[0].path).subscribe(res => {
      this.evento = this._controleEventoService.getEvento(res);
  
    });
  }

  protected buildForm() {
    this.inscricaoForm = this.formBuilder.group({
      nome: [null, Validators.compose([Validators.required, Validators.maxLength(150)])],
      cpf: [null, Validators.compose([Validators.required, GenericValidator.isValidCpf()])],
      telefone: [null, Validators.required],
      email: [null, Validators.required],
      foto: [null, Validators.required],
    });
  }

  onSubmit(template) {
    // aqui você pode implementar a logica para fazer seu formulário salvar
    this.evento.vagas = this.evento.vagas - 1;
    this._controleEventoService.updateEvento(this.evento).subscribe(res => {

      this.openModal(template);
    });
  }

  public checaCPF() {

  this.unMaskCpf();

  $('#erroCpfinvalido').html('');

  if (this.inscricaoForm.get('cpf').getError('cpfNotValid') ||
      this.inscricaoForm.get('cpf').value == null ||
      this.inscricaoForm.get('cpf').value.length < 11) {
      this.inscricaoForm.patchValue({
        cpf: null
      });
      
      $('#cpf').val('');
      $('#erroCpfinvalido').html('Favor insira um CPF valido');
    }
  }

  onUploadChange(evt: any) {
    const file = evt.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(e) {
    this.inscricaoForm.patchValue({
      foto: 'data:image/png;base64,' + btoa(e.target.result)
    });
  }

   downloadPDF() {
    const doc = new jsPDF();
    var cpf = this.inscricaoForm.get('cpf').value;
    var cpfMask = cpf.substr(0,3)+'.'+cpf.substr(3,3)+'.'+cpf.substr(6,3)+'-'+cpf.substr(9)
   
    doc.setFontSize(20);
    doc.text('Comprovante inscrição', 80, 25 );
    doc.addImage(this.inscricaoForm.get('foto').value, 'JPEG', 15, 35, 40, 40);
    doc.setFontSize(15);

    doc.text('Participante: ' + this.inscricaoForm.get('nome').value , 65, 40 );
    doc.text('Email: ' + this.inscricaoForm.get('email').value , 65, 48 );
    doc.text('Telefone:' + this.inscricaoForm.get('telefone').value , 65, 56 );
    doc.text('CPF :' + cpfMask , 65, 64 );
    doc.text('Evento :' + this.evento.titulo , 65, 72 );
    doc.text('Data do evento :' + this.evento.data_evento.toLocaleDateString() , 130, 72 );
    doc.text('Nº de inscrição: ' + this.evento.vagas, 65, 80 );

    doc.save('Test.pdf');
    this.inscricaoForm.reset();
    this.modalRef.hide();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  private unMaskCpf() {
    let cpf = '';
    let temp = this.myModel.split('.');
    cpf = temp.join('');
    temp = cpf.split('-');
    cpf = temp.join('');

    this.inscricaoForm.patchValue({
      cpf
    });
  }

}
