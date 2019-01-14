import { Component, OnInit, NgModule } from '@angular/core';
import { Voucher } from 'src/app/models/voucher.model';
import { VOUCHER } from 'src/app/models/voucher.json';
import { ReservaService } from 'src/app/services/reserva/reserva.service';
import { Cupos } from 'src/app/models/cupos.model';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
	selector: 'app-reserva',
	templateUrl: './reserva.component.html',
	styles: []
})
export class ReservaComponent implements OnInit {
	model;
	events: string[] = [];
	voucher: Voucher[] = VOUCHER;
	cupos: Cupos[] = [];
	cup: any[] = [];
	constructor(private reservaService: ReservaService) {}

	ngOnInit() {}

	addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
		this.events.push(`${type}: ${event.value}`);

		let fechaReserva = `${event.value.getFullYear()}-${('0' + (event.value.getMonth() + 1)).slice(-2)}-${('0' +
			event.value.getDate()).slice(-2)}`;

		this.reservaService.getCupos(fechaReserva).subscribe((cupDevueltos) => (this.cupos = cupDevueltos));
	}
}
