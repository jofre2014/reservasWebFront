import { Producto } from './producto.model';

export class Reserva {
	constructor(
		public nombre: string,
		public apellido: string,
		public dni: number,
		public edad: number,
		public hotel: string,
		public alojado: boolean,
		public telefono: number,
		public whatapp: boolean,
		public producto: string
	) {}
}
