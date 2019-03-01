import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService, ModalService, TokenInterceptorService, RequestInterceptorService } from './service.index';
import { PersonService } from './person/person.service';
import { LoginGuardGuard } from './guard/login-guard.guard';
import { ReservaService } from './reserva/reserva.service';
import { ErrorsHandler } from './errors/errors-handler';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
	declarations: [],
	imports: [ CommonModule ],
	providers: [
		UsuarioService,
		PersonService,
		LoginGuardGuard,
		ReservaService,
		ModalService,
		{
			provide: ErrorHandler,
			useClass: ErrorsHandler
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptorService,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: RequestInterceptorService,
			multi: true
		}
	]
})
export class ServiceModule {}
