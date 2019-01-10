import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WellcomeComponent } from './wellcome/wellcome.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonsComponent } from './persons/persons.component';
import { RouterModule } from '@angular/router';
import { ReservaComponent } from './reserva/reserva.component';

@NgModule({
  declarations: [WellcomeComponent, PersonsComponent, ReservaComponent],
  exports:[ WellcomeComponent, PersonsComponent, ReservaComponent ],
  imports: [
    CommonModule,    
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ReactiveFormsModule 
  ]  
})
export class PagesModule { }
