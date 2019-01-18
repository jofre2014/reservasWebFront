import { Component, OnInit, NgModule } from '@angular/core';
import { Voucher } from 'src/app/models/voucher.model';
import { VOUCHER } from 'src/app/models/voucher.json';
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
import { EjemploModalComponent } from 'src/app/shared/ejemplo-modal/ejemplo-modal.component';

@Component({
	selector: 'app-reserva',
	templateUrl: './reserva.component.html',
	styles: []
})
export class ReservaComponent implements OnInit {
	model;
	events: string[] = [];
	voucher: Voucher[]; //VOUCHER;
	reservas: Reserva[] = [];
	cupos: Cupos[] = [];
	cup: any[] = [];

	subscription: Subscription;
	constructor(private reservaService: ReservaService, private modalService: NgbModal, public _ms: ModalService) {}

	ngOnInit() {
		//=============== Me subscribo a la respuesta del modal ==============
		this.subscription = this._ms.getRespuesta().subscribe((respuesta: Reserva) => {
			console.log(respuesta);
			this.reservas.push(respuesta);
		});
		//=============== Fin Subscripcion a la respuesta modal ===============
		//this.voucher = JSON.parse(localStorage.getItem('reserva'));
		//console.log('reserva: ', this.voucher[0]);
		/*console.log('obteniendo reseva: ', this.voucher);
		console.log('nombre: ', this.voucher);

		const mapped = Object.entries(this.voucher).map(([ type, value ]) => ({ type, value }));

		console.log(mapped);*/
	}

	addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
		this.events.push(`${type}: ${event.value}`);

		let fechaReserva = `${event.value.getFullYear()}-${('0' + (event.value.getMonth() + 1)).slice(-2)}-${('0' +
			event.value.getDate()).slice(-2)}`;

		this.reservaService.getCupos(fechaReserva).subscribe((cupDevueltos) => (this.cupos = cupDevueltos));
	}

	openFormModal() {
		this._ms.sendComponent(new ComponenteItem(FormModalComponent, { nombre: 'Juan', apellido: 'Gomez' }));
		//this._ms.sendComponent(new ComponenteItem(EjemploModalComponent, { nombre: 'Juan', apellido: 'Gomez' }));
		/*
		const modalRef = this.modalService.open(FormModalComponent);
		modalRef.componentInstance.id = 10; // should be the id

		modalRef.result
			.then((result) => {
				console.log(result);
			})
			.catch((error) => {
				console.log(error);
			});*/
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
