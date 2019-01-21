import { Component, OnInit, NgModule } from '@angular/core';

import { ReservaService } from 'src/app/services/reserva/reserva.service';
import { Cupos } from 'src/app/models/cupos.model';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router, ActivatedRoute } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormModalComponent } from './form-modal.component';
import { Reserva } from 'src/app/models/reserva.model';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/services/service.index';
import { ComponenteItem } from 'src/app/shared/modal/componente-item';

@Component({
	selector: 'app-reserva',
	templateUrl: './reserva.component.html',
	styles: []
})
export class ReservaComponent implements OnInit {
	model;
	events: string[] = [];
	reservas: Reserva[] = [];

	cupos: Cupos[] = [];
	cup: any[] = [];

	subscription: Subscription;
	constructor(private reservaService: ReservaService, private modalService: NgbModal, public _ms: ModalService) {}

	ngOnInit() {
		console.log('REservas.... ', this.reservas);

		//=============== Me subscribo a la respuesta del modal ==============
		this.subscription = this._ms.getRespuesta().subscribe((respuesta: Reserva) => {
			if (respuesta.accion == 'alta') {
				let cont: number = this.reservas.length + 1;
				respuesta.id = cont;
				this.reservas.push(respuesta);
			} else {
				this.reservas.map((res) => {
					if (res.id == respuesta.id) {
						(res.nombre = respuesta.nombre),
							(res.apellido = respuesta.apellido),
							(res.alojado = respuesta.alojado),
							(res.accion = respuesta.accion),
							(res.dni = respuesta.dni),
							(res.edad = respuesta.edad),
							(res.hotel = respuesta.hotel),
							(res.producto = respuesta.producto),
							(res.telefono = respuesta.telefono),
							(res.whatapp = respuesta.whatapp);
					}
				});
			}
		});
		//=============== Fin Subscripcion a la respuesta modal ===============
	}

	addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
		this.events.push(`${type}: ${event.value}`);

		let fechaReserva = `${event.value.getFullYear()}-${('0' + (event.value.getMonth() + 1)).slice(-2)}-${('0' +
			event.value.getDate()).slice(-2)}`;

		this.reservaService.getCupos(fechaReserva).subscribe((cupDevueltos) => (this.cupos = cupDevueltos));
	}

	openFormModal(reserva, altaEditar) {
		this._ms.sendComponent(new ComponenteItem(FormModalComponent, { data: reserva, accion: altaEditar }));
	}

	editarFormModal(reserva) {
		this._ms.sendComponent(new ComponenteItem(FormModalComponent, { data: reserva }));
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}

	reservar() {
		console.log('Reserva: ', this.reservas);
	}

	EliminarPax(v) {
		this.reservas.splice(v.id - 1, 1);
	}
}
