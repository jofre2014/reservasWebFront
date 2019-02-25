import { Component, OnInit, NgModule } from '@angular/core';

import { ReservaService } from 'src/app/services/reserva/reserva.service';
import { Cupos } from 'src/app/dto/cupos.dto';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { FormModalComponent } from '../modalReserva/form-modal.component';
import { Reserva } from 'src/app/dto/reserva.dto';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/services/service.index';
import { ComponenteItem } from 'src/app/shared/modal/componente-item';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { GrupoProducto } from 'src/app/models/grupoProducto.model';
import { GrupoProductoService } from 'src/app/services/grupoProducto/grupo-producto.service';

import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-reserva',
	templateUrl: './reserva.component.html',
	styles: []
})
export class ReservaComponent implements OnInit {
	datePicker = new FormControl();
	model;
	events: string[] = [];
	reservas: Reserva[] = [];

	fechaReserva: string = null;

	cupos: Cupos[] = [];
	gruposConCuposDisponibles: number[] = [];

	mostrarGrilla = false;
	totalCupos = 0;

	grupoProducto: GrupoProducto;

	subscription: Subscription;

	constructor(
		private reservaService: ReservaService,
		public _ms: ModalService,
		private _activatedRoute: ActivatedRoute,
		private _grupoProducto: GrupoProductoService,
		private datePipe: DatePipe
	) {}

	ngOnInit() {
		let us = JSON.parse(localStorage.getItem('usuario'));
		let contReserva = 0;
		this._activatedRoute.paramMap.subscribe((params) => {
			if (params.get('accion') == 'editar') {
				this.reservaService.getReservaPaxs(parseInt(params.get('idReserva'))).subscribe((res) => {
					console.log('Editar reserva!!!', res.reservaPaxs.paxs);

					res.reservaPaxs.paxs.map((pax) => {
						console.log('paxxxxx', pax);
						let reservaTemp;

						this._grupoProducto.getGrupoXProducto(pax.producto.productoID).subscribe((grp) => {
							this.grupoProducto = grp;
							contReserva++;
							console.log('fechaServicio....', this.datePipe.transform(pax.fechaServicio, 'yyyy-MM-dd'));

							reservaTemp = new Reserva(
								contReserva,
								pax.nombre,
								pax.apellido,
								pax.documento,
								pax.edad,
								pax.hotel,
								pax.alojado,
								pax.telefono,
								pax.whatsapp,
								pax.producto,
								this.grupoProducto.grupoID,
								'editar',
								this.datePipe.transform(pax.fechaServicio, 'yyyy-MM-dd'),
								us.username,
								us.nombreFantasia,
								0, //confirmada
								pax.voucherID,
								res.reservaPaxs.reservaId, // pax.reservaID,
								this.datePipe.transform(pax.fechaServicio, 'yyyy-MM-dd')
							);

							this.reservas.push(reservaTemp);
						});
					});
					this.datePicker.setValue(new Date(res.reservaPaxs.FechaServicio));

					this.recuperarCupos(this.datePicker);

					console.log('datepicker valueeee', this.fechaReserva);
				});

				console.log(params.get('accion'), params.get('idReserva'));
			}
		});

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
						res.nombre = respuesta.nombre;
						res.apellido = respuesta.apellido;
						res.alojado = respuesta.alojado;
						res.accion = respuesta.accion;
						res.dni = respuesta.dni;
						res.edad = respuesta.edad;
						res.hotel = respuesta.hotel;
						res.producto = respuesta.producto;
						res.telefono = respuesta.telefono;
						res.whatapp = respuesta.whatapp;
						res.cliente = respuesta.cliente;
						res.nombreFantasia = respuesta.nombreFantasia;
						res.producto = respuesta.producto;
						res.grupo = respuesta.grupo;
						res.fechaServicio = respuesta.fechaServicio;
						res.confirmada = respuesta.confirmada;
						res.voucherID = respuesta.voucherID;
					}
				});
			}
		});
		//=============== Fin Subscripcion a la respuesta modal ===============
	}

	addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
		this.events.push(`${type}: ${event.value}`);

		this.fechaReserva = `${event.value.getFullYear()}-${('0' + (event.value.getMonth() + 1)).slice(-2)}-${('0' +
			event.value.getDate()).slice(-2)}`;

		this.recuperarCupos(event);
	}

	recuperarCupos(event) {
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
		console.log('Reservaaaaa!!!!', this.reservas);

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
