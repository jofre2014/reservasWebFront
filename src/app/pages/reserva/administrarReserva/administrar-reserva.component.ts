import { Component, OnInit, OnChanges } from '@angular/core';
import { ReservaService } from 'src/app/services/reserva/reserva.service';
import { Reserva } from 'src/app/models/reserva.model';
import { ActivatedRoute } from '@angular/router';

import swal from 'sweetalert';

@Component({
	selector: 'app-confirmar-reserva',
	templateUrl: './administrar-reserva.component.html',
	styles: []
})
export class AdministrarReservaComponent implements OnInit, OnChanges {
	reservas: Reserva[];
	paginador: any;

	constructor(private _reservaService: ReservaService, private activatedRoute: ActivatedRoute) {}

	ngOnInit() {
		this.listarReservas();
	}

	buscarReservas(texto: string) {
		console.log('texto a buscar: ', texto);
	}

	confirmarReserva(reserva) {
		//this._reservaService.confirmarReserva(reserva.reservaID).subscribe((res) => (res == 'true' ? 'true' : 'false'));
		//	this.listarReservas();

		swal({
			title: 'Confirmar Reserva',
			text: `¿Seguro que desea confirmar la reserva ${reserva.reservaID}?`,
			icon: 'warning',
			buttons: {
				cancel: {
					text: 'Cancelar',
					value: null,
					visible: true
				},
				confimr: {
					text: 'Confirmar',
					value: true
				}
			}
		}).then((value) => {
			if (value) {
				this._reservaService.confirmarReserva(reserva.reservaID).subscribe(() => {
					this.listarReservas();
					swal({
						title: 'Reserva confirmada!',
						text: `Reserva ${reserva.reservaID} confirmada con éxito.!`,
						icon: 'success'
					}).then(() => location.reload);
				});
			}
		});
	}

	listarReservas() {
		this.activatedRoute.paramMap.subscribe((params) => {
			let page: number = +params.get('page');
			if (!page) page = 0;

			let us = JSON.parse(localStorage.getItem('usuario'));
			this._reservaService.listarReservasEstadoConfir(us.username, 0, page).subscribe((res: any) => {
				this.reservas = res.content as Reserva[];
				this.paginador = res;
			});
		});
	}

	editarReserva(v) {
		this._reservaService.getReservaPaxs(v.reservaID).subscribe((res) => console.log('Reservaaaa!!!', res));
	}

	ngOnChanges() {}
}
