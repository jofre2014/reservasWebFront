import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { LoginComponent } from 'src/app/login/login.component';
import { Usuario } from 'src/app/models/usuario.model';

@Injectable()
export class ErrorsHandler implements ErrorHandler {
	usuario: Usuario;
	token: string;

	constructor(private injector: Injector) {}

	handleError(error: Error | HttpErrorResponse) {
		const router = this.injector.get(Router);

		// soluciona problema de renderizado de Login------
		const ngZone = this.injector.get(NgZone);
		//-------------------------------------------------

		let errores: any[] = [];

		if (error instanceof HttpErrorResponse) {
			// Server error happened

			const data = error.error;

			if (error.status == 500) {
				errores.push(' Error interno 500 comuniquese con el administrador! ');
			} else if (error.status == 0) {
				errores.push(' NO es posible comunicarse con el back end! ');
			} else if (error.status == 403) {
				errores.push(' Su sesion ha caducado ');

				localStorage.removeItem('token');
				localStorage.removeItem('usuario');

				this.usuario = null;
				this.token = '';

				ngZone.run(() => {
					router.navigate([ '/login' ], { skipLocationChange: true });
				});
			} else if (error.status == 401) {
				errores.push(' Usuario o Contraseña incorrectas ');
			} else if (error.status == 404) {
				if (data['errorCode']) {
					errores.push(data['errorMessage']);
				}
			} else if (error.status == 400) {
				if (data['errorCode']) {
					errores.push(data['errorMessage']);
				}
			} else if (error.status == 409) {
				if (data['errorCode']) {
					errores.push(data['errorMessage']);
				}
			} else if (error.status == 405) {
				if (data['errorCode']) {
					errores.push(data['errorMessage']);
				}
			} else {
				errores.push(' Error Desconocido comuniquese con el administrador! ');
			}

			this.mostrarError(errores);
		} else {
			// Client Error Happend
			router.navigate([ '/error' ], { queryParams: { error: error } });
		}
	}

	mostrarError(errores) {
		if (errores && errores.length > 0) {
			let mensajes = '';
			errores.forEach((e) => (mensajes = mensajes + e));
			swal('Error', mensajes, 'error');
		}
	}
}
