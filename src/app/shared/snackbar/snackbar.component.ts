import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
	selector: 'app-snackbar',
	templateUrl: './snackbar.component.html',
	styleUrls: [ './snackbar.component.css' ]
})
export class SnackbarComponent implements OnInit {
	mensaje: string;
	accion: string;

	constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
		let json = JSON.parse(data);
		this.mensaje = json.mensaje;
		this.accion = json.accion;
	}

	ngOnInit() {}
}
