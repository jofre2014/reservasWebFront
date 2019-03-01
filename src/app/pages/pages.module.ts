import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WellcomeComponent } from './wellcome/wellcome.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonsComponent } from './persons/persons.component';
import { RouterModule } from '@angular/router';
import { ReservaComponent } from './reserva/crearReserva/reserva.component';

import { MaterialModule } from '../material/material.module';

import { FormModalComponent } from './reserva/modalReserva/form-modal.component';

import { AdministrarReservaComponent } from './reserva/administrarReserva/administrar-reserva.component';
import { EditarReservaComponent } from './reserva/editarReserva/editar-reserva.component';

import { DatePipe } from '@angular/common';
import { ErrorsComponent } from './errores/errors.component';

@NgModule({
	declarations: [
		WellcomeComponent,
		PersonsComponent,
		ReservaComponent,
		FormModalComponent,
		AdministrarReservaComponent,
		EditarReservaComponent,
		ErrorsComponent
	],
	exports: [ WellcomeComponent, PersonsComponent, ReservaComponent, FormModalComponent ],
	imports: [ CommonModule, SharedModule, PAGES_ROUTES, FormsModule, ReactiveFormsModule, MaterialModule ],
	entryComponents: [ FormModalComponent ],
	providers: [ DatePipe ]
})
export class PagesModule {}
