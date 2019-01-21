import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Reserva } from 'src/app/models/reserva.model';

import { ModalService, ProductoService, HotelService } from 'src/app/services/service.index';
import { ComponenteBaseComponent } from 'src/app/shared/modal/componente.base.component';
import { Person } from 'src/app/models/person.model';
import { Producto } from 'src/app/models/producto.model';
import { Hotel } from 'src/app/models/hotel.model';

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
	hoteles: Hotel[] = [];

	selectedProd: any;

	idR: number = 0;
	nombre: string = '';
	apellido: string = '';
	dni: number = 0;
	edad: number = 0;
	hotel: any;
	alojado: boolean = false;
	telefono: number = 0;
	whatapp: boolean = false;
	prod: any;
	accion: string = '';

	constructor(
		private formBuilder: FormBuilder,
		public _ms: ModalService,
		public _productoService: ProductoService,
		public _hotelService: HotelService
	) {
		//config.backdrop = 'static';
		//config.keyboard = false;
	}

	ngOnInit() {
		this.accion = this.data.accion;
		console.log('accion ngOnInit: ', this.accion);
		$('#ventana').modal('show');
		this._productoService.getListaProductos().subscribe((pr: any) => {
			this.productos = pr;
			console.log('productos: ', this.productos);
			if (this.data.accion == 'editar') {
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

				this.createForm();
			}
		});

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
			accion: this.data.accion
		};

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
		let ptoEncuentro: number = 0; //event.source.value.
		this._hotelService.getHoteles(traslado, ptoEncuentro).subscribe((res: any) => (this.hoteles = res));
	}
}
