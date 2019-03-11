import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';

@Injectable({
	providedIn: 'root'
})
export class SnackbarService {
	constructor(private snackBar: MatSnackBar) {}

	openSnackBar(mensaje: string, accion: string) {
		let json = { mensaje: mensaje, accion: accion };

		this.snackBar.openFromComponent(SnackbarComponent, {
			duration: 3000,
			verticalPosition: 'bottom',
			data: JSON.stringify(json),
			panelClass: [ 'snackbar-style' ]
		});
	}
}
