import { Routes, RouterModule, CanActivate } from '@angular/router';
import { PagesComponent } from './pages.component';
import { LoginGuardGuard } from '../services/service.index';
import { WellcomeComponent } from './wellcome/wellcome.component';
import { PersonsComponent } from './persons/persons.component';
import { ReservaComponent } from './reserva/reserva.component';

import { FormModalComponent } from './reserva/form-modal.component';
import { ConfirmarReservaComponent } from './confirmarReserva/confirmar-reserva.component';

const pagesRoutes: Routes = [
	{
		path: '',
		component: PagesComponent,
		canActivate: [ LoginGuardGuard ],
		children: [
			{ path: 'wellcome', component: WellcomeComponent },
			{ path: 'personas', component: PersonsComponent },
			{ path: 'reservas', component: ReservaComponent },
			{ path: 'reservas/formModal', component: FormModalComponent },
			{ path: 'confirmarReserva', component: ConfirmarReservaComponent },
			{ path: '', pathMatch: 'full', redirectTo: '/wellcome' }
		]
	}
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
