import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonService, ModalService } from 'src/app/services/service.index';
import { Person } from 'src/app/models/person.model';
import { Subscription } from 'rxjs';
import { EjemploModalComponent } from 'src/app/shared/ejemplo-modal/ejemplo-modal.component';
import { ComponenteItem } from 'src/app/shared/modal/componente-item';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styles: []
})
export class PersonsComponent implements OnInit, OnDestroy {

  personas: Person[] = [];
  subscription: Subscription;  

  constructor(  public _ps: PersonService,
                public _ms: ModalService ) { }

  ngOnInit() {

    this._ps.getListaPerson$().subscribe( ( resp: any) => this.personas = resp);   
    
    //=============== Me subscribo a la respuesta del modal ==============
    this.subscription = this._ms.
        getRespuesta().
        subscribe( ( respuesta: Person ) => {
          this.personas.push( respuesta );
        });
    //=============== Fin Subscripcion a la respuesta modal ===============

  }

  //========Llamado Modal============= 
  cargarModal(){
    this._ms.sendComponent(  new ComponenteItem( EjemploModalComponent, 
                                                 {nombre: 'Juan', apellido: 'Gomez'} ) );   
  }
  //========Fin llamado Modal=========

  ngOnDestroy(): void {
     if( this.subscription ){ this.subscription.unsubscribe();}
  }
}
