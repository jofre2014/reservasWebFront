import { Component, OnInit } from '@angular/core';
import { ComponenteBaseComponent } from '../modal/componente.base.component';
import { ModalService } from 'src/app/services/service.index';
import { Person } from 'src/app/models/person.model';

declare var $: any

@Component({
  selector: 'app-ejemplo-modal',
  templateUrl: './ejemplo-modal.component.html',
  styles: []
})
export class EjemploModalComponent implements ComponenteBaseComponent, OnInit {
  
  data: any;

  constructor( public _ms: ModalService) {
    
  }

  ngOnInit() {    
    $('#ventana').modal('show');
  }

  cerrarModal(){ 
    
    const per: Person={
      id:200,
      nombre: 'Juan',
      apellido: 'Castro'
    };
    
    this._ms.sendRespuesta( per );
    $('#ventana').modal('hide');    
  }

}
