import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/service.index';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styles: []
})
export class PersonsComponent implements OnInit {

  personas: Person[] = [];
  

  constructor( public _ps: PersonService ) { }

  ngOnInit() {
    this._ps.getListaPerson$().subscribe( ( resp: any) => this.personas = resp);        
  }

}
