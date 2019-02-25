import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-editar-reserva',
	templateUrl: './editar-reserva.component.html',
	styles: []
})
export class EditarReservaComponent implements OnInit {
	idReserva;
	constructor(private _activatedRoute: ActivatedRoute) {}

	ngOnInit() {
		this._activatedRoute.paramMap.subscribe((params) => (this.idReserva = params.get('reserva')));
	}
}
