import { Component, OnInit, NgModule } from '@angular/core';

import { ReservaService } from 'src/app/services/reserva/reserva.service';
import { Cupos } from 'src/app/dto/cupos.dto';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { FormModalComponent } from './form-modal.component';
import { Reserva } from 'src/app/dto/reserva.dto';
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

	fechaReserva: string;

	cupos: Cupos[] = [];
	gruposConCuposDisponibles: number[] = [];

	mostrarGrilla = false;
	totalCupos = 0;

	subscription: Subscription;
	constructor(private reservaService: ReservaService, public _ms: ModalService) {}

	ngOnInit() {
		console.log('REservas.... ', this.reservas);

		//=============== Me subscribo a la respuesta del modal ==============
		this.subscription = this._ms.getRespuesta().subscribe((respuesta: Reserva) => {
			if (respuesta.accion == 'alta') {
				let cont: number = this.reservas.length + 1;
				respuesta.id = cont;
				this.reservas.push(respuesta);
				this.restarCupos(respuesta.grupo);
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
		console.log('evento change fecha: ');
		this.fechaReserva = `${event.value.getFullYear()}-${('0' + (event.value.getMonth() + 1)).slice(-2)}-${('0' +
			event.value.getDate()).slice(-2)}`;

		this.reservaService.getCupos(this.fechaReserva).subscribe((cupDevueltos) => {
			this.cupos = cupDevueltos;
			this.totalCupos = 0;
			this.cupos.forEach((c) => (this.totalCupos = this.totalCupos + c.cantidadCupo));
		});

		this.mostrarGrilla = true;
	}

	openFormModal(reserva, altaEditar) {
		this.gruposConCuposDisponibles = this.cupos.filter((c) => c.cantidadCupo > 0).map((c) => c.grupo);

		this._ms.sendComponent(
			new ComponenteItem(FormModalComponent, {
				data: reserva,
				accion: altaEditar,
				fecRes: this.fechaReserva,
				listaGrupos: this.gruposConCuposDisponibles
			})
		);
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}

	reservar(confirmar: boolean) {
		if (confirmar) {
			this.reservas[0].confirmada = 1;
		}
		this.reservaService.generarReserva(this.reservas).subscribe((res) => {
			if (res) {
				this.reservas.length = 0;
			}
		});
	}

	EliminarPax(v) {
		this.reservas.splice(v.id - 1, 1);
		this.sumarCupos(v.grupo);
	}

	restarCupos(grupo: number) {
		this.cupos.filter((c) => c.grupo == grupo).map((c) => (c.cantidadCupo = c.cantidadCupo - 1));
	}

	sumarCupos(grupo: number) {
		this.cupos.filter((c) => c.grupo == grupo).map((c) => (c.cantidadCupo = c.cantidadCupo + 1));
	}
}
