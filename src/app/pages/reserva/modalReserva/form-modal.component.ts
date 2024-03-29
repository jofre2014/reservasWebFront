import { Component, OnInit, Input } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Reserva } from 'src/app/dto/reserva.dto';

import { ModalService, ProductoService, HotelService } from 'src/app/services/service.index';
import { ComponenteBaseComponent } from 'src/app/shared/modal/componente.base.component';

import { Producto } from 'src/app/models/producto.model';
import { Hotel } from 'src/app/models/hotel.model';
import { GrupoProductoService } from 'src/app/services/grupoProducto/grupo-producto.service';
import { GrupoProducto } from 'src/app/models/grupoProducto.model';

declare var $: any;

@Component({
	selector: 'app-form-modal',
	templateUrl: './form-modal.component.html',
	styleUrls: [ './form-modal.component.css' ]
})
export class FormModalComponent implements ComponenteBaseComponent, OnInit {
	@Input() id: number;
	submitted = false;
	data: any;

	myForm: FormGroup;

	productos: Producto[] = [];

	grupos: any[];

	hoteles: Hotel[] = [];
	grupoProducto: GrupoProducto = null;
	grupoID: number = null;

	selectedProd: any;

	idR: number = 0;
	nombre: string = '';
	apellido: string = '';
	dni: number = null;
	edad: number = null;
	hotel: any;
	alojado: boolean = false;
	telefono: number = null;
	whatapp: boolean = false;
	prod: any;
	accion: string = '';
	voucherID: number;
	reservaID: number;

	constructor(
		private formBuilder: FormBuilder,
		public _ms: ModalService,
		public _productoService: ProductoService,
		public _hotelService: HotelService,
		public _grupoProducto: GrupoProductoService
	) {}

	ngOnInit() {
		this.accion = this.data.accion;
		const grupos = this.data.listaGrupos;
		this._productoService.getProductosXGrupo(grupos).subscribe((res) => {
			this.grupos = res;

			this.grupos.map((x) => {
				x.productos.filter((p) => p.ventainternet == 1).forEach((element) => {
					this.productos.push(element);
				});
			});
			if (this.data.accion == 'editar') {
				console.log('dataaaaaaaaa:' + this.data.data.grupo);

				this.idR = this.data.data.id;
				this.nombre = this.data.data.nombre;
				this.apellido = this.data.data.apellido;
				this.dni = this.data.data.dni;
				this.edad = this.data.data.edad;
				this.hotel = this.data.data.hotel;
				this.alojado = this.data.data.alojado;
				this.telefono = this.data.data.telefono;
				this.whatapp = this.data.data.whatapp;
				this.prod = this.data.data.producto;
				this.accion = this.data.accion;
				this.grupoID = this.data.data.grupo;
				this.voucherID = this.data.data.voucherID;

				this.createForm();
			}
		});

		$('#ventana').modal('show');

		this.createForm();
	}

	private createForm() {
		const soloNum = `^\\d+$`;
		this.myForm = this.formBuilder.group({
			nombre: [ this.nombre, Validators.required ],
			apellido: [ this.apellido, Validators.required ],
			dni: [ this.dni, [ Validators.required, Validators.pattern(soloNum) ] ],
			edad: [ this.edad, [ Validators.required, Validators.maxLength(2), Validators.pattern(soloNum) ] ],
			hotel: [ this.hotel, Validators.required ],
			alojado: this.alojado,
			telefono: [ this.telefono, Validators.pattern(soloNum) ],
			whatsapp: this.whatapp,
			producto: [ this.prod, Validators.required ]
		});
	}

	private submitForm() {
		$('#ventana').modal('hide');
	}

	// convenience getter for easy access to form fields
	get f() {
		return this.myForm.controls;
	}

	cargar(): void {
		this.submitted = true;
		// stop here if form is invalid
		if (this.myForm.invalid) {
			return;
		}

		let us = JSON.parse(localStorage.getItem('usuario'));

		console.log('usuario del localstorage: ', us.nombreFantasia);
		console.log('GrupoID!!!!', this.grupoID);

		let reserva: Reserva = {
			id: this.data.accion == 'editar' ? this.data.data.id : 0,
			nombre: this.myForm.get('nombre').value,
			apellido: this.myForm.get('apellido').value,
			dni: this.myForm.get('dni').value,
			edad: this.myForm.get('edad').value,
			hotel: this.myForm.get('hotel').value,
			alojado: this.myForm.get('alojado').value,
			telefono: this.myForm.get('telefono').value,
			whatapp: this.myForm.get('whatsapp').value,
			producto: this.myForm.get('producto').value,
			grupo: this.grupoID != null ? this.grupoID : this.grupoProducto.grupoID,
			accion: this.data.accion,
			fechaServicio: this.data.fecRes,
			cliente: us.username,
			nombreFantasia: us.nombreFantasia,
			confirmada: 0,
			voucherID: this.voucherID != 0 ? this.voucherID : 0,
			reservaID: this.reservaID != 0 ? this.reservaID : 0
		};

		console.log('Cargar REservaaaaaa', reserva);

		this._ms.sendRespuesta(reserva);
		this.cerrarModal();
	}

	cerrarModal() {
		$('#ventana').modal('hide');
	}

	//Recupera hoteles cuando cambia el producto seleccionado
	change(event) {
		if (event.isUserInput) {
			console.log(event.source.value, event.source.selected);
		}

		let traslado: number = event.source.value.traslado;
		let ptoEncuentro: number = event.source.value.puntoencuentro; //event.source.value.

		// Recupera Hoteles
		this._hotelService.getHoteles(traslado, ptoEncuentro).subscribe((res: any) => (this.hoteles = res));

		//busca Grupo al que pertenece
		this.getGrupoXProducto(event.source.value.productoID);
	}

	getGrupoXProducto(prodID) {
		this._grupoProducto.getGrupoXProducto(prodID).subscribe((grp) => (this.grupoProducto = grp));
	}
}
