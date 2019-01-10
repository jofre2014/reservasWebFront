import { Routes, RouterModule, CanActivate } from '@angular/router';
import { PagesComponent } from './pages.component';
import { LoginGuardGuard } from '../services/service.index';
import { WellcomeComponent } from './wellcome/wellcome.component';
import { PersonsComponent } from './persons/persons.component';
import { ReservaComponent } from './reserva/reserva.component';

const pagesRoutes: Routes = [
  { path: '',
  component: PagesComponent,  
  canActivate: [ LoginGuardGuard ],
  children: [
    { path: 'wellcome', component: WellcomeComponent },
    { path: 'personas', component: PersonsComponent },    
    { path: 'reservas', component: ReservaComponent },    
    { path: '', pathMatch: 'full', redirectTo: '/wellcome' }
  ]}
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);


