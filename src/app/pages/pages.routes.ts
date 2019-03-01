import { Routes, RouterModule, CanActivate } from '@angular/router';
import { PagesComponent } from './pages.component';
import { LoginGuardGuard } from '../services/service.index';
import { WellcomeComponent } from './wellcome/wellcome.component';
import { PersonsComponent } from './persons/persons.component';
import { ReservaComponent } from './reserva/crearReserva/reserva.component';

import { FormModalComponent } from './reserva/modalReserva/form-modal.component';
import { AdministrarReservaComponent } from './reserva/administrarReserva/administrar-reserva.component';
import { EditarReservaComponent } from './reserva/editarReserva/editar-reserva.component';
import { ErrorsComponent } from './errores/errors.component';

const pagesRoutes: Routes = [
	{
		path: '',
		component: PagesComponent,
		canActivate: [ LoginGuardGuard ],
		children: [
			{ path: 'wellcome', component: WellcomeComponent },
			{ path: 'personas', component: PersonsComponent },
			{ path: 'reservas', component: ReservaComponent },
			{ path: 'reservas/:accion/:idReserva', component: ReservaComponent },
			{ path: 'reservas/formModal', component: FormModalComponent },
			{ path: 'administrarReserva', component: AdministrarReservaComponent },
			{ path: 'administrarReserva/page/:page', component: AdministrarReservaComponent },
			{ path: 'editarReserva/:reserva', component: EditarReservaComponent },
			{ path: 'error', component: ErrorsComponent },
			{ path: '', pathMatch: 'full', redirectTo: '/wellcome' }
		]
	}
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
