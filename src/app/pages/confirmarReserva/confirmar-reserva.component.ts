import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-confirmar-reserva',
	templateUrl: './confirmar-reserva.component.html',
	styles: []
})
export class ConfirmarReservaComponent implements OnInit {
	constructor() {}

	ngOnInit() {}

	buscarReservas(texto: string) {
		console.log('texto a buscar: ', texto);
	}
}
