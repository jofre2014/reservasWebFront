import { Producto } from '../models/producto.model';

export class Reserva {
	constructor(
		public id: number,
		public nombre: string,
		public apellido: string,
		public dni: number,
		public edad: number,
		public hotel: string,
		public alojado: boolean,
		public telefono: number,
		public whatapp: boolean,
		public producto: string,
		public grupo: number,
		public accion: string,
		public fechaServicio: string,
		public cliente: number,
		public nombreFantasia: string,
		public confirmada: number,
		public voucherID: number,
		public reservaID: number,
		public fechaServicioOld?: string
	) {}
}
