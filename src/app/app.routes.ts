import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NoPageFoundComponent } from './shared/no-page-found/no-page-found.component';
import { ErrorsComponent } from './pages/errores/errors.component';

//import { RegisterComponent } from './login/register.component';

const appRoutes: Routes = [
	{ path: 'login', component: LoginComponent },
	//{ path: 'register', component: RegisterComponent },
	{ path: '**', pathMatch: 'full', component: NoPageFoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });
