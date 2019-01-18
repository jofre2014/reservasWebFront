import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WellcomeComponent } from './wellcome/wellcome.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonsComponent } from './persons/persons.component';
import { RouterModule } from '@angular/router';
import { ReservaComponent } from './reserva/reserva.component';

import { MaterialModule } from '../material/material.module';

import { FormModalComponent } from './reserva/form-modal.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
	declarations: [ WellcomeComponent, PersonsComponent, ReservaComponent, FormModalComponent ],
	exports: [ WellcomeComponent, PersonsComponent, ReservaComponent, FormModalComponent ],
	imports: [
		NgbModule.forRoot(),
		CommonModule,
		SharedModule,
		PAGES_ROUTES,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule
	],
	entryComponents: [ FormModalComponent ]
})
export class PagesModule {}
