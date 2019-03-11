import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { Reserva } from 'src/app/models/reserva.model';
import { ReservaService } from 'src/app/services/reserva/reserva.service';
import { SnackbarService } from 'src/app/services/service.index';

@Component({
	selector: 'app-admin-reserva-mat',
	templateUrl: './admin-reserva-mat.component.html',
	styleUrls: [ './admin-reserva-mat.component.css' ]
})
export class AdminReservaMatComponent implements OnInit, AfterViewInit {
	mensaje = 'Hola snack!!!';

	public displayedColumns = [
		'reservaID',
		'fechainservicio',
		'nombrepax',
		'cantidadpaxs',
		'confirmar',
		'editar',
		'anular'
	];

	public dataSource = new MatTableDataSource<Reserva>();

	@ViewChild(MatSort) sort: MatSort;

	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(
		private _reservaService: ReservaService,
		private snackBar: MatSnackBar,
		private _snackbarService: SnackbarService
	) {}

	ngOnInit() {
		this.getAllReservas();

		// Custom Predicate para filtrar por columnas seleccionadas y no por todas las columnas
		this.dataSource.filterPredicate = (data, filter) => {
			const dataStr = data.reservaID + data.nombrepax + data.cantidadpaxs + data.fechainservicio;
			return dataStr.toLowerCase().indexOf(filter) != -1;
		};
	}

	public getAllReservas = () => {
		let us = JSON.parse(localStorage.getItem('usuario'));
		this._reservaService.getAllReservas(us.username, 0).subscribe((res) => {
			this.dataSource.data = res as Reserva[];
		});
	};

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	public doFilter = (value: string) => {
		this.dataSource.filter = value.trim().toLowerCase();
	};

	confirmarReserva(reservaID) {
		//this._reservaService.confirmarReserva(reserva.reservaID).subscribe((res) => (res == 'true' ? 'true' : 'false'));
		//	this.listarReservas();

		swal({
			title: 'Confirmar Reserva',
			text: `¿Seguro que desea confirmar la reserva ${reservaID}?`,
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
				this._reservaService.confirmarReserva(reservaID).subscribe(() => {
					this.getAllReservas();

					const msg = `Reserva ${reservaID} confirmada con éxito.!`;
					this.openSnack(msg, 'success');
					//this.openSnackBar(msg, '');

					/*swal({
						title: 'Reserva confirmada!',
						text: `Reserva ${reservaID} confirmada con éxito.!`,
						icon: 'success'
					}).then(() => location.reload);*/
				});
			}
		});
	}

	openSnack(mensaje: string, accion: string) {
		this._snackbarService.openSnackBar(mensaje, accion);
	}
}
